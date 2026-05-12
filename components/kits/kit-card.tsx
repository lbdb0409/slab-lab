"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";
import type { ProductForCard } from "@/lib/products";

const SET_TINTS: Record<string, string> = {
  "mega-evolutions": "bg-lavender",
  "scarlet-violet": "bg-pink-tint",
  "sword-and-shield": "bg-sky-tint",
};

const SET_ACCENT: Record<string, string> = {
  "mega-evolutions": "text-purple",
  "scarlet-violet": "text-red",
  "sword-and-shield": "text-cyan",
};

export function KitCard({ kit, dense = false }: { kit: ProductForCard; dense?: boolean }) {
  const isLive = kit.status === "live";
  const [wished, setWished] = useState(false);

  const onWish = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setWished((w) => !w);
  };

  const tint = SET_TINTS[kit.setSlug] ?? "bg-tint";
  const accent = SET_ACCENT[kit.setSlug] ?? "text-text-soft";
  const priceLabel = `$${(kit.priceCents / 100).toFixed(0)}`;

  return (
    <Link
      href={isLive ? `/kits/${kit.slug}` : "#"}
      aria-disabled={!isLive}
      className={cn("group block", !isLive && "pointer-events-none")}
    >
      <div
        className={cn(
          "relative aspect-[5/7] overflow-hidden border-2 border-text transition-transform duration-300",
          tint,
          "group-hover:[transform:translateY(-4px)_rotate(-1deg)]",
        )}
      >
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap gap-1.5">
          {isLive && kit.badge === "Almost gone" && (
            <span className="pill rounded-full bg-magenta text-white">
              <span className="size-1 rounded-full bg-white" />
              {kit.badge}
            </span>
          )}
          {!isLive && (
            <span className="pill rounded-full border border-text bg-white text-text">
              Coming soon
            </span>
          )}
          {isLive && kit.badge !== "Almost gone" && (
            <span className="pill rounded-full bg-yellow text-text">
              {kit.badge}
            </span>
          )}
        </div>

        {isLive && (
          <button
            type="button"
            onClick={onWish}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className="absolute right-2.5 top-2.5 z-10 inline-flex size-9 items-center justify-center rounded-full bg-white text-text shadow-sm transition-all hover:scale-110 hover:text-magenta"
          >
            <Heart
              className={cn("size-4 transition-all", wished && "fill-magenta text-magenta")}
              strokeWidth={2.4}
            />
          </button>
        )}

        <span className={cn("absolute bottom-2.5 left-2.5 z-10 inline-flex rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider", accent)}>
          {kit.set}
        </span>

        {isLive ? (
          <Image
            src="/brand/slab-mockup.png"
            alt={kit.card}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 75vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderTile accent={accent} />
        )}

        <span className="pointer-events-none absolute -bottom-4 -right-4 font-display text-7xl leading-none text-white/60 mix-blend-overlay">
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
            {isLive ? priceLabel : "–"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-muted">
          <span>Slab only · card not included</span>
          {isLive ? (
            <span className="font-bold text-success">In stock</span>
          ) : (
            <span>Coming soon</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function PlaceholderTile({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className={cn("size-20 opacity-50", accent)} aria-hidden>
        <polygon
          points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
}
