import { NextRequest } from "next/server"
import { db } from "../../../../db/connection"
import { schema } from "../../../../db/schema/index"
import { eq, and, gt, lt, desc } from "drizzle-orm"

interface RequestProps {
   params: Promise<{ query: string }> 
}

// query: "name=kiss_fm&countrycode=BR" => filters: { name: 'kiss_fm', countrycode: 'BR' }
function parseQuery(query: string) {
  const filters = {} as any
  query.split("&").map(param => {
    filters[param.split("=")[0]] = param.split("=")[1]
  })
  return filters
}

// Query the db for all the records of a single radio, from a window of time
// http://localhost:3000/api/history/radio=8e3429cd-6340-4248-8371-6540f3e9f7fe&start=2026-02-25T16:10:05.125Z&end=2026-02-27T16:25:05.125Z
export async function GET(req: NextRequest, { params }: RequestProps) {
  const query = (await params).query
  const filters = parseQuery(query)
  const result = await db
    .select({
      timestamp: schema.ids.timestamp,
      music_artist: schema.ids.music_artist,
      music_title: schema.ids.music_title,
    })
    .from(schema.ids)
    .where(and(
      eq(schema.ids.radio, filters.radio),
      gt(schema.ids.timestamp, new Date(filters.start)),
      lt(schema.ids.timestamp, new Date(filters.end))
    ))
    .orderBy(desc(schema.ids.timestamp))
  return Response.json(result)
}
