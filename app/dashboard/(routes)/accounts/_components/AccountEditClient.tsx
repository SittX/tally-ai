"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleUpdateAction = async (data: TAccountCreate) => {
    return accountUpdateAction({ ...data, id: accountId });
  };

  const handleUpdateSuccess = async () => {
    router.push(`/dashboard/accounts/${accountId}`);
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
