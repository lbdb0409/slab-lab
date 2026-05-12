import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { EXPANSIONS } from "@/data/kits";
import type { ProductForCard } from "@/lib/products";

const SET_ACCENT: Record<string, string> = {
  "mega-evolutions": "#8b3eff",
  "scarlet-violet": "#ff2d3e",
  "sword-and-shield": "#00b8e0",
};

export function ShopByExpansion({ products }: { products: ProductForCard[] }) {
  const setsWithCount = EXPANSIONS.map((e) => ({
    ...e,
    count: products.filter((p) => p.setSlug === e.slug).length,
  }));

  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <Container className="py-14 md:py-20">
        <div className="section-head">
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-magenta">Shop by set</span>
            <h2 className="section-h2">
              Pokémon <span className="text-magenta">expansions</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 rounded-full bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-magenta"
          >
            See all sets <ArrowRight className="size-3.5" strokeWidth={2.6} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {setsWithCount.map((set) => {
            const accent = SET_ACCENT[set.slug] ?? "#ff6a00";
            return (
              <Link
                key={set.slug}
                href={`/sets/${set.slug}`}
                className="group relative flex aspect-[5/4] flex-col overflow-hidden border-2 border-text bg-white transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative flex flex-1 items-center justify-center p-8 md:p-10">
                  {set.logo ? (
                    <Image
                      src={set.logo}
                      alt={set.name}
                      width={300}
                      height={150}
                      className="h-auto max-h-[110px] w-auto max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105 md:max-h-[140px]"
                    />
                  ) : (
                    <h3 className="font-display text-3xl uppercase">{set.name}</h3>
                  )}
                </div>
                <div
                  className="flex items-center justify-between border-t-2 border-text px-4 py-3 text-white"
                  style={{ background: accent }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {String(set.count).padStart(2, "0")} kit
                    {set.count === 1 ? "" : "s"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                    Shop
                    <ArrowRight
                      className="size-3 transition-transform duration-200 group-hover:translate-x-1"
                      strokeWidth={2.6}
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
