import { db } from "../../../db/connection"
import { schema } from "../../../db/schema/index"

// Adds a db record with the identified music details
export async function saveId(radio: string, artist: string, title: string) {
  const result = await db
    .insert(schema.ids)
    .values({ 
      radio: radio,
      music_artist: artist,
      music_title: title
    })
    .returning()
  return result
}
