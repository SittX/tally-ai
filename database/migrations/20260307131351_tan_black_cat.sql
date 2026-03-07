ALTER TABLE "ai_provider_accounts" ALTER COLUMN "account_label" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_provider_accounts" ALTER COLUMN "provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_provider_accounts" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_provider_accounts" ALTER COLUMN "status" SET DEFAULT 'active';