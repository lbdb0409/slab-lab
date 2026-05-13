import Image from "next/image";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import {
  AdminCard,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { EXPANSIONS } from "@/data/kits";
import { getAllProductsAdmin } from "@/lib/products";
import { formatCents } from "@/lib/format";

type Props = {
  searchParams: Promise<{
    q?: string;
    set?: string;
    status?: string;
  }>;
};

export default async function AdminProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const setFilter = params.set ?? "";
  const statusFilter = params.status ?? "";

  const all = await getAllProductsAdmin();
  const products = all.filter((p) => {
    if (setFilter && p.setSlug !== setFilter) return false;
    if (statusFilter === "live" && !(p.status === "live" && !p.archived))
      return false;
    if (statusFilter === "soon" && !(p.status === "soon" && !p.archived))
      return false;
    if (statusFilter === "archived" && !p.archived) return false;
    if (q) {
      const haystack = [
        p.card,
        p.slug,
        p.setName,
        p.expansion ?? "",
        p.number,
        `SL-${p.number}`,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const liveCount = all.filter((p) => p.status === "live" && !p.archived).length;
  const soonCount = all.filter((p) => p.status === "soon" && !p.archived).length;
  const archivedCount = all.filter((p) => p.archived).length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Catalog"
        title="Products"
        body={`${all.length} kits · ${liveCount} live · ${soonCount} coming soon${
          archivedCount > 0 ? ` · ${archivedCount} archived` : ""
        }`}
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-md bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange"
          >
            <Plus className="size-3.5" strokeWidth={2.6} />
            New product
          </Link>
        }
      />

      <AdminContent className="flex flex-col gap-4">
        <form
          method="get"
          className="flex flex-wrap items-center gap-3 rounded-md border border-line bg-white p-3"
        >
          <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-bg-soft px-3 py-1.5">
            <Search className="size-4 text-muted" strokeWidth={2.4} />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by name, slug, set, or SKU…"
              className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
            />
          </div>
          <select
            name="set"
            defaultValue={setFilter}
            className="rounded-md border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
          >
            <option value="">All sets</option>
            {EXPANSIONS.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name}
              </option>
            ))}
          </select>
          <select
            name="status"
            defaultValue={statusFilter}
            className="rounded-md border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
          >
            <option value="">All statuses</option>
            <option value="live">Live</option>
            <option value="soon">Coming soon</option>
            <option value="archived">Archived</option>
          </select>
          <button
            type="submit"
            className="rounded-md bg-text px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-orange"
          >
            Filter
          </button>
          {(q || setFilter || statusFilter) && (
            <Link
              href="/admin/products"
              className="text-[11px] font-bold uppercase tracking-wider text-muted hover:text-orange"
            >
              Clear
            </Link>
          )}
        </form>

        <AdminCard className="overflow-hidden">
          {all.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <h2 className="font-display text-2xl uppercase">
                No products yet
              </h2>
              <p className="max-w-sm text-sm text-muted">
                Add your first product to start showing it on the catalog.
              </p>
              <Link
                href="/admin/products/new"
                className="mt-2 inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-deep"
              >
                <Plus className="size-3.5" strokeWidth={2.6} />
                Add product
              </Link>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <h2 className="font-display text-2xl uppercase">
                Nothing matches
              </h2>
              <Link
                href="/admin/products"
                className="text-[11px] font-bold uppercase tracking-wider text-orange hover:underline"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-bg-soft text-left">
                    <th className="w-12 px-5 py-3"></th>
                    <th className="px-2 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Product
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Set
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      SKU
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Price
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const isLive = p.status === "live" && !p.archived;
                    return (
                      <tr
                        key={p.slug}
                        className="border-b border-line transition-colors last:border-b-0 hover:bg-bg-soft"
                      >
                        <td className="py-3 pl-5">
                          <Link
                            href={`/admin/products/${p.slug}`}
                            className="block size-12 overflow-hidden rounded-md border border-line bg-tint"
                          >
                            <Image
                              src={p.imageUrl ?? "/brand/slab-mockup.png"}
                              alt=""
                              width={48}
                              height={48}
                              className="size-full object-cover"
                            />
                          </Link>
                        </td>
                        <td className="px-2 py-3">
                          <Link
                            href={`/admin/products/${p.slug}`}
                            className="block hover:text-orange"
                          >
                            <p className="font-bold">{p.card}</p>
                            <p className="text-xs text-muted">{p.slug}</p>
                          </Link>
                        </td>
                        <td className="px-5 py-3 text-text-soft">
                          <div className="flex flex-col">
                            <span>{p.setName}</span>
                            {p.expansion && (
                              <span className="text-xs text-muted">
                                {p.expansion}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3 font-mono text-xs">
                          SL-{p.number}
                        </td>
                        <td className="px-5 py-3">
                          {p.archived ? (
                            <span className="inline-flex items-center rounded-full border border-line-strong bg-line/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                              Archived
                            </span>
                          ) : (
                            <span
                              className={
                                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider " +
                                (isLive
                                  ? "border-success/40 bg-success/10 text-success"
                                  : "border-line-strong bg-line/30 text-muted")
                              }
                            >
                              <span
                                className={
                                  "inline-block size-1.5 rounded-full " +
                                  (isLive ? "bg-success" : "bg-line-strong")
                                }
                              />
                              {isLive ? "Live" : "Coming soon"}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right font-bold tabular-nums">
                          {formatCents(p.priceCents)}
                        </td>
                        <td className="px-5 py-3 text-right font-bold tabular-nums">
                          {isLive
                            ? `${p.stock ?? 0} / ${p.editionTotal ?? "–"}`
                            : "–"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </AdminContent>
    </>
  );
}
