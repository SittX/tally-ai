"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface AccountCardProps {
  id: number;
  accountLabel: string;
  email: string;
  provider?: string;
  subscriptionTier?: string;
  status?: boolean;
}

export default function AccountCard({
  id,
  accountLabel,
  email,
  provider,
  subscriptionTier,
  status,
}: AccountCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/accounts/${id}`);
  };

  return (
    <div
      className="card bg-base-100 w-full lg:w-md cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div className="card-body space-y-4">
        <div className="flex flex-col md:flex-row gap-2 justify-start items-start md:items-center">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-bold">{accountLabel}</h1>
            <Link
              href={`/dashboard/accounts/${id}/edit`}
              className="btn btn-soft btn-sm"
              onClick={(e) => e.stopPropagation()}
            >
              Edit
            </Link>
          </div>
          {provider && (
            <div className="badge badge-soft badge-sm">
              <p className="text-primary-content/50 font-semibold">
                {provider}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p>{email}</p>
          <p>{subscriptionTier}</p>
          {status && (
            <div className="badge badge-sm badge-outline badge-success">
              <p>Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
