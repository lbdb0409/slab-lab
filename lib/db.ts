import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "file:./local.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

declare global {
  // eslint-disable-next-line no-var
  var __slablabs_libsql_client__: ReturnType<typeof createClient> | undefined;
}

const client =
  globalThis.__slablabs_libsql_client__ ??
  createClient({ url, ...(authToken ? { authToken } : {}) });

if (process.env.NODE_ENV !== "production") {
  globalThis.__slablabs_libsql_client__ = client;
}

export const db = drizzle(client, { schema });
export { schema };
