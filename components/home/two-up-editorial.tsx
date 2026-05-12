import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";

const CARDS = [
  {
    eyebrow: "Build guide",
    title: "60 seconds to a sealed slab.",
    body: "Step-by-step assembly with tips on alignment, sealing, and storage.",
    cta: "Read the guide",
    href: "/build-guide",
    image: "/brand/slab-mockup.png",
    gradient:
      "linear-gradient(135deg, rgba(139,62,255,0.7) 0%, rgba(0,184,224,0.7) 100%)",
    accent: "text-yellow",
  },
  {
    eyebrow: "Gallery",
    title: "See how collectors display them.",
    body: "Real builds from real shelves — submit yours and get featured.",
    cta: "Browse the gallery",
    href: "/gallery",
    image: "/brand/slab-mockup.png",
    gradient:
      "linear-gradient(135deg, rgba(255,44,146,0.75) 0%, rgba(255,106,0,0.75) 100%)",
    accent: "text-cyan",
  },
];

export function TwoUpEditorial() {
  return (
    <section className="relative overflow-hidden bg-text text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 100% 0%, rgba(255,44,146,0.28) 0%, rgba(255,44,146,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 0% 100%, rgba(0,184,224,0.28) 0%, rgba(0,184,224,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-14 top-8 size-44 rotate-12 text-purple/30 md:size-56" />
      <Octagon className="absolute -right-12 -bottom-8 size-40 -rotate-12 text-magenta/30 md:size-52" />
      <ConfettiField />

      <Container className="relative py-14 md:py-20">
        <div className="mb-10 flex flex-col items-start gap-2">
          <span className="eyebrow inline-flex items-center gap-1.5 text-magenta">
            <Sparkles className="size-3.5" strokeWidth={2.6} />
            Build &amp; show
          </span>
          <h2 className="section-h2">
            Read the guide. <span className="text-magenta">Show yours off.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden border-2 border-white/20 p-6 text-white md:p-8"
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-0 mix-blend-multiply" style={{ background: c.gradient }} />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="relative flex flex-col gap-3">
                <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${c.accent}`}>
                  {c.eyebrow}
                </span>
                <h3 className="font-display text-3xl uppercase leading-[0.95] tracking-tight md:text-4xl">
                  {c.title}
                </h3>
                <p className="max-w-md text-sm text-white/85 md:text-base">{c.body}</p>
                <span className="inline-flex items-center gap-1.5 pt-2 text-xs font-bold uppercase tracking-wider text-white">
                  {c.cta}
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.6} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
