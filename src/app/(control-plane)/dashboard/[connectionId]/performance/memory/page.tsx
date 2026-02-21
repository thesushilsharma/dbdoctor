export default async function MemoryPerformancePage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Memory Performance</h3>
      <p className="text-gray-600">Memory metrics for connection {connectionId} - to be implemented</p>
    </div>
  );
}
