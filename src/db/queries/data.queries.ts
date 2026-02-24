"use cache";

import type { LucideIcon } from "lucide-react";
import { Activity, AlertTriangle, BarChart3, Gauge } from "lucide-react";
import { db } from "@/db/drizzle";
import { connectionTests, connections } from "@/schema";
import { and, desc, eq } from "drizzle-orm";
import {
  bucketLatenciesByMinute,
  detectLatencyOutliers,
  latencyHistogram,
  summarizeLatencies,
  type HistogramBin,
  type TimeBucketLatency,
} from "@/lib/analytics";

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
  latencyTimeline: TimeBucketLatency[];
  latencyHistogram: HistogramBin[];
};

type ConnectionDashboardQueryInput = {
  connectionId: string;
  userId: string;
  role: string;
};

export async function getConnectionDashboardDataQuery(
  input: ConnectionDashboardQueryInput,
): Promise<ConnectionDashboardData> {
  const baseLabel = input.connectionId.slice(0, 6) || "conn";

  const checkRows = await db
    .select({
      id: connectionTests.id,
      type: connectionTests.type,
      summary: connectionTests.summary,
      status: connectionTests.status,
      latencyMs: connectionTests.latencyMs,
      createdAt: connectionTests.createdAt,
    })
    .from(connectionTests)
    .where(eq(connectionTests.connectionId, input.connectionId))
    .orderBy(desc(connectionTests.createdAt))
    .limit(50);

  const latencySamples = checkRows
    .map((row) => ({
      id: row.id,
      connectionId: input.connectionId,
      latencyMs: Number.parseFloat(row.latencyMs),
      createdAt: row.createdAt ?? new Date(),
    }))
    .filter(
      (sample) =>
        Number.isFinite(sample.latencyMs) && sample.latencyMs >= 0,
    );

  const latencySummary = summarizeLatencies(latencySamples);
  const outliers = detectLatencyOutliers(latencySamples);
  const latencyTimeline = bucketLatenciesByMinute(latencySamples);
  const latencyHistogramData = latencyHistogram(latencySamples, 12);

  const degradedCount = checkRows.filter(
    (row) => row.status === "degraded",
  ).length;

  const healthScore = (() => {
    if (latencySummary.count === 0) {
      return 0;
    }

    let score = 100;

    if (latencySummary.p95 > 100) {
      score -= 10;
    }

    if (latencySummary.p95 > 250) {
      score -= 20;
    }

    if (latencySummary.p95 > 500) {
      score -= 30;
    }

    score -= Math.min(degradedCount * 5, 40);
    score -= Math.min(outliers.length * 3, 30);

    if (score < 0) {
      return 0;
    }

    if (score > 100) {
      return 100;
    }

    return Math.round(score);
  })();

  const lastCheckRow = checkRows[0];

  const lastCheckValue =
    lastCheckRow?.createdAt ?
      formatRelativeTime(lastCheckRow.createdAt)
    : "Never";

  const metrics: ConnectionDashboardMetric[] = [
    {
      label: "Health Score",
      value: String(healthScore),
      trend:
        latencySummary.count === 0 ?
          "Run a baseline check to calculate health"
        : `${latencySummary.count} checks analyzed`,
      icon: Gauge,
      accent: "from-emerald-500/70 to-chart-1/70",
    },
    {
      label: "AVG Query Latency",
      value:
        latencySummary.count === 0 ?
          "–"
        : `${Math.round(latencySummary.mean)} ms`,
      trend:
        latencySummary.count === 0 ?
          "No latency data yet"
        : `p95 at ${Math.round(latencySummary.p95)} ms`,
      icon: BarChart3,
      accent: "from-primary/70 to-chart-2/70",
    },
    {
      label: "Open Issues",
      value: String(outliers.length),
      trend:
        outliers.length === 0 ?
          "No latency outliers detected"
        : `${outliers.length} latency outliers`,
      icon: AlertTriangle,
      accent: "from-destructive/70 to-amber-500/70",
    },
    {
      label: "Last Check",
      value: lastCheckValue,
      trend: `Baseline checks running for ${baseLabel}`,
      icon: Activity,
      accent: "from-chart-4/70 to-chart-3/70",
    },
  ];

  const recentChecks: ConnectionDashboardCheck[] = checkRows.slice(0, 10).map((row) => ({
    id: row.id,
    type: row.type,
    summary: row.summary,
    timestamp: row.createdAt?.toISOString() ?? "",
  }));

  const issues: ConnectionDashboardIssue[] = outliers.slice(0, 5).map((sample) => ({
    id: sample.id,
    severity: "warning",
    title: "Latency outlier detected",
    detail: `Observed ${Math.round(sample.latencyMs)} ms at ${sample.createdAt.toISOString()}`,
  }));

  return {
    metrics,
    recentChecks,
    issues,
    latencyTimeline,
    latencyHistogram: latencyHistogramData,
  };
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) {
    return "Just now";
  }

  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hr${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
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
