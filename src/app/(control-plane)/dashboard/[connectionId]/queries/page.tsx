export default async function QueriesPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Queries</h3>
      <p className="text-gray-600">
        Query list for connection {connectionId} - to be implemented
      </p>
    </div>
  );
}
