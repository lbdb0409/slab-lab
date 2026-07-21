"use server";

import { cookies } from "next/headers";

import { isShopifyConfigured } from "@/lib/shopify/client";
import {
  EMPTY_CART,
  type CartLineView,
  type CartView,
} from "@/lib/cart-types";
import {
  addCartLines,
  createCart,
  getCart,
  removeCartLines,
  updateCartLines,
  type ShopifyCart,
} from "@/lib/shopify/queries";

/**
 * Cart server actions.
 *
 * The cart lives in Shopify, not in this app — Shopify owns pricing, inventory
 * reservation, discounts, tax and the checkout URL, and a locally-held cart
 * would drift from all of it. Only the cart id is kept here, in an httpOnly
 * cookie so it survives reloads without being reachable from client JS.
 */

// Types intentionally NOT re-exported here: Next compiles a `export type {...}`
// in a "use server" module into a runtime re-export, which throws
// "CartLineLanguage is not defined" on every action call. Import them from
// "@/lib/cart-types" instead.
const CART_COOKIE = "slablabs_cart_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const ERA_TO_SLUG: Record<string, string> = {
  "Mega Evolutions": "mega-evolutions",
  "Scarlet & Violet": "scarlet-violet",
  "Sword and Shield": "sword-and-shield",
  "Black Star Promos": "black-star-promos",
};

const PLACEHOLDER_IMAGE = "/brand/slab-mockup.png";

function toCents(amount: string) {
  return Math.round(Number(amount || "0") * 100);
}

function view(cart: ShopifyCart): CartView {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotalCents: toCents(cart.cost.subtotalAmount.amount),
    currencyCode: cart.cost.subtotalAmount.currencyCode,
    lines: cart.lines.nodes.map((l) => {
      const m = l.merchandise;
      const langValue =
        m.selectedOptions.find((o) => o.name.toLowerCase() === "language")
          ?.value ?? "English";
      const era = (m.product.tags ?? []).find((t) => ERA_TO_SLUG[t]);
      return {
        id: l.id,
        merchandiseId: m.id,
        slug: m.product.handle,
        language: langValue.toLowerCase().startsWith("jap") ? "jp" : "en",
        card: m.product.title.split(/\s+[—–]\s+/)[0]?.trim() || m.product.title,
        set: era ?? "Pokémon TCG",
        setSlug: era ? ERA_TO_SLUG[era] : "black-star-promos",
        priceCents: toCents(m.price.amount),
        imageUrl: m.product.featuredImage?.url ?? PLACEHOLDER_IMAGE,
        quantity: l.quantity,
      } satisfies CartLineView;
    }),
  };
}

async function readCartId() {
  return (await cookies()).get(CART_COOKIE)?.value ?? null;
}

async function writeCartId(id: string) {
  (await cookies()).set(CART_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

async function clearCartId() {
  (await cookies()).delete(CART_COOKIE);
}

/** Current cart, or an empty one. Never creates a cart just to read it. */
export async function fetchCart(): Promise<CartView> {
  if (!isShopifyConfigured()) return EMPTY_CART;
  const id = await readCartId();
  if (!id) return EMPTY_CART;
  try {
    const cart = await getCart(id);
    // Shopify expires carts (and drops them once completed). A stale id would
    // otherwise fail every subsequent action, so forget it.
    if (!cart) {
      await clearCartId();
      return EMPTY_CART;
    }
    return view(cart);
  } catch {
    await clearCartId();
    return EMPTY_CART;
  }
}

export async function addToCart(
  merchandiseId: string,
  quantity = 1,
): Promise<CartView> {
  if (!isShopifyConfigured()) return EMPTY_CART;
  const id = await readCartId();

  if (!id) {
    const cart = await createCart([{ merchandiseId, quantity }]);
    await writeCartId(cart.id);
    return view(cart);
  }

  try {
    return view(await addCartLines(id, [{ merchandiseId, quantity }]));
  } catch {
    // Expired or completed cart — start a fresh one rather than losing the add.
    const cart = await createCart([{ merchandiseId, quantity }]);
    await writeCartId(cart.id);
    return view(cart);
  }
}

export async function setCartLineQuantity(
  lineId: string,
  quantity: number,
): Promise<CartView> {
  if (!isShopifyConfigured()) return EMPTY_CART;
  const id = await readCartId();
  if (!id) return EMPTY_CART;

  if (quantity <= 0) {
    return view(await removeCartLines(id, [lineId]));
  }
  return view(await updateCartLines(id, [{ id: lineId, quantity }]));
}

export async function removeCartLine(lineId: string): Promise<CartView> {
  if (!isShopifyConfigured()) return EMPTY_CART;
  const id = await readCartId();
  if (!id) return EMPTY_CART;
  return view(await removeCartLines(id, [lineId]));
}

/**
 * Shopify's hosted checkout URL for the current cart, or null if the bag is
 * empty. This is the only supported way to take payment on Basic — checkout
 * customisation requires Plus.
 */
export async function getCheckoutUrl(): Promise<string | null> {
  const cart = await fetchCart();
  return cart.lines.length > 0 ? cart.checkoutUrl : null;
}
