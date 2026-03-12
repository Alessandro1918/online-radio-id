import { NextRequest } from "next/server"
import { db } from "../../../db/connection"
import { schema } from "../../../db/schema/index"
import { eq, and, gt, lt, desc } from "drizzle-orm"
import { cacheLife } from "next/cache"

// Get how old the cached data can be (in seconds) and still be used
function getRevalidateTime(start: Date, end: Date) {
  const now = new Date()
  if (end >= now) {
    return 60 // today → refresh every minute
  }
  return 60 * 60 * 24 // past → cache 1 day
}

// The cache key automatically includes "radio", "start", "end", so every unique query window gets its own cached result.
// (the front will call this route with start = "0h00" and end "23h59", so every cache file will have 24h)
async function getIdsCached(radio: string, startAsString: string, endAsString: string) {
  "use cache"
  console.log("QUERYING THE DB...")

  const start = new Date(startAsString)
  const end = new Date(endAsString)
  const revalidate = getRevalidateTime(start, end)
  cacheLife({ revalidate })

  return await db
    .select({
      timestamp: schema.ids.timestamp,
      music_artist: schema.ids.music_artist,
      music_title: schema.ids.music_title,
    })
    .from(schema.ids)
    .where(and(
      eq(schema.ids.radio, radio),
      gt(schema.ids.timestamp, start),
      lt(schema.ids.timestamp, end)
    ))
    .orderBy(desc(schema.ids.timestamp))
}

// Query the db for all the records of a single radio, from a window of time
// http://localhost:3000/api/history?radio=8e3429cd-6340-4248-8371-6540f3e9f7fe&start=2026-03-08T16:10:05.125Z&end=2026-03-09T16:25:05.125Z
export async function GET(req: NextRequest) {
  const radioId = req.nextUrl.searchParams.get("radio")
  const start = req.nextUrl.searchParams.get("start")
  const end = req.nextUrl.searchParams.get("end")

  if (!radioId || !start || !end) {
    return Response.json({"message": "Error: Missing params"}, {status: 400}) // Bad request
  }

  const result = await getIdsCached(radioId, start, end)

  return Response.json(
    result, {
      headers: {
        "Size": `${Buffer.byteLength(JSON.stringify(result), "utf-8") / 1024 / 1024} Mb`,
      }
    })
}
