"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import type { ConnectionDashboardData } from "@/db/queries/data.queries";
import { getConnectionDashboardDataQuery } from "@/db/queries/data.queries";

export async function getConnectionDashboardData(
  connectionId: string,
): Promise<ConnectionDashboardData> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id as string;
  const role = session.user.role ?? "user";

  return getConnectionDashboardDataQuery({
    connectionId,
    userId,
    role,
  });
}

