"use client";
import { Mail } from "lucide-react";
import accountCreateAction from "@/app/dashboard/(routes)/accounts/_actions/account.action";
import { useForm } from "react-hook-form";
import { AccountCreateSchema } from "@/database/schema/accounts";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AccountCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AccountCreateSchema),
  });

  console.log(errors);
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(accountCreateAction)}>
        <div className="card w-90 md:w-3xl max-w-3xl border bg-base-100">
          <div className="card-body space-y-4">
            <div className="card-title">
              <h1 className="text-xl font-semibold">Create new Account</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base-content/50">
                  Account Label
                </legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Cursor personal account, etc..."
                  {...register("accountLabel")}
                />
                {errors.accountLabel && (
                  <p className="label text-error">
                    {errors.accountLabel.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base-content/50">
                  Email
                </legend>
                <label className="input">
                  <Mail size={20} />
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    {...register("email")}
                  />
                </label>

                {errors.email && (
                  <p className="label text-error">{errors.email.message}</p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base-content/50">
                  Provider
                </legend>
                <select className="select" {...register("provider")}>
                  <option disabled={true}>Pick a service Provider</option>
                  <option>OpenAI</option>
                  <option>Gemini</option>
                  <option>Cursor</option>
                </select>
                {errors.provider && (
                  <p className="label text-error">{errors.provider.message}</p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base-content/50">
                  Subscription Tier
                </legend>
                <select className="select" {...register("subscriptionTier")}>
                  <option disabled={true}>Pick a subscription tier</option>
                  <option>Free</option>
                  <option>Pro</option>
                  <option>Business</option>
                </select>
                {errors.subscriptionTier && (
                  <p className="label text-error">
                    {errors.subscriptionTier.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base-content/50">
                  Quota Type
                </legend>
                <select {...register("quotaType")} className="select">
                  <option disabled={true}>Pick a quota type</option>
                  <option>Daily</option>
                  <option>Monthly</option>
                  <option>Token-based</option>
                </select>
                {errors.quotaType && (
                  <p className="label text-error">{errors.quotaType.message}</p>
                )}
              </fieldset>
            </div>

            <div className="flex justify-end gap-4">
              <button className="btn btn-soft btn-error">Cancel</button>
              <button
                className="btn btn-solid btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
