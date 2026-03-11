"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { accountDeleteAction } from "../_actions/account.action";

type AccountDeleteButtonProps = { accountId: number };

export default function AccountDeleteButton({
  accountId,
}: AccountDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await accountDeleteAction(accountId);
      router.push("/dashboard/accounts");
    });
  }

  return (
    <button
      className="btn btn-solid btn-error"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting ..." : "Delete Account"}
    </button>
  );
}
