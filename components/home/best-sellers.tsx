import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { KitCard } from "@/components/kits/kit-card";
import type { ProductForCard } from "@/lib/products";

export function BestSellers({ products }: { products: ProductForCard[] }) {
  const items = [
    ...products.filter((k) => k.status === "live"),
    ...products.filter((k) => k.status === "soon").slice(0, 7),
  ].slice(0, 8);

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-text text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 0% 20%, rgba(92,211,26,0.3) 0%, rgba(92,211,26,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 95% 90%, rgba(0,184,224,0.25) 0%, rgba(0,184,224,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-12 -top-6 size-44 rotate-12 text-lime/30 md:size-56" />
      <Octagon className="absolute -right-14 bottom-6 size-36 -rotate-12 text-cyan/30 md:size-48" />
      <ConfettiField />

      <Container className="relative py-14 md:py-20">
        <div className="section-head">
          <div className="flex flex-col gap-2">
            <span className="eyebrow inline-flex items-center gap-1.5 text-lime">
              <Star className="size-3.5" strokeWidth={2.6} />
              Trending
            </span>
            <h2 className="section-h2">
              Best <span className="text-lime">sellers</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text transition-colors hover:bg-lime hover:text-text"
          >
            Shop all <ArrowRight className="size-3.5" strokeWidth={2.6} />
          </Link>
        </div>

        <Carousel ariaLabel="Best sellers">
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
