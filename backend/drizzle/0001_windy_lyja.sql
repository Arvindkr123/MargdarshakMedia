CREATE TABLE "accounts" (
	"account_id" serial PRIMARY KEY NOT NULL,
	"intruducer_id" integer NOT NULL,
	"beneficiary_id" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;