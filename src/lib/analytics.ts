import * as aq from "arquero";
import * as pl from "nodejs-polars";
import * as dfd from "danfojs-node";
import _ from "lodash";
import {
  mean as ssMean,
  median as ssMedian,
  standardDeviation as ssStdDev,
} from "simple-statistics";

export type LatencySample = {
  id: string;
  connectionId: string;
  latencyMs: number;
  createdAt: Date;
};

export type LatencySummary = {
  count: number;
  min: number;
  max: number;
  mean: number;
  p50: number;
  p95: number;
  p99: number;
  stdDev: number;
};

export type TimeBucketLatency = {
  bucketStart: Date;
  bucketEnd: Date;
  avgLatency: number;
  count: number;
};

export function summarizeLatencies(samples: LatencySample[]): LatencySummary {
  if (samples.length === 0) {
    return {
      count: 0,
      min: 0,
      max: 0,
      mean: 0,
      p50: 0,
      p95: 0,
      p99: 0,
      stdDev: 0,
    };
  }

  const values = samples.map((s) => s.latencyMs);

  const count = values.length;
  const min = _.min(values) ?? 0;
  const max = _.max(values) ?? 0;
  const mean = ssMean(values);
  const p50 = ssMedian(values);
  const sorted = [...values].sort((a, b) => a - b);

  const percentile = (p: number): number => {
    if (sorted.length === 0) {
      return 0;
    }
    const idx = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    if (lower === upper) {
      return sorted[lower];
    }
    const weight = idx - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  const p95 = percentile(95);
  const p99 = percentile(99);

  const stdDev = ssStdDev(values);

  return {
    count,
    min,
    max,
    mean,
    p50,
    p95,
    p99,
    stdDev,
  };
}

export function bucketLatenciesByMinute(
  samples: LatencySample[],
): TimeBucketLatency[] {
  if (samples.length === 0) {
    return [];
  }

  const table = aq.from(
    samples.map((s) => ({
      bucket: new Date(
        s.createdAt.getFullYear(),
        s.createdAt.getMonth(),
        s.createdAt.getDate(),
        s.createdAt.getHours(),
        s.createdAt.getMinutes(),
        0,
        0,
      ),
      latencyMs: s.latencyMs,
    })),
  );

  const grouped = table.groupby("bucket").rollup({
    avgLatency: (d: any) => aq.op.mean(d.latencyMs),
    count: (d: any) => aq.op.count(),
  });

  return grouped
    .objects()
    .map((row: any) => {
      const start = new Date(row.bucket);
      const end = new Date(start.getTime() + 60_000);
      return {
        bucketStart: start,
        bucketEnd: end,
        avgLatency: row.avgLatency,
        count: row.count,
      } as TimeBucketLatency;
    })
    .sort((a, b) => a.bucketStart.getTime() - b.bucketStart.getTime());
}

export function detectLatencyOutliers(
  samples: LatencySample[],
  threshold: number = 3,
): LatencySample[] {
  if (samples.length === 0) {
    return [];
  }

  const df = new dfd.DataFrame(
    samples.map((s) => ({
      id: s.id,
      connectionId: s.connectionId,
      latencyMs: s.latencyMs,
      createdAt: s.createdAt,
    })),
  );

  const latencies = df["latencyMs"].values as number[];

  if (latencies.length === 0) {
    return [];
  }

  const mean = ssMean(latencies);
  const std = ssStdDev(latencies);

  if (!isFinite(std) || std === 0) {
    return [];
  }

  const zScores = latencies.map((value) => (value - mean) / std);

  const outlierFlags = zScores.map((z) => Math.abs(z) >= threshold);

  const outlierRows: LatencySample[] = [];

  for (let i = 0; i < outlierFlags.length; i += 1) {
    if (outlierFlags[i]) {
      outlierRows.push(samples[i]);
    }
  }

  return outlierRows;
}

export type HistogramBin = {
  start: number;
  end: number;
  count: number;
};

export function latencyHistogram(
  samples: LatencySample[],
  binCount: number = 10,
): HistogramBin[] {
  if (samples.length === 0 || binCount <= 0) {
    return [];
  }

  const values = samples.map((s) => s.latencyMs);
  const min = _.min(values) ?? 0;
  const max = _.max(values) ?? 0;

  if (min === max) {
    return [
      {
        start: min,
        end: max,
        count: values.length,
      },
    ];
  }

  const binWidth = (max - min) / binCount;
  const bins: HistogramBin[] = [];

  for (let i = 0; i < binCount; i += 1) {
    const start = min + i * binWidth;
    const end = i === binCount - 1 ? max : start + binWidth;
    bins.push({ start, end, count: 0 });
  }

  values.forEach((value) => {
    let index = Math.floor((value - min) / binWidth);
    if (index >= binCount) {
      index = binCount - 1;
    }
    if (index < 0) {
      index = 0;
    }
    bins[index].count += 1;
  });

  return bins;
}

export function toPolarsLatencyFrame(
  samples: LatencySample[],
): pl.DataFrame {
  const data =
    samples.length === 0
      ? {
          id: [] as string[],
          connectionId: [] as string[],
          latencyMs: [] as number[],
          createdAt: [] as string[],
        }
      : {
          id: samples.map((s) => s.id),
          connectionId: samples.map((s) => s.connectionId),
          latencyMs: samples.map((s) => s.latencyMs),
          createdAt: samples.map((s) => s.createdAt.toISOString()),
        };

  const dataFrameFactory = (pl as any).DataFrame as (input: unknown) => pl.DataFrame;

  return dataFrameFactory(data);
}
