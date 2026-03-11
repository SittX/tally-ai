import { Suspense } from "react";
import AccountDetailsServer from "../_components/AccountDetailsServer";

type Props = {
  params: Promise<{ id: string }>;
};

function LoadingFallback() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-base-300 rounded animate-pulse" />
        <div className="h-4 w-80 bg-base-300/50 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-base-300 rounded animate-pulse" />
                  <div className="h-6 w-full bg-base-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 bg-base-300 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function AccountDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AccountDetailsServer params={params} />
    </Suspense>
  );
}
