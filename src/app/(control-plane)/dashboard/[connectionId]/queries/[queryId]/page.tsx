import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function QueryDetailPage({
  params,
}: {
  params: Promise<{ connectionId: string; queryId: string }>;
}) {
  const { connectionId, queryId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          Query {queryId}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Representative statement and metrics for this query group on
          connection {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Example statement
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <pre className="overflow-x-auto rounded-lg bg-muted/60 p-3 font-mono text-[11px] leading-relaxed">
SELECT *
FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC
LIMIT 50;
          </pre>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Average latency
            </p>
            <p className="mt-1 text-sm text-foreground">820 ms</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Calls / minute
            </p>
            <p className="mt-1 text-sm text-foreground">34</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Error rate
            </p>
            <p className="mt-1 text-sm text-foreground">0.1%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
