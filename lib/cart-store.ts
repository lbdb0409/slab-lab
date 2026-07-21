"use client";

import { create } from "zustand";

import {
  addToCart,
  fetchCart,
  removeCartLine,
  setCartLineQuantity,
} from "@/lib/actions/cart";
import { EMPTY_CART, type CartView } from "@/lib/cart-types";

/** Which printing of a card the surround is designed for. */
export type CardLanguage = "en" | "jp";

export const LANGUAGE_LABEL: Record<CardLanguage, string> = {
  en: "English",
  jp: "Japanese",
};

/**
 * Cart state.
 *
 * The cart itself lives in Shopify (see lib/actions/cart.ts) — this store is a
 * client-side mirror so the drawer can render immediately, plus the drawer's
 * open/closed UI state. It is deliberately NOT persisted: Shopify is the source
 * of truth and the cart id lives in an httpOnly cookie, so persisting a copy
 * here would only create a second, staler truth.
 */

export type CartItem = {
  /** Shopify cart line id — needed for quantity and remove operations. */
  id: string;
  slug: string;
  language: CardLanguage;
  card: string;
  set: string;
  setSlug: string;
  priceCents: number;
  imageUrl: string;
  quantity: number;
};

function toItems(cart: CartView): CartItem[] {
  return cart.lines.map((l) => ({
    id: l.id,
    slug: l.slug,
    language: l.language,
    card: l.card,
    set: l.set,
    setSlug: l.setSlug,
    priceCents: l.priceCents,
    imageUrl: l.imageUrl,
    quantity: l.quantity,
  }));
}

type CartState = {
  items: CartItem[];
  checkoutUrl: string;
  subtotalCents: number;
  open: boolean;
  /** True while a mutation is in flight, so the UI can disable controls. */
  pending: boolean;
  /** True once the first fetch has resolved — avoids flashing an empty bag. */
  ready: boolean;

  hydrate: () => Promise<void>;
  add: (merchandiseId: string, qty?: number) => Promise<void>;
  setQty: (lineId: string, qty: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
  clear: () => Promise<void>;
  openDrawer: () => void;
  closeDrawer: () => void;
};

function apply(cart: CartView) {
  return {
    items: toItems(cart),
    checkoutUrl: cart.checkoutUrl,
    subtotalCents: cart.subtotalCents,
  };
}

export const useCart = create<CartState>()((set, get) => ({
  items: [],
  checkoutUrl: "",
  subtotalCents: 0,
  open: false,
  pending: false,
  ready: false,

  hydrate: async () => {
    try {
      set({ ...apply(await fetchCart()), ready: true });
    } catch {
      set({ ...apply(EMPTY_CART), ready: true });
    }
  },

  add: async (merchandiseId, qty = 1) => {
    set({ pending: true, open: true });
    try {
      set({ ...apply(await addToCart(merchandiseId, qty)), ready: true });
    } finally {
      set({ pending: false });
    }
  },

  setQty: async (lineId, qty) => {
    // Optimistic: the stepper should respond immediately, and the server
    // result overwrites this a moment later either way.
    const previous = get().items;
    set({
      pending: true,
      items:
        qty <= 0
          ? previous.filter((i) => i.id !== lineId)
          : previous.map((i) => (i.id === lineId ? { ...i, quantity: qty } : i)),
    });
    try {
      set(apply(await setCartLineQuantity(lineId, qty)));
    } catch {
      set({ items: previous });
    } finally {
      set({ pending: false });
    }
  },

  remove: async (lineId) => {
    const previous = get().items;
    set({ pending: true, items: previous.filter((i) => i.id !== lineId) });
    try {
      set(apply(await removeCartLine(lineId)));
    } catch {
      set({ items: previous });
    } finally {
      set({ pending: false });
    }
  },

  clear: async () => {
    const previous = get().items;
    set({ pending: true, items: [] });
    try {
      // Shopify has no "empty the cart" mutation — removing every line is it.
      let cart = null;
      for (const line of previous) cart = await removeCartLine(line.id);
      if (cart) set(apply(cart));
    } catch {
      set({ items: previous });
    } finally {
      set({ pending: false });
    }
  },

  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
}));

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSubtotalCents(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
}

export function formatPrice(cents: number) {
  const value = (cents / 100).toFixed(0);
  return `$${value}`;
}

/** Stable identity for a line item, used as a React key. */
export function lineKey(slug: string, language: CardLanguage) {
  return `${slug}:${language}`;
}
