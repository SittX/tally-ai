"use client";

import AccountForm from "./AccountForm";
import { accountUpdateAction } from "../_actions/account.action";
import { TAccountCreate } from "@/database/schema/accounts";

interface AccountEditClientProps {
  accountId: number;
  initialData: any;
}

export default function AccountEditClient({
  accountId,
  initialData,
}: AccountEditClientProps) {
  const handleUpdateAction = async (data: TAccountCreate) => {
    return accountUpdateAction({ ...data, id: accountId });
  };

  const handleUpdateSuccess = async () => {
    window.location.href = "/dashboard/accounts";
  };

  return (
    <AccountForm
      onSuccess={handleUpdateSuccess}
      action={handleUpdateAction}
      initialData={initialData}
      isEditing={true}
    />
  );
}
