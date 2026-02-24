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
              Latency over time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {data.latencyTimeline.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/70 bg-muted/40 p-4 text-xs">
                No latency telemetry yet. Run a baseline check to see latency over time.
              </div>
            ) : (
              <>
                <p className="text-xs">
                  Average round-trip latency per minute for recent checks.
                </p>
                <div className="mt-1 flex h-32 items-end gap-1">
                  {(() => {
                    const maxAvg =
                      data.latencyTimeline.reduce(
                        (max, bucket) =>
                          bucket.avgLatency > max ? bucket.avgLatency : max,
                        0,
                      ) || 0;

                    return data.latencyTimeline.map((bucket) => {
                      const ratio =
                        maxAvg > 0 ? bucket.avgLatency / maxAvg : 0;
                      const height = `${Math.max(
                        4,
                        Math.round(ratio * 100),
                      )}%`;

                      return (
                        <div
                          key={bucket.bucketStart.toISOString()}
                          className="flex flex-1 flex-col items-center gap-1"
                        >
                          <div
                            className="w-full rounded-t-md bg-primary/70"
                            style={{ height }}
                          />
                          <span className="hidden text-[10px] text-muted-foreground md:block">
                            {bucket.bucketStart.toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Latency distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {data.latencyHistogram.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/70 bg-muted/40 p-4 text-xs">
                No latency telemetry yet. Histogram will appear once checks have been recorded.
              </div>
            ) : (
              <>
                <p className="text-xs">
                  Distribution of observed latency across recent checks.
                </p>
                <div className="mt-1 flex h-32 items-end gap-1">
                  {(() => {
                    const maxCount =
                      data.latencyHistogram.reduce(
                        (max, bin) =>
                          bin.count > max ? bin.count : max,
                        0,
                      ) || 0;

                    return data.latencyHistogram.map((bin, index) => {
                      const ratio =
                        maxCount > 0 ? bin.count / maxCount : 0;
                      const height = `${Math.max(
                        4,
                        Math.round(ratio * 100),
                      )}%`;

                      return (
                        <div
                          key={`${bin.start}-${bin.end}-${index}`}
                          className="flex flex-1 flex-col items-center gap-1"
                        >
                          <div
                            className="w-full rounded-t-md bg-chart-2/70"
                            style={{ height }}
                          />
                          <span className="hidden text-[10px] text-muted-foreground md:block">
                            {Math.round(bin.start)}–{Math.round(bin.end)} ms
                          </span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
