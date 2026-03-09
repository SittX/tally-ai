import { getAccountById } from "@/service/account.service";
import AccountEditClient from "./AccountEditClient";

interface AccountDetailsAsyncViewProps {
  params: Promise<{ id: string }>;
}

export default async function AccountDetailsAsyncView({
  params,
}: AccountDetailsAsyncViewProps) {
  const { id } = await params;
  const accountId = Number(id);
  const account = await getAccountById(accountId);

  if (!account) {
    return (
      <div className="alert alert-warning">
        <span>Account not found</span>
      </div>
    );
  }

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
          <AccountEditClient accountId={accountId} initialData={account} />
        </div>
      </div>
    </div>
  );
}
