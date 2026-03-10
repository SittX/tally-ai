"use client";

import { useState, useMemo } from "react";
import { TAccount } from "@/database/schema/accounts";
import AccountCard from "@/app/dashboard/_components/AccountCard";
import { Search, X } from "lucide-react";

interface AccountFiltersProps {
  providers: string[];
  accounts: TAccount[];
}

export default function AccountFilters({
  providers,
  accounts,
}: AccountFiltersProps) {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "provider" | "recent">("name");

  // Filter and sort accounts
  const filteredAccounts = useMemo(() => {
    let filtered = accounts;

    // Apply provider filter
    if (selectedProviders.length > 0) {
      filtered = filtered.filter((acc) =>
        selectedProviders.includes(acc.provider)
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (acc) =>
          acc.accountLabel.toLowerCase().includes(query) ||
          acc.email.toLowerCase().includes(query) ||
          acc.provider.toLowerCase().includes(query)
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
  }, [accounts, selectedProviders, searchQuery, sortBy]);

  const toggleProvider = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  };

  const clearFilters = () => {
    setSelectedProviders([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedProviders.length > 0 || searchQuery.trim() !== "";

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search by account name, email, or provider..."
              className="input input-bordered flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="btn btn-ghost btn-square"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Provider Filter */}
          <div className="flex-1">
            <label className="text-sm font-medium text-base-content/70 mb-2 block">
              Providers
            </label>
            <div className="flex flex-wrap gap-2">
              {providers.map((provider) => (
                <button
                  key={provider}
                  onClick={() => toggleProvider(provider)}
                  className={`badge badge-lg gap-2 cursor-pointer transition-all ${
                    selectedProviders.includes(provider)
                      ? "badge-primary"
                      : "badge-outline"
                  }`}
                >
                  {provider}
                  {selectedProviders.includes(provider) && (
                    <X size={14} strokeWidth={3} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex-1">
            <label className="text-sm font-medium text-base-content/70 mb-2 block">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "provider" | "recent")
              }
              className="select select-bordered w-full"
            >
              <option value="name">Account Name</option>
              <option value="provider">Provider</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex justify-start">
            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm gap-2"
            >
              <X size={16} />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-base-content/60">
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
