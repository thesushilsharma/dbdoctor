export default async function ReportsPage({
    params,
}: {
    params: Promise<{ connectionId: string }>;
}) {
    const { connectionId } = await params;

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Reports</h3>
            <p className="text-gray-600">Report list for connection {connectionId} - to be implemented</p>
        </div>
    );
}
