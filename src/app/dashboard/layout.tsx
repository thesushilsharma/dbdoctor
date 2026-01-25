export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <header className="border-b bg-white p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>
            <main className="container mx-auto p-6">{children}</main>
        </div>
    );
}
