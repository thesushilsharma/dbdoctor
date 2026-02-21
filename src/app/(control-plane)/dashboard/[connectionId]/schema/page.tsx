export default async function SchemaPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Database Schema</h3>
      <p className="text-gray-600">
        Schema overview for connection {connectionId} - to be implemented
      </p>
    </div>
  );
}
