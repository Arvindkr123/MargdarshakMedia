ALTER TABLE "accounts" ALTER COLUMN "beneficiary_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "introducer_id" integer;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN "intruducer_id";