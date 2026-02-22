import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockTables = [
  {
    name: "users",
    rows: "124k",
    size: "48 MB",
    type: "Base table",
  },
  {
    name: "orders",
    rows: "830k",
    size: "215 MB",
    type: "Base table",
  },
  {
    name: "order_items",
    rows: "3.2M",
    size: "642 MB",
    type: "Base table",
  },
  {
    name: "events",
    rows: "18.4M",
    size: "3.1 GB",
    type: "Append-only",
  },
];

export default async function SchemaPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Database schema</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tables and entities discovered for connection {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Tables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/70">
            <table className="min-w-full divide-y divide-border/70 text-sm">
              <thead className="bg-muted/60 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">Table</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-right">Rows</th>
                  <th className="px-4 py-2 text-right">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-background/70">
                {mockTables.map((table) => (
                  <tr key={table.name} className="hover:bg-muted/40">
                    <td className="px-4 py-2">
                      <Link
                        href={`/dashboard/${connectionId}/schema/${table.name}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {table.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {table.type}
                    </td>
                    <td className="px-4 py-2 text-right text-xs text-muted-foreground">
                      {table.rows}
                    </td>
                    <td className="px-4 py-2 text-right text-xs text-muted-foreground">
                      {table.size}
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
