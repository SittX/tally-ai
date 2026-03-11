"use server";

import db from "@/database";
import {
  AccountCreateSchema,
  aiProviderAccounts,
  TAccountCreate,
} from "@/database/schema/accounts";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function accountCreateAction(formData: TAccountCreate) {
  console.log("Form Data", formData);
  const validationResponse = AccountCreateSchema.safeParse(formData);

  if (validationResponse.error) {
    throw new Error("Validation failed: " + validationResponse.error.message);
  }

  const validatedData = validationResponse.data;

  try {
    await db.insert(aiProviderAccounts).values(validatedData);
    revalidatePath("/dashboard/accounts");
    return;
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

export async function accountDeleteAction(id: number) {
  if (id == null || id == 0) return;

  try {
    await db.delete(aiProviderAccounts).where(eq(aiProviderAccounts.id, id));
    revalidatePath("/dashboard/accounts");
    return;
  } catch (error) {
    console.error("Database delete error:", error);
    throw new Error("Failed to delete account");
  }
}
