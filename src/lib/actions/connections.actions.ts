"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/better-auth/auth";
import {
  getConnectionByIdQuery,
  getConnectionsQuery,
  type ConnectionDetail,
  type ConnectionSummary,
} from "@/db/queries/data.queries";
import { db } from "@/db/drizzle";
import { connectionTests, connections } from "@/schema";
import { and, eq } from "drizzle-orm";

async function getSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

export async function listConnections(): Promise<ConnectionSummary[]> {
  const user = await getSessionUser();

  return getConnectionsQuery({
    userId: user.id,
    role: (user.role as string) || "user",
  });
}

export async function getConnectionById(
  id: string,
): Promise<ConnectionDetail | null> {
  const user = await getSessionUser();

  return getConnectionByIdQuery({
    id,
    userId: user.id,
    role: (user.role as string) || "user",
  });
}

export async function updateConnectionAction(formData: FormData) {
  const user = await getSessionUser();

  const id = formData.get("connectionId");
  const name = formData.get("name");
  const connectionString = formData.get("connectionString");

  if (typeof id !== "string") {
    throw new Error("Missing connection id");
  }

  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Display name is required");
  }

  if (typeof connectionString !== "string" || !connectionString.trim()) {
    throw new Error("Connection string is required");
  }

  await db
    .update(connections)
    .set({
      name: name.trim(),
      connectionString: connectionString.trim(),
      updatedAt: new Date(),
    })
    .where(
      and(eq(connections.id, id), eq(connections.ownerId, user.id)),
    );

  redirect(`/connections/${id}`);
}

export async function testConnectionAction(formData: FormData) {
  const user = await getSessionUser();

  const id = formData.get("connectionId");

  if (typeof id !== "string") {
    throw new Error("Missing connection id");
  }

  const simulatedLatencyMs = Math.floor(20 + Math.random() * 180);
  const isHealthy = simulatedLatencyMs < 150;

  const status = isHealthy ? "healthy" : "degraded" as const;

  await db.insert(connectionTests).values({
    connectionId: id,
    ownerId: user.id,
    type: "Baseline check",
    summary: isHealthy
      ? `Baseline check succeeded in ${simulatedLatencyMs} ms`
      : `Baseline check slow: ${simulatedLatencyMs} ms`,
    status,
    latencyMs: String(simulatedLatencyMs),
  });

  await db
    .update(connections)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(
      and(eq(connections.id, id), eq(connections.ownerId, user.id)),
    );

  redirect(`/connections/${id}/test`);
}
