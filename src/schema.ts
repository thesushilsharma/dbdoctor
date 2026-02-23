import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const connectionStatusEnum = pgEnum("connection_status", [
  "healthy",
  "degraded",
  "offline",
]);

export const connections = pgTable(
  "connections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id").notNull(),
    name: text("name").notNull(),
    engine: text("engine").notNull(),
    region: text("region").notNull(),
    status: connectionStatusEnum("status").notNull().default("healthy"),
    connectionString: text("connection_string").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  () => [
    pgPolicy("connections_all", {
      as: "permissive",
      for: "all",
      to: "public",
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();

export const connectionTests = pgTable(
  "connection_tests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    connectionId: uuid("connection_id").notNull(),
    ownerId: uuid("owner_id").notNull(),
    type: text("type").notNull(),
    summary: text("summary").notNull(),
    status: connectionStatusEnum("status").notNull(),
    latencyMs: text("latency_ms").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  () => [
    pgPolicy("connection_tests_all", {
      as: "permissive",
      for: "all",
      to: "public",
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ],
).enableRLS();
