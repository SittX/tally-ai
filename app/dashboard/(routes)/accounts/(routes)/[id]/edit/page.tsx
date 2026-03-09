import { Suspense } from "react";
import AccountEditServer from "../../../_components/AccountEditServer";

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
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-base-300 rounded animate-pulse" />
                <div className="h-10 w-full bg-base-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-base-200">
            <div className="h-10 w-20 bg-base-300 rounded animate-pulse" />
            <div className="h-10 w-32 bg-base-300 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function AccountEditPage({ params }: Props) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AccountEditServer params={params} />
    </Suspense>
  );
}
