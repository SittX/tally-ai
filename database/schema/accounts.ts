import { pgTable, serial, varchar, timestamp, jsonb } from "drizzle-orm/pg-core"

// ? Since each provider have different quota (daily, token, etc), we will stored all quota related metadata in JSONB for flexiblity. (quota expires, quota remaining, etc)
export const aiProviderAccounts = pgTable('ai_provider_accounts', {
    id: serial().primaryKey(),
    accountLabel: varchar("account_label", { length: 256 }),
    provider: varchar("provider", { length: 256 }),
    email: varchar("email").unique(),
    subscriptionTier: varchar("subscription_tier", { length: 256 }),
    status: varchar("status"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow(),
    quotaType: varchar("quota_type", { length: 100 }),
    quotaMetadata: jsonb("quota_metadata"),
    quotaResetAt: timestamp("quota_reset_at"),
});
