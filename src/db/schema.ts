import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const gamesTable = sqliteTable("games_table", {
  id: int().primaryKey({ autoIncrement: true }),
  rawgId: int().notNull().unique(),
  name: text().notNull(),
  image: text(),
  platform: text().notNull(),
  status: text().notNull(),
  personalRating: int(),
  createdAt: int({ mode: "timestamp" }).notNull(),
});