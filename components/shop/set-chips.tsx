import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Expansion } from "@/data/kits";

type SearchParams = { set?: string; status?: string; sort?: string };

function buildHref(searchParams: SearchParams, value: string) {
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(searchParams)) {
    if (v) next[k] = v;
  }
  if (value === "") delete next.set;
  else next.set = value;
  const qs = new URLSearchParams(next).toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export function SetChips({
  searchParams,
  expansions,
}: {
  searchParams: SearchParams;
  expansions: Expansion[];
}) {
  const current = searchParams.set ?? "";
  const items = [{ slug: "", name: "All sets" }, ...expansions];

  return (
    <div className="border-b border-line bg-white">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-4 md:px-10">
        {items.map((it) => {
          const active = current === it.slug;
          return (
            <Link
              key={it.slug || "all"}
              href={buildHref(searchParams, it.slug)}
              scroll={false}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs max-md:min-h-11 md:py-2 font-bold uppercase tracking-wider transition-colors",
                active
                  ? "border-text bg-text text-white"
                  : "border-line text-text hover:border-text",
              )}
            >
              {it.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
