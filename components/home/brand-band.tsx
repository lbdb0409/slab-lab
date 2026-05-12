import Image from "next/image";

import { Container } from "@/components/ui/container";

export function BrandBand() {
  return (
    <section className="relative overflow-hidden border-b-2 border-text bg-orange text-white">
      <Octagon className="absolute -left-10 -top-10 size-40 rotate-12 text-white/15 md:size-56" />
      <Octagon className="absolute -bottom-12 -right-12 size-44 -rotate-12 text-white/15 md:size-64" />
      <Octagon className="absolute right-[35%] top-1/2 hidden size-28 -translate-y-1/2 rotate-45 text-white/10 md:block" />

      <Container className="relative grid items-center gap-8 py-14 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-16">
        <div className="flex flex-col items-start gap-5">
          <div className="rounded-2xl border-2 border-white bg-text px-6 py-5 md:px-8 md:py-6">
            <Image
              src="/brand/logo.png"
              alt="Slablabs"
              width={400}
              height={100}
              className="h-16 w-auto md:h-24"
              priority
            />
          </div>
          <p className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] tracking-tight">
            Encase the art.
          </p>

          {/* Mantra — integrated as a callout instead of its own section */}
          <blockquote className="mt-1 flex items-start gap-3 border-l-4 border-yellow pl-4">
            <p className="font-display text-base uppercase leading-snug tracking-wide text-white md:text-lg">
              &ldquo;Not every card needs a{" "}
              <span className="inline-block bg-yellow px-1.5 py-0.5 text-text">10</span>{" "}
              to deserve the spotlight.&rdquo;
            </p>
          </blockquote>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
            — the Slablabs mantra
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-lg font-medium leading-relaxed md:text-xl">
            <span className="font-bold uppercase tracking-wide text-yellow">
              Slablabs
            </span>{" "}
            makes custom-printed display slabs for Pokémon trading cards. We
            print the surround. You supply the card. You snap it together.
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">
            Slab kits include the surround &amp; case only · card not included
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-0.5 border-l-2 border-yellow pl-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow">
                Built for
              </span>
              <span className="font-bold">Pokémon TCG</span>
            </div>
            <div className="flex flex-col gap-0.5 border-l-2 border-magenta pl-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-magenta">
                Shipping
              </span>
              <span className="font-bold">3–5 days · AU</span>
            </div>
            <div className="col-span-2 flex flex-col gap-0.5 border-l-2 border-cyan pl-3 sm:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan">
                Material
              </span>
              <span className="font-bold">Optical PET</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Octagon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <polygon
        points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
