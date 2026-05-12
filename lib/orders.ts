import { desc, eq } from "drizzle-orm";

import { db, schema } from "./db";
import type { Order, OrderItem, OrderStatus } from "./schema";

export type { Order, OrderItem, OrderStatus };

export type OrderWithRelations = Order & {
  customerName: string;
  customerEmail: string;
  items: { productSlug: string; quantity: number; priceCents: number }[];
};

export async function getAllOrders(): Promise<OrderWithRelations[]> {
  const rows = await db.query.orders.findMany({
    with: {
      customer: true,
      items: true,
    },
    orderBy: [desc(schema.orders.createdAt)],
  });
  return rows.map((r) => ({
    ...r,
    customerName: r.customer.name,
    customerEmail: r.customer.email,
    items: r.items.map((i) => ({
      productSlug: i.productSlug,
      quantity: i.quantity,
      priceCents: i.priceCents,
    })),
  }));
}

export async function getOrderById(id: string) {
  return db.query.orders.findFirst({
    where: eq(schema.orders.id, id),
    with: { customer: true, items: { with: { product: true } } },
  });
}

export async function getOrdersByStatus(status: OrderStatus) {
  return db.query.orders.findMany({
    where: eq(schema.orders.status, status),
    with: { customer: true, items: true },
    orderBy: [desc(schema.orders.createdAt)],
  });
}

export async function countOrders() {
  const rows = await db.select().from(schema.orders);
  return rows.length;
}

export type OrderStatusCounts = Record<OrderStatus, number>;

export async function getOrderStatusCounts(): Promise<OrderStatusCounts> {
  const rows = await db.select().from(schema.orders);
  const counts: OrderStatusCounts = {
    pending: 0,
    paid: 0,
    shipped: 0,
    delivered: 0,
    refunded: 0,
    cancelled: 0,
  };
  for (const r of rows) counts[r.status] = (counts[r.status] ?? 0) + 1;
  return counts;
}
