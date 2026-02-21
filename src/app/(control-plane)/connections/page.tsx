import Link from "next/link";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConnectionsPage() {
  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            Database Connections
          </h2>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            Manage and monitor every database that feeds into your diagnostics
            pipeline.
          </p>
        </div>

        <Button
          asChild
          className="inline-flex items-center gap-2 rounded-full px-5"
        >
          <Link href="/connections/new">
            <PlusCircle className="h-4 w-4" />
            New Connection
          </Link>
        </Button>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Connections
            </CardTitle>
            <CardDescription className="text-xs font-medium text-muted-foreground">
              Your existing database connections will appear here with health
              and latency summaries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/40 p-6 text-sm text-muted-foreground">
              No connections yet. Create your first connection to start
              streaming metrics and running health checks across your databases.
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Quick start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Each connection securely stores credentials and configuration for
              a single database instance or cluster.
            </p>
            <ul className="space-y-2">
              <li>• Click “New Connection” to add a database</li>
              <li>• Verify connectivity and basic performance</li>
              <li>• Open the dashboard for per-database insights</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
