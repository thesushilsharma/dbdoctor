export default async function IOPerformancePage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">I/O Performance</h3>
      <p className="text-gray-600">I/O metrics for connection {connectionId} - to be implemented</p>
    </div>
  );
}
