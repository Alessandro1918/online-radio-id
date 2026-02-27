import { pgTable, uuid, text  } from "drizzle-orm/pg-core"

export const radios = pgTable("radios", {
  id: uuid().notNull().primaryKey(),
  name: text(),
  state: text(),
  country: text(),
  stream: text(),
  site: text(),
  icon: text(),
  frequency: text(),
  query: text(),
})
