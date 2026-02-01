import { pgTable, uuid, timestamp, text  } from "drizzle-orm/pg-core"

export const ids = pgTable("ids", {
  uuid: uuid().notNull().primaryKey().defaultRandom(),
  timestamp: timestamp().notNull().defaultNow(),
  radio: text(),
  music_artist: text(),
  music_title: text(),
})
