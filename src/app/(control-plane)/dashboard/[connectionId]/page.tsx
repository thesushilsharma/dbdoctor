import { Activity, AlertTriangle, BarChart3, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getConnectionDashboardData } from "@/lib/actions/dbDashboard.actions";

export default async function ConnectionDashboardPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;
  const data = await getConnectionDashboardData(connectionId);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card
              key={metric.label}
              className="group relative overflow-hidden border-border/70 bg-card/70 shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-lg"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 -top-10 h-24 bg-linear-to-b ${metric.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70`}
              />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {metric.label}
                  </p>
                  <CardTitle className="text-2xl font-black tracking-tight">
                    {metric.value}
                  </CardTitle>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-background/80 text-muted-foreground shadow-sm">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative pt-1 text-xs font-medium text-muted-foreground">
                {metric.trend}
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,2fr)]">
        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Recent checks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {data.recentChecks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/70 bg-muted/40 p-4">
                No checks have been run for this connection yet.
              </div>
            ) : (
              <ul className="space-y-2">
                {data.recentChecks.map((check) => (
                  <li
                    key={check.id}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-3 py-2"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                        {check.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {check.summary}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {check.timestamp}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Active issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {data.issues.length === 0 ? (
              <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-muted/40 px-4 py-3">
                <Activity className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium">
                  No active issues detected for this connection.
                </span>
              </div>
            ) : (
              <ul className="space-y-2">
                {data.issues.map((issue) => (
                  <li
                    key={issue.id}
                    className="flex items-start gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold">{issue.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {issue.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Workload profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              This connection is currently classified as a mixed read/write
              workload with bursty traffic. Query analysis and index tuning
              recommendations will adapt to this profile as telemetry is
              collected.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Next steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <ul className="space-y-1.5">
              <li>• Run a baseline performance check for this connection</li>
              <li>• Review slow queries under the Queries tab</li>
              <li>• Apply suggested indexes and re‑run the workload</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
