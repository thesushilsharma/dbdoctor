export default async function IndexRecommendationsPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Index Recommendations</h3>
      <p className="text-gray-600">
        Index recommendations for connection {connectionId} - to be implemented
      </p>
    </div>
  );
}
