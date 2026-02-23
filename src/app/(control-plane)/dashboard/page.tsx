import { Activity, Database, Gauge, Sparkles } from "lucide-react";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DbSmokeTest } from "@/components/db-smoke-test";
import { auth } from "@/lib/better-auth/auth";
import { getConnectionsQuery } from "@/db/queries/data.queries";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const connections =
    user == null
      ? []
      : await getConnectionsQuery({
          userId: user.id,
          role: (user.role as string) || "user",
        });

  const totalConnections = connections.length;
  const degradedConnections = connections.filter(
    (connection) => connection.status === "degraded",
  ).length;
  const healthyConnections = totalConnections - degradedConnections;

  const averageHealth =
    totalConnections === 0
      ? "–"
      : String(Math.round((healthyConnections / totalConnections) * 100));

  const overviewCards = [
    {
      label: "Active Connections",
      value: String(totalConnections),
      trend:
        totalConnections === 0
          ? "No connections configured yet"
          : `${healthyConnections} healthy, ${degradedConnections} degraded`,
      icon: Database,
      accent: "from-chart-2/70 to-chart-4/70",
    },
    {
      label: "Average Health Score",
      value: averageHealth,
      trend:
        totalConnections === 0
          ? "Add a connection to start measuring health"
          : "Computed from connection status",
      icon: Gauge,
      accent: "from-emerald-500/70 to-chart-1/70",
    },
    {
      label: "Open Issues",
      value: String(degradedConnections),
      trend:
        degradedConnections === 0
          ? "All connections currently healthy"
          : `${degradedConnections} connection${
              degradedConnections === 1 ? "" : "s"
            } needs attention`,
      icon: Activity,
      accent: "from-destructive/70 to-amber-500/70",
    },
    {
      label: "AI Insights Generated",
      value: "0",
      trend: "Coming soon",
      icon: Sparkles,
      accent: "from-primary/70 to-accent/70",
    },
  ] as const;

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            Dashboard Overview
          </h2>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            High-level view of your database fleet, health, and diagnostics
            activity.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
          Live diagnostics running across all connected databases
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.label}
              className="group relative overflow-hidden border-border/70 bg-card/70 shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-lg"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 -top-10 h-28 bg-linear-to-b ${card.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70`}
              />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {card.label}
                  </p>
                  <CardTitle className="text-2xl font-black tracking-tight">
                    {card.value}
                  </CardTitle>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/80 text-muted-foreground shadow-sm">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative pt-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {card.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Recent Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/40 p-6 text-sm text-muted-foreground">
              Recent diagnostic runs, slow query captures, and index analysis
              will appear here once your databases start sending telemetry.
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border/70 bg-card/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Connect a database to start streaming performance metrics and
                query plans into DBDoctor.
              </p>
              <ul className="space-y-2">
                <li>• Add your first connection from the Connections page</li>
                <li>• Run an initial health check to baseline performance</li>
                <li>• Review AI recommendations for index and query tuning</li>
              </ul>
            </CardContent>
          </Card>

          <DbSmokeTest />
        </div>
      </section>
    </div>
  );
}
