"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Expansion } from "@/data/kits";
import type { ProductForCard } from "@/lib/products";

type Option = { value: string; label: string; count?: number };

type SearchParams = { set?: string; status?: string; sort?: string };

function buildHref(
  searchParams: SearchParams,
  param: keyof SearchParams,
  value: string,
) {
  const next: Record<string, string> = {};
  for (const [k, v] of Object.entries(searchParams)) {
    if (v) next[k] = v;
  }
  if (value === "") delete next[param];
  else next[param] = value;
  const qs = new URLSearchParams(next).toString();
  return qs ? `/shop?${qs}` : "/shop";
}

function Accordion({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="font-display text-base uppercase tracking-tight">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2.4}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function OptionList({
  options,
  current,
  param,
  searchParams,
}: {
  options: Option[];
  current?: string;
  param: keyof SearchParams;
  searchParams: SearchParams;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {options.map((opt) => {
        const active = (current ?? "") === opt.value;
        return (
          <li key={opt.value}>
            <Link
              href={buildHref(searchParams, param, opt.value)}
              scroll={false}
              className={cn(
                "group flex items-center justify-between gap-2 text-sm transition-colors duration-200",
                active ? "font-bold text-orange" : "text-text-soft hover:text-orange",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "inline-block size-3.5 border transition-colors",
                    active
                      ? "border-orange bg-orange"
                      : "border-line-strong bg-white group-hover:border-orange",
                  )}
                >
                  {active && (
                    <svg viewBox="0 0 12 12" className="size-3 text-white" aria-hidden>
                      <path d="M2.5 6.5l2.5 2.5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </span>
              {opt.count !== undefined && (
                <span className="text-xs tabular-nums text-muted">{opt.count}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function FilterRail({
  searchParams,
  kits,
  expansions,
}: {
  searchParams: SearchParams;
  kits: ProductForCard[];
  expansions: Expansion[];
}) {
  const totalKits = kits.length;
  const liveCount = kits.filter((k) => k.status === "live").length;
  const soonCount = totalKits - liveCount;
  const hasFilter = Boolean(searchParams.set || searchParams.status);

  return (
    <aside className="flex flex-col md:sticky md:top-[180px] md:self-start">
      <div className="flex items-center justify-between border-y border-line py-3">
        <span className="font-display text-lg uppercase tracking-tight">Filter</span>
        {hasFilter && (
          <Link
            href="/shop"
            className="text-[11px] font-bold uppercase tracking-wider text-orange hover:underline"
          >
            Clear all
          </Link>
        )}
      </div>

      <Accordion title="Set">
        <OptionList
          options={[
            { value: "", label: "All sets", count: totalKits },
            ...expansions.map((e) => ({
              value: e.slug,
              label: e.name,
              count: kits.filter((k) => k.setSlug === e.slug).length,
            })),
          ]}
          current={searchParams.set}
          param="set"
          searchParams={searchParams}
        />
      </Accordion>

      <Accordion title="Availability">
        <OptionList
          options={[
            { value: "", label: "All", count: totalKits },
            { value: "live", label: "In stock", count: liveCount },
            { value: "soon", label: "Coming soon", count: soonCount },
          ]}
          current={searchParams.status}
          param="status"
          searchParams={searchParams}
        />
      </Accordion>

      <Accordion title="Price" defaultOpen={false}>
        <p className="text-sm text-muted">All kits $149 — $189</p>
      </Accordion>

      <Accordion title="Slab style" defaultOpen={false}>
        <p className="text-sm text-muted">Single card slab</p>
      </Accordion>
    </aside>
  );
}
