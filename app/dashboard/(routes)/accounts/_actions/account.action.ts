"use server";

import db from "@/database";
import {
  AccountCreateSchema,
  aiProviderAccounts,
  TAccountCreate,
} from "@/database/schema/accounts";

export default async function accountCreateAction(formData: TAccountCreate) {
  console.log("Account Create Action");
  const validationResponse = AccountCreateSchema.safeParse(formData);
  if (validationResponse.error) {
    console.error(validationResponse.error.message);
    return;
  }
  console.log(validationResponse);

  const validatedData = validationResponse.data;
  await db.insert(aiProviderAccounts).values(validatedData);
}
