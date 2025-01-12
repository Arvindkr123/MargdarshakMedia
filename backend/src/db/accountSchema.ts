import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const accountsTable = pgTable("accounts", {
  accountId: integer("account_id").primaryKey(),
  introducerId: integer("introducer_id"),
  beneficiaryId: integer("beneficiary_id"),
});
