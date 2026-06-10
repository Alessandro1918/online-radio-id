import { NextRequest } from "next/server"
import { cacheLife } from "next/cache"
import { db } from "../../../../db/connection"
import { sql } from "drizzle-orm"

type RequestProps = {
   params: Promise<{ radioId: string }>
}

// Query the db for the total count and rank of most played artists of single radio
// http://localhost:3000/api/stats/f0d81ba6-285c-4b93-97c9-4398d20c7797
async function getCachedData(radioId: string) {
  "use cache"
  const revalidate = 60 * 60 * 24 // 1 day
  cacheLife({revalidate})

  return await db.execute(sql`
    SELECT
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
      LIMIT 1
    ) i ON true
    WHERE r.id = ${radioId}
  `)
}

export async function GET(req: NextRequest, { params }: RequestProps) {

  const { radioId } = await params

  const result = await getCachedData(radioId)

  return Response.json(result[0]["stats"])
}
