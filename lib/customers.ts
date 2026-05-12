import { desc, eq, sql } from "drizzle-orm";

import { db, schema } from "./db";
import type { Customer } from "./schema";

export type { Customer };

export type CustomerWithStats = Customer & {
  orderCount: number;
  totalSpentCents: number;
  lastOrderAt: Date | null;
  firstOrderAt: Date | null;
};

export async function getAllCustomers(): Promise<CustomerWithStats[]> {
  const customers = await db.select().from(schema.customers);

  const result: CustomerWithStats[] = [];
  for (const c of customers) {
    const orderRows = await db
      .select()
      .from(schema.orders)
      .where(eq(schema.orders.customerId, c.id));
    const orderCount = orderRows.length;
    const totalSpentCents = orderRows.reduce((s, o) => s + o.totalCents, 0);
    const dates = orderRows.map((o) => o.createdAt.getTime());
    result.push({
      ...c,
      orderCount,
      totalSpentCents,
      firstOrderAt: dates.length ? new Date(Math.min(...dates)) : null,
      lastOrderAt: dates.length ? new Date(Math.max(...dates)) : null,
    });
  }
  return result.sort((a, b) => b.totalSpentCents - a.totalSpentCents);
}

export async function getCustomerById(id: string) {
  const rows = await db
    .select()
    .from(schema.customers)
    .where(eq(schema.customers.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getCustomerOrders(id: string) {
  return db.query.orders.findMany({
    where: eq(schema.orders.customerId, id),
    with: { items: true },
    orderBy: [desc(schema.orders.createdAt)],
  });
}

export async function countCustomers() {
  const rows = await db.select().from(schema.customers);
  return rows.length;
}
