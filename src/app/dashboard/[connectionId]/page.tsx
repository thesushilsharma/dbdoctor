export default async function ConnectionDashboardPage({
    params,
}: {
    params: Promise<{ connectionId: string }>;
}) {
    const { connectionId } = await params;

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Dashboard for {connectionId}</h3>
            <p className="text-gray-600">Main dashboard view - to be implemented</p>
        </div>
    );
}
