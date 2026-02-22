import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockReports = [
  {
    id: "weekly-health",
    name: "Weekly health summary",
    frequency: "Weekly",
  },
  {
    id: "slow-queries",
    name: "Top slow queries",
    frequency: "Daily",
  },
  {
    id: "index-coverage",
    name: "Index coverage report",
    frequency: "Weekly",
  },
];

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ connectionId: string }>;
}) {
  const { connectionId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Reports</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Generated and scheduled reports for connection {connectionId}.
        </p>
      </div>

      <Card className="border-border/70 bg-card/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-tight">
            Available reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockReports.map((report) => (
              <Link
                key={report.id}
                href={`/dashboard/${connectionId}/reports/${report.id}`}
                className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm transition-colors hover:bg-muted/40"
              >
                <div>
                  <p className="font-medium text-foreground">{report.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.frequency} snapshot
                  </p>
                </div>
                <span className="text-xs font-medium text-primary">
                  View
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
