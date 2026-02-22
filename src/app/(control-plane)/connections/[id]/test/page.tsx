import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getConnectionById, testConnectionAction } from "@/lib/actions/connections.actions";

export default async function TestConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const connection = await getConnectionById(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Test connection {connection?.name ?? id}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Run a basic connectivity and latency check against this database.
          </p>
        </div>
        {connection && (
          <Badge
            variant={
              connection.status === "healthy" ? "secondary" : "destructive"
            }
            className="text-[10px] uppercase"
          >
            {connection.status === "healthy" ? "Healthy" : "Degraded"}
          </Badge>
        )}
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold tracking-tight">
            Last test
          </CardTitle>
          <form action={testConnectionAction}>
            <input type="hidden" name="connectionId" value={id} />
            <Button size="sm" className="h-7 px-3 text-xs">
              Run test
            </Button>
          </form>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Status:{" "}
            <span className="font-medium text-emerald-500">Healthy</span>
          </p>
          <p>Round-trip latency: 38 ms</p>
          <p>Last run: a few seconds ago</p>
        </CardContent>
      </Card>
    </div>
  );
}
