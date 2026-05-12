import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    "DATABASE_URL is not set. Add a Supabase Postgres connection string to .env.local (transaction pooler URL on port 6543).",
  );
}

declare global {
  // eslint-disable-next-line no-var
  var __slablabs_pg_client__: ReturnType<typeof postgres> | undefined;
}

// prepare: false is required for Supabase's transaction pooler (port 6543),
// which does not support prepared statements. Safe for direct connections too.
const client =
  globalThis.__slablabs_pg_client__ ??
  postgres(url, { prepare: false });

if (process.env.NODE_ENV !== "production") {
  globalThis.__slablabs_pg_client__ = client;
}

export const db = drizzle(client, { schema });
export { schema };
