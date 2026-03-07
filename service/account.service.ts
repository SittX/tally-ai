import db from "@/database";
import { aiProviderAccounts, TAccount } from "@/database/schema/accounts";

export async function getAllAccounts(): Promise<TAccount[]> {
  "use cache";
  return db.select().from(aiProviderAccounts);
}
