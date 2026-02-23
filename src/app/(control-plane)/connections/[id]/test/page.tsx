import { desc, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db/drizzle";
import { connectionTests } from "@/schema";
import { getConnectionById, testConnectionAction } from "@/lib/actions/connections.actions";

export default async function TestConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const connection = await getConnectionById(id);

  const lastTestRows = await db
    .select({
      status: connectionTests.status,
      latencyMs: connectionTests.latencyMs,
      createdAt: connectionTests.createdAt,
    })
    .from(connectionTests)
    .where(eq(connectionTests.connectionId, id))
    .orderBy(desc(connectionTests.createdAt))
    .limit(1);

  const lastTest = lastTestRows[0];

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
          {lastTest ? (
            <>
              <p>
                Status:{" "}
                <span
                  className={
                    lastTest.status === "healthy"
                      ? "font-medium text-emerald-500"
                      : "font-medium text-red-500"
                  }
                >
                  {lastTest.status === "healthy" ? "Healthy" : "Degraded"}
                </span>
              </p>
              <p>Round-trip latency: {lastTest.latencyMs} ms</p>
              <p>
                Last run:{" "}
                {lastTest.createdAt
                  ? lastTest.createdAt.toISOString()
                  : "Unknown"}
              </p>
            </>
          ) : (
            <p>No tests have been run for this connection yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
