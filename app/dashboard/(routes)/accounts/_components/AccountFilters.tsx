"use client";

import { useState, useMemo } from "react";
import { TAccount } from "@/database/schema/accounts";
import AccountCard from "@/app/dashboard/_components/AccountCard";
import { Search, X, ChevronDown } from "lucide-react";

interface AccountFiltersProps {
  providers: string[];
  accounts: TAccount[];
}

export default function AccountFilters({
  providers,
  accounts,
}: AccountFiltersProps) {
  // ? For filter, use useMemo hook for memorization (I dont know how it works tho)
  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <h1 className="text-2xl">Filter will be here</h1>

      {/* Results Count */}
      <div className="text-xs text-base-content/60">
        {accounts.length > 0 ? (
          <p>
            <span className="font-semibold">{accounts.length}</span> of{" "}
            <span className="font-semibold">{accounts.length}</span> accounts
          </p>
        ) : (
          <p>No accounts match filters</p>
        )}
      </div>

      {/* Accounts Grid */}
      <div className="space-y-6">
        {accounts.length > 0 ? (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account: TAccount) => (
              <AccountCard
                key={account.id}
                id={account.id}
                accountLabel={account.accountLabel}
                email={account.email}
                provider={account.provider}
                subscriptionTier={account.subscriptionTier!}
                status={account.status === "active"}
              />
            ))}
          </div>
        ) : (
          <div className="bg-base-100 border border-base-200 rounded-lg p-8">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <p className="font-semibold text-base-content/70">
                No accounts found
              </p>
              <p className="text-sm text-base-content/50">
                Try adjusting your filters or search
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center">
          <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
          </div>
        </div>
      </div>
    </div>
  );
}
