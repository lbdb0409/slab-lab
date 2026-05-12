import Link from "next/link";
import { ArrowRight, Search, Box, Sparkles, Workflow } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

const STEPS = [
  {
    n: 1,
    Icon: Search,
    title: "Find your slab",
    body: "Pick the slab kit that matches a card you already own. We don't sell the card. You supply it from your own collection.",
    color: "text-magenta",
    bg: "bg-pink-tint",
  },
  {
    n: 2,
    Icon: Box,
    title: "Your kit ships",
    body: "The custom-printed surround and slab case arrive at your door, packed flat. No card inside, just the kit.",
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
  },
  {
    n: 3,
    Icon: Sparkles,
    title: "Slab it yourself",
    body: "Slot your card into the surround, snap the case shut, put it on the shelf. Your card never leaves your hands.",
    color: "text-lime-deep",
    bg: "bg-mint-tint",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 50% at 100% 0%, rgba(139,62,255,0.14) 0%, rgba(139,62,255,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(35% 45% at 0% 100%, rgba(0,184,224,0.14) 0%, rgba(0,184,224,0) 60%)",
        }}
      />
      <Octagon className="absolute -right-10 -top-8 size-40 rotate-12 text-purple/25 md:size-52" />
      <Octagon className="absolute -left-12 -bottom-6 size-36 -rotate-12 text-cyan/25 md:size-44" />

      <Container className="relative py-14 md:py-20">
        <div className="mb-10 flex flex-col items-start gap-2 md:mb-14">
          <span className="eyebrow inline-flex items-center gap-1.5 text-purple">
            <Workflow className="size-3.5" strokeWidth={2.6} />
            How it works
          </span>
          <h2 className="section-h2 max-w-2xl">
            Three steps to a <span className="text-purple">built slab.</span>
          </h2>
        </div>

        <div className="relative grid gap-4 md:grid-cols-3 md:gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`relative overflow-hidden flex flex-col gap-4 border-2 border-text p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${step.bg}`}
            >
              <Octagon
                className={`pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 opacity-30 ${step.color}`}
              />
              <div className="relative flex items-center justify-between">
                <span className={`font-display text-6xl leading-none md:text-7xl ${step.color}`}>
                  0{step.n}
                </span>
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-text shadow-sm hover-wiggle">
                  <step.Icon className={`size-5 ${step.color}`} strokeWidth={2.4} />
                </span>
              </div>
              <h3 className="relative font-display text-2xl uppercase leading-tight md:text-3xl">
                {step.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-text-soft md:text-base">
                {step.body}
              </p>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="absolute right-0 top-7 hidden text-text/30 md:inline">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Need help building?{" "}
            <Link
              href="/build-guide"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              Read the build guide
            </Link>
            .
          </p>
          <Link href="/shop" className="btn-orange">
            Find your slab
            <ArrowRight className="size-3.5" strokeWidth={2.6} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
