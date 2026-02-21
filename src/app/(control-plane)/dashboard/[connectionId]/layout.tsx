import Link from "next/link";
import type { ReactNode } from "react";

export default async function ConnectionDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
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
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/70 bg-card/70 px-5 py-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Connection Dashboard
            </p>
            <h2 className="text-2xl font-black tracking-tight">
              {connectionId}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-500 ring-1 ring-emerald-500/30">
              Live monitoring
            </span>
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground ring-1 ring-border/60">
              Primary region: auto
            </span>
          </div>
        </div>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
