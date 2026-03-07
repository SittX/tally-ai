import z from "zod";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { createInsertSchema } from "drizzle-zod";

// ? Since each provider have different quota (daily, token, etc), we will stored all quota related metadata in JSONB for flexiblity. (quota expires, quota remaining, etc)
export const aiProviderAccounts = pgTable("ai_provider_accounts", {
  id: serial().primaryKey(),
  accountLabel: varchar("account_label", { length: 256 }).notNull(),
  provider: varchar("provider", { length: 256 }).notNull(),
  email: varchar("email").unique().notNull(),
  subscriptionTier: varchar("subscription_tier", { length: 256 }),
  status: varchar("status").default("active"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  quotaType: varchar("quota_type", { length: 100 }),
  quotaMetadata: jsonb("quota_metadata"),
  quotaResetAt: timestamp("quota_reset_at"),
});

export const AccountSelectSchema = createSelectSchema(aiProviderAccounts)
  .omit({ quotaMetadata: true })
  .extend({
    quotaMetadata: z.unknown(),
  });
export type TAccount = z.infer<typeof AccountSelectSchema>;

export const AccountCreateSchema = createInsertSchema(
  aiProviderAccounts,
).extend({
  accountLabel: z
    .string()
    .min(1, { error: "Account label cannot be empty" })
    .nonoptional({ error: "Account label cannot be empty" }),
  email: z
    .string()
    .min(1, { error: "Email cannot be empty" })
    .nonoptional({ error: "Email cannot be empty" }),
  provider: z
    .string()
    .min(1, { error: "Provider cannot be empty" })
    .nonoptional({ error: "Provider cannot be empty" }),
});
export type TAccountCreate = z.infer<typeof AccountCreateSchema>;
