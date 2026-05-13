import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Hand,
  Layers,
  Play,
  Ruler,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Timer,
  Truck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Three steps from finding a slab to displaying your card. Slablabs never touches your card.",
};

const STEPS = [
  {
    n: "01",
    Icon: Search,
    title: "Find your slab",
    body: "Browse the catalog by Pokémon set or by card. Each slab kit is keyed to a specific card — pick the one that matches a card you already own. The printed surround extends that card's artwork past its border so the slab and card read as one piece.",
    color: "text-magenta",
    bg: "bg-pink-tint",
  },
  {
    n: "02",
    Icon: Box,
    title: "Your kit ships",
    body: "Custom-printed surround plus the optical-PET case, packed flat. Free standard shipping inside Australia on orders over $99, delivered in 3 to 5 business days. We don't ship internationally yet. Nothing inside the case when it arrives — the box ships empty so your card can fill it.",
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
  },
  {
    n: "03",
    Icon: Layers,
    title: "Slab it yourself",
    body: "Slide your card into the printed surround so the artwork lines up. Snap the case shut. Done in under a minute, no tools, no glue. Your card stays in your hands the whole time.",
    color: "text-lime-deep",
    bg: "bg-mint-tint",
  },
];

const FEATURES = [
  {
    Icon: Hand,
    title: "Card never leaves home",
    body: "You insert it. We never see it.",
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
    body: "On orders over $99. AU-only for now.",
    color: "text-orange",
  },
  {
    Icon: Timer,
    title: "60-second build",
    body: "Tool-free, snap-seal assembly.",
    color: "text-lime",
  },
];

const SPECS = [
  {
    label: "Card compatibility",
    value: "Standard TCG",
    detail: "63 × 88 mm · sleeved or unsleeved",
  },
  {
    label: "Surround",
    value: "Custom print",
    detail: "Optical PET · artwork-extended per card",
  },
  {
    label: "Case",
    value: "Optical PET",
    detail: "UV-resistant · acid-free · snap-seal",
  },
  {
    label: "Kit weight",
    value: "~25 g",
    detail: "Packed flat for shipping",
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
        body="Slablabs is print-and-assemble. We design and print the surround that extends your card's art. You supply the card and snap it together at home. No grading queue, no shipping risk, no middlemen."
        bg="lavender"
      />

      {/* STEPS */}
      <section className="border-b border-line bg-white">
        <Container className="flex flex-col gap-10 py-14 md:py-20">
          {STEPS.map((s, i) => (
            <article
              key={s.n}
              className={`grid items-center gap-6 md:grid-cols-[1fr_1.2fr] md:gap-12 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden border-2 border-text p-6 md:p-10 ${s.bg}`}
              >
                <Octagon
                  className={`pointer-events-none absolute -right-8 -bottom-8 size-48 rotate-12 opacity-30 ${s.color}`}
                />
                <div className="relative flex h-full flex-col items-start justify-between">
                  <span
                    className={`font-display text-5xl leading-none ${s.color} md:text-6xl`}
                  >
                    {s.n}
                  </span>
                  <span className="inline-flex size-24 items-center justify-center rounded-full bg-white text-text shadow-sm md:size-28">
                    <s.Icon className={`size-12 ${s.color} md:size-14`} strokeWidth={2.2} />
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

      {/* WHAT'S IN THE BOX */}
      <section className="border-b border-line bg-cream">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-14">
            <span className="eyebrow inline-flex items-center gap-1.5 text-orange">
              <Box className="size-3.5" strokeWidth={2.6} />
              What ships
            </span>
            <h2 className="section-h2 max-w-2xl">
              What&apos;s in the <span className="text-orange">kit.</span>
            </h2>
            <p className="mt-1 max-w-xl text-sm text-text-soft md:text-base">
              Two printed parts, packed flat. Snap them around the card you
              already own.
            </p>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6">
            <ExplodedPart
              label="01 · Surround"
              role="In the kit"
              body="Custom-printed octagonal frame. Slides around the card and extends the artwork past the border."
              accent="bg-orange/15 text-orange border-orange"
            >
              <SurroundIllustration />
            </ExplodedPart>

            <Plus />

            <ExplodedPart
              label="02 · Your card"
              role="You supply"
              body="The standard-size TCG card you want to display. Comes from your own collection."
              accent="bg-magenta/10 text-magenta border-magenta"
              striped
            >
              <CardIllustration />
            </ExplodedPart>

            <Plus />

            <ExplodedPart
              label="03 · Case"
              role="In the kit"
              body="Optical-PET shell. Surround + card sit inside; the case snaps shut and the slab is sealed."
              accent="bg-cyan/15 text-cyan-deep border-cyan-deep"
            >
              <CaseIllustration />
            </ExplodedPart>
          </div>

          <p className="mt-8 text-center text-xs uppercase tracking-[0.18em] text-muted">
            Also in the box: a microfibre wipe for cleaning your card before assembly.
          </p>
        </Container>
      </section>

      {/* SPECS STRIP */}
      <section className="border-b border-line bg-white">
        <Container className="py-12 md:py-16">
          <div className="mb-8 flex flex-col items-start gap-2">
            <span className="eyebrow inline-flex items-center gap-1.5 text-cyan-deep">
              <Ruler className="size-3.5" strokeWidth={2.6} />
              Fit &amp; finish
            </span>
            <h2 className="section-h2">
              The <span className="text-cyan-deep">numbers.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {SPECS.map((s) => (
              <div key={s.label} className="border-2 border-text bg-bg-soft p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </span>
                <p className="mt-1.5 font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-text-soft md:text-sm">{s.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* VIDEO PLACEHOLDER */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="mb-8 flex flex-col items-start gap-2">
            <span className="eyebrow inline-flex items-center gap-1.5 text-magenta">
              <Play className="size-3.5" strokeWidth={2.6} />
              Build, in real time
            </span>
            <h2 className="section-h2">
              60 seconds, <span className="text-magenta">start to finish.</span>
            </h2>
          </div>
          <VideoPlaceholder />
        </Container>
      </section>

      {/* THE MOAT */}
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
                No grading. <span className="text-yellow">No middlemen.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-white/85 md:text-lg">
              <p>
                Most TCG display options ask you to mail your card off to be
                graded. Months in transit, fees stacked on fees, and your card
                in someone else&apos;s hands. Even when it comes back, a 7 or an
                8 often gets buried in a binder because it &quot;didn&apos;t
                grade well enough.&quot;
              </p>
              <p>
                Slablabs flips that. The surround is custom-printed for the
                card you already own, the slab is sealed at home, and not every
                card needs a 10 to deserve the spotlight.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 border border-white/15 bg-white/5 p-5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-text">
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

      {/* REASSURANCE CALLOUT */}
      <section className="border-b border-line bg-white">
        <Container className="py-12 md:py-16">
          <div className="grid items-center gap-6 border-2 border-text bg-bg-soft p-6 md:grid-cols-[auto_1fr] md:gap-8 md:p-10">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-orange text-white md:size-16">
              <ShieldAlert className="size-7 md:size-8" strokeWidth={2.2} />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl uppercase leading-tight md:text-3xl">
                Worried you&apos;ll mess it up?
              </h3>
              <p className="text-sm leading-relaxed text-text-soft md:text-base">
                The snap-seal is forgiving. Most first builds go fine. If you
                bend the surround or scratch the case during assembly, email us
                and we&apos;ll send a replacement surround at cost. Your card
                stays with you the whole time, so the worst-case is a few
                minutes lost.
              </p>
              <Link
                href="/build-guide"
                className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange hover:underline"
              >
                Read the detailed build guide
                <ArrowRight className="size-3.5" strokeWidth={2.6} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA CLOSE */}
      <section className="bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
            <div className="flex flex-col gap-4">
              <span className="eyebrow text-orange">Ready to slab</span>
              <h2 className="section-h2">
                Find a kit for a card{" "}
                <span className="text-orange">you already own.</span>
              </h2>
              <p className="max-w-xl text-sm text-text-soft md:text-base">
                Custom-printed surrounds from $15 AUD. Free shipping inside
                Australia on orders over $99. Card not included.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link href="/shop" className="btn-orange">
                  Find your slab
                  <ArrowRight className="size-4" strokeWidth={2.6} />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-text bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-text hover:bg-text hover:text-white"
                >
                  See real builds
                  <ArrowRight className="size-3.5" strokeWidth={2.6} />
                </Link>
              </div>
              <p className="mt-2 text-xs text-muted">
                More questions?{" "}
                <Link
                  href="/support"
                  className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
                >
                  Hit support
                </Link>{" "}
                or browse the{" "}
                <Link
                  href="/#faq"
                  className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
                >
                  full FAQ
                </Link>
                .
              </p>
            </div>

            <aside className="flex flex-col items-start gap-1 border-2 border-text bg-orange/10 p-6 md:p-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                Starting at
              </span>
              <p className="font-display text-5xl leading-none tracking-tight md:text-6xl">
                $15
              </p>
              <span className="mt-1 text-xs uppercase tracking-wider text-muted">
                AUD · single-kit price
              </span>
              <p className="mt-3 text-sm leading-relaxed text-text-soft">
                Custom-printed surround + optical-PET case.{" "}
                <strong className="text-text">Card not included.</strong>
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

// ---------- Sub-components for the "What's in the box" diagram ----------

function ExplodedPart({
  label,
  role,
  body,
  accent,
  striped,
  children,
}: {
  label: string;
  role: string;
  body: string;
  accent: string;
  striped?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden border-2 border-text bg-white ${
          striped ? "[background-image:repeating-linear-gradient(45deg,#0a0a0a0a_0_8px,transparent_8px_16px)]" : ""
        }`}
      >
        {children}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text">
            {label}
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${accent}`}
          >
            {role}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-text-soft md:text-sm">
          {body}
        </p>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <span className="font-display text-3xl text-line-strong">+</span>
    </div>
  );
}

function SurroundIllustration() {
  // Slab surround: a rectangular printed frame slightly larger than the card,
  // with a card-sized rectangular cutout in the middle. Real product is a
  // standard card-slab shape, not the octagonal logo motif.
  return (
    <div className="relative flex h-[80%] w-[64%] items-center justify-center rounded-md bg-orange p-[14%] shadow-[4px_4px_0_rgba(10,10,10,0.18)]">
      <div className="relative flex h-full w-full items-center justify-center rounded-sm bg-cream">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
          Card
          <br />
          slot
        </span>
      </div>
      <span className="absolute -left-1 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-sm bg-orange/70" aria-hidden />
      <span className="absolute -right-1 top-1/2 h-10 w-1 -translate-y-1/2 rounded-l-sm bg-orange/70" aria-hidden />
    </div>
  );
}

function CardIllustration() {
  return (
    <div className="relative flex h-[78%] w-[58%] flex-col justify-between rounded-md border-2 border-text bg-white p-3 shadow-[4px_4px_0_rgba(255,106,0,0.35)]">
      <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted">
        Your card
      </span>
      <div className="flex flex-1 items-center justify-center">
        <span className="font-display text-4xl uppercase text-text/30">?</span>
      </div>
      <span className="text-[8px] uppercase tracking-wider text-muted">
        From your collection
      </span>
    </div>
  );
}

function CaseIllustration() {
  // Slab case: rectangular shell with rounded corners, faint inner ridge that
  // hints at the snap-seal joint. Card slab shape, not the brand octagon.
  return (
    <div className="relative flex h-[82%] w-[66%] items-center justify-center rounded-lg border-2 border-cyan-deep bg-white shadow-[4px_4px_0_rgba(0,184,224,0.25)]">
      <div className="absolute inset-[6%] rounded-md border border-dashed border-cyan-deep/40" aria-hidden />
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-cyan-deep/30" />
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-cyan-deep/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-cyan-deep">
        Snap-seal
      </span>
    </div>
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
            "radial-gradient(50% 60% at 30% 40%, rgba(255,106,0,0.32) 0%, transparent 65%), radial-gradient(45% 50% at 80% 75%, rgba(139,62,255,0.28) 0%, transparent 60%)",
        }}
      />
      <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
        <span className="inline-flex size-20 items-center justify-center rounded-full bg-orange text-text shadow-[6px_6px_0_rgba(0,0,0,0.4)]">
          <Play className="size-9 fill-text" strokeWidth={0} />
        </span>
        <p className="font-display text-2xl uppercase leading-tight tracking-tight md:text-4xl">
          Assembly walkthrough
        </p>
        <p className="max-w-md text-sm text-white/70 md:text-base">
          Filmed after the first batch ships. Real card, real surround, real
          snap. Watch how the kit comes together in under a minute.
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
          <span className="inline-block size-1.5 rounded-full bg-orange" />
          Video coming soon
        </span>
      </div>
    </div>
  );
}
