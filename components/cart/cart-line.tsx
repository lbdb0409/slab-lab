"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import {
  useCart,
  formatPrice,
  LANGUAGE_LABEL,
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
            onClick={() => remove(item.id)}
            aria-label="Remove from bag"
            className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-muted transition-colors hover:text-orange md:mr-0 md:size-7"
          >
            <X className="size-4" strokeWidth={2.4} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted">
          <span>{item.set}</span>
          <span aria-hidden>·</span>
          <span className="text-text">{LANGUAGE_LABEL[item.language]}</span>
        </div>

        <p className="text-[11px] uppercase tracking-wider text-muted">
          Slab + case only · card not included
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="inline-flex items-center border border-line">
            <button
              type="button"
              onClick={() => setQty(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="inline-flex size-11 items-center justify-center hover:bg-tint md:size-8"
            >
              <Minus className="size-3.5" strokeWidth={2.4} />
            </button>
            <span className="w-11 text-center text-sm font-bold tabular-nums md:w-8">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQty(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="inline-flex size-11 items-center justify-center hover:bg-tint md:size-8"
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
