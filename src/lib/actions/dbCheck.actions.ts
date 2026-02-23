"use server";

import { db } from "@/db/drizzle";
import { connections } from "@/schema";

export async function runBaselineHealthCheck(connectionId: string) {
  const trimmed = connectionId.slice(0, 12) || "unknown";

  return {
    connectionId: trimmed,
    status: "queued",
  };
}

export type DbSmokeTestState = {
  ok: boolean;
  message: string;
} | null;

export async function dbSmokeTestAction(
  _prevState: DbSmokeTestState,
  _formData: FormData,
): Promise<DbSmokeTestState> {
  try {
    await db.select().from(connections).limit(1);

    return {
      ok: true,
      message: "Connected to database and queried connections successfully.",
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    return {
      ok: false,
      message,
    };
  }
}
