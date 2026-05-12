import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  Hand,
  Package,
  Search,
  Shield,
  Sparkles,
  Box,
  Truck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { KitCard } from "@/components/kits/kit-card";
import { KitActions } from "@/components/pdp/kit-actions";
import { JsonLd, SITE_URL } from "@/components/seo/json-ld";
import { EXPANSIONS } from "@/data/kits";
import {
  getAllProductsAdmin,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

const SET_TINT_BG: Record<string, string> = {
  "mega-evolutions": "bg-lavender",
  "scarlet-violet": "bg-pink-tint",
  "sword-and-shield": "bg-sky-tint",
};

const SET_ACCENT_TEXT: Record<string, string> = {
  "mega-evolutions": "text-purple",
  "scarlet-violet": "text-red",
  "sword-and-shield": "text-cyan-deep",
};

const SET_GLOW: Record<string, string> = {
  "mega-evolutions": "rgba(139,62,255,0.45)",
  "scarlet-violet": "rgba(255,45,62,0.45)",
  "sword-and-shield": "rgba(0,184,224,0.4)",
};

const SET_OCTAGON_TINT: Record<string, string> = {
  "mega-evolutions": "text-purple/25",
  "scarlet-violet": "text-red/25",
  "sword-and-shield": "text-cyan/25",
};

export async function generateStaticParams() {
  const products = await getAllProductsAdmin();
  return products
    .filter((p) => !p.archived)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Kit not found" };
  const priceLabel = `$${(product.priceCents / 100).toFixed(0)} AUD`;
  const title = `${product.card} · ${product.setName} slab kit`;
  const description = `Custom-printed display slab for ${product.card} from ${product.setName}. Surround + case only — your card is not included. ${
    product.status === "live" ? `Available now from ${priceLabel}.` : "Coming soon."
  }`;
  return {
    title,
    description,
    alternates: { canonical: `/kits/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/kits/${product.slug}`,
      images: [
        {
          url: product.imageUrl ?? "/brand/slab-mockup.png",
          width: 1200,
          height: 630,
          alt: `Slablabs ${product.card} display slab kit`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.imageUrl ?? "/brand/slab-mockup.png"],
    },
  };
}

export default async function KitPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || product.archived) notFound();

  const related = await getRelatedProducts(product.setSlug, product.slug);
  const expansion = EXPANSIONS.find((e) => e.slug === product.setSlug);
  const tintBg = SET_TINT_BG[product.setSlug] ?? "bg-cream";
  const accentText = SET_ACCENT_TEXT[product.setSlug] ?? "text-orange";
  const glow = SET_GLOW[product.setSlug] ?? "rgba(255,106,0,0.4)";
  const octagonTint = SET_OCTAGON_TINT[product.setSlug] ?? "text-orange/25";
  const isLive = product.status === "live";
  const priceDollar = (product.priceCents / 100).toFixed(0);
  const imageUrl = product.imageUrl ?? "/brand/slab-mockup.png";
  const stockRemaining = product.stock ?? 0;
  const editionTotal = product.editionTotal ?? 100;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.card} slab kit`,
    description: `Custom-printed display slab for ${product.card} from ${product.setName}. Surround and case only — card not included.`,
    sku: `SL-${product.number}`,
    mpn: product.slug,
    image: [`${SITE_URL}${imageUrl}`],
    brand: { "@type": "Brand", name: "Slablabs" },
    category: "Trading Card Accessories",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/kits/${product.slug}`,
      priceCurrency: "AUD",
      price: (product.priceCents / 100).toFixed(2),
      availability:
        product.status === "live"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: "Slablabs" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.setName,
        item: `${SITE_URL}/shop?set=${product.setSlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.card,
        item: `${SITE_URL}/kits/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />

      <div className="border-b border-line bg-bg-soft">
        <Container className="flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <Link href="/" className="hover:text-orange">
            Home
          </Link>
          <ChevronRight className="size-3" strokeWidth={2.6} />
          <Link href="/shop" className="hover:text-orange">
            Shop
          </Link>
          <ChevronRight className="size-3" strokeWidth={2.6} />
          <Link href={`/shop?set=${product.setSlug}`} className="hover:text-orange">
            {product.setName}
          </Link>
          <ChevronRight className="size-3" strokeWidth={2.6} />
          <span className="text-text">{product.card}</span>
        </Container>
      </div>

      <section className={`relative overflow-hidden border-b border-line ${tintBg}`}>
        <Octagon className={`absolute -left-12 -top-8 size-44 rotate-12 ${octagonTint} md:size-56`} />
        <Octagon className={`absolute -right-14 -bottom-10 size-44 -rotate-12 ${octagonTint} md:size-56`} />
        <ConfettiField />

        <Container className="relative py-10 md:py-16">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 blur-3xl"
                style={{
                  background: `radial-gradient(60% 60% at 50% 50%, ${glow} 0%, transparent 70%)`,
                }}
              />
              <div className="relative aspect-[3/4] overflow-hidden border-2 border-text bg-white">
                <Image
                  src={imageUrl}
                  alt={`Slablabs ${product.card} expanded-art display slab`}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 inline-flex rounded-full bg-text px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  №&nbsp;{product.number}
                </span>
                {isLive && product.badge === "Almost gone" && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-magenta px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    <span className="size-1.5 rounded-full bg-white" />
                    {product.badge}
                  </span>
                )}
                {!isLive && (
                  <span className="absolute right-3 top-3 inline-flex rounded-full border border-text bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-text">
                    Coming soon
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                <div className="relative aspect-square overflow-hidden border-2 border-text bg-white">
                  <Image src={imageUrl} alt="" fill sizes="100px" className="object-cover" />
                </div>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center border-2 border-line bg-white/60 text-muted"
                  >
                    <Sparkles className="size-4" strokeWidth={2.2} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                {expansion?.logo ? (
                  <Image
                    src={expansion.logo}
                    alt={expansion.name}
                    width={140}
                    height={56}
                    className="h-9 w-auto object-contain md:h-11"
                  />
                ) : (
                  <span className={`text-sm font-bold uppercase tracking-wider ${accentText}`}>
                    {product.setName}
                  </span>
                )}
                {isLive && (
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    Ed. <span className="font-bold text-text">{editionTotal - stockRemaining}</span> /{" "}
                    <span className="font-bold text-text">{editionTotal}</span>
                  </span>
                )}
              </div>

              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-[0.92] tracking-tight">
                {product.card}
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-text-soft md:text-lg">
                {product.description ||
                  `Custom-printed display slab built around ${product.card}. The artwork extends past the card border so the slab itself becomes part of the piece — you supply your own card and snap it together at home.`}
              </p>

              <div className="grid grid-cols-3 gap-4 border-y-2 border-text py-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Price</span>
                  <span className="font-display text-3xl leading-none">
                    {isLive ? `$${priceDollar}` : "—"}
                    <span className="text-base text-muted"> AUD</span>
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Status</span>
                  <span
                    className={`text-sm font-bold uppercase tracking-wider ${isLive ? "text-success" : "text-muted"}`}
                  >
                    {isLive ? "● In stock" : "● Coming soon"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Ships</span>
                  <span className="text-sm font-bold uppercase tracking-wider">3–5 days AU</span>
                </div>
              </div>

              <KitActions
                slug={product.slug}
                card={product.card}
                set={product.setName}
                setSlug={product.setSlug}
                priceCents={product.priceCents}
                imageUrl={imageUrl}
                isLive={isLive}
              />

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1 text-xs text-muted sm:grid-cols-4">
                <span className="flex items-center gap-1.5">
                  <Truck className="size-3.5 text-orange" strokeWidth={2.4} />
                  Free AU shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="size-3.5 text-magenta" strokeWidth={2.4} />
                  Ships fast
                </span>
                <span className="flex items-center gap-1.5">
                  <Hand className="size-3.5 text-purple" strokeWidth={2.4} />
                  Card stays home
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="size-3.5 text-lime-deep" strokeWidth={2.4} />
                  Display-grade PET
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-line bg-text text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 10% 20%, rgba(255,203,0,0.22) 0%, rgba(255,203,0,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 90% 90%, rgba(255,106,0,0.25) 0%, rgba(255,106,0,0) 60%)",
          }}
        />
        <Octagon className="absolute -left-12 top-6 size-44 rotate-12 text-yellow/25 md:size-56" />
        <Octagon className="absolute -right-14 bottom-6 size-40 -rotate-12 text-orange/30 md:size-52" />
        <ConfettiField />

        <Container className="relative py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-3 md:mb-12">
            <span className="eyebrow text-yellow">What you get</span>
            <h2 className="section-h2">
              In the kit, <span className="text-yellow">in the box.</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Slab kits ship with the printed surround and the slab case. Your card is{" "}
              <strong>not</strong> included — you supply it from your own collection.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <article className="relative overflow-hidden border-2 border-white/15 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8">
              <Octagon className="pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 text-yellow/30" />
              <span className="font-display text-6xl leading-none text-yellow">01</span>
              <h3 className="mt-3 font-display text-2xl uppercase leading-tight">Printed surround</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Custom artwork keyed to {product.card} that extends past the card border. Printed on
                optical-grade PET, tuned for <span className="text-yellow">{product.setName}</span>.
              </p>
            </article>

            <article className="relative overflow-hidden border-2 border-white/15 bg-white/5 p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8">
              <Octagon className="pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 text-magenta/30" />
              <span className="font-display text-6xl leading-none text-magenta">02</span>
              <h3 className="mt-3 font-display text-2xl uppercase leading-tight">Slab case</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Snap-seal display case sized for a standard TCG card. UV-resistant, acid-free, built to live on your shelf for years.
              </p>
            </article>

            <article className="relative overflow-hidden border-2 border-orange bg-orange/10 p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8">
              <Octagon className="pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 text-orange/50" />
              <span className="font-display text-6xl leading-none text-orange">00</span>
              <h3 className="mt-3 font-display text-2xl uppercase leading-tight">No card included</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                You supply your own {product.card} from your collection. Slablabs never handles your card.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="py-12 md:py-16">
          <div className="mb-8 flex flex-col items-start gap-2 md:mb-10">
            <span className="eyebrow inline-flex items-center gap-1.5 text-cyan-deep">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              The details
            </span>
            <h2 className="section-h2">
              Built for <span className="text-cyan-deep">display.</span>
            </h2>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t-2 border-text pt-8 md:grid-cols-4 md:gap-y-8">
            <SpecRow label="Holds" value="1 standard TCG card" />
            <SpecRow label="Slab material" value="Optical-grade PET" />
            <SpecRow label="Dimensions" value="130 × 185 × 8 mm" />
            <SpecRow
              label="Edition"
              value={isLive ? `/ ${editionTotal}` : "TBA"}
              accent={isLive ? "text-orange" : undefined}
            />
            <SpecRow label="Set" value={product.setName} />
            <SpecRow label="Unit №" value={product.number} mono />
            <SpecRow label="Built by" value="You" />
            <SpecRow label="Build time" value="~60 seconds" />
          </dl>
        </Container>
      </section>

      <section className="border-b border-line bg-bg-soft">
        <Container className="py-12 md:py-16">
          <div className="mb-8 flex flex-col items-start gap-2 md:mb-10">
            <span className="eyebrow inline-flex items-center gap-1.5 text-purple">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              How to build it
            </span>
            <h2 className="section-h2">
              60 seconds, <span className="text-purple">tool-free.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <BuildStep
              n="01"
              Icon={Search}
              title="Pull your card"
              body={`Grab your copy of ${product.card} from your collection.`}
              color="text-magenta"
              bg="bg-pink-tint"
            />
            <BuildStep
              n="02"
              Icon={Box}
              title="Slot it in"
              body="Slide the card into the printed surround. Edges align with the artwork."
              color="text-cyan-deep"
              bg="bg-sky-tint"
            />
            <BuildStep
              n="03"
              Icon={Sparkles}
              title="Snap & display"
              body="Click the slab case shut. Put it on the shelf, the wall, the desk — anywhere."
              color="text-lime-deep"
              bg="bg-mint-tint"
            />
          </div>

          <p className="mt-8 text-sm text-muted">
            Need a hand?{" "}
            <Link
              href="/build-guide"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              Read the full build guide
            </Link>
            .
          </p>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="relative overflow-hidden border-b border-line bg-white">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(40% 50% at 90% 0%, ${glow.replace(/0\.\d+/, "0.15")} 0%, transparent 60%)`,
            }}
          />
          <Octagon className={`absolute -left-12 -top-6 size-40 rotate-12 ${octagonTint} md:size-52`} />

          <Container className="relative py-14 md:py-20">
            <div className="section-head">
              <div className="flex flex-col gap-2">
                <span className={`eyebrow ${accentText}`}>From the same set</span>
                <h2 className="section-h2">
                  More from <span className={accentText}>{product.setName}.</span>
                </h2>
              </div>
              <Link
                href={`/shop?set=${product.setSlug}`}
                className="inline-flex items-center gap-1 rounded-full bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange"
              >
                See all
                <ArrowRight className="size-3.5" strokeWidth={2.6} />
              </Link>
            </div>

            <Carousel ariaLabel={`More from ${product.setName}`}>
              {related.map((k) => (
                <CarouselItem key={k.slug}>
                  <KitCard kit={k} />
                </CarouselItem>
              ))}
            </Carousel>
          </Container>
        </section>
      )}

      <section className="border-b border-line bg-bg-soft">
        <Container className="grid gap-6 py-10 md:grid-cols-2 md:gap-10 md:py-14">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
              What you get
            </span>
            <p className="text-sm leading-relaxed text-text-soft">
              This kit includes the <strong>custom-printed surround</strong> and{" "}
              <strong>slab case only</strong>. Your {product.card} card is{" "}
              <strong>not included</strong> — you supply it from your own collection. Slab kits are
              display products, not graded authentications.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
              Independent &amp; unaffiliated
            </span>
            <p className="text-sm leading-relaxed text-text-soft">
              Slablabs is an independent Australian company. We are not affiliated with, sponsored
              by, or endorsed by The Pokémon Company, Nintendo, Game Freak, Creatures, Bandai (One
              Piece), Wizards of the Coast (Magic: The Gathering), Disney, or Ravensburger
              (Lorcana). All trademarks property of their respective owners and referenced for
              identification only.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

function SpecRow({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</span>
      <span
        className={`font-display text-xl uppercase leading-tight ${mono ? "tabular-nums" : ""} ${accent ?? ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function BuildStep({
  n,
  Icon,
  title,
  body,
  color,
  bg,
}: {
  n: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  color: string;
  bg: string;
}) {
  return (
    <article
      className={`relative overflow-hidden border-2 border-text p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${bg}`}
    >
      <Octagon className={`pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 opacity-30 ${color}`} />
      <div className="relative flex items-center justify-between">
        <span className={`font-display text-5xl leading-none md:text-6xl ${color}`}>{n}</span>
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-text shadow-sm">
          <Icon className={`size-5 ${color}`} strokeWidth={2.4} />
        </span>
      </div>
      <h3 className="relative mt-4 font-display text-xl uppercase leading-tight md:text-2xl">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-text-soft">{body}</p>
    </article>
  );
}
