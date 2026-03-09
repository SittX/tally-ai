"use client";

import { getAccountById } from "@/service/account.service";
import { use } from "react";
import AccountForm from "./AccountForm";
import { accountUpdateAction } from "../_actions/account.action";
import { TAccountCreate } from "@/database/schema/accounts";

interface AccountDetailsAsyncViewProps {
  params: Promise<{ id: string }>;
}

async function loadAccount(id: number) {
  return getAccountById(id);
}

export default function AccountDetailsAsyncView({
  params,
}: AccountDetailsAsyncViewProps) {
  const resolvedParams = use(params);
  const accountId = Number(resolvedParams.id);
  
  const accountPromise = loadAccount(accountId);

  return (
    <AccountDetailsContent accountPromise={accountPromise} accountId={accountId} />
  );
}

function AccountDetailsContent({
  accountPromise,
  accountId,
}: {
  accountPromise: Promise<any>;
  accountId: number;
}) {
  const account = use(accountPromise);

  if (!account) {
    return (
      <div className="alert alert-warning">
        <span>Account not found</span>
      </div>
    );
  }

  const handleUpdateAction = async (data: TAccountCreate) => {
    return accountUpdateAction({ ...data, id: accountId });
  };

  const handleUpdateSuccess = async () => {
    window.location.href = "/dashboard/accounts";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Account</h1>
        <p className="text-sm text-base-content/60 mt-1">
          Update account details for {account.accountLabel}
        </p>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <AccountForm
            onSuccess={handleUpdateSuccess}
            action={handleUpdateAction}
            initialData={account}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
}
