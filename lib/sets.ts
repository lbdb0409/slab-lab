import { asc, eq } from "drizzle-orm";

import { db, schema } from "./db";
import type { SetRow } from "./schema";

export type Expansion = {
  slug: string;
  name: string;
  logo?: string | null;
};

export async function getAllSets(): Promise<Expansion[]> {
  const rows = await db
    .select()
    .from(schema.sets)
    .orderBy(asc(schema.sets.position));
  return rows.map(rowToExpansion);
}

export async function getSetBySlug(slug: string): Promise<Expansion | null> {
  const rows = await db
    .select()
    .from(schema.sets)
    .where(eq(schema.sets.slug, slug))
    .limit(1);
  if (!rows[0]) return null;
  return rowToExpansion(rows[0]);
}

function rowToExpansion(row: SetRow): Expansion {
  return { slug: row.slug, name: row.name, logo: row.logo };
}
