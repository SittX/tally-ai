import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ActivityList from "./_components/ActivityList";

export const metadata = {
  title: "Activity",
  description: "View all account activities and logs",
};

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm btn btn-ghost btn-sm"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <p className="text-sm text-base-content/60 mt-1">
            View all activities across your accounts
          </p>
        </div>
      </div>

      {/* Activity List */}
      <ActivityList />
    </div>
  );
}
