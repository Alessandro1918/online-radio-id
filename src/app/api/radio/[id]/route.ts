import { NextRequest } from "next/server"
import { db } from "../../../../db/connection"
import { schema } from "../../../../db/schema/index"
import { eq, and, gt, lt, desc } from "drizzle-orm"

type RequestProps = {
   params: Promise<{ id: string }>
}

// Query the db for the list of all the saved radios
export async function GET(req: NextRequest, { params }: RequestProps) {

  const { id } = await params

  const result = await db
    .select()
    .from(schema.radios)
    .where(eq(schema.radios.id, id))
  return Response.json(result[0])
}
