import { Suspense } from "react";
import AccountDetailsView from "../../_components/AccountDetailsView";

type props = {
  params: Promise<{ id: string }>;
};

export default async function AccountDetailsPage({ params }: props) {
  return (
    <Suspense fallback={<div>Getting ID</div>}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold">View Account Details</h1>
        </div>
        <AccountDetailsView props={params} />
      </div>
    </Suspense>
  );
}
