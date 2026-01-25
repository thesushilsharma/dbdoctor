export default function ConnectionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <header className="border-b bg-white p-4">
                <h1 className="text-2xl font-bold">Database Connections</h1>
            </header>
            <main className="container mx-auto p-6">{children}</main>
        </div>
    );
}
