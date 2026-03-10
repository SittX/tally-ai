import {
  getAccountStatistics,
  getAllAccounts,
} from "@/service/account.service";

export default async function DashboardStatisticSection() {
  const accountStatistics = await getAccountStatistics();

  return (
    <div className="stats shadow bg-base-100 p-1 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="stat">
        <div className="stat-title">Active Accounts</div>
        <div className="stat-value">{accountStatistics.activeAccounts}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Inactive Accounts</div>
        <div className="stat-value">{accountStatistics.inactiveAccounts}</div>
      </div>
    </div>
  );
}
