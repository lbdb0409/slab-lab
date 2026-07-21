import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Package, Sparkles, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { KitCard } from "@/components/kits/kit-card";
import { JsonLd, SITE_URL } from "@/components/seo/json-ld";
import { EXPANSIONS } from "@/data/kits";
import { SET_CONTENT } from "@/data/set-content";
import { getProductsBySet } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return EXPANSIONS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const set = EXPANSIONS.find((e) => e.slug === slug);
  const content = SET_CONTENT[slug];
  if (!set || !content) return { title: "Set not found" };
  const title = `${set.name} slab kits`;
  const description = `${content.tagline} Browse Slablabs ${set.name} slab kits. Custom-printed surrounds for the best cards from the ${content.era}.`;
  return {
    title,
    description,
    alternates: { canonical: `/sets/${set.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/sets/${set.slug}`,
      images: [
        {
          url: "/brand/slab-mockup.png",
          width: 1200,
          height: 630,
          alt: `Slablabs ${set.name} slab kits`,
        },
      ],
    },
  };
}

export default async function SetLandingPage({ params }: Props) {
  const { slug } = await params;
  const set = EXPANSIONS.find((e) => e.slug === slug);
  const content = SET_CONTENT[slug];
  if (!set || !content) notFound();

  const kits = await getProductsBySet(slug);
  const liveCount = kits.filter((k) => k.status === "live").length;
  const soonCount = kits.length - liveCount;
  const otherSets = EXPANSIONS.filter((e) => e.slug !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sets", item: `${SITE_URL}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: set.name,
        item: `${SITE_URL}/sets/${set.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div className="border-b border-line bg-bg-soft">
        <Container className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <Link href="/" className="inline-flex items-center hover:text-orange max-md:min-h-11">
            Home
          </Link>
          <span className="text-line-strong">›</span>
          <Link href="/shop" className="inline-flex items-center hover:text-orange max-md:min-h-11">
            Sets
          </Link>
          <span className="text-line-strong">›</span>
          <span className="text-text">{set.name}</span>
        </Container>
      </div>

      <section
        className="relative overflow-hidden border-b border-line text-white"
        style={{ background: content.bg }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(50% 50% at 75% 30%, ${content.accent}55 0%, transparent 65%)`,
          }}
        />
        <Octagon className="absolute -left-16 -top-10 size-56 rotate-12 text-white/15 md:size-72" />
        <Octagon className="absolute -right-14 -bottom-10 size-52 -rotate-12 text-white/15 md:size-64" />
        <ConfettiField />

        <Container className="relative grid items-center gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:gap-16 md:py-24">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              Pokémon · {content.era}
            </span>

            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.88] tracking-tight">
              {set.name}
            </h1>

            <p className="max-w-md text-lg font-medium leading-snug md:text-xl" style={{ color: content.accent }}>
              {content.tagline}
            </p>

            <p className="max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
              {content.intro}
            </p>

            <div className="grid max-w-md grid-cols-3 gap-2 sm:gap-3">
              <Stat label="Available now" value={String(liveCount)} accent={content.accent} />
              <Stat label="Coming soon" value={String(soonCount)} accent="#ffffff" />
              <Stat label="Era" value={content.year} accent="#ffffff" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/shop?set=${set.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:bg-orange hover:text-white"
              >
                Shop all {set.name}
                <ArrowRight className="size-4" strokeWidth={2.6} />
              </Link>
              <Link
                href="#kits"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-text"
              >
                Browse kits ↓
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative rounded-2xl border-2 border-white bg-white p-8 shadow-[8px_8px_0_rgba(0,0,0,0.4)] md:p-10">
              {set.logo ? (
                <Image
                  src={set.logo}
                  alt={set.name}
                  width={480}
                  height={240}
                  className="mx-auto h-auto max-h-[180px] w-auto max-w-full object-contain md:max-h-[220px]"
                />
              ) : (
                <h2 className="text-center font-display text-4xl uppercase text-text">{set.name}</h2>
              )}
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-text">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                    Signature kit
                  </span>
                  <span className="font-display text-base uppercase">{content.signature}</span>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: content.bg }}
                >
                  <Star className="size-3 fill-white" strokeWidth={0} />
                  Featured
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="kits"
        className={"relative overflow-hidden border-b border-line " + content.accentBgClass}
      >
        <Octagon
          className={"absolute -right-12 -top-8 size-40 rotate-12 md:size-52 opacity-30 " + content.accentText}
        />
        <Octagon
          className={"absolute -left-14 -bottom-6 size-40 -rotate-12 md:size-52 opacity-30 " + content.accentText}
        />
        <ConfettiField />

        <Container className="relative py-14 md:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div className="flex flex-col gap-2">
              <span className={"eyebrow inline-flex items-center gap-1.5 " + content.accentText}>
                <Package className="size-3.5" strokeWidth={2.6} />
                {kits.length} kit{kits.length === 1 ? "" : "s"} in this set
              </span>
              <h2 className="section-h2">
                Every <span className={content.accentText}>{set.name}</span> kit.
              </h2>
            </div>
            <Link
              href={`/shop?set=${set.slug}`}
              className="inline-flex items-center gap-1 rounded-full bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange max-md:min-h-11"
            >
              Shop with filters
              <ArrowRight className="size-3.5" strokeWidth={2.6} />
            </Link>
          </div>

          {kits.length === 0 ? (
            <div className="rounded-md border-2 border-dashed border-line-strong bg-white/80 p-10 text-center">
              <p className="font-display text-2xl uppercase">
                No kits in this set yet.
              </p>
              <p className="mt-2 text-sm text-muted">
                The first {set.name} kits are on the way. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {kits.map((kit) => (
                <KitCard key={kit.slug} kit={kit} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:gap-16 md:py-20">
          <div className="flex flex-col gap-5">
            <span className={"eyebrow " + content.accentText}>About this set</span>
            <h2 className="section-h2">
              The <span className={content.accentText}>{content.era}</span>, in three notes.
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-text-soft md:text-lg">
              {content.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-3 self-start border-2 border-text bg-bg-soft p-6">
            <h3 className="font-display text-lg uppercase leading-none">At a glance</h3>
            <dl className="flex flex-col gap-3 text-sm">
              <Row label="Era" value={content.era} />
              <Row label="Years" value={content.year} />
              <Row label="Slablabs kits" value={`${kits.length} kit${kits.length === 1 ? "" : "s"}`} />
              <Row label="Live now" value={String(liveCount)} />
              <Row label="Coming" value={String(soonCount)} />
              <Row label="Signature" value={content.signature} />
            </dl>
            <Link
              href={`/shop?set=${set.slug}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-text px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange max-md:min-h-11"
            >
              Browse this set
              <ArrowRight className="size-3.5" strokeWidth={2.6} />
            </Link>
          </aside>
        </Container>
      </section>

      <section className="border-b border-line bg-cream">
        <Container className="py-14 md:py-20">
          <div className="mb-8 flex flex-col items-start gap-2 md:mb-10">
            <span className="eyebrow text-magenta">Browse other sets</span>
            <h2 className="section-h2">
              Or jump to a <span className="text-magenta">different era.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {otherSets.map((s) => {
              const c = SET_CONTENT[s.slug];
              if (!c) return null;
              return (
                <Link
                  key={s.slug}
                  href={`/sets/${s.slug}`}
                  className="group relative flex min-h-[150px] flex-col justify-end overflow-hidden border-2 border-text p-6 sm:aspect-[5/2] sm:min-h-0 text-white transition-transform duration-300 hover:-translate-y-1 md:p-8"
                  style={{ background: c.bg }}
                >
                  <Octagon className="pointer-events-none absolute -right-10 -top-10 size-36 rotate-12 text-white/15 md:size-48" />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: c.accent }}>
                    {c.era}
                  </span>
                  <h3 className="mt-1 font-display text-3xl uppercase leading-tight md:text-4xl">{s.name}</h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-transform group-hover:translate-x-1">
                    Browse
                    <ArrowRight className="size-3" strokeWidth={2.6} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="border border-white/20 bg-white/5 p-2 backdrop-blur-sm sm:p-3">
      <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{label}</span>
      <p className="mt-1 font-display text-xl leading-none tabular-nums" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line pb-2 last:border-b-0 last:pb-0">
      <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="text-sm font-bold tabular-nums">{value}</dd>
    </div>
  );
}
