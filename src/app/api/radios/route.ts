import { NextRequest } from "next/server"
import { db } from "../../../db/connection"
import { schema } from "../../../db/schema/index"

// Query the db for the list of all the saved radios
export async function GET(req: NextRequest) {
  const result = await db
    .select()
    .from(schema.radios)
  return Response.json(result)
}
