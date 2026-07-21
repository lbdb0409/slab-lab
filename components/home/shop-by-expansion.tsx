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
  "black-star-promos": "#ffcb00",
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
            className="inline-flex min-h-11 items-center gap-1 rounded-full bg-text px-4 py-2.5 text-xs md:min-h-0 md:py-2 font-bold uppercase tracking-wider text-white transition-colors hover:bg-magenta"
          >
            See all sets <ArrowRight className="size-3.5" strokeWidth={2.6} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {setsWithCount.map((set) => {
            const accent = SET_ACCENT[set.slug] ?? "#ff6a00";
            return (
              <Link
                key={set.slug}
                href={`/sets/${set.slug}`}
                className="group relative flex aspect-[5/4] flex-col overflow-hidden border-2 border-text bg-white transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative flex flex-1 items-center justify-center p-5 md:p-7">
                  {set.logo ? (
                    <Image
                      src={set.logo}
                      alt={set.name}
                      width={260}
                      height={130}
                      className="h-auto max-h-[72px] w-auto max-w-[82%] object-contain transition-transform duration-300 group-hover:scale-105 md:max-h-[104px]"
                    />
                  ) : (
                    <h3 className="font-display text-xl uppercase md:text-2xl">{set.name}</h3>
                  )}
                </div>
                <div
                  className="flex items-center justify-between border-t-2 border-text px-3 py-2 text-white md:px-4 md:py-2.5"
                  style={{ background: accent }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider md:text-[11px]">
                    {String(set.count).padStart(2, "0")} kit
                    {set.count === 1 ? "" : "s"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider md:text-[11px]">
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
