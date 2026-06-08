import { NextRequest } from "next/server"
import { db } from "../../../../db/connection"
import { schema } from "../../../../db/schema/index"
import { eq, sql } from "drizzle-orm"

type RequestProps = {
   params: Promise<{ id: string }>
}

// Query the db for the details of single radio
// http://localhost:3000/api/radio/f0d81ba6-285c-4b93-97c9-4398d20c7797
export async function GET(req: NextRequest, { params }: RequestProps) {

  const { id } = await params

  // const result = await db
  //   .select()
  //   .from(schema.radios)
  //   .where(eq(schema.radios.id, id))
  const result = await db.execute(sql`
    SELECT
      r.*,
      json_build_object(
        'music_artist', i.music_artist,
        'music_title', i.music_title,
        'timestamp', i.timestamp
      ) AS "last_played",
      json_build_object(
        'count', (
          SELECT COUNT(*)
          FROM ids
          WHERE ids.radio = r.id
        ),
        'most_played', (
          SELECT COALESCE(
            json_agg(
              json_build_object(
                'artist', artist_stats.music_artist,
                'count', artist_stats.play_count
              )
              ORDER BY artist_stats.play_count DESC
            ),
            '[]'::json
          )
          FROM (
            SELECT
              music_artist,
              COUNT(*) AS play_count
            FROM ids
            WHERE ids.radio = r.id
              AND music_artist IS NOT NULL
            GROUP BY music_artist
            HAVING COUNT(*) > 1
            ORDER BY COUNT(*) DESC
            LIMIT 10
          ) artist_stats
        )
      ) AS "stats"
    FROM radios r
    LEFT JOIN LATERAL (
      SELECT music_artist, music_title, timestamp
      FROM ids
      WHERE ids.radio = r.id
      ORDER BY timestamp DESC
      LIMIT 1
    ) i ON true
    WHERE r.id = ${id}
  `)

  if (result.length > 0) {
    return Response.json(result[0])
  } else {
    return Response.json({}, {status: 400}) // Bad request
  }
}
