import { desc } from "drizzle-orm";

import { db, schema } from "./db";
import type { LaunchSubscriber } from "./schema";

export type { LaunchSubscriber };

export async function getAllSubscribers(): Promise<LaunchSubscriber[]> {
  return db
    .select()
    .from(schema.launchSubscribers)
    .orderBy(desc(schema.launchSubscribers.createdAt));
}

export async function countSubscribers(): Promise<number> {
  const rows = await db.select().from(schema.launchSubscribers);
  return rows.length;
}
