export default async function RecommendationsPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Recommendations</h3>
      <p className="text-gray-600">
        All recommendations for connection {connectionId} - to be implemented
      </p>
    </div>
  );
}
