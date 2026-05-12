import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { KitCard } from "@/components/kits/kit-card";
import type { ProductForCard } from "@/lib/products";

export function OnTheCatalog({ products }: { products: ProductForCard[] }) {
  const featured = [...products]
    .sort((a, b) => b.number.localeCompare(a.number))
    .slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="relative bg-surface/30">
      <Container className="py-24 md:py-32">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div className="flex flex-col gap-5">
            <span
              className="sticker self-start"
              style={{ ["--rot" as string]: "-3deg" }}
            >
              Fresh drops
            </span>
            <h2 className="font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              The collection,
              <br />
              <span className="text-orange text-glow">on shelf now.</span>
            </h2>
          </div>
          <Link href="/shop" className="btn-arcade-ghost group">
            See all
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {featured.map((kit, i) => (
            <Reveal key={kit.slug} delay={i * 0.05}>
              <KitCard kit={kit} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
