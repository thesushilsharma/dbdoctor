import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockColumns = [
  {
    name: "id",
    type: "uuid",
    nullable: "NO",
    defaultValue: "gen_random_uuid()",
  },
  {
    name: "created_at",
    type: "timestamptz",
    nullable: "NO",
    defaultValue: "now()",
  },
  {
    name: "updated_at",
    type: "timestamptz",
    nullable: "NO",
    defaultValue: "now()",
  },
  {
    name: "status",
    type: "text",
    nullable: "YES",
    defaultValue: "NULL",
  },
];

export default async function TableSchemaPage({
  params,
}: {
  params: Promise<{ connectionId: string; tableName: string }>;
}) {
  const { connectionId, tableName } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          Table {tableName}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Columns and metadata for table {tableName} on connection{" "}
          {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Columns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/70">
            <table className="min-w-full divide-y divide-border/70 text-sm">
              <thead className="bg-muted/60 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">Column</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Nullable</th>
                  <th className="px-4 py-2 text-left">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-background/70">
                {mockColumns.map((column) => (
                  <tr key={column.name} className="hover:bg-muted/40">
                    <td className="px-4 py-2 text-sm font-medium">
                      {column.name}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {column.type}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {column.nullable}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">
                      {column.defaultValue}
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
