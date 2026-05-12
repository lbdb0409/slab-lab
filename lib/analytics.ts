import { and, gte, ne } from "drizzle-orm";

import { db, schema } from "./db";

const COMPLETED_STATUSES = ["paid", "shipped", "delivered"] as const;

export type DashboardStats = {
  revenueCents: number;
  orderCount: number;
  aovCents: number;
  customerCount: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const completed = await db.query.orders.findMany({
    where: and(
      ne(schema.orders.status, "cancelled"),
      ne(schema.orders.status, "refunded"),
    ),
  });
  const customers = await db.select().from(schema.customers);
  const revenueCents = completed.reduce((s, o) => s + o.totalCents, 0);
  const orderCount = completed.length;
  return {
    revenueCents,
    orderCount,
    aovCents: orderCount > 0 ? Math.round(revenueCents / orderCount) : 0,
    customerCount: customers.length,
  };
}

export async function getDailyRevenue(days = 30): Promise<number[]> {
  const since = new Date(Date.now() - days * 86_400_000);
  const rows = await db.query.orders.findMany({
    where: and(
      gte(schema.orders.createdAt, since),
      ne(schema.orders.status, "cancelled"),
      ne(schema.orders.status, "refunded"),
    ),
  });
  const buckets = Array.from({ length: days }, () => 0);
  const now = Date.now();
  for (const order of rows) {
    const age = Math.floor(
      (now - order.createdAt.getTime()) / 86_400_000,
    );
    if (age >= 0 && age < days) buckets[days - 1 - age] += order.totalCents;
  }
  return buckets;
}

export async function getTopProducts(limit = 5) {
  const rows = await db.query.orders.findMany({
    where: and(
      ne(schema.orders.status, "cancelled"),
      ne(schema.orders.status, "refunded"),
    ),
    with: { items: { with: { product: true } } },
  });
  const map = new Map<
    string,
    { slug: string; card: string; set: string; quantity: number; revenueCents: number }
  >();
  for (const order of rows) {
    for (const item of order.items) {
      const key = item.productSlug;
      const existing = map.get(key);
      const revenueCents = item.priceCents * item.quantity;
      if (existing) {
        existing.quantity += item.quantity;
        existing.revenueCents += revenueCents;
      } else {
        map.set(key, {
          slug: item.productSlug,
          card: item.product.card,
          set: item.product.setName,
          quantity: item.quantity,
          revenueCents,
        });
      }
    }
  }
  return Array.from(map.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
}

export async function getRevenueBySet() {
  const rows = await db.query.orders.findMany({
    where: and(
      ne(schema.orders.status, "cancelled"),
      ne(schema.orders.status, "refunded"),
    ),
    with: { items: { with: { product: true } } },
  });
  const map = new Map<string, { name: string; revenueCents: number }>();
  for (const order of rows) {
    for (const item of order.items) {
      const slug = item.product.setSlug;
      const existing = map.get(slug);
      const value = item.priceCents * item.quantity;
      if (existing) {
        existing.revenueCents += value;
      } else {
        map.set(slug, { name: item.product.setName, revenueCents: value });
      }
    }
  }
  return Array.from(map.entries())
    .map(([slug, val]) => ({ slug, ...val }))
    .sort((a, b) => b.revenueCents - a.revenueCents);
}
