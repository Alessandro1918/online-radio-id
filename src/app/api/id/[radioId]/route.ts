// v1: src/app/api/id/[query]/route.ts
// v2: src/app/api/id/[radioId]/route.ts

import { NextRequest } from "next/server"
import { db } from "../../../../db/connection"
import { schema } from "../../../../db/schema/index"
import { eq, desc } from "drizzle-orm"

interface RequestProps {
  // params: Promise<{ query: string }>   // v1
  params: Promise<{ radioId: string }>    // v2
}

// Uppercase the first letter of every word in a string
function capitalize(phrase: string): string {
  // return phrase.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const lowerCasedStr = phrase.toLowerCase()
  // The regex matches: 
  // (^) the start of the string OR (\s) a whitespace character OR "\(" an open parenthesis, followed by (\w) a word character, OR
  // (\.) a dot character followed by (\w) a word character (like the non-first letters of the acronyms "R.E.M." or "T.N.T.") 
  const upperCasedStr = lowerCasedStr.replace(/(^|\s|\()\w|\.\w/g, match => {
    return match.toUpperCase()
  })
  return upperCasedStr
    .replace("Feat.", "feat.")
    .replace("Ac/dc", "AC/DC")
    .replace("Inxs", "INXS")
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
// http://localhost:3000/api/id/name=89_fm&countrycode=BR   // v1
// http://localhost:3000/api/id/f0d81ba6-285c-4b93-97c9-4398d20c7797   // v2
export async function GET(request: NextRequest, { params }: RequestProps) {
  try {
    const radioId = (await params).radioId
    const response = await fetch(`https://radio-id.vercel.app/api/v2/id/${radioId}`)
    const result = await response.json()
    if (response.status == 200) {
      console.log(`Music found! ${result.track.artist} - ${result.track.title}`)
      // Only save current id if its different from previous id from the same radio
      const lastId = await getLastId(result.radio.id)
      if (
        lastId == undefined || 
        lastId.music_title != capitalize(result.track.title)
      ) {
        await saveId(result.radio.id, capitalize(result.track.artist), capitalize(result.track.title))
      }
      return Response.json(result, {status: 201})
    } else {
      console.log(result.message)
      // throw new Error(result.message)
      throw new Error(String(response.status))
    }
  } catch (err: any) {
    console.log(err.message)
    // return Response.json({message: err.message}, {status: 404})
    switch (err.message) {
      case "404": return Response.json({"message": "Error: Could not find the radio!"}, {status: 404}) // search error
      case "204": return Response.json({"message": "Error: Music not recognized :("}, {status: 204}) // shazam error
      default:    return Response.json({"message": `Error: ${err.message}`}, {status: 500})        // ffmpeg error
    }
  }
}
