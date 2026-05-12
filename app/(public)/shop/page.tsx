import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { KitCard } from "@/components/kits/kit-card";
import { FilterRail } from "@/components/shop/filter-rail";
import { SortMenu } from "@/components/shop/sort-menu";
import { SetChips } from "@/components/shop/set-chips";
import { EXPANSIONS } from "@/data/kits";
import { getAllProducts, type ProductForCard } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop slab kits",
  description: "Every Slablabs custom-printed Pokémon slab kit.",
};

type SearchParams = { set?: string; status?: string; sort?: string };

function applyFilters(
  kits: ProductForCard[],
  params: SearchParams,
): ProductForCard[] {
  let result = kits;
  if (params.set) result = result.filter((k) => k.setSlug === params.set);
  if (params.status === "live" || params.status === "soon") {
    result = result.filter((k) => k.status === params.status);
  }
  const sorted = [...result];
  switch (params.sort) {
    case "oldest":
      sorted.sort((a, b) => a.number.localeCompare(b.number));
      break;
    case "live-first":
      sorted.sort((a, b) => {
        if (a.status === b.status) return b.number.localeCompare(a.number);
        return a.status === "live" ? -1 : 1;
      });
      break;
    case "newest":
    default:
      sorted.sort((a, b) => b.number.localeCompare(a.number));
      break;
  }
  return sorted;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const allKits = await getAllProducts();
  const filtered = applyFilters(allKits, params);
  const setLabel = params.set
    ? EXPANSIONS.find((e) => e.slug === params.set)?.name ?? "Set"
    : null;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-bg-soft">
        <Container className="flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <Link href="/" className="hover:text-orange">Home</Link>
          <ChevronRight className="size-3" strokeWidth={2.6} />
          <Link href="/shop" className="hover:text-orange">Shop</Link>
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
          <span className="eyebrow">{setLabel ?? "All slabs"}</span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.92] tracking-tight">
            {setLabel ? setLabel : "Slab kits."}
          </h1>
          <p className="max-w-2xl text-sm text-muted md:text-base">
            {allKits.length} slab kits across {EXPANSIONS.length} sets, custom-printed and shipped to your door for self-assembly.
          </p>
        </Container>
      </div>

      {/* Set chip row */}
      <SetChips searchParams={params} expansions={EXPANSIONS} />

      <Container className="py-8 md:py-12">
        <div className="grid gap-10 md:grid-cols-[240px_1fr] md:gap-12 lg:grid-cols-[260px_1fr]">
          <FilterRail
            searchParams={params}
            kits={allKits}
            expansions={EXPANSIONS}
          />

          <div>
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-line pb-4">
              <span className="text-sm font-bold text-text">
                <span className="tabular-nums">{filtered.length}</span>{" "}
                <span className="font-normal text-muted">
                  {filtered.length === 1 ? "kit" : "kits"}
                </span>
              </span>
              <SortMenu searchParams={params} />
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 border border-line bg-bg-soft px-6 py-20 text-center">
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  Nothing matches.
                </h2>
                <p className="max-w-sm text-sm text-muted">
                  Try widening your filters or clear them.
                </p>
                <Link href="/shop" className="btn-ghost mt-2">
                  Clear filters
                </Link>
              </div>
            ) : (
              <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5">
                {filtered.map((kit, i) => (
                  <div key={kit.slug}>
                    <KitCard kit={kit} />
                    {/* Mid-grid editorial banner every 6 items */}
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

            {filtered.length >= 9 && (
              <div className="mt-12 flex justify-center">
                <button type="button" className="btn-ghost">
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
