import AccountListSection from "./_components/AccountListSection";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex space-y-4">
        <h1 className="font-semibold text-xl">All Accounts</h1>
      </div>
      <AccountListSection />
    </div>
  );
}
