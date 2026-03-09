import { NextRequest } from "next/server"
import { db } from "../../../../db/connection"
import { schema } from "../../../../db/schema/index"
import { lt } from "drizzle-orm"
import dayjs from "dayjs"

// Delete all the db records older than "n" days
// http://localhost:3000/api/history/clear
export async function DELETE(req: NextRequest) {

  const today = dayjs()

  const MAX_PAST_DAYS = 8     // enable history to go back from today + "n" past days

  await db
    .delete(schema.ids)
    .where(lt(schema.ids.timestamp, today.subtract(MAX_PAST_DAYS + 1, "day").toDate()))
  return new Response(null, {status: 204})
}
