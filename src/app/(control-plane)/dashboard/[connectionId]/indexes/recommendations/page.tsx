import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockRecommendations = [
  {
    id: "rec-1",
    title: "Add BRIN index on events.timestamp",
    impact: "High",
    rationale: "Large append-only table with time-based filters.",
  },
  {
    id: "rec-2",
    title: "Drop unused index idx_orders_status",
    impact: "Medium",
    rationale: "Very low usage over the last 7 days.",
  },
];

export default async function IndexRecommendationsPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          Index recommendations
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          AI and heuristics driven index suggestions for connection{" "}
          {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Suggested changes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {mockRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-border/70 bg-background/70 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">
                  {rec.title}
                </p>
                <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-500 ring-1 ring-amber-500/30">
                  {rec.impact} impact
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {rec.rationale}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
