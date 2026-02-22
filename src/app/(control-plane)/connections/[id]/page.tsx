import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Connection {id}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            High-level details and actions for this database connection.
          </p>
        </div>
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
            <p className="mt-1 text-sm text-emerald-500">Healthy</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Engine
            </p>
            <p className="mt-1 text-sm">PostgreSQL</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Region
            </p>
            <p className="mt-1 text-sm">auto</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Last check
            </p>
            <p className="mt-1 text-sm">a few minutes ago</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
