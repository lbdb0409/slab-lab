import { and, asc, desc, eq } from "drizzle-orm";

import { db, schema } from "./db";
import type { Product } from "./schema";

export type { Product };

export type ProductForCard = {
  slug: string;
  card: string;
  set: string;
  setSlug: string;
  expansion: string | null;
  number: string;
  status: "live" | "soon";
  badge: string;
  detail: string;
  priceCents: number;
  stock: number;
  editionTotal: number;
};

function toCardShape(p: Product): ProductForCard {
  return {
    slug: p.slug,
    card: p.card,
    set: p.setName,
    setSlug: p.setSlug,
    expansion: p.expansion ?? null,
    number: p.number,
    status: p.status,
    badge: p.badge,
    detail: p.detail,
    priceCents: p.priceCents,
    stock: p.stock ?? 0,
    editionTotal: p.editionTotal ?? 0,
  };
}

export async function getAllProducts(): Promise<ProductForCard[]> {
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.archived, false))
    .orderBy(desc(schema.products.number));
  return rows.map(toCardShape);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getProductsBySet(setSlug: string) {
  const rows = await db
    .select()
    .from(schema.products)
    .where(
      and(
        eq(schema.products.archived, false),
        eq(schema.products.setSlug, setSlug),
      ),
    )
    .orderBy(asc(schema.products.number));
  return rows.map(toCardShape);
}

export async function getRelatedProducts(setSlug: string, excludeSlug: string) {
  const rows = await db
    .select()
    .from(schema.products)
    .where(
      and(
        eq(schema.products.archived, false),
        eq(schema.products.setSlug, setSlug),
      ),
    )
    .orderBy(asc(schema.products.number));
  return rows
    .filter((p) => p.slug !== excludeSlug)
    .map(toCardShape)
    .slice(0, 6);
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  return db
    .select()
    .from(schema.products)
    .orderBy(asc(schema.products.number));
}

export async function getProductBySlugAdmin(slug: string) {
  return getProductBySlug(slug);
}

export async function countLiveProducts() {
  const rows = await db
    .select()
    .from(schema.products)
    .where(
      and(
        eq(schema.products.archived, false),
        eq(schema.products.status, "live"),
      ),
    );
  return rows.length;
}
