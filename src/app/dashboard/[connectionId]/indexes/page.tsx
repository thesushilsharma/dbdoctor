import Link from 'next/link';

export default async function IndexesPage({
    params,
}: {
    params: Promise<{ connectionId: string }>;
}) {
    const { connectionId } = await params;

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Indexes</h3>
                <Link
                    href={`/dashboard/${connectionId}/indexes/recommendations`}
                    className="text-sm text-blue-500 hover:underline"
                >
                    View Recommendations
                </Link>
            </div>
            <p className="text-gray-600">Index list - to be implemented</p>
        </div>
    );
}
