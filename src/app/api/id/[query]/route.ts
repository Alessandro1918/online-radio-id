import { NextRequest } from "next/server"
import { db } from "../../../../db/connection"
import { schema } from "../../../../db/schema/index"
import { eq, desc } from "drizzle-orm"

interface RequestProps {
   params: Promise<{ query: string }>
}

// Adds a db record with the identified music details
async function saveId(radio: string, artist: string, title: string) {
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

// Returns the db record of the last music identified for this radio station
async function getLastId(radio: string) {
  const result = await db
    .select()
    .from(schema.ids)
    .where(eq(schema.ids.radio, radio))
    .orderBy(desc(schema.ids.timestamp))
  return result[0]
}

// Uses the "radio-id" API to search for a radio, recognize the music currently playing, and save it as a new record in the db
export async function GET(request: NextRequest, { params }: RequestProps) {
  try {
    const query = (await params).query
    const response = await fetch(`https://radio-id.vercel.app/api/v1/id/${query}`)
    const result = await response.json()
    if (response.status == 200) {
      console.log(`Music found! ${result.track.artist} - ${result.track.title}`)
      const lastId = await getLastId(result.radio.name)
      if (
        lastId == undefined || 
        result.track.title != lastId.music_title
      ) {
        await saveId(result.radio.name, result.track.artist, result.track.title)
      }
      return Response.json(result)
    } else {
      throw new Error(result.message)
    }
  } catch (err: any) {
    console.log(err.message)
    return Response.json({message: err.message})
  }
}
