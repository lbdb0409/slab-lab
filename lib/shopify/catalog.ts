import "server-only";

import { EXPANSIONS } from "@/data/kits";
import { editionFor } from "@/data/shopify-editions";
import type { ProductForCard } from "@/lib/products";
import { getProductByHandle, getProducts, type ShopifyProduct, type ShopifyVariant } from "./queries";

/**
 * Adapts Shopify Storefront products onto the shape the storefront already
 * renders, so pages and components don't change when the catalogue source
 * flips. See `lib/products.ts` for the routing.
 */

/** Era tags written by the import, mapped back to the site's set slugs. */
const ERA_TO_SLUG: Record<string, string> = {
  "Mega Evolutions": "mega-evolutions",
  "Scarlet & Violet": "scarlet-violet",
  "Sword and Shield": "sword-and-shield",
  "Black Star Promos": "black-star-promos",
};

const KNOWN_SET_SLUGS = new Set(EXPANSIONS.map((e) => e.slug));

function variantFor(p: ShopifyProduct, language: string): ShopifyVariant | null {
  return (
    p.variants.nodes.find((v) =>
      v.selectedOptions.some(
        (o) => o.name.toLowerCase() === "language" && o.value.toLowerCase() === language,
      ),
    ) ?? null
  );
}

/**
 * Tags are written by the importer as:
 *   [era, expansion, "Pokemon TCG", "Display slab kit", language-availability]
 * so the era is whichever tag maps to a known set, and the expansion is the
 * first tag that isn't one of the fixed ones.
 */
function splitTags(tags: string[]) {
  const era = tags.find((t) => ERA_TO_SLUG[t]) ?? null;
  const fixed = new Set([
    "Pokemon TCG",
    "Display slab kit",
    "Both languages",
    "English only",
    "Japanese only",
    ...(era ? [era] : []),
  ]);
  const expansion = tags.find((t) => !fixed.has(t)) ?? null;
  return { era, expansion };
}

/** "Alakazam ex SIR — 151" -> "Alakazam ex SIR" */
function cardName(title: string) {
  return title.split(/\s+[—–]\s+/)[0]?.trim() || title;
}

export function toProductForCard(p: ShopifyProduct): ProductForCard {
  const { era, expansion } = splitTags(p.tags);
  const en = variantFor(p, "english");
  const jp = variantFor(p, "japanese");
  const edition = editionFor(p.handle);

  const stockEn = en ? (en.quantityAvailable ?? 0) : null;
  const stockJp = jp ? (jp.quantityAvailable ?? 0) : null;
  const stock = (stockEn ?? 0) + (stockJp ?? 0);

  // Shopify has no "coming soon" concept — a product is live when at least one
  // printing can actually be bought.
  const isLive = p.variants.nodes.some((v) => v.availableForSale);
  const editionTotal =
    (edition?.editionEn ?? 0) + (edition?.editionJp ?? 0) || stock;
  const sold = Math.max(editionTotal - stock, 0);

  const setSlug =
    (era && ERA_TO_SLUG[era]) ??
    (KNOWN_SET_SLUGS.has(p.handle) ? p.handle : "black-star-promos");

  return {
    slug: p.handle,
    card: cardName(p.title),
    set: era ?? "Pokémon TCG",
    setSlug,
    expansion,
    number: edition?.number ?? "",
    status: isLive ? "live" : "soon",
    badge: !isLive
      ? "Coming soon"
      : stock > 0 && stock <= 10
        ? "Almost gone"
        : "Available now",
    detail: isLive ? `Ed. ${sold} / ${editionTotal}` : "Coming soon",
    priceCents: Math.round(
      Number(p.priceRange.minVariantPrice.amount || "0") * 100,
    ),
    stock,
    stockEn,
    stockJp,
    editionTotal,
  };
}

function shortDescription(card: string, expansion: string | null) {
  const from = expansion ? ` from ${expansion}` : "";
  return (
    `A custom-printed expanded-art surround and display case for ${card}${from}. ` +
    `Slot in the card you already own and it is framed in seconds — no grading, ` +
    `no waiting, and your card never leaves your hands.`
  );
}

/** The full Shopify product plus the site-shaped fields the PDP needs. */
export type ShopifyProductDetail = ProductForCard & {
  setName: string;
  description: string;
  imageUrl: string | null;
  variants: ShopifyVariant[];
};

export function toProductDetail(p: ShopifyProduct): ShopifyProductDetail {
  const base = toProductForCard(p);
  return {
    ...base,
    setName: base.set,
    // Shopify's `description` is the body HTML flattened to plain text, and
    // the import put the standing disclaimers there because Shopify needs body
    // content. The site renders those disclaimers in their own slot, so reusing
    // this verbatim would duplicate them and run two paragraphs together.
    // Synthesise the short marketing line the PDP actually wants instead.
    description: shortDescription(base.card, base.expansion),
    imageUrl: p.featuredImage?.url ?? null,
    variants: p.variants.nodes,
  };
}

export async function getShopifyProducts(): Promise<ProductForCard[]> {
  const products = await getProducts();
  return products
    .map(toProductForCard)
    // Match the Postgres ordering the pages assume.
    .sort((a, b) => b.number.localeCompare(a.number));
}

export async function getShopifyProduct(
  handle: string,
): Promise<ShopifyProductDetail | null> {
  const p = await getProductByHandle(handle);
  return p ? toProductDetail(p) : null;
}

export async function getShopifyProductsBySet(
  setSlug: string,
): Promise<ProductForCard[]> {
  const all = await getShopifyProducts();
  return all.filter((p) => p.setSlug === setSlug);
}
