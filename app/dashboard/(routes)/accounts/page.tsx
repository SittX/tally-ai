import Link from "next/link";
import { getAllAccounts } from "@/service/account.service";
import AccountCard from "@/app/dashboard/_components/AccountCard";
import { Plus } from "lucide-react";
import AccountFilters from "./_components/AccountFilters";

export const metadata = {
  title: "Accounts - Dashboard",
  description: "Manage your AI provider accounts",
};

export default async function AccountsPage() {
  const accounts = await getAllAccounts();

  // Extract unique providers for filter options
  const providers = Array.from(
    new Set(accounts.map((acc) => acc.provider).filter(Boolean)),
  ).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-sm text-base-content/60 mt-1">
            Manage your AI provider accounts in one place
          </p>
        </div>
        <Link href="/dashboard/accounts/new" className="btn btn-primary gap-2">
          <Plus size={18} />
          New Account
        </Link>
      </div>

      {/* Filters and Content */}
      {accounts.length > 0 ? (
        <>
          <AccountFilters providers={providers} accounts={accounts} />
        </>
      ) : (
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body flex flex-col items-center justify-center gap-4 py-12">
            <div className="text-center">
              <p className="text-lg font-semibold text-base-content/70">
                No accounts yet
              </p>
              <p className="text-sm text-base-content/50 mt-1">
                Create your first account to get started
              </p>
            </div>
            <Link
              href="/dashboard/accounts/new"
              className="btn btn-primary btn-sm gap-2"
            >
              <Plus size={16} />
              Create Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
