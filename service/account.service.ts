import db from "@/database";
import { aiProviderAccounts, TAccount } from "@/database/schema/accounts";
import { eq } from "drizzle-orm";

export async function getAllAccounts(): Promise<TAccount[]> {
  "use cache";
  return db.select().from(aiProviderAccounts);
}

export async function getAccountById(id: number): Promise<TAccount> {
  "use cache";
  const queryResult = await db.select()
    .from(aiProviderAccounts)
    .where(eq(aiProviderAccounts.id, id));

  return queryResult[0];
}
