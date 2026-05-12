import { desc, eq } from "drizzle-orm";

import { db, schema } from "./db";
import type { CardRequest, CardRequestStatus } from "./schema";

export type { CardRequest, CardRequestStatus };

export async function getAllCardRequests(): Promise<CardRequest[]> {
  return db
    .select()
    .from(schema.cardRequests)
    .orderBy(desc(schema.cardRequests.createdAt));
}

export async function getCardRequestById(id: number) {
  return db.query.cardRequests.findFirst({
    where: eq(schema.cardRequests.id, id),
  });
}

export async function getCardRequestStatusCounts() {
  const rows = await db.select().from(schema.cardRequests);
  const counts: Record<CardRequestStatus, number> = {
    open: 0,
    contacted: 0,
    produced: 0,
    declined: 0,
  };
  for (const r of rows) counts[r.status] = (counts[r.status] ?? 0) + 1;
  return counts;
}

export async function countOpenCardRequests() {
  const rows = await db
    .select()
    .from(schema.cardRequests)
    .where(eq(schema.cardRequests.status, "open"));
  return rows.length;
}
