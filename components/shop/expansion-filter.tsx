"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent } from "react";

type SearchParams = {
  set?: string;
  expansion?: string;
  status?: string;
  sort?: string;
};

export function ExpansionFilter({
  params,
  options,
  current,
}: {
  params: SearchParams;
  options: string[];
  current?: string;
}) {
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next: Record<string, string> = {};
    for (const [k, v] of Object.entries(params)) {
      if (v && k !== "expansion") next[k] = v;
    }
    if (e.target.value) next.expansion = e.target.value;
    const qs = new URLSearchParams(next).toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  };

  if (options.length === 0) return null;

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-muted">
        Set
      </span>
      <select
        value={current ?? ""}
        onChange={onChange}
        className="max-w-[180px] truncate border border-line bg-white px-3 py-2 text-sm font-bold uppercase tracking-wider focus:border-text focus:outline-none"
      >
        <option value="">All sets</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
