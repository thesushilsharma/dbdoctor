"use cache";

import type { LucideIcon } from "lucide-react";
import { Activity, AlertTriangle, BarChart3, Gauge } from "lucide-react";

export type ConnectionDashboardMetric = {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  accent: string;
};

export type ConnectionDashboardCheck = {
  id: string;
  type: string;
  summary: string;
  timestamp: string;
};

export type ConnectionDashboardIssue = {
  id: string;
  severity: "info" | "warning" | "critical";
  title: string;
  detail: string;
};

export type ConnectionDashboardData = {
  metrics: ConnectionDashboardMetric[];
  recentChecks: ConnectionDashboardCheck[];
  issues: ConnectionDashboardIssue[];
};

type ConnectionDashboardQueryInput = {
  connectionId: string;
  userId: string;
  role: string;
};

export async function getConnectionDashboardDataQuery(
  input: ConnectionDashboardQueryInput,
): Promise<ConnectionDashboardData> {
  const baseLabel =
    input.connectionId.slice(0, 6) || "conn";

  const metrics: ConnectionDashboardMetric[] = [
    {
      label: "Health Score",
      value: "89",
      trend: "Minor issues detected",
      icon: Gauge,
      accent: "from-emerald-500/70 to-chart-1/70",
    },
    {
      label: "AVG Query Latency",
      value: "42 ms",
      trend: "p95 at 180 ms",
      icon: BarChart3,
      accent: "from-primary/70 to-chart-2/70",
    },
    {
      label: "Open Issues",
      value: "3",
      trend: "1 critical, 2 warning",
      icon: AlertTriangle,
      accent: "from-destructive/70 to-amber-500/70",
    },
    {
      label: "Last Check",
      value: "5 min ago",
      trend: `Baseline checks running for ${baseLabel}`,
      icon: Activity,
      accent: "from-chart-4/70 to-chart-3/70",
    },
  ];

  const recentChecks: ConnectionDashboardCheck[] = [];

  const issues: ConnectionDashboardIssue[] = [];

  return {
    metrics,
    recentChecks,
    issues,
  };
}

