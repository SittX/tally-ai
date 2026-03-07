import { getAllAccounts } from "@/service/account.service";
import { BadgePlus } from "lucide-react";
import Link from "next/link";

// We are going to set this component as cache component
export default async function AccountListSection() {
  "use cache";
  const accounts = await getAllAccounts();
  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap">
      {accounts.length > 0 &&
        accounts.map((account) => (
          <div key={account.id} className="card bg-base-100 w-full lg:w-lg">
            <div className="card-body space-y-4">
              <div className="flex flex-col md:flex-row gap-2 justify-start items-start md:items-center">
                <h1 className="text-xl font-bold">{account.accountLabel}</h1>
                {account.provider && (
                  <div className="badge badge-soft badge-sm">
                    <p className="text-primary-content/50 font-semibold">
                      {account.provider}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p>{account.email}</p>
                <p>{account.subscriptionTier}</p>
                {account.status && (
                  <div className="badge badge-sm badge-outline badge-success">
                    <p>Active</p>
                  </div>
                )}
              </div>
              <div>
                <p>{account.expiresAt?.toDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      {accounts.length === 0 && (
        <div className="card bg-base-100">
          <div className="card-body flex flex-col items-center">
            <h1 className="text-xl font-semibold text-base-content/50 text-center">
              No Accounts
            </h1>
            <Link href={"/dashboard/accounts/new"}>
              <button className="btn btn-primary btn-sm btn-soft">
                <BadgePlus size={16} />
                New Account
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
