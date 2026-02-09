import Link from 'next/link';

export default async function PerformancePage({
    params,
}: {
    params: Promise<{ connectionId: string }>;
}) {
    const { connectionId } = await params;

    const metrics = [
        { name: 'CPU', href: `/dashboard/${connectionId}/performance/cpu` },
        { name: 'Memory', href: `/dashboard/${connectionId}/performance/memory` },
        { name: 'I/O', href: `/dashboard/${connectionId}/performance/io` },
    ];

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Performance Overview</h3>
            <div className="mb-6 flex gap-4">
                {metrics.map((metric) => (
                    <Link
                        key={metric.name}
                        href={metric.href}
                        className="rounded border px-4 py-2 hover:bg-gray-50"
                    >
                        {metric.name}
                    </Link>
                ))}
            </div>
            <p className="text-gray-600">Performance metrics - to be implemented</p>
        </div>
    );
}
