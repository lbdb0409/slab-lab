import { sql } from "drizzle-orm";

import { db, schema } from "./db";

const SETS_SEED = [
  {
    slug: "mega-evolutions",
    name: "Mega Evolutions",
    logo: "/brand/sets/mega-evolutions.png",
    position: 1,
  },
  {
    slug: "scarlet-violet",
    name: "Scarlet & Violet",
    logo: "/brand/sets/scarlet-violet.png",
    position: 2,
  },
  {
    slug: "sword-and-shield",
    name: "Sword and Shield",
    logo: "/brand/sets/sword-and-shield.png",
    position: 3,
  },
];

let ensured = false;

export async function ensureSeeded() {
  if (ensured) return;
  ensured = true;

  await ensureTables();

  const existingSets = await db.select().from(schema.sets).limit(1);
  if (existingSets.length === 0) {
    await db.insert(schema.sets).values(SETS_SEED);
  }
}

async function ensureTables() {
  await db.run(sql`CREATE TABLE IF NOT EXISTS "sets" (
    "slug" text PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "logo" text,
    "position" integer NOT NULL DEFAULT 0,
    "created_at" integer NOT NULL DEFAULT (unixepoch())
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS "products" (
    "slug" text PRIMARY KEY NOT NULL,
    "card" text NOT NULL,
    "set_name" text NOT NULL,
    "set_slug" text NOT NULL REFERENCES "sets"("slug") ON DELETE RESTRICT,
    "number" text NOT NULL,
    "status" text NOT NULL DEFAULT 'soon',
    "badge" text NOT NULL DEFAULT 'Coming soon',
    "detail" text NOT NULL DEFAULT 'Coming soon',
    "price_cents" integer NOT NULL DEFAULT 14900,
    "stock" integer DEFAULT 0,
    "edition_total" integer DEFAULT 100,
    "description" text DEFAULT '',
    "image_url" text DEFAULT '/brand/slab-mockup.png',
    "archived" integer NOT NULL DEFAULT 0,
    "created_at" integer NOT NULL DEFAULT (unixepoch()),
    "updated_at" integer NOT NULL DEFAULT (unixepoch())
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS "customers" (
    "id" text PRIMARY KEY NOT NULL,
    "email" text NOT NULL UNIQUE,
    "name" text NOT NULL,
    "city" text,
    "state" text,
    "created_at" integer NOT NULL DEFAULT (unixepoch())
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS "orders" (
    "id" text PRIMARY KEY NOT NULL,
    "number" text NOT NULL UNIQUE,
    "customer_id" text NOT NULL REFERENCES "customers"("id") ON DELETE RESTRICT,
    "total_cents" integer NOT NULL,
    "status" text NOT NULL DEFAULT 'pending',
    "shipping_city" text,
    "shipping_state" text,
    "notes" text,
    "created_at" integer NOT NULL DEFAULT (unixepoch()),
    "fulfilled_at" integer
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS "order_items" (
    "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    "order_id" text NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
    "product_slug" text NOT NULL REFERENCES "products"("slug") ON DELETE RESTRICT,
    "quantity" integer NOT NULL DEFAULT 1,
    "price_cents" integer NOT NULL
  )`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS "launch_subscribers" (
    "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    "email" text NOT NULL UNIQUE,
    "created_at" integer NOT NULL DEFAULT (unixepoch())
  )`);
}
