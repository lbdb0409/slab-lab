"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import {
  useCart,
  formatPrice,
  type CartItem,
} from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const SET_TINT: Record<string, string> = {
  "mega-evolutions": "bg-lavender",
  "scarlet-violet": "bg-pink-tint",
  "sword-and-shield": "bg-sky-tint",
};

type Props = {
  item: CartItem;
  variant?: "drawer" | "page";
  onLinkClick?: () => void;
};

export function CartLine({ item, variant = "drawer", onLinkClick }: Props) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const tint = SET_TINT[item.setSlug] ?? "bg-tint";
  const lineTotal = item.priceCents * item.quantity;
  const isPage = variant === "page";

  return (
    <div
      className={cn(
        "flex gap-4 border-b border-line py-4",
        isPage && "md:py-6",
      )}
    >
      <Link
        href={`/kits/${item.slug}`}
        onClick={onLinkClick}
        className={cn(
          "relative shrink-0 overflow-hidden border-2 border-text",
          tint,
          isPage ? "size-24 md:size-32" : "size-20",
        )}
      >
        <Image
          src={item.imageUrl}
          alt={item.card}
          fill
          sizes="128px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/kits/${item.slug}`}
            onClick={onLinkClick}
            className={cn(
              "font-display uppercase leading-tight transition-colors hover:text-orange",
              isPage ? "text-xl md:text-2xl" : "text-base",
            )}
          >
            {item.card}
          </Link>
          <button
            type="button"
            onClick={() => remove(item.slug)}
            aria-label="Remove from bag"
            className="inline-flex size-7 shrink-0 items-center justify-center text-muted transition-colors hover:text-orange"
          >
            <X className="size-4" strokeWidth={2.4} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted">
          <span>{item.set}</span>
        </div>

        <p className="text-[11px] uppercase tracking-wider text-muted">
          Slab + case only · card not included
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="inline-flex items-center border border-line">
            <button
              type="button"
              onClick={() => setQty(item.slug, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="inline-flex size-8 items-center justify-center hover:bg-tint"
            >
              <Minus className="size-3.5" strokeWidth={2.4} />
            </button>
            <span className="w-8 text-center text-sm font-bold tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQty(item.slug, item.quantity + 1)}
              aria-label="Increase quantity"
              className="inline-flex size-8 items-center justify-center hover:bg-tint"
            >
              <Plus className="size-3.5" strokeWidth={2.4} />
            </button>
          </div>
          <span className="font-display text-lg leading-none">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
