import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { KitCard } from "@/components/kits/kit-card";
import { SortMenu } from "@/components/shop/sort-menu";
import { SetChips } from "@/components/shop/set-chips";
import { ExpansionFilter } from "@/components/shop/expansion-filter";
import { JsonLd, SITE_URL } from "@/components/seo/json-ld";
import { EXPANSIONS } from "@/data/kits";
import { SET_CONTENT } from "@/data/set-content";
import { cn } from "@/lib/utils";
import { getAllProducts, type ProductForCard } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop slab kits",
  description: "Every Slablabs custom-printed Pokémon slab kit.",
  alternates: { canonical: "/shop" },
};

type SearchParams = {
  set?: string;
  expansion?: string;
  status?: string;
  sort?: string;
};

function applyFilters(
  kits: ProductForCard[],
  params: SearchParams,
): ProductForCard[] {
  let result = kits;
  if (params.set) result = result.filter((k) => k.setSlug === params.set);
  if (params.expansion) {
    result = result.filter((k) => k.expansion === params.expansion);
  }
  if (params.status === "live") {
    result = result.filter((k) => k.status === "live" && (k.stock ?? 0) > 0);
  } else if (params.status === "soon") {
    result = result.filter((k) => k.status === "soon");
  }
  const sorted = [...result];
  switch (params.sort) {
    case "oldest":
      sorted.sort((a, b) => a.number.localeCompare(b.number));
      break;
    case "price-low":
      sorted.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case "price-high":
      sorted.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case "set":
      sorted.sort((a, b) => {
        const eraCmp = a.set.localeCompare(b.set);
        if (eraCmp !== 0) return eraCmp;
        const aExp = a.expansion ?? "";
        const bExp = b.expansion ?? "";
        const expCmp = aExp.localeCompare(bExp);
        if (expCmp !== 0) return expCmp;
        return a.card.localeCompare(b.card);
      });
      break;
    case "live-first":
      sorted.sort((a, b) => {
        const aLive = a.status === "live" ? 0 : 1;
        const bLive = b.status === "live" ? 0 : 1;
        if (aLive !== bLive) return aLive - bLive;
        return b.number.localeCompare(a.number);
      });
      break;
    case "newest":
    default:
      sorted.sort((a, b) => b.number.localeCompare(a.number));
      break;
  }
  return sorted;
}

function buildHref(params: SearchParams, removeKey: keyof SearchParams) {
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v && k !== removeKey) next[k] = v;
  }
  const qs = new URLSearchParams(next).toString();
  return qs ? `/shop?${qs}` : "/shop";
}

const STATUS_LABEL: Record<string, string> = {
  live: "In stock",
  soon: "Coming soon",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const allKits = await getAllProducts();
  const filtered = applyFilters(allKits, params);

  const setMeta = params.set
    ? EXPANSIONS.find((e) => e.slug === params.set)
    : null;
  const setContent = params.set ? SET_CONTENT[params.set] : null;
  const setLabel = setMeta?.name ?? null;

  const activeStatus = params.status;
  const activeExpansion = params.expansion;
  const hasFilter = Boolean(params.set || activeExpansion || activeStatus);

  // Build the expansion dropdown options. If an era is selected, narrow the
  // options to expansions in that era. Sorted alphabetically.
  const expansionPool = params.set
    ? allKits.filter((k) => k.setSlug === params.set)
    : allKits;
  const expansionOptions = Array.from(
    new Set(expansionPool.map((k) => k.expansion).filter(Boolean) as string[]),
  ).sort((a, b) => a.localeCompare(b));

  const headerTitle = setLabel ?? "Slab kits.";
  const eyebrow = setLabel ?? "All slabs";
  const subtitle = setContent?.tagline ??
    `${allKits.length} slab kits across ${EXPANSIONS.length} sets, custom-printed and shipped to your door for self-assembly.`;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: setLabel ? `Slablabs ${setLabel} slab kits` : "Slablabs slab kits",
    itemListElement: filtered.slice(0, 50).map((kit, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${kit.card} slab kit`,
        url: `${SITE_URL}/kits/${kit.slug}`,
        image: `${SITE_URL}/brand/slab-mockup.png`,
        sku: `SL-${kit.number}`,
        brand: { "@type": "Brand", name: "Slablabs" },
        offers: {
          "@type": "Offer",
          priceCurrency: "AUD",
          price: (kit.priceCents / 100).toFixed(2),
          availability:
            kit.status === "live" && (kit.stock ?? 0) > 0
              ? "https://schema.org/InStock"
              : kit.status === "soon"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/OutOfStock",
          url: `${SITE_URL}/kits/${kit.slug}`,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />

      {/* Breadcrumb */}
      <div className="bg-bg-soft">
        <Container className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <Link href="/" className="inline-flex items-center hover:text-orange max-md:min-h-11">
            Home
          </Link>
          <ChevronRight className="size-3" strokeWidth={2.6} />
          <Link href="/shop" className="inline-flex items-center hover:text-orange max-md:min-h-11">
            Shop
          </Link>
          {setLabel && (
            <>
              <ChevronRight className="size-3" strokeWidth={2.6} />
              <span className="text-text">{setLabel}</span>
            </>
          )}
        </Container>
      </div>

      {/* Page header */}
      <div className="border-b border-line bg-white">
        <Container className="flex flex-col gap-3 py-8 md:py-12">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.92] tracking-tight">
            {headerTitle}
          </h1>
          <p className="max-w-2xl text-sm text-muted md:text-base">
            {subtitle}
          </p>
        </Container>
      </div>

      {/* Set chip row (primary filter) */}
      <SetChips searchParams={params} expansions={EXPANSIONS} />

      <Container className="py-8 md:py-12">
        {/* Toolbar: count + availability + sort */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <span className="text-sm font-bold text-text">
            <span className="tabular-nums">{filtered.length}</span>{" "}
            <span className="font-normal text-muted">
              {filtered.length === 1 ? "kit" : "kits"}
            </span>
          </span>
          <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:flex-wrap md:items-center md:gap-3">
            <ExpansionFilter
              params={params}
              options={expansionOptions}
              current={activeExpansion}
            />
            <AvailabilityPills current={activeStatus} params={params} />
            <SortMenu searchParams={params} />
          </div>
        </div>

        {/* Active filter chips (dismissible) */}
        {hasFilter && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Filters
            </span>
            {params.set && (
              <FilterChip
                label={`Era: ${setLabel}`}
                clearHref={buildHref(params, "set")}
              />
            )}
            {activeExpansion && (
              <FilterChip
                label={`Set: ${activeExpansion}`}
                clearHref={buildHref(params, "expansion")}
              />
            )}
            {activeStatus && (
              <FilterChip
                label={`${STATUS_LABEL[activeStatus] ?? activeStatus}`}
                clearHref={buildHref(params, "status")}
              />
            )}
            <Link
              href="/shop"
              className="ml-1 text-[11px] font-bold uppercase tracking-wider text-orange hover:underline"
            >
              Clear all
            </Link>
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-5">
            {filtered.map((kit, i) => (
              <div key={kit.slug}>
                <KitCard kit={kit} />
                {(i + 1) % 6 === 0 && i < filtered.length - 1 && (
                  <div className="col-span-full mt-8 hidden border border-line bg-bg-soft p-6 sm:col-span-2 sm:flex sm:items-center sm:justify-between sm:gap-4 lg:col-span-3">
                    <div className="flex flex-col gap-1">
                      <span className="eyebrow">Build guide</span>
                      <p className="font-display text-2xl uppercase tracking-tight">
                        Read how a slab gets assembled.
                      </p>
                    </div>
                    <Link href="/build-guide" className="btn-sm">
                      Read the guide
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Price range info (optional helper text when no products are live) */}
        {filtered.length > 0 && filtered.length < allKits.length && (
          <p className="mt-10 text-center text-xs uppercase tracking-wider text-muted">
            Showing {filtered.length} of {allKits.length} kits.{" "}
            <Link href="/shop" className="font-bold text-text hover:text-orange">
              See all
            </Link>
          </p>
        )}
      </Container>
    </>
  );
}

function AvailabilityPills({
  current,
  params,
}: {
  current?: string;
  params: SearchParams;
}) {
  const options = [
    { value: "", label: "All" },
    { value: "live", label: "In stock" },
    { value: "soon", label: "Coming soon" },
  ];
  return (
    <div className="col-span-2 flex items-center gap-1.5 md:col-span-1">
      {options.map((o) => {
        const active = (current ?? "") === o.value;
        const next: Record<string, string> = {};
        for (const [k, v] of Object.entries(params)) {
          if (v && k !== "status") next[k] = v;
        }
        if (o.value) next.status = o.value;
        const qs = new URLSearchParams(next).toString();
        const href = qs ? `/shop?${qs}` : "/shop";
        return (
          <Link
            key={o.label}
            href={href}
            scroll={false}
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors max-md:min-h-11 md:py-1.5",
              active
                ? "border-text bg-text text-white"
                : "border-line text-text hover:border-text",
            )}
          >
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}

function FilterChip({
  label,
  clearHref,
}: {
  label: string;
  clearHref: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-text">
      {label}
      <Link
        href={clearHref}
        scroll={false}
        aria-label={`Remove ${label}`}
        className="relative inline-flex size-4 items-center justify-center rounded-full text-muted after:absolute after:-inset-3 after:content-[''] hover:bg-text hover:text-white md:after:hidden"
      >
        <X className="size-3" strokeWidth={2.6} />
      </Link>
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-line bg-bg-soft px-6 py-20 text-center">
      <h2 className="font-display text-3xl uppercase tracking-tight">
        Nothing matches.
      </h2>
      <p className="max-w-sm text-sm text-muted">
        Try widening your filters or clear them.
      </p>
      <Link
        href="/shop"
        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange"
      >
        Clear filters
      </Link>
    </div>
  );
}

