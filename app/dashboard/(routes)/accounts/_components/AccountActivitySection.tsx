import { Clock, LogIn, Edit3, Plus } from "lucide-react";
import Link from "next/link";

interface AccountActivitySectionProps {
  accountId: number;
}

interface Activity {
  id: string;
  type: "login" | "update" | "create" | "sync";
  description: string;
  timestamp: Date;
  details?: string;
}

// Mock activity data - in a real app, this would be fetched from database
const getMockActivityData = (accountId: number): Activity[] => {
  return [
    {
      id: "1",
      type: "sync",
      description: "Quota synchronized",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      details: "Monthly quota reset completed",
    },
    {
      id: "2",
      type: "login",
      description: "Account accessed",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      details: "Last successful connection",
    },
    {
      id: "3",
      type: "update",
      description: "Details updated",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      details: "Subscription tier changed to Pro",
    },
    {
      id: "4",
      type: "create",
      description: "Account created",
      timestamp: new Date("2024-01-15"),
      details: "Initial account setup",
    },
  ];
};

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "login":
      return <LogIn size={16} />;
    case "update":
      return <Edit3 size={16} />;
    case "create":
      return <Plus size={16} />;
    case "sync":
      return <Clock size={16} />;
    default:
      return <Clock size={16} />;
  }
};

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "login":
      return "badge-info";
    case "update":
      return "badge-warning";
    case "create":
      return "badge-success";
    case "sync":
      return "badge-primary";
    default:
      return "badge-ghost";
  }
};

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

export default function AccountActivitySection({
  accountId,
}: AccountActivitySectionProps) {
  const activities = getMockActivityData(accountId);

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body space-y-4">
        <h2 className="card-title text-lg">Activity Log</h2>

        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex gap-4 pb-3 last:pb-0"
              >
                {/* Timeline marker */}
                <div className="flex flex-col items-center">
                  <div
                    className={`badge ${getActivityColor(
                      activity.type
                    )} rounded-full p-2 flex items-center justify-center`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  {index !== activities.length - 1 && (
                    <div className="w-0.5 h-10 bg-base-300 my-2" />
                  )}
                </div>

                {/* Activity content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">
                        {activity.description}
                      </p>
                      {activity.details && (
                        <p className="text-xs text-base-content/60 mt-1">
                          {activity.details}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-base-content/50 whitespace-nowrap">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-base-content/60">
                No activity recorded yet
              </p>
            </div>
          )}
        </div>

        {activities.length > 0 && (
          <div className="pt-3 border-t border-base-200">
            <Link
              href="/dashboard/activity"
              className="btn btn-ghost btn-sm btn-block text-xs"
            >
              View All Activity
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
