import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function EditConnectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Edit connection {id}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update display name and connection string for this database.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Connection details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                Display name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Production Postgres"
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="connectionString"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                Connection string
              </label>
              <Input
                id="connectionString"
                name="connectionString"
                type="password"
                placeholder="postgres://user:password@host:5432/db"
                className="h-9 font-mono text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" className="h-8 px-3 text-xs">
                Cancel
              </Button>
              <Button type="submit" className="h-8 px-3 text-xs">
                Save changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
