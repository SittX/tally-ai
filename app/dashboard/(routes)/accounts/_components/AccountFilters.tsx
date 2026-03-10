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
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "provider" | "recent">("recent");

  // Filter and sort accounts
  const filteredAccounts = useMemo(() => {
    let filtered = accounts;

    // Apply provider filter
    if (selectedProvider) {
      filtered = filtered.filter((acc) => acc.provider === selectedProvider);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (acc) =>
          acc.accountLabel.toLowerCase().includes(query) ||
          acc.email.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.accountLabel.localeCompare(b.accountLabel));
    } else if (sortBy === "provider") {
      sorted.sort((a, b) => a.provider.localeCompare(b.provider));
    } else if (sortBy === "recent") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return sorted;
  }, [accounts, selectedProvider, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedProvider("");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedProvider !== "" || searchQuery.trim() !== "";

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <div className="bg-base-100 border border-base-200 rounded-lg p-4">
        <div className="space-y-3">
          {/* Search and Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Bar */}
            <div className="sm:col-span-1">
              <div className="input-group input-group-sm">
                <span className="bg-base-200">
                  <Search size={16} className="text-base-content/50" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered input-sm flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="btn btn-ghost btn-xs"
                    aria-label="Clear search"
                    type="button"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Provider Dropdown */}
            <div className="sm:col-span-1">
              <div className="dropdown dropdown-end w-full">
                <button
                  tabIndex={0}
                  className="btn btn-outline btn-sm w-full gap-2 justify-between"
                  type="button"
                >
                  <span className="truncate">
                    {selectedProvider || "All Providers"}
                  </span>
                  <ChevronDown size={16} className="flex-shrink-0" />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu menu-compact p-2 shadow bg-base-100 rounded-box w-full border border-base-200"
                >
                  <li key="all">
                    <button
                      onClick={() => setSelectedProvider("")}
                      className={`text-sm ${selectedProvider === "" ? "active" : ""}`}
                      type="button"
                    >
                      All Providers
                    </button>
                  </li>
                  {providers.map((provider) => (
                    <li key={provider}>
                      <button
                        onClick={() => setSelectedProvider(provider)}
                        className={`text-sm ${
                          selectedProvider === provider ? "active" : ""
                        }`}
                        type="button"
                      >
                        {provider}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-1">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "name" | "provider" | "recent")
                }
                className="select select-bordered select-sm w-full"
              >
                <option value="recent">Recent</option>
                <option value="name">By Name</option>
                <option value="provider">By Provider</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-start pt-1">
              <button
                onClick={clearFilters}
                className="btn btn-ghost btn-xs gap-1"
                type="button"
              >
                <X size={14} />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-base-content/60">
        {filteredAccounts.length > 0 ? (
          <p>
            <span className="font-semibold">{filteredAccounts.length}</span> of{" "}
            <span className="font-semibold">{accounts.length}</span> accounts
          </p>
        ) : (
          <p>No accounts match filters</p>
        )}
      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length > 0 ? (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              id={account.id}
              accountLabel={account.accountLabel}
              email={account.email}
              provider={account.provider}
              subscriptionTier={account.subscriptionTier}
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
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-outline btn-sm gap-2"
                type="button"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
