import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockRecommendations = [
  {
    id: "rec-connection-config",
    title: "Harden connection configuration",
    detail: "Enable SSL and enforce minimum TLS version for all clients.",
  },
  {
    id: "rec-autovacuum",
    title: "Tune autovacuum settings",
    detail:
      "Increase autovacuum scale factors for large tables with heavy write load.",
  },
];

export default async function RecommendationsPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          Recommendations
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          All active tuning and configuration suggestions for connection{" "}
          {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Recommended actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {mockRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-border/70 bg-background/70 px-4 py-3"
            >
              <p className="text-sm font-medium text-foreground">
                {rec.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{rec.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
