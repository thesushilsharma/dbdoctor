import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockMetrics = [
  { label: "Average read latency", value: "4.3 ms" },
  { label: "Average write latency", value: "6.8 ms" },
  { label: "Throughput", value: "82 MB/s" },
];

export default async function IOPerformancePage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          I/O performance
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Disk latency and throughput for connection {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Key metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {mockMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {metric.value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
