"use client";

import { Bell, Check, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  card: string;
  set: string;
  setSlug: string;
  priceCents: number;
  imageUrl: string;
  isLive: boolean;
};

export function KitActions({
  slug,
  card,
  set,
  setSlug,
  priceCents,
  imageUrl,
  isLive,
}: Props) {
  const add = useCart((s) => s.add);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!isLive) return;
    add({ slug, card, set, setSlug, priceCents, imageUrl }, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const priceLabel = `$${(priceCents / 100).toFixed(0)} AUD`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        {isLive ? (
          <button
            type="button"
            onClick={handleAdd}
            className="btn-orange flex-1"
          >
            {added ? (
              <>
                <Check className="size-4" strokeWidth={2.6} />
                Added to bag
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" strokeWidth={2.4} />
                Add to bag · {priceLabel}
              </>
            )}
          </button>
        ) : (
          <button type="button" className="btn flex-1">
            <Bell className="size-4" strokeWidth={2.4} />
            Notify when available
          </button>
        )}
        <button
          type="button"
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={cn(
            "inline-flex size-[52px] shrink-0 items-center justify-center rounded-full border-2 transition-all",
            wished
              ? "border-magenta bg-magenta text-white"
              : "border-line-strong bg-white text-text hover:border-text",
          )}
        >
          <Heart
            className={cn("size-5", wished && "fill-white")}
            strokeWidth={2.4}
          />
        </button>
      </div>
      <p className="text-xs text-muted">
        {isLive
          ? "Slab + case only — your card not included"
          : "Get an email the moment this kit ships"}
      </p>
    </div>
  );
}
