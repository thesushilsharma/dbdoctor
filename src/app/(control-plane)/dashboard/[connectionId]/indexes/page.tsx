import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockIndexes = [
  {
    name: "idx_orders_created_at",
    table: "orders",
    type: "BTREE",
    usage: "High",
  },
  {
    name: "idx_orders_customer_id",
    table: "orders",
    type: "BTREE",
    usage: "Medium",
  },
  {
    name: "idx_events_timestamp",
    table: "events",
    type: "BRIN",
    usage: "High",
  },
];

export default async function IndexesPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Indexes</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Index coverage and usage for connection {connectionId}.
          </p>
        </div>
        <Link
          href={`/dashboard/${connectionId}/indexes/recommendations`}
          className="text-xs font-medium text-primary hover:underline"
        >
          View index recommendations
        </Link>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Indexes by table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/70">
            <table className="min-w-full divide-y divide-border/70 text-sm">
              <thead className="bg-muted/60 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">Index</th>
                  <th className="px-4 py-2 text-left">Table</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-background/70">
                {mockIndexes.map((index) => (
                  <tr key={index.name} className="hover:bg-muted/40">
                    <td className="px-4 py-2 text-sm font-medium">
                      {index.name}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {index.table}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {index.type}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {index.usage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
