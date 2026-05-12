"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import { cartCount, useCart } from "@/lib/cart-store";

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const openDrawer = useCart((s) => s.openDrawer);

  useEffect(() => setMounted(true), []);
  const count = mounted ? cartCount(items) : 0;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label="Open bag"
      className="relative inline-flex flex-col items-center justify-center px-2 text-white transition-colors hover:text-orange"
    >
      <span className="relative">
        <ShoppingBag className="size-5" strokeWidth={2.4} />
        <span
          className="absolute -right-2 -top-1 inline-flex size-4 items-center justify-center rounded-full bg-orange text-[10px] font-bold tabular-nums text-white"
          aria-hidden={count === 0}
        >
          {count}
        </span>
      </span>
      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider">Bag</span>
    </button>
  );
}
