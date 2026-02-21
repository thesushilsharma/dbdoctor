export default async function TestConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Test Connection: {id}</h2>
      <p className="text-gray-600">Connection test results - to be implemented</p>
    </div>
  );
}
