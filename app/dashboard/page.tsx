import Link from "next/link";
import AccountListSection from "./_components/AccountListSection";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">All Accounts</h1>
        <Link
          href="/dashboard/accounts/new"
          className="btn btn-primary btn-sm"
        >
          Create New Account
        </Link>
      </div>
      <AccountListSection />
    </div>
  );
}
