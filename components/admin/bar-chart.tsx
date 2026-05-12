"use client";

import { useState } from "react";

type Datum = { label: string; value: number };

export function BarChart({
  data,
  prefix = "",
  suffix = "",
  height = 200,
}: {
  data: Datum[];
  prefix?: string;
  suffix?: string;
  height?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex w-full items-end gap-[2px]"
        style={{ height: `${height}px` }}
      >
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          const active = hovered === i;
          return (
            <div
              key={i}
              className="group relative flex h-full flex-1 cursor-pointer items-end"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-full rounded-sm bg-orange/35 transition-all duration-200 group-hover:bg-orange"
                style={{ height: `${Math.max(pct, 1)}%` }}
              />
              {active && (
                <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-text px-2.5 py-1.5 text-[11px] font-bold text-white shadow-lg">
                  <div className="tabular-nums">
                    {prefix}
                    {d.value.toLocaleString("en-AU")}
                    {suffix}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-white/60">
                    {d.label}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted">
        <span>{data[0]?.label}</span>
        <span>{data[Math.floor(data.length / 2)]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}
