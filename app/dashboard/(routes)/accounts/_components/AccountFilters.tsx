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
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body space-y-4">
          {/* Search Bar */}
          <div className="form-control">
            <label className="text-sm font-semibold text-base-content mb-2">
              Search Accounts
            </label>
            <div className="input-group">
              <span className="bg-base-200">
                <Search size={18} className="text-base-content/50" />
              </span>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input input-bordered flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn btn-ghost btn-square"
                  aria-label="Clear search"
                  type="button"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Provider Dropdown */}
            <div className="form-control">
              <label className="text-sm font-semibold text-base-content mb-2">
                Filter by Provider
              </label>
              <div className="dropdown dropdown-end w-full">
                <button
                  tabIndex={0}
                  className="btn btn-outline w-full gap-2 justify-between"
                  type="button"
                >
                  <span>
                    {selectedProvider || "All Providers"}
                  </span>
                  <ChevronDown size={18} />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full border border-base-200"
                >
                  <li key="all">
                    <button
                      onClick={() => setSelectedProvider("")}
                      className={selectedProvider === "" ? "active" : ""}
                      type="button"
                    >
                      All Providers
                    </button>
                  </li>
                  {providers.map((provider) => (
                    <li key={provider}>
                      <button
                        onClick={() => setSelectedProvider(provider)}
                        className={
                          selectedProvider === provider ? "active" : ""
                        }
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
            <div className="form-control">
              <label className="text-sm font-semibold text-base-content mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "name" | "provider" | "recent")
                }
                className="select select-bordered w-full"
              >
                <option value="recent">Recently Added</option>
                <option value="name">Account Name</option>
                <option value="provider">Provider</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-base-200">
              <button
                onClick={clearFilters}
                className="btn btn-ghost btn-sm gap-2"
                type="button"
              >
                <X size={16} />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-base-content/60 px-1">
        {filteredAccounts.length > 0 ? (
          <p>
            Showing <span className="font-semibold">{filteredAccounts.length}</span> of{" "}
            <span className="font-semibold">{accounts.length}</span> accounts
          </p>
        ) : (
          <p>No accounts match your filters</p>
        )}
      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body flex flex-col items-center justify-center gap-4 py-12">
            <div className="text-center">
              <p className="text-lg font-semibold text-base-content/70">
                No accounts found
              </p>
              <p className="text-sm text-base-content/50 mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
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
