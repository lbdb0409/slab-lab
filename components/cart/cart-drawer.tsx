"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  cartCount,
  cartSubtotalCents,
  formatPrice,
  useCart,
} from "@/lib/cart-store";
import { CartLine } from "./cart-line";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const open = useCart((s) => s.open);
  const items = useCart((s) => s.items);
  const closeDrawer = useCart((s) => s.closeDrawer);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeDrawer]);

  if (!mounted) return null;

  const count = cartCount(items);
  const subtotal = cartSubtotalCents(items);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-[2px]"
          />
          <motion.aside
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-md flex-col bg-white shadow-[-12px_0_32px_rgba(0,0,0,0.18)]"
            role="dialog"
            aria-label="Your bag"
          >
            <div className="flex items-center justify-between border-b-2 border-text bg-text px-5 py-4 text-white">
              <div className="flex items-baseline gap-2">
                <h2 className="font-display text-2xl uppercase leading-none">
                  Your bag
                </h2>
                <span className="text-xs font-bold uppercase tracking-wider text-yellow">
                  {count} {count === 1 ? "kit" : "kits"}
                </span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close bag"
                className="inline-flex size-9 items-center justify-center text-white transition-colors hover:text-orange"
              >
                <X className="size-5" strokeWidth={2.4} />
              </button>
            </div>

            {items.length === 0 ? (
              <EmptyState onClose={closeDrawer} />
            ) : (
              <div className="flex-1 overflow-y-auto px-5">
                {items.map((item) => (
                  <CartLine
                    key={item.slug}
                    item={item}
                    onLinkClick={closeDrawer}
                  />
                ))}
                <div className="py-4 text-center text-xs text-muted">
                  Slab kits include surround + case only · your card is not
                  included
                </div>
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t-2 border-text bg-bg-soft px-5 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold uppercase tracking-wider text-muted">
                    Shipping
                  </span>
                  <span className="font-bold uppercase tracking-wider text-success">
                    Free AU
                  </span>
                </div>
                <div className="mt-2 flex items-end justify-between border-t border-line pt-3">
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl leading-none">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="btn-orange mt-4 w-full"
                >
                  Checkout
                  <ArrowRight className="size-4" strokeWidth={2.6} />
                </Link>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="font-bold uppercase tracking-wider text-text underline-offset-4 hover:text-orange hover:underline"
                  >
                    View full bag
                  </Link>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="font-bold uppercase tracking-wider text-muted hover:text-orange"
                  >
                    Keep shopping
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <div className="inline-flex size-16 items-center justify-center rounded-full bg-tint text-muted">
        <ShoppingBag className="size-7" strokeWidth={2} />
      </div>
      <h3 className="font-display text-3xl uppercase leading-tight">
        Your bag is empty.
      </h3>
      <p className="max-w-xs text-sm text-muted">
        Find a slab kit for a card you own and add it to your bag.
      </p>
      <Link href="/shop" onClick={onClose} className="btn-orange mt-2">
        Browse slabs
        <ArrowRight className="size-4" strokeWidth={2.6} />
      </Link>
    </div>
  );
}
