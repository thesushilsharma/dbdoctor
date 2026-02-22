import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ connectionId: string; reportId: string }>;
}) {
  const { connectionId, reportId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">
          Report {reportId}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Generated snapshot for connection {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is a placeholder for the structured report content that will be
            generated from historical telemetry and analysis. It mirrors the
            eventual shape of a PDF or exportable artifact.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
