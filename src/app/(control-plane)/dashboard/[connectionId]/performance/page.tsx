import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metricLinks = [
  { name: "CPU", hrefSuffix: "cpu", description: "Utilization and saturation." },
  {
    name: "Memory",
    hrefSuffix: "memory",
    description: "Working set, cache, and buffers.",
  },
  { name: "I/O", hrefSuffix: "io", description: "Disk latency and throughput." },
];

export default async function PerformancePage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          Performance overview
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Key resource utilization for connection {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Drill into metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {metricLinks.map((metric) => (
            <Link
              key={metric.name}
              href={`/dashboard/${connectionId}/performance/${metric.hrefSuffix}`}
              className="flex flex-col rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm transition-colors hover:bg-muted/40"
            >
              <span className="font-medium text-foreground">
                {metric.name}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {metric.description}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
