import Link from "next/link";

export default async function ConnectionDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  const navItems = [
    { href: `/dashboard/${connectionId}`, label: "Overview" },
    { href: `/dashboard/${connectionId}/queries`, label: "Queries" },
    { href: `/dashboard/${connectionId}/indexes`, label: "Indexes" },
    { href: `/dashboard/${connectionId}/performance`, label: "Performance" },
    { href: `/dashboard/${connectionId}/schema`, label: "Schema" },
    { href: `/dashboard/${connectionId}/recommendations`, label: "Recommendations" },
    { href: `/dashboard/${connectionId}/reports`, label: "Reports" },
  ];

  return (
    <div>
      <div className="mb-6 border-b">
        <h2 className="mb-4 text-xl font-semibold">Connection: {connectionId}</h2>
        <nav className="flex gap-4 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded px-3 py-2 text-sm hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
