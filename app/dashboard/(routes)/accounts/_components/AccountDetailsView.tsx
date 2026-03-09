import { getAccountById } from "@/service/account.service";

export default async function AccountDetailsAsyncView({
  props,
}: {
  props: Promise<{ id: string }>;
}) {
  const { id } = await props;
  const account = await getAccountById(Number(id));

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title"></div>
      </div>
    </div>
  );
}
