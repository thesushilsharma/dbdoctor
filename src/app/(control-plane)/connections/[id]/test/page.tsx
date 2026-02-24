import Link from "next/link";
import { notFound } from "next/navigation";
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

  if (!connection) {
    notFound();
  }

  const recentTestRows = await db
    .select({
      status: connectionTests.status,
      latencyMs: connectionTests.latencyMs,
      createdAt: connectionTests.createdAt,
    })
    .from(connectionTests)
    .where(eq(connectionTests.connectionId, id))
    .orderBy(desc(connectionTests.createdAt))
    .limit(5);

  const lastTest = recentTestRows[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Test connection {connection.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Run a basic connectivity and latency check against this database.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant={
              connection.status === "healthy" ? "secondary" : "destructive"
            }
            className="text-[10px] uppercase"
          >
            {connection.status === "healthy" ? "Healthy" : "Degraded"}
          </Badge>
          <Link
            href={`/connections/${id}`}
            className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/40"
          >
            Back to details
          </Link>
        </div>
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
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {lastTest ? (
            <div className="space-y-2">
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
                  ? lastTest.createdAt.toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          ) : (
            <p>No tests have been run for this connection yet.</p>
          )}

          {recentTestRows.length > 1 && (
            <div className="mt-3 space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Recent tests
              </p>
              <ul className="space-y-1.5 text-xs">
                {recentTestRows.map((test) => (
                  <li
                    key={`${test.createdAt?.getTime() ?? "unknown"}-${test.status}-${test.latencyMs}`}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {test.status === "healthy" ? "Healthy" : "Degraded"} •{" "}
                      {test.latencyMs} ms
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {test.createdAt
                        ? test.createdAt.toLocaleString()
                        : "Unknown"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
