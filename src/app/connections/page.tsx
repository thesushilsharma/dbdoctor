import Link from 'next/link';

export default function ConnectionsPage() {
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">All Connections</h2>
                <Link
                    href="/connections/new"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    New Connection
                </Link>
            </div>
            <p className="text-gray-600">Connection list - to be implemented</p>
        </div>
    );
}
