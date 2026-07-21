import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Sparkles, Upload } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Customer builds and shelf shots. See how collectors display their Slablabs kits.",
};

const TILE_TINTS = [
  { bg: "bg-pink-tint", accent: "text-magenta" },
  { bg: "bg-sky-tint", accent: "text-cyan-deep" },
  { bg: "bg-lavender", accent: "text-purple" },
  { bg: "bg-mint-tint", accent: "text-lime-deep" },
  { bg: "bg-gold", accent: "text-orange" },
  { bg: "bg-cream", accent: "text-magenta" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/gallery", label: "Gallery" }]}
        eyebrow="The shelf"
        EyebrowIcon={Camera}
        eyebrowColor="magenta"
        title={
          <>
            Real builds. <span className="text-magenta">Real shelves.</span>
          </>
        }
        body="A wall of slabbed cards from collectors who shipped their build. Send yours in and you'll show up here."
        bg="pink"
      />

      {/* GALLERY GRID. Placeholder while we collect real submissions */}
      <section className="border-b border-line bg-white">
        <Container className="py-14 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-cyan-deep">Featured builds</span>
              <h2 className="section-h2">
                On the <span className="text-cyan-deep">shelf.</span>
              </h2>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Sent by customers
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => {
              const tint = TILE_TINTS[i % TILE_TINTS.length];
              return (
                <div
                  key={i}
                  className={`group relative aspect-square overflow-hidden border-2 border-text ${tint.bg}`}
                >
                  <Image
                    src="/brand/slab-mockup.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <Octagon
                    className={`pointer-events-none absolute -right-4 -bottom-4 size-20 rotate-12 opacity-20 ${tint.accent}`}
                  />
                  <span className="absolute left-2.5 top-2.5 inline-flex rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-text backdrop-blur-sm">
                    Build #{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <p className="rounded-full border border-line bg-bg-soft px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">
              Sample builds. Real submissions coming soon
            </p>
          </div>
        </Container>
      </section>

      {/* SUBMIT YOUR BUILD */}
      <section className="relative overflow-hidden border-b border-line bg-text text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 20% 30%, rgba(255,44,146,0.25) 0%, rgba(255,44,146,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 80% 80%, rgba(255,203,0,0.22) 0%, rgba(255,203,0,0) 60%)",
          }}
        />
        <Octagon className="absolute -left-14 top-8 size-48 rotate-12 text-magenta/30 md:size-60" />
        <Octagon className="absolute -right-12 -bottom-8 size-44 -rotate-12 text-yellow/30 md:size-56" />
        <ConfettiField />

        <Container className="relative grid items-center gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-24">
          <div className="flex flex-col gap-5">
            <span className="eyebrow inline-flex items-center gap-1.5 text-yellow">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              Submit your build
            </span>
            <h2 className="section-h2">
              Get your slab{" "}
              <span className="text-yellow">on the wall.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              Slabbed something you&apos;re proud of? Email us a photo and
              we&apos;ll feature your build here. Socials launch alongside the
              first batch — for now, the inbox is the fastest path.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:bg-orange hover:text-white"
              >
                <Upload className="size-4" strokeWidth={2.6} />
                Send your photo
              </Link>
              <a
                href="mailto:slablabsoz@gmail.com"
                className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-white/80 hover:text-yellow max-md:min-h-11"
              >
                slablabsoz@gmail.com →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const tint = TILE_TINTS[i % TILE_TINTS.length];
              return (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden border-2 border-white/20 ${tint.bg}`}
                >
                  <Image
                    src="/brand/slab-mockup.png"
                    alt=""
                    fill
                    sizes="(min-width: 768px) 20vw, 33vw"
                    className="object-cover opacity-80"
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
