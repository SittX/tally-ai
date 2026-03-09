"use server";

import db from "@/database";
import {
  AccountCreateSchema,
  aiProviderAccounts,
  TAccountCreate,
} from "@/database/schema/accounts";
import { eq } from "drizzle-orm";

export default async function accountCreateAction(formData: TAccountCreate) {
  const validationResponse = AccountCreateSchema.safeParse(formData);
  
  if (validationResponse.error) {
    throw new Error("Validation failed: " + validationResponse.error.message);
  }

  const validatedData = validationResponse.data;
  
  try {
    await db.insert(aiProviderAccounts).values(validatedData);
  } catch (error) {
    console.error("Database insert error:", error);
    throw new Error("Failed to create account");
  }
}

export async function accountUpdateAction(
  formData: TAccountCreate & { id: number }
) {
  const { id, ...updateData } = formData;
  
  const validationResponse = AccountCreateSchema.safeParse(updateData);
  
  if (validationResponse.error) {
    throw new Error("Validation failed: " + validationResponse.error.message);
  }

  const validatedData = validationResponse.data;

  try {
    await db
      .update(aiProviderAccounts)
      .set(validatedData)
      .where(eq(aiProviderAccounts.id, id));
  } catch (error) {
    console.error("Database update error:", error);
    throw new Error("Failed to update account");
  }
}
