import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Hand,
  Heart,
  Hourglass,
  MapPin,
  Printer,
  Sparkles,
  Truck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Slablabs is an independent Australian company building custom-printed display slabs for trading cards.",
  alternates: { canonical: "/about" },
};

const COMMITMENTS = [
  {
    Icon: Hand,
    title: "Your card is yours.",
    body: "We don't grade it, we don't ship it, we don't touch it. The whole product is built around that.",
    color: "text-magenta",
    bg: "bg-pink-tint",
  },
  {
    Icon: Heart,
    title: "Made for the spotlight.",
    body: "Not every card scores a 10. Sentiment, set art, played-condition vintage. All of it deserves to be shown.",
    color: "text-purple",
    bg: "bg-lavender",
  },
  {
    Icon: Printer,
    title: "Printed, not produced.",
    body: "Each slab surround is custom-printed for one specific card. It isn't generic stock. It's made for the card you own.",
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
  },
  {
    Icon: Sparkles,
    title: "Built by you.",
    body: "We ship the kit. You snap it together. The slab is yours from the first second.",
    color: "text-lime-deep",
    bg: "bg-mint-tint",
  },
];

const STATS = [
  { label: "Started", value: "2026", accent: "text-magenta" },
  { label: "TCGs covered", value: "1 → 4", accent: "text-cyan-deep" },
  { label: "Cards your slab handles", value: "Yours only", accent: "text-purple" },
  { label: "Build time", value: "≈ 60s", accent: "text-orange" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/about", label: "About" }]}
        eyebrow="About Slablabs"
        EyebrowIcon={Sparkles}
        eyebrowColor="orange"
        title={
          <>
            Slabs for the cards <span className="text-orange">that won't grade.</span>
          </>
        }
        body="Slablabs is an independent Australian company building custom-printed display slabs for trading cards. We start with Pokémon. One Piece, Magic, and Lorcana are next."
        bg="cream"
      />

      {/* STORY */}
      <section className="border-b border-line bg-white">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-[1.15fr_1fr] md:gap-16 md:py-20">
          <div className="flex flex-col gap-5">
            <span className="eyebrow text-magenta">The story</span>
            <h2 className="section-h2">
              Why we <span className="text-magenta">started.</span>
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-text-soft md:text-lg">
              <p>
                Walk into any card shop and you&apos;ll see the same thing: the
                PSA-10 Charizards live in display cases. The played-condition
                copy someone&apos;s loved since they were ten lives in a sleeve
                in a shoebox.
              </p>
              <p>
                Slablabs builds slabs for that shoebox. Custom-printed
                surrounds keyed to specific cards, designed so the artwork
                doesn&apos;t stop at the card border. You supply the card; we
                print the world around it.
              </p>
              <p>
                Independent. Australian. Built around one rule: your card
                never leaves your hands.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/shop" className="btn-orange">
                See the catalog
                <ArrowRight className="size-4" strokeWidth={2.6} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(255,106,0,0.35) 0%, transparent 70%)",
              }}
            />
            <div className="relative aspect-[3/4] overflow-hidden border-2 border-text bg-white">
              <Image
                src="/brand/slab-mockup.png"
                alt="Slablabs Mega Gengar EX expanded-art display slab"
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 inline-flex rounded-full bg-text px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                № 001 · Mega Gengar EX
              </span>
            </div>
            <div className="absolute -bottom-3 left-4 right-4 grid grid-cols-3 gap-px border-2 border-text bg-text">
              {STATS.slice(0, 3).map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-0.5 bg-text px-2 py-2.5 text-center text-white"
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                    {s.label}
                  </span>
                  <span className={`font-display text-sm uppercase ${s.accent}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* MANTRA. Single elegant line, not a giant duplicate of the home */}
      <section className="relative overflow-hidden border-b border-line bg-cream">
        <Octagon className="absolute -left-12 top-6 size-40 rotate-12 text-orange/25 md:size-52" />
        <Octagon className="absolute -right-14 bottom-4 size-36 -rotate-12 text-magenta/25 md:size-48" />
        <ConfettiField />

        <Container className="relative py-16 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-orange">
              <span className="inline-block size-1.5 rounded-full bg-orange" />
              Our mantra
            </span>
            <blockquote className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] uppercase leading-[1.05] tracking-tight">
              &ldquo;Not every card needs a{" "}
              <span className="relative inline-block">
                <span aria-hidden className="absolute inset-0 -skew-x-6 bg-magenta" />
                <span className="relative px-2 text-white">10</span>
              </span>{" "}
              to deserve the <span className="text-orange">spotlight</span>.&rdquo;
            </blockquote>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
Slablabs
            </span>
          </div>
        </Container>
      </section>

      {/* COMMITMENTS */}
      <section className="border-b border-line bg-white">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-purple">What we hold to</span>
            <h2 className="section-h2">
              Four <span className="text-purple">commitments.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {COMMITMENTS.map((c) => (
              <article
                key={c.title}
                className={`relative overflow-hidden border-2 border-text p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${c.bg}`}
              >
                <Octagon
                  className={`pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 opacity-30 ${c.color}`}
                />
                <div className="relative flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <c.Icon className={`size-5 ${c.color}`} strokeWidth={2.4} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight md:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-soft md:text-base">
                      {c.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* HEADLINE STATS */}
      <section className="relative overflow-hidden border-b border-line bg-text text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 20% 30%, rgba(255,106,0,0.28) 0%, rgba(255,106,0,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 80% 80%, rgba(139,62,255,0.22) 0%, rgba(139,62,255,0) 60%)",
          }}
        />
        <Octagon className="absolute -left-12 -top-8 size-44 rotate-12 text-orange/25 md:size-56" />
        <Octagon className="absolute -right-14 -bottom-6 size-44 -rotate-12 text-purple/25 md:size-56" />
        <ConfettiField />

        <Container className="relative py-14 md:py-20">
          <div className="grid items-end gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-yellow">By the numbers</span>
              <h2 className="font-display text-[clamp(2rem,5.5vw,4rem)] uppercase leading-[0.95] tracking-tight">
                Small operation. <span className="text-yellow">Sharp focus.</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              We&apos;re an independent Australian company. No investors, no
              warehouse, no card-handling middlemen. Just one product line and
              the operators behind it.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border-2 border-white/20 bg-white/15 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start gap-2 bg-text p-6 md:p-8"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                  {s.label}
                </dt>
                <dd
                  className={`font-display text-3xl uppercase leading-none md:text-4xl ${s.accent}`}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* INDEPENDENCE STATEMENT */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-12">
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange">
                <MapPin className="size-3.5" strokeWidth={2.6} />
                Independent &amp; unaffiliated
              </span>
              <h2 className="font-display text-3xl uppercase leading-tight md:text-4xl">
                We&apos;re not a TCG.{" "}
                <span className="text-orange">We just make their slabs.</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-text-soft md:text-base">
              Slablabs is an independent Australian company. We are not
              affiliated with, sponsored by, or endorsed by The Pokémon
              Company, Nintendo, Game Freak, Creatures, Bandai (One Piece),
              Wizards of the Coast (Magic: The Gathering), Disney, or
              Ravensburger (Lorcana). All trademarks, product names, logos,
              and brand names are property of their respective owners and
              referenced here for identification only.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-b border-line bg-orange text-white">
        <Container className="grid items-center gap-8 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-yellow">
              <Hourglass className="size-3.5" strokeWidth={2.6} />
              Ready?
            </span>
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] uppercase leading-[0.92] tracking-tight">
              Pick a card.{" "}
              <span className="text-text">Find your slab.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-text px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-yellow hover:text-text"
            >
              Browse slabs
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-text"
            >
              How it works
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
