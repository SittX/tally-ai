export default async function AccountDetailsView({
  props,
}: {
  props: Promise<{ id: string }>;
}) {
  const { id } = await props;
  return <div>Acocunt Id : {id}</div>;
}
