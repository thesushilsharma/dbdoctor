export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ connectionId: string; reportId: string }>;
}) {
  const { connectionId, reportId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Report: {reportId}</h3>
      <p className="text-gray-600">
        Report details for {reportId} on connection {connectionId} - to be implemented
      </p>
    </div>
  );
}
