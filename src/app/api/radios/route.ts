import { NextRequest } from "next/server"
import { db } from "../../../db/connection"
// import { schema } from "../../../db/schema/index"
import { sql } from "drizzle-orm"

// Query the db for the list of all the saved radios
// http://localhost:3000/api/radios
export async function GET(req: NextRequest) {
  // const result = await db
  //   .select()
  //   .from(schema.radios)
  const result = await db.execute(sql`
    SELECT
      r.*,
      json_build_object(
        'music_artist', i.music_artist,
        'music_title', i.music_title,
        'timestamp', i.timestamp
      ) AS "last_played"
    FROM radios r
    LEFT JOIN LATERAL (
      SELECT music_artist, music_title, timestamp
      FROM ids
      WHERE ids.radio = r.id
      ORDER BY timestamp DESC
      LIMIT 1
    ) i ON true
    ORDER BY r.countrycode ASC, r.state ASC, r.city ASC, r.name ASC
  `)

  return Response.json(result)
}
