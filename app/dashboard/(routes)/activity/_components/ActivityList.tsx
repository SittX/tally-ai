"use client";

import { Clock, LogIn, Edit3, Plus } from "lucide-react";

interface Activity {
  id: string;
  accountName: string;
  type: "login" | "update" | "create" | "sync";
  description: string;
  timestamp: Date;
  details?: string;
}

// Mock activity data for the activity page
const getMockActivityData = (): Activity[] => {
  return [
    {
      id: "1",
      accountName: "OpenAI Account",
      type: "sync",
      description: "Quota synchronized",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      details: "Monthly quota reset completed",
    },
    {
      id: "2",
      accountName: "Gemini Account",
      type: "login",
      description: "Account accessed",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      details: "Successful connection established",
    },
    {
      id: "3",
      accountName: "Cursor Account",
      type: "update",
      description: "Details updated",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      details: "Subscription tier changed to Pro",
    },
    {
      id: "4",
      accountName: "OpenAI Account",
      type: "login",
      description: "Account accessed",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      details: "Last successful login",
    },
    {
      id: "5",
      accountName: "Gemini Account",
      type: "update",
      description: "Settings modified",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      details: "API rate limits adjusted",
    },
    {
      id: "6",
      accountName: "Cursor Account",
      type: "create",
      description: "Account created",
      timestamp: new Date("2024-01-15"),
      details: "Initial account setup completed",
    },
    {
      id: "7",
      accountName: "Gemini Account",
      type: "create",
      description: "Account created",
      timestamp: new Date("2024-01-10"),
      details: "Account registered and verified",
    },
    {
      id: "8",
      accountName: "OpenAI Account",
      type: "create",
      description: "Account created",
      timestamp: new Date("2024-01-05"),
      details: "Initial setup and configuration",
    },
  ];
};

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "login":
      return <LogIn size={18} />;
    case "update":
      return <Edit3 size={18} />;
    case "create":
      return <Plus size={18} />;
    case "sync":
      return <Clock size={18} />;
    default:
      return <Clock size={18} />;
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

export default function ActivityList() {
  const activities = getMockActivityData();

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body space-y-4">
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex gap-4 pb-3 last:pb-0 border-b border-base-200 last:border-b-0"
              >
                {/* Icon */}
                <div className="flex flex-shrink-0">
                  <div
                    className={`badge ${getActivityColor(
                      activity.type
                    )} rounded-full p-2.5 flex items-center justify-center`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                {/* Activity content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.description}</p>
                      <p className="text-xs text-base-content/60 mt-0.5">
                        {activity.accountName}
                      </p>
                      {activity.details && (
                        <p className="text-xs text-base-content/50 mt-1">
                          {activity.details}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-base-content/50 whitespace-nowrap flex-shrink-0">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-base-content/60">
              No activities recorded yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
