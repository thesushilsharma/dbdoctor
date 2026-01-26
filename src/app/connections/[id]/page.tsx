import Link from 'next/link';

export default async function ConnectionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div>
            <h2 className="mb-6 text-xl font-semibold">Connection: {id}</h2>
            <div className="mb-4 flex gap-4">
                <Link
                    href={`/connections/${id}/edit`}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Edit
                </Link>
                <Link
                    href={`/connections/${id}/test`}
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    Test Connection
                </Link>
            </div>
            <p className="text-gray-600">Connection details - to be implemented</p>
        </div>
    );
}
