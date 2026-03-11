import Link from "next/link";
import DashboardAccountListSection from "./_components/DashboardAccountListSection";
import DashboardStatisticSection from "./_components/DashboardStatisticSection";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Dashboard Overview</h1>
        <p className="text-sm text-base-content/60">
          Welcome back! Here&apos;s a quick overview of your accounts and
          activity.
        </p>
      </div>

      <DashboardStatisticSection />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">Accounts</h2>
          <Link
            href={"/dashboard/accounts"}
            className="hover:cursor-pointer hover:text-primary hover:transition-color"
          >
            View All
          </Link>
        </div>
        <DashboardAccountListSection />
      </section>
    </div>
  );
}
