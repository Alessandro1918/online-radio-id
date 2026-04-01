import { db } from "../../../db/connection"
import { schema } from "../../../db/schema/index"
import { eq, desc } from "drizzle-orm"

// Returns the db record of the last music identified for this radio station
export async function getLastId(radio: string) {
  const result = await db
    .select()
    .from(schema.ids)
    .where(eq(schema.ids.radio, radio))
    .orderBy(desc(schema.ids.timestamp))
    .limit(1)
  return result[0]
}
