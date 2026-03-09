"use client";

import { Clock, LogIn, Edit3, Plus } from "lucide-react";
import { Activity, getMockActivityData } from "../_lib/activity.utils";
import { useEffect, useState } from "react";

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
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setActivities(getMockActivityData());
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-base-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body space-y-4">
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
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
