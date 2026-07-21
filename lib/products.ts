import { and, asc, desc, eq } from "drizzle-orm";

import { db, schema } from "./db";
import type { Product } from "./schema";
import { isShopifyConfigured } from "./shopify/client";

export type { Product };

/**
 * A product plus the Shopify variant ids needed to add it to the cart.
 * Both are null when reading from Postgres, where no such ids exist — the
 * PDP disables purchasing in that case rather than pretending it can sell.
 */
export type ProductDetail = Product & {
  variantIdEn: string | null;
  variantIdJp: string | null;
};

/**
 * Catalogue source switch.
 *
 * Set CATALOG_SOURCE=shopify in .env.local to read the storefront from the
 * Shopify Storefront API instead of Postgres. Defaults to Postgres so the
 * site keeps working unchanged until the Shopify swap is proven, and falls
 * back automatically if Shopify credentials are missing.
 *
 * Admin reads (getAllProductsAdmin, getProductBySlugAdmin, countLiveProducts)
 * always stay on Postgres — the admin manages the Postgres catalogue, and
 * Shopify's own admin manages the Shopify one.
 */
function shopifyCatalogEnabled() {
  return process.env.CATALOG_SOURCE === "shopify" && isShopifyConfigured();
}

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
  stockEn: number | null;
  stockJp: number | null;
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
    stockEn: p.stockEn ?? null,
    stockJp: p.stockJp ?? null,
    editionTotal: p.editionTotal ?? 0,
  };
}

export async function getAllProducts(): Promise<ProductForCard[]> {
  if (shopifyCatalogEnabled()) {
    const { getShopifyProducts } = await import("./shopify/catalog");
    return getShopifyProducts();
  }
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.archived, false))
    .orderBy(desc(schema.products.number));
  return rows.map(toCardShape);
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  if (shopifyCatalogEnabled()) {
    const { getShopifyProduct } = await import("./shopify/catalog");
    const p = await getShopifyProduct(slug);
    if (!p) return null;
    // Shape it as a Product row so the PDP renders unchanged. The three
    // columns Shopify has no equivalent for are only used by the admin.
    return {
      slug: p.slug,
      card: p.card,
      setName: p.setName,
      setSlug: p.setSlug,
      expansion: p.expansion,
      number: p.number,
      status: p.status,
      badge: p.badge,
      detail: p.detail,
      priceCents: p.priceCents,
      stock: p.stock,
      stockEn: p.stockEn,
      stockJp: p.stockJp,
      editionTotal: p.editionTotal,
      description: p.description,
      imageUrl: p.imageUrl,
      archived: false,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      variantIdEn: variantId(p.variants, "english"),
      variantIdJp: variantId(p.variants, "japanese"),
    } satisfies ProductDetail;
  }
  const rows = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.slug, slug))
    .limit(1);
  const row = rows[0];
  return row ? { ...row, variantIdEn: null, variantIdJp: null } : null;
}

/** Find a Shopify variant id by its Language option value. */
function variantId(
  variants: { id: string; selectedOptions: { name: string; value: string }[] }[],
  language: string,
): string | null {
  return (
    variants.find((v) =>
      v.selectedOptions.some(
        (o) =>
          o.name.toLowerCase() === "language" &&
          o.value.toLowerCase() === language,
      ),
    )?.id ?? null
  );
}

export async function getProductsBySet(setSlug: string) {
  if (shopifyCatalogEnabled()) {
    const { getShopifyProductsBySet } = await import("./shopify/catalog");
    return getShopifyProductsBySet(setSlug);
  }
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
  if (shopifyCatalogEnabled()) {
    const { getShopifyProductsBySet } = await import("./shopify/catalog");
    const all = await getShopifyProductsBySet(setSlug);
    return all.filter((p) => p.slug !== excludeSlug).slice(0, 6);
  }
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
