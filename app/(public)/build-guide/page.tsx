import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Box,
  Hand,
  Layers,
  Lightbulb,
  Lock,
  Play,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";
import { PrintButton } from "@/components/build-guide/print-button";

export const metadata: Metadata = {
  title: "Build guide",
  description:
    "Step-by-step Slablabs slab kit assembly. Five steps, sixty seconds, no tools.",
};

type Step = {
  n: string;
  title: string;
  time: string;
  Icon: typeof Box;
  color: string;
  bg: string;
  intro: string;
  checklist: string[];
  Diagram: () => React.JSX.Element;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Open the kit",
    time: "~5s",
    Icon: Box,
    color: "text-magenta",
    bg: "bg-pink-tint",
    intro:
      "Slide the mailer open and lay the contents on your workspace.",
    checklist: [
      "Printed surround sheet",
      "Snap-seal slab case",
      "Microfibre wipe",
      "Card the surround was printed for, ready",
    ],
    Diagram: BoxDiagram,
  },
  {
    n: "02",
    title: "Prep your card",
    time: "~10s",
    Icon: Hand,
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
    intro: "Hold it by the edges. Wipe if needed.",
    checklist: [
      "Sleeve off, hold by edges only",
      "Quick wipe with the microfibre, both faces",
      "No fingerprints on the front — they sit under PET forever",
    ],
    Diagram: HandCardDiagram,
  },
  {
    n: "03",
    title: "Slot card into surround",
    time: "~15s",
    Icon: Layers,
    color: "text-purple",
    bg: "bg-lavender",
    intro:
      "The surround's printed artwork should flow out of the card art. That's the alignment cue.",
    checklist: [
      "Face up, surround recess",
      "Check the art continues outward",
      "Rotated wrong? Flip 180° — don't force",
    ],
    Diagram: SlotDiagram,
  },
  {
    n: "04",
    title: "Snap the case shut",
    time: "~5s",
    Icon: Lock,
    color: "text-lime-deep",
    bg: "bg-mint-tint",
    intro: "Four corner clicks and it's sealed. Press corners, not centre.",
    checklist: [
      "Place case over surround, aligned",
      "Press each corner until it clicks",
      "Centre flexes — never push there",
    ],
    Diagram: SnapDiagram,
  },
  {
    n: "05",
    title: "Display",
    time: "~25s to admire",
    Icon: Award,
    color: "text-orange",
    bg: "bg-gold",
    intro: "On a shelf, flat on a desk, or up on a wall. PET is anti-glare so it photographs well.",
    checklist: [
      "Stand it up, lay it flat, or mount",
      "Keep out of direct sun long-term",
      "Email us a photo and we'll feature it in the gallery",
    ],
    Diagram: DisplayDiagram,
  },
];

const TIPS = [
  {
    title: "Clean hands, clean card",
    body: "Wash and dry hands first. Hold by edges. Any oils on the card face magnify under PET.",
  },
  {
    title: "Align with the art, not the corners",
    body: "The surround's printed artwork should flow into the card's art. Off by 90°? Rotate the card.",
  },
  {
    title: "Press corners, not the centre",
    body: "Four corner clicks = sealed. Pressing the centre flexes the PET and can cause bubbles.",
  },
  {
    title: "Store flat or upright, out of sun",
    body: "PET is UV-resistant but card pigments aren't. Direct long-term sunlight will still fade them.",
  },
];

const TROUBLESHOOTING = [
  {
    q: "I see a bubble between the card and the PET.",
    a: "Pop a corner open, lift the PET slightly, press down again from one corner across to the opposite. Like applying a screen protector. The bubble pushes out.",
  },
  {
    q: "The art on the surround doesn't line up.",
    a: "Card is probably rotated 180°. Pop it open, flip the card, snap it shut again.",
  },
  {
    q: "I damaged the case during assembly.",
    a: "Email support. We replace defective cases free, and replace customer-damaged cases at cost. Your card stays at home either way.",
  },
  {
    q: "I want to remove the card later.",
    a: "Slide a card-tool or a fingernail along the seam at one corner. The case pops open. Card slides out. Surround can be reused if it's not damaged.",
  },
];

export default function BuildGuidePage() {
  return (
    <>
      {/* Print stylesheet — hides nav/footer/decoration when the page is printed. */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          header, footer, [aria-hidden], .anim-marquee,
          .confetti-dot { display: none !important; }
          .print-break-before { break-before: page; }
          a[href]:after { content: " (" attr(href) ")"; color: #666; font-size: 0.85em; }
          .print-keep-inline a[href]:after { content: ""; }
        }
      `}</style>

      <PageHeader
        crumbs={[{ href: "/build-guide", label: "Build guide" }]}
        eyebrow="Build guide"
        EyebrowIcon={Wrench}
        eyebrowColor="cyan"
        title={
          <>
            Kit just arrived?{" "}
            <span className="text-cyan-deep">Build it in 60 seconds.</span>
          </>
        }
        body="Five steps, no tools, no shipping your card off. Made for someone with a kit on the desk in front of them right now."
        bg="sky"
        actions={
          <>
            <PrintButton />
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-text hover:border-text print:hidden"
            >
              <ArrowLeft className="size-3.5" strokeWidth={2.4} />
              First time? How it works
            </Link>
          </>
        }
      />

      {/* PRE-FLIGHT */}
      <section className="border-b border-line bg-white print:hidden">
        <Container className="py-10 md:py-14">
          <div className="mb-6 flex flex-col items-start gap-2">
            <span className="eyebrow text-magenta">Pre-flight</span>
            <h2 className="section-h2">
              You need <span className="text-magenta">two things.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
            <PreflightCard
              n="1"
              accentText="text-magenta"
              accentBg="bg-pink-tint"
              title="The card"
              body="Standard 63 × 88 mm Pokémon TCG card the kit was printed for. Pulled from your collection."
            />
            <PreflightCard
              n="2"
              accentText="text-lime-deep"
              accentBg="bg-mint-tint"
              title="A clean surface"
              body="Flat, dust-free, well-lit. No food and drink nearby. Hands washed and dry."
            />
          </div>
          <p className="mt-6 text-xs text-muted">
            The surround, case, and microfibre wipe are already in the kit.
          </p>
        </Container>
      </section>

      {/* STEP-BY-STEP */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3 md:mb-14">
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-purple">Assembly</span>
              <h2 className="section-h2">
                Five steps, <span className="text-purple">in order.</span>
              </h2>
            </div>
            <span className="rounded-full border-2 border-text bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-text">
              Total time · ~60 seconds
            </span>
          </div>

          <ol className="flex flex-col gap-4 md:gap-5">
            {STEPS.map((s) => (
              <li key={s.n}>
                <article
                  className={`relative overflow-hidden border-2 border-text p-6 md:p-8 ${s.bg}`}
                >
                  <Octagon
                    aria-hidden
                    className={`pointer-events-none absolute -right-8 -bottom-8 size-36 rotate-12 opacity-25 ${s.color}`}
                  />
                  <div className="relative grid gap-6 md:grid-cols-[auto_1fr_180px] md:items-start md:gap-8">
                    {/* Number + icon stack */}
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                      <span
                        className={`font-display text-4xl leading-none md:text-5xl ${s.color}`}
                      >
                        {s.n}
                      </span>
                      <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-text shadow-sm md:size-14">
                        <s.Icon className={`size-6 ${s.color} md:size-7`} strokeWidth={2.2} />
                      </span>
                    </div>

                    {/* Title + intro + checklist */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-display text-2xl uppercase leading-tight md:text-3xl">
                          {s.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.18em] ${s.color}`}
                        >
                          {s.time}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-text-soft md:text-base">
                        {s.intro}
                      </p>
                      <ul className="flex flex-col gap-1.5 pt-1">
                        {s.checklist.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-text"
                          >
                            <span
                              aria-hidden
                              className={`mt-1.5 inline-block size-1.5 shrink-0 rounded-full ${
                                s.color === "text-magenta"
                                  ? "bg-magenta"
                                  : s.color === "text-cyan-deep"
                                    ? "bg-cyan-deep"
                                    : s.color === "text-purple"
                                      ? "bg-purple"
                                      : s.color === "text-lime-deep"
                                        ? "bg-lime-deep"
                                        : "bg-orange"
                              }`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Diagram */}
                    <div className="flex aspect-square w-full max-w-[180px] items-center justify-center rounded-md border-2 border-text bg-white p-4 md:mx-auto">
                      <s.Diagram />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* VIDEO PLACEHOLDER */}
      <section className="border-b border-line bg-white print:hidden">
        <Container className="py-14 md:py-20">
          <div className="mb-8 flex flex-col items-start gap-2">
            <span className="eyebrow inline-flex items-center gap-1.5 text-magenta">
              <Play className="size-3.5" strokeWidth={2.6} />
              Full walk-through
            </span>
            <h2 className="section-h2">
              Watch the <span className="text-magenta">whole build.</span>
            </h2>
            <p className="max-w-xl text-sm text-text-soft md:text-base">
              Camera over the shoulder, one card, one kit, one minute. Going up
              once the first batch has shipped.
            </p>
          </div>
          <VideoPlaceholder />
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
            <span className="eyebrow inline-flex items-center gap-1.5 text-yellow">
              <Lightbulb className="size-3.5" strokeWidth={2.6} />
              Tips
            </span>
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
                  <Lightbulb className="size-5" strokeWidth={2.4} />
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
            {TROUBLESHOOTING.map((item) => (
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

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 print:hidden">
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
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-deep"
            >
              Share your build
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function PreflightCard({
  n,
  accentText,
  accentBg,
  title,
  body,
}: {
  n: string;
  accentText: string;
  accentBg: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-2 border-text p-6 md:p-8 ${accentBg}`}
    >
      <Octagon
        aria-hidden
        className={`pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 opacity-30 ${accentText}`}
      />
      <span className={`font-display text-5xl leading-none ${accentText}`}>{n}</span>
      <h3 className="mt-3 font-display text-2xl uppercase">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-soft">{body}</p>
    </div>
  );
}

// ---------- Diagrams: minimal geometric line drawings, one per step. ----------

function BoxDiagram() {
  return (
    <svg viewBox="0 0 80 80" className="size-full text-magenta" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <rect x="14" y="32" width="52" height="34" rx="2" />
        <path d="M14 32 L40 14 L66 32" />
        <path d="M40 14 L40 50" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}

function HandCardDiagram() {
  return (
    <svg viewBox="0 0 80 80" className="size-full text-cyan-deep" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <rect x="28" y="10" width="32" height="46" rx="2" />
        {/* fingertips along the right edge */}
        <path d="M60 18 q4 0 4 4" />
        <path d="M60 28 q4 0 4 4" />
        <path d="M60 38 q4 0 4 4" />
        <path d="M60 48 q4 0 4 4" />
        {/* sparkle/clean mark */}
        <path d="M16 60 l4 -4 l4 4 l-4 4 z" />
      </g>
    </svg>
  );
}

function SlotDiagram() {
  return (
    <svg viewBox="0 0 80 80" className="size-full text-purple" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        {/* surround (larger rounded rect) */}
        <rect x="10" y="14" width="60" height="52" rx="3" />
        {/* card slot (inner rect) */}
        <rect x="24" y="22" width="32" height="44" rx="2" />
        {/* arrow into slot */}
        <path d="M40 4 L40 18" />
        <path d="M36 14 L40 18 L44 14" />
      </g>
    </svg>
  );
}

function SnapDiagram() {
  return (
    <svg viewBox="0 0 80 80" className="size-full text-lime-deep" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        {/* case outline */}
        <rect x="14" y="14" width="52" height="52" rx="4" />
        {/* corner click marks */}
        <path d="M14 22 L20 22 M14 22 L14 28" />
        <path d="M66 22 L60 22 M66 22 L66 28" />
        <path d="M14 58 L20 58 M14 58 L14 52" />
        <path d="M66 58 L60 58 M66 58 L66 52" />
        {/* downward press arrow */}
        <path d="M40 2 L40 12 M36 8 L40 12 L44 8" />
      </g>
    </svg>
  );
}

function DisplayDiagram() {
  return (
    <svg viewBox="0 0 80 80" className="size-full text-orange" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        {/* slab standing */}
        <rect x="22" y="10" width="36" height="48" rx="2" />
        <rect x="28" y="16" width="24" height="36" rx="1" />
        {/* stand */}
        <path d="M14 64 L40 70 L66 64" />
        <path d="M40 58 L40 70" />
        {/* sparkle */}
        <path d="M64 14 l2 -4 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 z" />
      </g>
    </svg>
  );
}

function VideoPlaceholder() {
  return (
    <div className="relative overflow-hidden border-2 border-text bg-text">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 30% 40%, rgba(0,184,224,0.28) 0%, transparent 65%), radial-gradient(45% 50% at 80% 75%, rgba(255,44,146,0.25) 0%, transparent 60%)",
        }}
      />
      <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
        <span className="inline-flex size-20 items-center justify-center rounded-full bg-cyan text-text shadow-[6px_6px_0_rgba(0,0,0,0.4)]">
          <Play className="size-9 fill-text" strokeWidth={0} />
        </span>
        <p className="font-display text-2xl uppercase leading-tight tracking-tight md:text-4xl">
          Full assembly · sixty seconds
        </p>
        <p className="max-w-md text-sm text-white/70 md:text-base">
          Real card, real surround, real snap. We&apos;ll drop the footage in
          here as soon as the first batch ships.
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
          <span className="inline-block size-1.5 rounded-full bg-cyan" />
          Video coming soon
        </span>
      </div>
    </div>
  );
}
