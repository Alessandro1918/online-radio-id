import { NextRequest } from "next/server"
import { IDResponseProps } from "@/src/app/types/id"
import { capitalize } from "../services/capitalize"
import { getLastId } from "../services/get-last-id"
import { saveId } from "../services/save-id"

// Uses the "radio-id" API to search for a radio, recognize the music currently playing, and save it as a new record in the db
// http://localhost:3000/api/id?name=kiss_fm&countrycode=BR   // v1
export async function GET(request: NextRequest) {
  try {
    // v1
    const searchParams = request.nextUrl.search.split("?")[1]
    const response = await fetch(`https://radio-id.vercel.app/api/v1/id?${searchParams}`)
    const result = await response.json() as IDResponseProps

    if (response.status == 200) {
      console.log(`Music found! ${result.track.artist} - ${result.track.title}`)

      // Only save the recognized ID if its different from the previous ID from the same radio
      const lastId = await getLastId(result.radio.id)
      const isDifferent = 
        lastId == undefined || 
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
