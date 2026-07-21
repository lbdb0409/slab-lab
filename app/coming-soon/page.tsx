import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Sparkles } from "lucide-react";

const OCTAGON_CLIP =
  "polygon(29.3% 0, 70.7% 0, 100% 29.3%, 100% 70.7%, 70.7% 100%, 29.3% 100%, 0 70.7%, 0 29.3%)";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { SubscribeForm } from "@/components/coming-soon/subscribe-form";
import { SITE_URL } from "@/components/seo/json-ld";
import { enterBypass } from "@/lib/actions/bypass";

const TCGS = [
  { name: "Pokémon", logo: "/brand/tcgs/pokemon.png", status: "live", accent: "#ffcb00" },
  { name: "One Piece", logo: "/brand/tcgs/one-piece.webp", status: "soon", accent: "#ff2d3e" },
  { name: "Magic: The Gathering", logo: "/brand/tcgs/mtg.png", status: "soon", accent: "#8b3eff" },
  { name: "Lorcana", logo: "/brand/tcgs/lorcana.avif", status: "soon", accent: "#00b8e0" },
] as const;

export const metadata: Metadata = {
  title: "Slablabs. Coming soon. Encase the art.",
  description:
    "Custom-printed display slabs for Pokémon trading cards. Print-and-assemble. Your card never leaves your hands. Join the launch list.",
  alternates: { canonical: "/coming-soon" },
  openGraph: {
    type: "website",
    title: "Slablabs. Coming soon.",
    description:
      "Custom-printed display slabs for Pokémon trading cards. Join the launch list to be first in.",
    url: `${SITE_URL}/coming-soon`,
    images: [
      {
        url: "/brand/slab-mockup.png",
        width: 1200,
        height: 630,
        alt: "Slablabs display slab. Coming soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slablabs. Coming soon.",
    description:
      "Custom-printed display slabs for Pokémon trading cards. Join the launch list to be first in.",
    images: ["/brand/slab-mockup.png"],
  },
  robots: { index: true, follow: true },
};

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ bypass?: string }>;
}) {
  const params = await searchParams;
  const bypassError = params.bypass === "invalid";

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-text text-white">
      {/* Ambient color washes */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 55% at 20% 20%, rgba(255,106,0,0.32) 0%, rgba(255,106,0,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 85% 80%, rgba(139,62,255,0.28) 0%, rgba(139,62,255,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 45% at 90% 10%, rgba(255,44,146,0.22) 0%, rgba(255,44,146,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-14 -top-10 size-56 rotate-12 text-white/10 md:size-72" />
      <Octagon className="absolute -right-14 top-32 size-44 -rotate-12 text-orange/30 md:size-56" />
      <Octagon className="absolute -left-10 bottom-24 size-40 -rotate-6 text-magenta/25 md:size-52" />
      <Octagon className="absolute -right-10 -bottom-12 size-48 rotate-12 text-purple/30 md:size-60" />
      <ConfettiField />

      {/* Top brand bar */}
      <header className="relative z-10 border-b border-white/10">
        <Container className="flex items-center justify-between py-5">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex rounded-xl border border-white/15 bg-text px-3 py-2.5">
              <Image
                src="/brand/logo.png"
                alt="Slablabs"
                width={160}
                height={80}
                className="h-9 w-auto md:h-11"
                priority
              />
            </span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-orange" />
            Launching soon
          </span>
        </Container>
      </header>

      {/* HERO */}
      <section className="relative z-10 flex-1">
        <Container className="grid items-center gap-12 py-12 md:grid-cols-[1.05fr_1fr] md:gap-16 md:py-20 lg:py-28">
          <div className="flex flex-col gap-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              Australia · Custom display slabs
            </span>

            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] uppercase leading-[0.86] tracking-tight">
              Encase
              <br />
              the <span className="text-orange">art.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Slablabs makes print-and-assemble display slabs for trading cards.
              Custom-printed surrounds that extend the artwork past the card.
              your card never leaves your hands.
            </p>

            <p className="max-w-md text-[15px] font-medium italic leading-snug text-orange md:text-base">
              &ldquo;Not every card needs a 10 to deserve the spotlight.&rdquo;
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                Get an email when we launch
              </span>
              <SubscribeForm />
            </div>

            <a
              href="#what-it-is"
              className="mt-2 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 transition-colors hover:text-orange"
            >
              <ArrowDown className="size-3.5" strokeWidth={2.6} />
              See what&apos;s coming
            </a>
          </div>

          {/* Hero visual. Brand glyph lockup */}
          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  "radial-gradient(55% 55% at 50% 50%, rgba(255,106,0,0.55) 0%, transparent 70%)",
              }}
            />

            <div className="relative mx-auto flex aspect-square w-full items-center justify-center">
              {/* Orbiting outline octagons */}
              <Octagon className="absolute inset-0 rotate-[8deg] text-orange/60" />
              <Octagon className="absolute inset-[7%] rotate-[-10deg] text-magenta/55" />
              <Octagon className="absolute inset-[14%] rotate-[4deg] text-cyan/55" />

              {/* Decorative confetti dots */}
              <span className="absolute right-[6%] top-[10%] size-3 rounded-full bg-yellow shadow-[0_0_18px_rgba(255,203,0,0.7)]" />
              <span className="absolute left-[4%] top-[26%] size-2 rounded-full bg-cyan shadow-[0_0_14px_rgba(0,184,224,0.7)]" />
              <span className="absolute left-[12%] bottom-[14%] size-2.5 rounded-full bg-magenta shadow-[0_0_16px_rgba(255,44,146,0.7)]" />
              <span className="absolute right-[10%] bottom-[8%] size-2 rounded-full bg-lime shadow-[0_0_14px_rgba(92,211,26,0.7)]" />
              <span className="absolute right-[22%] top-[6%] size-1.5 rounded-full bg-white/80" />
              <span className="absolute left-[24%] bottom-[6%] size-1.5 rounded-full bg-white/80" />

              {/* Centerpiece. Filled octagonal chip with wordmark */}
              <div
                className="relative aspect-square w-[58%]"
                style={{ filter: "drop-shadow(10px 10px 0 rgba(255,106,0,0.55))" }}
              >
                <div
                  className="absolute inset-0 bg-orange"
                  style={{ clipPath: OCTAGON_CLIP }}
                />
                <div
                  className="absolute inset-[5%] flex items-center justify-center bg-text"
                  style={{ clipPath: OCTAGON_CLIP }}
                >
                  <div className="flex flex-col items-center gap-3 px-5 text-center">
                    <Image
                      src="/brand/logo.png"
                      alt="Slablabs"
                      width={320}
                      height={160}
                      className="h-auto w-[80%] object-contain"
                      priority
                    />
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-orange md:text-[10px]">
                      <span className="inline-block size-1 animate-pulse rounded-full bg-orange" />
                      Est. 2026 · AU
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2 text-center text-xs sm:grid-cols-3 sm:gap-3">
              <Stat label="Self-assembly" value="60s" />
              <Stat label="Card stays" value="Home" />
              <Stat label="Ships" value="3–5d AU" />
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT IT IS */}
      <section
        id="what-it-is"
        className="relative z-10 border-y border-white/10 bg-text/60 backdrop-blur-sm"
      >
        <Container className="grid gap-8 py-14 md:grid-cols-3 md:py-20">
          <Pillar
            n="01"
            title="Custom-printed surrounds"
            body="Artwork keyed to each card extends past the border. The slab itself becomes part of the piece."
            accent="text-yellow"
          />
          <Pillar
            n="02"
            title="You snap it together"
            body="Slab kits ship with the surround and case. You supply the card, slot it in, done."
            accent="text-magenta"
          />
          <Pillar
            n="00"
            title="Card not included"
            body="Slablabs doesn't handle your card. You keep it from your collection. Display product, not graded."
            accent="text-orange"
            highlight
          />
        </Container>
      </section>

      {/* TCG ROADMAP TEASER */}
      <section className="relative z-10">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col gap-3 md:mb-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              The roadmap
            </span>
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] uppercase leading-[0.92] tracking-tight">
              Starting with <span className="text-cyan">Pokémon.</span>
            </h2>
            <p className="max-w-xl text-sm text-white/75 md:text-base">
              Pokémon goes live first. One Piece, MTG, and Lorcana queued up
              right behind.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {TCGS.map((tcg) => (
              <div
                key={tcg.name}
                className="group relative flex aspect-[5/4] flex-col overflow-hidden rounded-xl border-2 border-white bg-white text-text shadow-[6px_6px_0_rgba(255,106,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative flex flex-1 items-center justify-center p-6">
                  <Image
                    src={tcg.logo}
                    alt={tcg.name}
                    width={260}
                    height={130}
                    className="h-auto max-h-[80px] w-auto max-w-[80%] object-contain md:max-h-[100px]"
                  />
                </div>
                <div
                  className="flex items-center justify-between gap-2 border-t-2 border-text px-3 py-2.5"
                  style={{
                    background: tcg.status === "live" ? tcg.accent : "#0a0a0a",
                    color: tcg.status === "live" ? "#0a0a0a" : "#ffffff",
                  }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider md:text-[11px]">
                    <span
                      className={
                        "size-2 rounded-full " +
                        (tcg.status === "live"
                          ? "animate-pulse bg-text"
                          : "bg-white/50")
                      }
                    />
                    {tcg.status === "live" ? "First in" : "Coming"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-text">
        <Container className="flex flex-col gap-4 py-8 text-[11px] leading-relaxed text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            <strong className="text-white/85">Slablabs</strong> · Independent
            Australian display-slab studio. Not affiliated with The Pokémon
            Company, Nintendo, Bandai, Wizards of the Coast, or Disney/Ravensburger.
            All trademarks property of their respective owners.
          </p>
          <p className="md:text-right">
            Slab kits include the surround &amp; case only.{" "}
            <strong className="text-white/85">Card not included.</strong>
          </p>
        </Container>
        <Container className="border-t border-white/5 py-4">
          <details id="staff" open={bypassError} className="group">
            <summary className="cursor-pointer list-none text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 transition-colors hover:text-white/70">
              Staff access
            </summary>
            <form
              action={enterBypass}
              className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <input
                type="password"
                name="password"
                required
                autoComplete="off"
                placeholder="Password"
                aria-label="Staff password"
                className="w-full max-w-xs rounded-full border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-orange focus:outline-none sm:w-64 md:py-2 md:text-xs"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-orange/60 bg-orange/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange transition-colors hover:bg-orange/25"
              >
                Enter site
              </button>
              {bypassError && (
                <span
                  role="alert"
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-magenta"
                >
                  Wrong password
                </span>
              )}
            </form>
          </details>
        </Container>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 backdrop-blur-sm">
      <p className="font-display text-xl uppercase leading-none tracking-tight text-white">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/65">
        {label}
      </p>
    </div>
  );
}

function Pillar({
  n,
  title,
  body,
  accent,
  highlight,
}: {
  n: string;
  title: string;
  body: string;
  accent: string;
  highlight?: boolean;
}) {
  return (
    <article
      className={
        "relative overflow-hidden rounded-2xl border-2 p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8 " +
        (highlight
          ? "border-orange bg-orange/10"
          : "border-white/15 bg-white/5 backdrop-blur-sm")
      }
    >
      <Octagon
        className={"pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 opacity-40 " + accent}
      />
      <span className={"font-display text-5xl leading-none md:text-6xl " + accent}>
        {n}
      </span>
      <h3 className="relative mt-3 font-display text-xl uppercase leading-tight md:text-2xl">
        {title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/80">
        {body}
      </p>
    </article>
  );
}
