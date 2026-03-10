"use client";

import { useRouter } from "next/navigation";
import AccountForm from "../../_components/AccountForm";
import accountCreateAction from "@/app/dashboard/(routes)/accounts/_actions/account.action";

export default function AccountCreatePage() {
  const router = useRouter();

  const handleSubmitSuccess = async () => {
    router.push("/dashboard/accounts");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create New Account</h1>
        <p className="text-sm text-base-content/60 mt-1">
          Add a new AI provider account to your dashboard
        </p>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <AccountForm
            onSuccess={handleSubmitSuccess}
            action={accountCreateAction}
            isEditing={false}
          />
        </div>
      </div>
    </div>
  );
}
