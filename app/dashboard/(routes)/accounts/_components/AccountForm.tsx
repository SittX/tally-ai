"use client";

import { Mail, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { AccountCreateSchema, TAccountCreate, TAccount } from "@/database/schema/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface AccountFormProps {
  onSuccess: () => void;
  action: (data: TAccountCreate) => Promise<void>;
  initialData?: TAccount;
  isEditing: boolean;
}

const PROVIDERS = ["OpenAI", "Gemini", "Cursor", "Claude"];
const SUBSCRIPTION_TIERS = ["Free", "Pro", "Business", "Enterprise"];
const QUOTA_TYPES = ["Daily", "Monthly", "Token-based"];

export default function AccountForm({
  onSuccess,
  action,
  initialData,
  isEditing,
}: AccountFormProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAccountCreate>({
    resolver: zodResolver(AccountCreateSchema),
    defaultValues: initialData ? {
      accountLabel: initialData.accountLabel,
      email: initialData.email,
      provider: initialData.provider,
      subscriptionTier: initialData.subscriptionTier || undefined,
      quotaType: initialData.quotaType || undefined,
    } : undefined,
  });

  const onSubmit = async (data: TAccountCreate) => {
    try {
      setError(null);
      await action(data);
      onSuccess();
    } catch (err) {
      setError("Failed to save account. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Label */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Account Label</span>
          </label>
          <input
            type="text"
            placeholder="e.g., My OpenAI Account"
            className={`input input-bordered ${
              errors.accountLabel ? "input-error" : ""
            }`}
            {...register("accountLabel")}
          />
          {errors.accountLabel && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.accountLabel.message}
              </span>
            </label>
          )}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <label className={`input input-bordered flex items-center gap-2 ${
            errors.email ? "input-error" : ""
          }`}>
            <Mail size={18} className="opacity-60" />
            <input
              type="email"
              placeholder="your@email.com"
              className="grow bg-transparent"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            </label>
          )}
        </div>

        {/* Provider */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Provider</span>
          </label>
          <select
            className={`select select-bordered ${
              errors.provider ? "select-error" : ""
            }`}
            {...register("provider")}
          >
            <option disabled value="">Select a provider</option>
            {PROVIDERS.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
          {errors.provider && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.provider.message}
              </span>
            </label>
          )}
        </div>

        {/* Subscription Tier */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Subscription Tier</span>
            <span className="label-text-alt text-base-content/50">Optional</span>
          </label>
          <select
            className={`select select-bordered ${
              errors.subscriptionTier ? "select-error" : ""
            }`}
            {...register("subscriptionTier")}
          >
            <option value="">Select tier (optional)</option>
            {SUBSCRIPTION_TIERS.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
          {errors.subscriptionTier && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.subscriptionTier.message}
              </span>
            </label>
          )}
        </div>

        {/* Quota Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Quota Type</span>
            <span className="label-text-alt text-base-content/50">Optional</span>
          </label>
          <select
            className={`select select-bordered ${
              errors.quotaType ? "select-error" : ""
            }`}
            {...register("quotaType")}
          >
            <option value="">Select quota type (optional)</option>
            {QUOTA_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.quotaType && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.quotaType.message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Account" : "Create Account"}</>
          )}
        </button>
      </div>
    </form>
  );
}
