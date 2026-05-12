import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sets = sqliteTable("sets", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  position: integer("position").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const products = sqliteTable("products", {
  slug: text("slug").primaryKey(),
  card: text("card").notNull(),
  setName: text("set_name").notNull(),
  setSlug: text("set_slug")
    .notNull()
    .references(() => sets.slug, { onDelete: "restrict" }),
  number: text("number").notNull(),
  status: text("status", { enum: ["live", "soon"] })
    .notNull()
    .default("soon"),
  badge: text("badge").notNull().default("Coming soon"),
  detail: text("detail").notNull().default("Coming soon"),
  priceCents: integer("price_cents").notNull().default(14900),
  stock: integer("stock").default(0),
  editionTotal: integer("edition_total").default(100),
  description: text("description").default(""),
  imageUrl: text("image_url").default("/brand/slab-mockup.png"),
  archived: integer("archived", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const customers = sqliteTable("customers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  city: text("city"),
  state: text("state"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  number: text("number").notNull().unique(),
  customerId: text("customer_id")
    .notNull()
    .references(() => customers.id, { onDelete: "restrict" }),
  totalCents: integer("total_cents").notNull(),
  status: text("status", {
    enum: ["pending", "paid", "shipped", "delivered", "refunded", "cancelled"],
  })
    .notNull()
    .default("pending"),
  shippingCity: text("shipping_city"),
  shippingState: text("shipping_state"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  fulfilledAt: integer("fulfilled_at", { mode: "timestamp" }),
});

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productSlug: text("product_slug")
    .notNull()
    .references(() => products.slug, { onDelete: "restrict" }),
  quantity: integer("quantity").notNull().default(1),
  priceCents: integer("price_cents").notNull(),
});

export const setsRelations = relations(sets, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  set: one(sets, { fields: [products.setSlug], references: [sets.slug] }),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productSlug],
    references: [products.slug],
  }),
}));

export const launchSubscribers = sqliteTable("launch_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Product = typeof products.$inferSelect;
export type SetRow = typeof sets.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type LaunchSubscriber = typeof launchSubscribers.$inferSelect;

export type OrderStatus = NonNullable<Order["status"]>;
