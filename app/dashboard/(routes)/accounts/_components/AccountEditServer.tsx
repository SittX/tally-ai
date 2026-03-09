import { getAccountById } from "@/service/account.service";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AccountEditClient from "./AccountEditClient";

interface AccountEditServerProps {
  params: Promise<{ id: string }>;
}

export default async function AccountEditServer({
  params,
}: AccountEditServerProps) {
  const { id } = await params;
  const accountId = Number(id);
  const account = await getAccountById(accountId);

  if (!account) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/accounts"
          className="inline-flex items-center gap-2 text-sm btn btn-ghost btn-sm"
        >
          <ArrowLeft size={16} />
          Back to Accounts
        </Link>
        <div className="alert alert-warning">
          <span>Account not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="space-y-4">
        <Link
          href={`/dashboard/accounts/${accountId}`}
          className="inline-flex items-center gap-2 text-sm btn btn-ghost btn-sm"
        >
          <ArrowLeft size={16} />
          Back to Account Details
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Account</h1>
          <p className="text-sm text-base-content/60 mt-2">
            Update details for <span className="font-medium">{account.accountLabel}</span>
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <AccountEditClient accountId={accountId} initialData={account} />
        </div>
      </div>
    </div>
  );
}
