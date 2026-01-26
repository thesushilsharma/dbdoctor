export default async function EditConnectionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div>
            <h2 className="mb-6 text-xl font-semibold">Edit Connection: {id}</h2>
            <p className="text-gray-600">Edit connection form - to be implemented</p>
        </div>
    );
}
