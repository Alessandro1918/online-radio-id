import { NextRequest } from "next/server"
import { db } from "../../../../db/connection"
import { schema } from "../../../../db/schema/index"
import { eq, and, gt, lt, desc } from "drizzle-orm"

type RequestProps = {
   params: Promise<{ id: string }>
}

// Query the db for the details of single radio
// http://localhost:3000/api/radio/f0d81ba6-285c-4b93-97c9-4398d20c7797
export async function GET(req: NextRequest, { params }: RequestProps) {

  const { id } = await params

  const result = await db
    .select()
    .from(schema.radios)
    .where(eq(schema.radios.id, id))
  return Response.json(result[0])
}
