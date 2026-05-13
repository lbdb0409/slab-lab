"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  card: string;
  set: string;
  setSlug: string;
  priceCents: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  add: (snapshot: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      add: (snapshot, qty = 1) => {
        const existing = get().items.find((i) => i.slug === snapshot.slug);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.slug === snapshot.slug
                ? { ...i, quantity: i.quantity + qty }
                : i,
            ),
            open: true,
          });
        } else {
          set({
            items: [...get().items, { ...snapshot, quantity: qty }],
            open: true,
          });
        }
      },
      remove: (slug) =>
        set({ items: get().items.filter((i) => i.slug !== slug) }),
      setQty: (slug, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.slug !== slug) });
        } else {
          set({
            items: get().items.map((i) =>
              i.slug === slug ? { ...i, quantity: qty } : i,
            ),
          });
        }
      },
      clear: () => set({ items: [] }),
      openDrawer: () => set({ open: true }),
      closeDrawer: () => set({ open: false }),
    }),
    {
      name: "slablabs-cart-v2",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

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
