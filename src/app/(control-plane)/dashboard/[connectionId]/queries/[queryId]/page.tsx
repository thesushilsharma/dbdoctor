export default async function QueryDetailPage({
  params,
}: {
  params: Promise<{ connectionId: string; queryId: string }>;
}) {
  const { connectionId, queryId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Query: {queryId}</h3>
      <p className="text-gray-600">
        Query details for {queryId} on connection {connectionId} - to be implemented
      </p>
    </div>
  );
}
