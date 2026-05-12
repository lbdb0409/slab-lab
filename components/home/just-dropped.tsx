import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { KitCard } from "@/components/kits/kit-card";
import type { ProductForCard } from "@/lib/products";

export function JustDropped({ products }: { products: ProductForCard[] }) {
  const items = [...products]
    .sort((a, b) => b.number.localeCompare(a.number))
    .slice(0, 8);

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-text text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 90% 10%, rgba(255,44,146,0.3) 0%, rgba(255,44,146,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 5% 90%, rgba(255,203,0,0.22) 0%, rgba(255,203,0,0) 60%)",
        }}
      />
      <Octagon className="absolute -right-12 top-10 size-40 rotate-12 text-magenta/30 md:size-52" />
      <Octagon className="absolute -left-14 bottom-6 size-36 -rotate-12 text-yellow/30 md:size-44" />
      <ConfettiField />

      <Container className="relative py-14 md:py-20">
        <div className="section-head">
          <div className="flex flex-col gap-2">
            <span className="eyebrow inline-flex items-center gap-1.5 text-magenta">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              Latest kits
            </span>
            <h2 className="section-h2">
              New slab <span className="text-magenta">kits.</span>
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text transition-colors hover:bg-magenta hover:text-white"
          >
            Shop all <ArrowRight className="size-3.5" strokeWidth={2.6} />
          </Link>
        </div>

        <Carousel ariaLabel="Latest kits">
          {items.map((kit) => (
            <CarouselItem key={kit.slug}>
              <KitCard kit={kit} />
            </CarouselItem>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
