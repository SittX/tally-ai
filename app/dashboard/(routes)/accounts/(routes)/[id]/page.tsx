type props = {
  params: Promise<{ id: string }>;
};
export default async function AccountDetailsPage({ params }: props) {
  const { id } = await params;
  return <div>Account with ID: {id}</div>;
}
