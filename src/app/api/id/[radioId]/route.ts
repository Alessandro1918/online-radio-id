import { NextRequest } from "next/server"
import { IDResponseProps } from "@/src/app/types/id-response"
import { capitalize } from "../../services/capitalize"
import { saveId } from "../../services/save-id"

interface RequestParams {
  params: Promise<{ radioId: string }>
}

// Uses the "radio-id" API to search for a radio, recognize the music currently playing, and save it as a new record in the db
// http://localhost:3000/api/id/f0d81ba6-285c-4b93-97c9-4398d20c7797   // v2
export async function GET(request: NextRequest, { params }: RequestParams) {
  try {
    // v2
    const radioId = (await params).radioId
    const response = await fetch(`${process.env.RADIO_ID_API_BASE_URL}/api/v2/id/${radioId}`)
    const result = await response.json() as IDResponseProps

    if (response.status == 200) {
      console.log(`Music found! ${result.track.artist} - ${result.track.title}`)

      // Only save the recognized ID if its different from the previous ID from the same radio
      const lastId = result.radio.last_played!
      const isDifferent = 
        lastId.music_title == undefined ||
        lastId.music_title != capitalize(result.track.title)
      if (isDifferent) {
        await saveId(result.radio.id, capitalize(result.track.artist), capitalize(result.track.title))
        return Response.json(result, {status: 201}) // 201 Created
      } else {
        return Response.json(result, {status: 200}) // 200 OK
      }
    } else {
      console.log(result.message)
      // throw new Error(result.message)
      throw new Error(String(response.status))  // 400 - 404
    }
  } catch (err: any) {
    // console.log(err.message)
    // return Response.json({message: err.message}, {status: 404})
    switch (err.message) {
      case "400": return Response.json({"message": "Error: Could not find the radio!"}, {status: 400}) // search error
      case "404": return Response.json({"message": "Error: Music not recognized :("}, {status: 404}) // shazam error
      default:    return Response.json({"message": `Error: ${err.message}`}, {status: 500})        // ffmpeg error
    }
  }
}
