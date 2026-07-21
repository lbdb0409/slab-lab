import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatCents } from "@/lib/format";
import type { ProductForCard } from "@/lib/products";

const SET_TINTS: Record<string, string> = {
  "mega-evolutions": "bg-lavender",
  "scarlet-violet": "bg-pink-tint",
  "sword-and-shield": "bg-sky-tint",
  "black-star-promos": "bg-gold",
};

const SET_ACCENT: Record<string, string> = {
  "mega-evolutions": "text-purple",
  "scarlet-violet": "text-red",
  "sword-and-shield": "text-cyan",
  "black-star-promos": "text-yellow-deep",
};

const LOW_STOCK_THRESHOLD = 5;

export function KitCard({
  kit,
  dense = false,
}: {
  kit: ProductForCard;
  dense?: boolean;
}) {
  const isLive = kit.status === "live";
  const stock = kit.stock ?? 0;
  const inStock = isLive && stock > 0;
  const lowStock = inStock && stock <= LOW_STOCK_THRESHOLD;
  const soldOut = isLive && stock === 0;

  const tint = SET_TINTS[kit.setSlug] ?? "bg-tint";
  const accent = SET_ACCENT[kit.setSlug] ?? "text-text-soft";

  const stockLabel = (() => {
    if (!isLive) return "Coming soon";
    if (soldOut) return "Sold out";
    if (lowStock) return `Only ${stock} left`;
    return "In stock";
  })();

  const stockTone = (() => {
    if (soldOut) return "text-muted";
    if (lowStock) return "text-magenta";
    if (inStock) return "text-success";
    return "text-muted";
  })();

  return (
    <Link href={`/kits/${kit.slug}`} className="group block">

      <div
        className={cn(
          "relative aspect-[5/7] overflow-hidden border-2 border-text transition-transform duration-300",
          tint,
          "group-hover:[transform:translateY(-4px)_rotate(-1deg)]",
        )}
      >
        <div className="absolute left-2.5 right-2.5 top-2.5 z-10 flex flex-wrap gap-1.5">
          {soldOut && (
            <span className="pill rounded-full bg-text text-white">
              Sold out
            </span>
          )}
          {lowStock && !soldOut && (
            <span className="pill rounded-full bg-magenta text-white">
              <span className="size-1 rounded-full bg-white" />
              Almost gone
            </span>
          )}
          {!isLive && (
            <span className="pill rounded-full border border-text bg-white text-text">
              Coming soon
            </span>
          )}
          {inStock && !lowStock && (
            <span className="pill rounded-full bg-yellow text-text">
              {kit.badge || "Available"}
            </span>
          )}
        </div>

        <span
          className={cn(
            "absolute bottom-2.5 left-2.5 z-10 inline-flex rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider",
            accent,
          )}
        >
          {kit.set}
        </span>

        {isLive ? (
          <Image
            src="/brand/slab-mockup.png"
            alt={kit.card}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 45vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderTile accent={accent} setName={kit.set} />
        )}

        <span className="pointer-events-none absolute -bottom-4 -right-4 font-display text-5xl leading-none text-white/60 mix-blend-overlay sm:text-7xl">
          {kit.number}
        </span>
      </div>

      <div className={cn("flex flex-col gap-1 pt-3", dense ? "pb-1" : "pb-2")}>
        <div className="flex items-baseline justify-between gap-2">
          <h3
            className={cn(
              "text-[15px] font-bold leading-tight transition-colors duration-200",
              isLive ? "text-text group-hover:text-orange" : "text-muted",
            )}
          >
            {kit.card}
          </h3>
          <span
            className={cn(
              "shrink-0 text-base font-bold tabular-nums",
              isLive ? "text-text" : "text-muted",
            )}
          >
            {isLive ? formatCents(kit.priceCents) : "–"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-muted">
          <span className="truncate">
            {kit.expansion ? kit.expansion : "Slab only"}
          </span>
          <span className={cn("shrink-0 font-bold", stockTone)}>{stockLabel}</span>
        </div>
      </div>
    </Link>
  );
}

function PlaceholderTile({
  accent,
  setName,
}: {
  accent: string;
  setName: string;
}) {
  // Coming-soon placeholder: outline of the actual slab shape (rectangular
  // with rounded corners), not the brand octagon.
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center",
        accent,
      )}
    >
      <div
        aria-hidden
        className="relative flex h-20 w-14 items-center justify-center rounded-md border-2 border-current opacity-50"
      >
        <div className="h-14 w-10 rounded-sm border border-dashed border-current opacity-70" />
      </div>
      <span
        className={cn(
          "font-display text-xs uppercase leading-tight tracking-wider opacity-70",
          accent,
        )}
      >
        {setName}
      </span>
    </div>
  );
}
