import { getAllAccounts } from "@/service/account.service";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import AccountCard from "./AccountCard";

// Server component - handles data fetching
export default async function DashboardAccountListSection() {
  "use cache";
  const accounts = await getAllAccounts();

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
      {accounts.length > 0 &&
        accounts.map((account) => (
          <AccountCard
            key={account.id}
            id={account.id}
            accountLabel={account.accountLabel}
            email={account.email}
            provider={account.provider}
            subscriptionTier={account.subscriptionTier ?? undefined}
            status={account.status === "active"}
          />
        ))}
      {accounts.length === 0 && (
        <div className="card bg-base-100">
          <div className="card-body flex flex-col items-center">
            <h1 className="text-xl font-semibold text-base-content/50 text-center">
              No Accounts
            </h1>
            <Link
              href="/dashboard/accounts/new"
              className="btn btn-primary btn-sm btn-soft"
            >
              <BadgePlus size={16} />
              New Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
