import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Hand,
  Layers,
  Lock,
  Search,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Build guide",
  description:
    "Step-by-step assembly guide for Slablabs slab kits. 60 seconds, no tools, your card never leaves your hands.",
};

const STEPS = [
  {
    n: "01",
    Icon: Search,
    title: "Unbox & inspect",
    body: "Pop the kit out of the mailer. You should have one printed surround sheet, one snap-seal slab case, and a microfibre wipe. Check the surround matches the card you're slabbing.",
    color: "text-magenta",
    bg: "bg-pink-tint",
  },
  {
    n: "02",
    Icon: Hand,
    title: "Pull your card",
    body: "Take the card out of the sleeve. Hold it by the edges. Fingerprints on the face will sit under PET for a long time. If it's an old card, do a quick wipe with the microfibre.",
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
  },
  {
    n: "03",
    Icon: Layers,
    title: "Slot it in",
    body: "Place the card face-up into the surround recess. The artwork on the surround should continue the card art outward. That's how you know it's the right orientation.",
    color: "text-purple",
    bg: "bg-lavender",
  },
  {
    n: "04",
    Icon: Lock,
    title: "Snap it shut",
    body: "Press the slab case down over the surround. You'll feel four corner clicks. That's it. It's sealed, but not destroyed: you can pop it apart later if you ever want the card back.",
    color: "text-lime-deep",
    bg: "bg-mint-tint",
  },
  {
    n: "05",
    Icon: Sparkles,
    title: "Display",
    body: "Stand it on a shelf, lay it flat, hang it on a wall. Optical-grade PET is anti-glare, so it photographs well too. Tag @slablabs if you want it featured.",
    color: "text-orange",
    bg: "bg-gold",
  },
];

const TIPS = [
  {
    title: "Clean hands, clean card",
    body: "Wash and dry hands. Hold by edges. Any oils on the card face will magnify under PET.",
  },
  {
    title: "Align with the art",
    body: "The surround's printed artwork should flow into the card's art. Off by 90°? Rotate the card, don't fight it.",
  },
  {
    title: "Press the corners, not the centre",
    body: "Four corner clicks = sealed. Pressing the centre flexes the PET and can cause bubbles.",
  },
  {
    title: "Store flat or upright",
    body: "Avoid storing on edge in direct sunlight for long periods. PET is UV-resistant but pigments still hate it.",
  },
];

export default function BuildGuidePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/build-guide", label: "Build guide" }]}
        eyebrow="Build guide"
        EyebrowIcon={Sparkles}
        eyebrowColor="cyan"
        title={
          <>
            60 seconds to a <span className="text-cyan-deep">sealed slab.</span>
          </>
        }
        body="Five steps, no tools, no shipping your card off. Print arrives flat-packed, you snap it together at home and put it on display the same day."
        bg="sky"
      />

      {/* WHAT YOU NEED */}
      <section className="border-b border-line bg-white">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-magenta">Before you start</span>
            <h2 className="section-h2">
              What you <span className="text-magenta">need.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <div className="relative overflow-hidden border-2 border-text bg-pink-tint p-6 md:p-8">
              <Octagon className="pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 text-magenta/30" />
              <span className="font-display text-5xl leading-none text-magenta">
                A
              </span>
              <h3 className="mt-3 font-display text-2xl uppercase">Your card</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-soft">
                The Pokémon TCG card you want to slab. Standard 63 × 88 mm size.
                Sleeve removed.
              </p>
            </div>
            <div className="relative overflow-hidden border-2 border-text bg-sky-tint p-6 md:p-8">
              <Octagon className="pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 text-cyan/30" />
              <span className="font-display text-5xl leading-none text-cyan-deep">
                B
              </span>
              <h3 className="mt-3 font-display text-2xl uppercase">Your kit</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-soft">
                The Slablabs slab kit keyed to your card. Printed surround +
                snap-seal case + microfibre wipe.
              </p>
            </div>
            <div className="relative overflow-hidden border-2 border-text bg-mint-tint p-6 md:p-8">
              <Octagon className="pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 text-lime/30" />
              <span className="font-display text-5xl leading-none text-lime-deep">
                C
              </span>
              <h3 className="mt-3 font-display text-2xl uppercase">
                A clean surface
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-soft">
                Flat, dust-free desk or counter. Good light. No food and drink
                nearby.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* STEP-BY-STEP */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-14">
            <span className="eyebrow text-purple">Assembly</span>
            <h2 className="section-h2">
              Five steps, <span className="text-purple">in order.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            {STEPS.map((s, i) => (
              <article
                key={s.n}
                className={`relative overflow-hidden border-2 border-text p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${s.bg}`}
              >
                <Octagon
                  className={`pointer-events-none absolute -right-8 -bottom-8 size-36 rotate-12 opacity-25 ${s.color}`}
                />
                <div className="relative grid items-center gap-6 md:grid-cols-[160px_1fr_auto]">
                  <span
                    className={`font-display text-7xl leading-none md:text-8xl ${s.color}`}
                  >
                    {s.n}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl uppercase leading-tight md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-text-soft md:text-base">
                      {s.body}
                    </p>
                  </div>
                  <span className="hidden size-14 items-center justify-center rounded-full bg-white text-text shadow-sm md:inline-flex">
                    <s.Icon className={`size-6 ${s.color}`} strokeWidth={2.4} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* TIPS */}
      <section className="relative overflow-hidden border-b border-line bg-text text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 80% 20%, rgba(255,203,0,0.2) 0%, rgba(255,203,0,0) 60%)",
          }}
        />
        <Octagon className="absolute -left-12 top-8 size-44 rotate-12 text-yellow/30 md:size-56" />
        <Octagon className="absolute -right-14 -bottom-8 size-44 -rotate-12 text-orange/30 md:size-56" />
        <ConfettiField />

        <Container className="relative py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-yellow">Tips</span>
            <h2 className="section-h2">
              From people who&apos;ve{" "}
              <span className="text-yellow">slabbed a few.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {TIPS.map((t) => (
              <article
                key={t.title}
                className="flex gap-4 border-2 border-white/15 bg-white/5 p-6"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow text-text">
                  <Sparkles className="size-5" strokeWidth={2.4} />
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {t.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* TROUBLESHOOTING */}
      <section className="border-b border-line bg-cream">
        <Container className="py-14 md:py-20">
          <div className="mb-8 flex flex-col items-start gap-2 md:mb-10">
            <span className="eyebrow inline-flex items-center gap-1.5 text-orange">
              <AlertTriangle className="size-3.5" strokeWidth={2.6} />
              If something goes wrong
            </span>
            <h2 className="section-h2">
              Quick <span className="text-orange">fixes.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: "I see a bubble between the card and the PET.",
                a: "Pop a corner open, lift the PET slightly, and press down again from one corner across to the opposite. Like applying a screen protector. The bubble pushes out.",
              },
              {
                q: "The art on the surround doesn't line up.",
                a: "The card is probably rotated 180°. Pop it open, flip the card, snap it shut again.",
              },
              {
                q: "I damaged the case.",
                a: "Email support. We replace defective cases free, and replace customer-damaged cases at cost. Your card stays at home either way.",
              },
              {
                q: "I want to remove the card later.",
                a: "Slide a card-tool or a fingernail along the seam at one corner. The case pops open. Card slides out. Surround can be reused if it's not damaged.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="border-2 border-text bg-white p-6 md:p-7"
              >
                <h3 className="font-display text-xl uppercase leading-tight">
                  {item.q}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-soft">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              Still stuck?{" "}
              <Link
                href="/support"
                className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
              >
                Hit support
              </Link>
              .
            </p>
            <Link href="/shop" className="btn-orange">
              Find another slab
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
