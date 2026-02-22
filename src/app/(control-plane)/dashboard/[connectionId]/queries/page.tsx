import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockQueries = [
  {
    id: "q1",
    label: "Top slow queries",
    avgLatency: "820 ms",
    callsPerMin: "34",
  },
  {
    id: "q2",
    label: "Most frequent queries",
    avgLatency: "43 ms",
    callsPerMin: "1.2k",
  },
  {
    id: "q3",
    label: "Highest total time",
    avgLatency: "610 ms",
    callsPerMin: "12",
  },
];

export default async function QueriesPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Queries</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Aggregated query insights for connection {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Query groups
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockQueries.map((query) => (
            <Link
              key={query.id}
              href={`/dashboard/${connectionId}/queries/${query.id}`}
              className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm transition-colors hover:bg-muted/40"
            >
              <div>
                <p className="font-medium text-foreground">{query.label}</p>
                <p className="text-xs text-muted-foreground">
                  {query.avgLatency} avg latency · {query.callsPerMin} calls/min
                </p>
              </div>
              <span className="text-xs font-medium text-primary">
                View details
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
