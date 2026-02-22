import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function TestConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Test connection {id}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Run a basic connectivity and latency check against this database.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold tracking-tight">
            Last test
          </CardTitle>
          <Button size="sm" className="h-7 px-3 text-xs">
            Run test
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Status: <span className="font-medium text-emerald-500">Healthy</span></p>
          <p>Round-trip latency: 38 ms</p>
          <p>Last run: a few seconds ago</p>
        </CardContent>
      </Card>
    </div>
  );
}
