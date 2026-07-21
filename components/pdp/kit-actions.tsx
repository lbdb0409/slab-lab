"use client";

import { Bell, Check, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { LANGUAGE_LABEL, useCart, type CardLanguage } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  card: string;
  set: string;
  setSlug: string;
  priceCents: number;
  imageUrl: string;
  isLive: boolean;
  /** Per-language stock. null means that printing isn't produced for this card. */
  stockEn: number | null;
  stockJp: number | null;
  /**
   * Shopify variant ids, one per printing. Null when the catalogue is being
   * read from Postgres, which has no Shopify variants — purchasing is disabled
   * in that case rather than silently doing nothing.
   */
  variantIdEn: string | null;
  variantIdJp: string | null;
};

export function KitActions({
  slug,
  card,
  set,
  setSlug,
  priceCents,
  imageUrl,
  isLive,
  stockEn,
  stockJp,
  variantIdEn,
  variantIdJp,
}: Props) {
  const add = useCart((s) => s.add);
  const pending = useCart((s) => s.pending);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  // A language is offered only if it's produced at all. In-stock is a separate
  // question — an offered-but-sold-out printing still shows, disabled, so the
  // customer knows it exists rather than assuming we never made it.
  const offered = (["en", "jp"] as const).filter((l) =>
    l === "en" ? stockEn !== null : stockJp !== null,
  );
  const stockFor = (l: CardLanguage) => (l === "en" ? stockEn : stockJp) ?? 0;

  const [language, setLanguage] = useState<CardLanguage>(
    () => offered.find((l) => stockFor(l) > 0) ?? offered[0] ?? "en",
  );

  const selectedStock = stockFor(language);
  const variantId = language === "en" ? variantIdEn : variantIdJp;
  const canBuy = isLive && selectedStock > 0 && Boolean(variantId);

  const handleAdd = async () => {
    if (!canBuy || !variantId) return;
    await add(variantId, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const priceLabel = `$${(priceCents / 100).toFixed(0)} AUD`;

  return (
    <div className="flex flex-col gap-3">
      {/* Only worth asking when there's an actual choice to make. */}
      {offered.length > 1 && (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Card printing
          </legend>
          <div className="flex gap-2" role="radiogroup" aria-label="Card printing">
            {offered.map((l) => {
              const out = stockFor(l) === 0;
              const active = language === l;
              return (
                <button
                  key={l}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  disabled={out}
                  onClick={() => setLanguage(l)}
                  className={cn(
                    "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 text-xs font-bold uppercase tracking-wider transition-colors",
                    active
                      ? "border-text bg-text text-white"
                      : "border-line-strong bg-white text-text hover:border-text",
                    out && "cursor-not-allowed opacity-45 hover:border-line-strong",
                  )}
                >
                  {LANGUAGE_LABEL[l]}
                  {out && <span className="text-[10px]">Sold out</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex gap-3">
        {isLive ? (
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canBuy || pending}
            className="btn-orange flex-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? (
              <>Adding…</>
            ) : added ? (
              <>
                <Check className="size-4" strokeWidth={2.6} />
                Added to bag
              </>
            ) : !variantId ? (
              <>Unavailable</>
            ) : !canBuy ? (
              <>Sold out</>
            ) : (
              <>
                <ShoppingBag className="size-4" strokeWidth={2.4} />
                Add to bag · {priceLabel}
              </>
            )}
          </button>
        ) : (
          <button type="button" className="btn flex-1 text-[0.72rem] md:text-[0.78rem]">
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
          ? offered.length > 1
            ? `${LANGUAGE_LABEL[language]} printing · slab + case only. Your card not included`
            : offered.length === 1
              ? `${LANGUAGE_LABEL[offered[0]]} printing only · slab + case only. Your card not included`
              : "Slab + case only. Your card not included"
          : "Get an email the moment this kit ships"}
      </p>
    </div>
  );
}
