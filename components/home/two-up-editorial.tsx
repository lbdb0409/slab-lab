import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Camera } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

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

      <Container className="relative py-14 md:py-20">
        <div className="mb-10 flex flex-col items-start gap-2">
          <span className="eyebrow inline-flex items-center gap-1.5 text-magenta">
            <BookOpen className="size-3.5" strokeWidth={2.6} />
            Build &amp; show
          </span>
          <h2 className="section-h2">
            Read the guide. <span className="text-magenta">Show yours off.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {/* Build guide. Diagrammatic / typographic */}
          <Link
            href="/build-guide"
            className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden border-2 border-cyan/40 bg-text p-7 md:aspect-[4/3] md:min-h-0 transition-transform duration-300 hover:-translate-y-1 md:p-9"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(139,62,255,0.55) 0%, rgba(0,184,224,0.55) 100%), radial-gradient(40% 50% at 80% 20%, rgba(0,184,224,0.5) 0%, transparent 60%)",
            }}
          >
            <Octagon className="pointer-events-none absolute -right-10 -bottom-12 size-56 rotate-12 text-cyan/30 md:size-72" />
            <Octagon className="pointer-events-none absolute right-[20%] top-6 size-24 -rotate-12 text-yellow/40 md:size-32" />

            <div className="relative flex items-start justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow">
                Build guide
              </span>
              <span className="inline-flex size-12 items-center justify-center rounded-full border-2 border-yellow/60 bg-text text-yellow">
                <BookOpen className="size-5" strokeWidth={2.4} />
              </span>
            </div>

            <div className="relative flex flex-col gap-3">
              <h3 className="font-display text-3xl uppercase leading-[0.95] tracking-tight md:text-[2.5rem]">
                60 seconds to a sealed slab.
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                Step-by-step assembly with tips on alignment, sealing, and storage.
              </p>
              <span className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold uppercase tracking-wider text-white">
                Read the guide
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.6} />
              </span>
            </div>
          </Link>

          {/* Gallery. Photo card */}
          <Link
            href="/gallery"
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden border-2 border-white/20 p-6 text-white md:aspect-[4/3] md:min-h-0 md:p-8"
          >
            <Image
              src="/brand/slab-mockup.png"
              alt="Slab on display"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span
              aria-hidden
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,44,146,0.75) 0%, rgba(255,106,0,0.75) 100%)",
              }}
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <span className="absolute right-5 top-5 inline-flex size-12 items-center justify-center rounded-full border-2 border-cyan/60 bg-text text-cyan">
              <Camera className="size-5" strokeWidth={2.4} />
            </span>

            <div className="relative flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan">
                Gallery
              </span>
              <h3 className="font-display text-3xl uppercase leading-[0.95] tracking-tight md:text-[2.5rem]">
                See how collectors display them.
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-white/90 md:text-base">
                Real builds from real shelves. Submit yours and get featured.
              </p>
              <span className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold uppercase tracking-wider text-white">
                Browse the gallery
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.6} />
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
