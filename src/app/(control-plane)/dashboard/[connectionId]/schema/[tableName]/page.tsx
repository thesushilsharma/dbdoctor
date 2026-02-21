export default async function TableSchemaPage({
  params,
}: {
  params: Promise<{ connectionId: string; tableName: string }>;
}) {
  const { connectionId, tableName } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Table: {tableName}</h3>
      <p className="text-gray-600">
        Schema details for table {tableName} on connection {connectionId} - to be implemented
      </p>
    </div>
  );
}
