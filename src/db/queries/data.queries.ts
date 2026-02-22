"use cache";

import type { LucideIcon } from "lucide-react";
import { Activity, AlertTriangle, BarChart3, Gauge } from "lucide-react";
import { db } from "@/db/drizzle";
import { connectionTests, connections } from "@/schema";
import { and, desc, eq } from "drizzle-orm";

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

  const checkRows = await db
    .select({
      id: connectionTests.id,
      type: connectionTests.type,
      summary: connectionTests.summary,
      createdAt: connectionTests.createdAt,
    })
    .from(connectionTests)
    .where(eq(connectionTests.connectionId, input.connectionId))
    .orderBy(desc(connectionTests.createdAt))
    .limit(10);

  const recentChecks: ConnectionDashboardCheck[] = checkRows.map((row) => ({
    id: row.id,
    type: row.type,
    summary: row.summary,
    timestamp: row.createdAt?.toISOString() ?? "",
  }));

  const issues: ConnectionDashboardIssue[] = [];

  return {
    metrics,
    recentChecks,
    issues,
  };
}

export type ConnectionSummary = {
  id: string;
  name: string;
  engine: string;
  status: "healthy" | "degraded";
  region: string;
};

type ConnectionListQueryInput = {
  userId: string;
  role: string;
};

export async function getConnectionsQuery(
  input: ConnectionListQueryInput,
): Promise<ConnectionSummary[]> {
  void input.role;

  const rows = await db
    .select({
      id: connections.id,
      name: connections.name,
      engine: connections.engine,
      status: connections.status,
      region: connections.region,
    })
    .from(connections)
    .where(eq(connections.ownerId, input.userId))
    .orderBy(connections.createdAt);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    engine: row.engine,
    status: row.status === "degraded" ? "degraded" : "healthy",
    region: row.region,
  }));
}

export type ConnectionDetail = ConnectionSummary & {
  lastCheck: string;
};

type ConnectionDetailQueryInput = {
  id: string;
  userId: string;
  role: string;
};

export async function getConnectionByIdQuery(
  input: ConnectionDetailQueryInput,
): Promise<ConnectionDetail | null> {
  void input.role;

  const rows = await db
    .select({
      id: connections.id,
      name: connections.name,
      engine: connections.engine,
      status: connections.status,
      region: connections.region,
      createdAt: connections.createdAt,
      updatedAt: connections.updatedAt,
    })
    .from(connections)
    .where(
      and(
        eq(connections.id, input.id),
        eq(connections.ownerId, input.userId),
      ),
    )
    .orderBy(desc(connections.updatedAt))
    .limit(1);

  const row = rows[0];

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    engine: row.engine,
    status: row.status === "degraded" ? "degraded" : "healthy",
    region: row.region,
    lastCheck: row.updatedAt?.toISOString() ?? "Unknown",
  };
}
