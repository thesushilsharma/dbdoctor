import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getConnectionById } from "@/lib/actions/connections.actions";

export default async function ConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const connection = await getConnectionById(id);

  if (!connection) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {connection.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            High-level details and actions for this database connection.
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
          <div className="flex gap-2">
            <Link
              href={`/connections/${id}/test`}
              className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/40"
            >
              Test connection
            </Link>
            <Link
              href={`/connections/${id}/edit`}
              className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Edit connection
            </Link>
          </div>
        </div>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Connection metadata
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Status
            </p>
            <p className="mt-1 text-sm">
              <span
                className={
                  connection.status === "healthy"
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {connection.status === "healthy" ? "Healthy" : "Degraded"}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Engine
            </p>
            <p className="mt-1 text-sm">{connection.engine}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Region
            </p>
            <p className="mt-1 text-sm">{connection.region}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Last check
            </p>
            <p className="mt-1 text-sm">{connection.lastCheck}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
