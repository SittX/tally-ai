CREATE TABLE "ai_provider_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_label" varchar(256),
	"provider" varchar(256),
	"email" varchar,
	"subscription_tier" varchar(256),
	"status" varchar,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"quota_type" varchar(100),
	"quota_metadata" jsonb,
	"quota_reset_at" timestamp,
	CONSTRAINT "ai_provider_accounts_email_unique" UNIQUE("email")
);
