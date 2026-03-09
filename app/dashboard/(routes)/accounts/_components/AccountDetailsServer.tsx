import { getAccountById } from "@/service/account.service";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Mail, Package, Zap } from "lucide-react";
import AccountActivitySection from "./AccountActivitySection";

interface AccountDetailsServerProps {
  params: Promise<{ id: string }>;
}

export default async function AccountDetailsServer({
  params,
}: AccountDetailsServerProps) {
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

  const statusColor =
    account.status === "active" ? "badge-success" : "badge-warning";

  const formattedCreatedDate = new Date(account.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Link
            href="/dashboard/accounts"
            className="inline-flex items-center gap-2 text-sm btn btn-ghost btn-sm mb-2"
          >
            <ArrowLeft size={16} />
            Back to Accounts
          </Link>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{account.accountLabel}</h1>
              <p className="text-sm text-base-content/60 mt-1">
                {account.provider} account
              </p>
            </div>
            <div className={`badge ${statusColor} badge-lg`}>
              {account.status}
            </div>
          </div>
        </div>
        <Link
          href={`/dashboard/accounts/${accountId}/edit`}
          className="btn btn-primary btn-sm sm:btn-md"
        >
          <ExternalLink size={18} />
          Edit Account
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information Card */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body space-y-4">
              <h2 className="card-title text-lg">Account Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <p className="text-base font-medium">{account.email}</p>
                </div>

                {/* Provider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                    <Package size={16} />
                    Provider
                  </label>
                  <p className="text-base font-medium">{account.provider}</p>
                </div>

                {/* Subscription Tier */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                    <Zap size={16} />
                    Subscription Tier
                  </label>
                  <p className="text-base font-medium">
                    {account.subscriptionTier || "—"}
                  </p>
                </div>

                {/* Quota Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">
                    Quota Type
                  </label>
                  <p className="text-base font-medium">
                    {account.quotaType || "—"}
                  </p>
                </div>

                {/* Created Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                    <Calendar size={16} />
                    Created
                  </label>
                  <p className="text-base font-medium">{formattedCreatedDate}</p>
                </div>

                {/* Expiration Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">
                    Expires
                  </label>
                  <p className="text-base font-medium">
                    {account.expiresAt
                      ? new Date(account.expiresAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No expiration"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <AccountActivitySection accountId={accountId} />
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-4">
          {/* Status Card */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body space-y-4">
              <h3 className="card-title text-base">Status Overview</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-base-200/30 rounded-lg">
                  <span className="text-sm font-medium">Account Status</span>
                  <span className={`badge ${statusColor}`}>
                    {account.status}
                  </span>
                </div>

                {account.quotaResetAt && (
                  <div className="space-y-1 p-3 bg-base-200/30 rounded-lg">
                    <p className="text-xs font-medium text-base-content/60">
                      Quota Resets
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(account.quotaResetAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                )}

                {account.expiresAt && (
                  <div className="space-y-1 p-3 bg-warning/10 rounded-lg border border-warning/30">
                    <p className="text-xs font-medium text-warning">
                      Expiration Alert
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(account.expiresAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body space-y-2">
              <h3 className="card-title text-base">Quick Actions</h3>
              <Link
                href={`/dashboard/accounts/${accountId}/edit`}
                className="btn btn-outline btn-sm btn-block"
              >
                Edit Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
