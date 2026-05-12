import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Hand,
  Search,
  Shield,
  Sparkles,
  Truck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Three steps from finding a slab to displaying your card — and Slablabs never touches your card.",
};

const STEPS = [
  {
    n: "01",
    Icon: Search,
    title: "Find your slab",
    body: "Browse the catalog by Pokémon set or card. Each slab kit is keyed to a specific card — the printed surround extends that card's artwork past the border, so you pick the one that matches a card you already own.",
    color: "text-magenta",
    bg: "bg-pink-tint",
  },
  {
    n: "02",
    Icon: Box,
    title: "Your kit ships",
    body: "Custom-printed surround + slab case, packed flat, free AU shipping over $99. Arrives in 3–5 days. Nothing inside the case — the box ships empty so your card can fill it.",
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
  },
  {
    n: "03",
    Icon: Sparkles,
    title: "Slab it yourself",
    body: "Slide your card into the printed surround so the artwork aligns. Snap the case shut. Done. Card stays in your hands the whole time — no mailing, no middlemen, no grading queue.",
    color: "text-lime-deep",
    bg: "bg-mint-tint",
  },
];

const FEATURES = [
  {
    Icon: Hand,
    title: "Card never leaves home",
    body: "You insert. We never touch it.",
    color: "text-magenta",
  },
  {
    Icon: Shield,
    title: "Display-grade PET",
    body: "UV-resistant, acid-free, optical-clear.",
    color: "text-cyan",
  },
  {
    Icon: Truck,
    title: "Free AU shipping",
    body: "On orders over $99.",
    color: "text-orange",
  },
  {
    Icon: Sparkles,
    title: "60-second build",
    body: "Tool-free, snap-seal assembly.",
    color: "text-lime",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/how-it-works", label: "How it works" }]}
        eyebrow="How it works"
        EyebrowIcon={Sparkles}
        eyebrowColor="purple"
        title={
          <>
            Three steps.{" "}
            <span className="text-purple">Your card never leaves your hands.</span>
          </>
        }
        body="Slablabs is print-and-assemble. We design and print the surround that extends your card's art; you supply the card and snap it together at home. No grading queue, no shipping risk, no middlemen."
        bg="lavender"
      />

      {/* STEPS */}
      <section className="border-b border-line bg-white">
        <Container className="flex flex-col gap-10 py-14 md:py-20">
          {STEPS.map((s, i) => (
            <article
              key={s.n}
              className={`grid items-center gap-6 md:grid-cols-[1fr_1.2fr] md:gap-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden border-2 border-text p-6 md:p-10 ${s.bg}`}
              >
                <Octagon
                  className={`pointer-events-none absolute -right-8 -bottom-8 size-44 rotate-12 opacity-30 ${s.color}`}
                />
                <div className="relative flex h-full flex-col items-start justify-between">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-white text-text shadow-sm">
                    <s.Icon className={`size-7 ${s.color}`} strokeWidth={2.4} />
                  </span>
                  <span
                    className={`font-display text-[7rem] leading-none ${s.color} md:text-[10rem]`}
                  >
                    {s.n}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.18em] ${s.color}`}
                >
                  Step {s.n}
                </span>
                <h2 className="section-h2">{s.title}</h2>
                <p className="max-w-lg text-base leading-relaxed text-text-soft md:text-lg">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </Container>
      </section>

      {/* THE MOAT — dark */}
      <section className="relative overflow-hidden border-b border-line bg-text text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 20% 30%, rgba(255,106,0,0.3) 0%, rgba(255,106,0,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 50% at 80% 80%, rgba(139,62,255,0.25) 0%, rgba(139,62,255,0) 60%)",
          }}
        />
        <Octagon className="absolute -left-14 top-8 size-48 rotate-12 text-orange/30 md:size-60" />
        <Octagon className="absolute -right-12 -bottom-8 size-44 -rotate-12 text-purple/30 md:size-56" />
        <ConfettiField />

        <Container className="relative py-16 md:py-24">
          <div className="grid items-start gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <span className="eyebrow text-yellow">Why this way</span>
              <h2 className="section-h2 mt-3">
                No grading.{" "}
                <span className="text-yellow">No middlemen.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-white/85 md:text-lg">
              <p>
                Most TCG display options ask you to mail your card off to be
                graded — months in transit, fees stacked on fees, and your card
                in someone else's hands. Even when it comes back, a 7 or an 8
                often gets buried in a binder because it &quot;didn&apos;t
                grade well enough.&quot;
              </p>
              <p>
                Slablabs flips that. We never see your card. The surround is
                custom-printed for the card you already own, the slab is sealed
                at home, and not every card needs a 10 to deserve the
                spotlight.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 border border-white/15 bg-white/5 p-5"
              >
                <span
                  className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-text`}
                >
                  <f.Icon className={`size-5 ${f.color}`} strokeWidth={2.4} />
                </span>
                <div>
                  <h3 className="font-display text-base uppercase leading-tight">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/65">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ-LITE */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2">
            <span className="eyebrow text-cyan-deep">Quick answers</span>
            <h2 className="section-h2">
              Things people <span className="text-cyan-deep">ask first.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {[
              {
                q: "Does the kit come with a card?",
                a: "No — slab kits include the printed surround and the slab case only. You supply the trading card from your own collection.",
              },
              {
                q: "Does this grade my card?",
                a: "No. Slablabs is a display product, not a grading service. We don't authenticate, grade, or assign condition. It's purely for showing the card off.",
              },
              {
                q: "How long does assembly take?",
                a: "About 60 seconds. Slide the card into the printed surround, snap the case shut, you're done. No tools required.",
              },
              {
                q: "Can I open it later if I want my card back?",
                a: "Yes — the case is sealed but not destroyed by opening. You can pop your card back out whenever you want.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="border-2 border-text bg-white p-6 md:p-7"
              >
                <h3 className="font-display text-xl uppercase leading-tight md:text-2xl">
                  {item.q}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-soft md:text-base">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              More questions?{" "}
              <Link
                href="/support"
                className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
              >
                Hit support
              </Link>
              .
            </p>
            <Link href="/shop" className="btn-orange">
              Find your slab
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
