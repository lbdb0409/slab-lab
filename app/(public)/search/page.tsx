import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { KitCard } from "@/components/kits/kit-card";
import { EXPANSIONS } from "@/data/kits";
import { getAllProducts, type ProductForCard } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Slablabs slab kits by card name or expansion.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

function searchKits(products: ProductForCard[], query: string) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return products.filter((p) => {
    return (
      p.card.toLowerCase().includes(q) ||
      p.set.toLowerCase().includes(q) ||
      (p.expansion?.toLowerCase().includes(q) ?? false) ||
      p.slug.toLowerCase().includes(q) ||
      p.number.includes(q)
    );
  });
}

function searchSets(query: string) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return EXPANSIONS.filter((e) => e.name.toLowerCase().includes(q));
}

const SUGGESTIONS = [
  "Charizard",
  "Mega Gengar",
  "Umbreon",
  "Lugia",
  "Pikachu",
  "Scarlet & Violet",
  "Mega Evolutions",
];

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const products = await getAllProducts();
  const kits = searchKits(products, query);
  const sets = searchSets(query);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/search", label: "Search" }]}
        eyebrow={query ? `Results for "${query}"` : "Search"}
        EyebrowIcon={Search}
        eyebrowColor="orange"
        title={
          query ? (
            <>
              {kits.length + sets.length}{" "}
              <span className="text-orange">
                match{kits.length + sets.length === 1 ? "" : "es"}.
              </span>
            </>
          ) : (
            <>
              Find <span className="text-orange">your card.</span>
            </>
          )
        }
        body={
          query
            ? `Across kits and sets in the catalog.`
            : `Search by card name, set, or kit number.`
        }
        bg="cream"
      />

      <Container className="py-10 md:py-14">
        <form
          action="/search"
          method="get"
          className="mb-10 flex items-center rounded-full border-2 border-text bg-white shadow-[6px_6px_0_var(--color-orange)]"
        >
          <Search className="ml-5 size-5 text-muted" strokeWidth={2.4} />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by Pokémon set, card, or kit number…"
            className="w-full min-w-0 bg-transparent px-4 py-4 text-base placeholder:text-muted focus:outline-none"
          />
          <button
            type="submit"
            className="m-1 inline-flex shrink-0 items-center rounded-full bg-text px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange max-md:min-h-11 md:px-6"
          >
            Search
          </button>
        </form>

        {!query && (
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Popular searches
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <Link
                    key={s}
                    href={`/search?q=${encodeURIComponent(s)}`}
                    className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text transition-colors hover:border-text hover:bg-text hover:text-white max-md:min-h-11"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Browse by set
              </span>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {EXPANSIONS.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/sets/${e.slug}`}
                    className="group flex items-center justify-between border-2 border-text bg-white px-4 py-3 transition-colors hover:bg-text hover:text-white"
                  >
                    <span className="font-display text-base uppercase leading-tight">
                      {e.name}
                    </span>
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.6}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {query && (
          <div className="flex flex-col gap-8">
            {sets.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-baseline gap-2 font-display text-2xl uppercase leading-none tracking-tight">
                  Sets
                  <span className="text-sm text-muted">{sets.length}</span>
                </h2>
                <div className="grid gap-3 md:grid-cols-3">
                  {sets.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/sets/${s.slug}`}
                      className="group flex items-center justify-between border-2 border-text bg-white px-4 py-3 transition-colors hover:bg-text hover:text-white"
                    >
                      <span className="font-display text-base uppercase leading-tight">
                        {s.name}
                      </span>
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        strokeWidth={2.6}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {kits.length > 0 && (
              <section>
                <h2 className="mb-4 flex items-baseline gap-2 font-display text-2xl uppercase leading-none tracking-tight">
                  Kits
                  <span className="text-sm text-muted">{kits.length}</span>
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                  {kits.map((kit) => (
                    <KitCard key={kit.slug} kit={kit} />
                  ))}
                </div>
              </section>
            )}

            {kits.length === 0 && sets.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 border-2 border-line bg-bg-soft px-6 py-20 text-center">
                <div className="inline-flex size-16 items-center justify-center rounded-full bg-tint text-muted">
                  <Search className="size-7" strokeWidth={2} />
                </div>
                <h2 className="font-display text-3xl uppercase leading-tight">
                  Nothing matches{" "}
                  <span className="text-orange">&quot;{query}&quot;</span>.
                </h2>
                <p className="max-w-sm text-sm text-muted">
                  Try a card name, a set name, or the kit number. Or request a
                  custom slab if your card isn&apos;t in the catalog yet.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/shop" className="btn-orange">
                    Browse all slabs
                    <ArrowRight className="size-4" strokeWidth={2.6} />
                  </Link>
                  <Link href="/#request" className="btn-ghost">
                    Request a card
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
