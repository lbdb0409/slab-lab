"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent } from "react";

type SearchParams = { set?: string; status?: string; sort?: string };

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "set", label: "By set" },
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
    <label className="flex w-full items-center gap-2 md:inline-flex md:w-auto">
      <span className="text-xs font-bold uppercase tracking-wider text-muted">
        Sort
      </span>
      <select
        value={current}
        onChange={onChange}
        className="w-full min-w-0 border border-line bg-white px-3 py-2.5 text-base font-bold max-md:h-11 md:w-auto md:py-2 md:text-sm uppercase tracking-wider focus:border-text focus:outline-none"
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
