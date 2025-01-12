import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("accounts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  descriptions: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});
