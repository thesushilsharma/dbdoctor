export default async function CPUPerformancePage({
    params,
}: {
    params: Promise<{ connectionId: string }>;
}) {
    const { connectionId } = await params;

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">CPU Performance</h3>
            <p className="text-gray-600">CPU metrics for connection {connectionId} - to be implemented</p>
        </div>
    );
}
