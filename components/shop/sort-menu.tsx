"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent } from "react";

type SearchParams = { set?: string; status?: string; sort?: string };

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "live-first", label: "In stock first" },
];

export function SortMenu({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const current = searchParams.sort ?? "newest";

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next: Record<string, string> = {};
    for (const [k, v] of Object.entries(searchParams)) {
      if (v) next[k] = v;
    }
    next.sort = e.target.value;
    router.push(`/shop?${new URLSearchParams(next).toString()}`, {
      scroll: false,
    });
  };

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-muted">
        Sort
      </span>
      <select
        value={current}
        onChange={onChange}
        className="border border-line bg-white px-3 py-2 text-sm font-bold uppercase tracking-wider focus:border-text focus:outline-none"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}
