import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  delta?: { value: number; positive: boolean };
  sub?: string;
  Icon?: LucideIcon;
  accent?: "orange" | "magenta" | "cyan" | "purple" | "lime";
};

const ACCENT_BG: Record<NonNullable<Props["accent"]>, string> = {
  orange: "bg-orange/10 text-orange",
  magenta: "bg-magenta/10 text-magenta",
  cyan: "bg-cyan/10 text-cyan-deep",
  purple: "bg-purple/10 text-purple",
  lime: "bg-lime/15 text-lime-deep",
};

export function StatCard({
  label,
  value,
  delta,
  sub,
  Icon,
  accent = "orange",
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        {Icon && (
          <span
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-md",
              ACCENT_BG[accent],
            )}
          >
            <Icon className="size-4" strokeWidth={2.4} />
          </span>
        )}
      </div>
      <span className="font-display text-3xl leading-none tabular-nums tracking-tight md:text-4xl">
        {value}
      </span>
      <div className="flex items-center gap-2 text-xs">
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold uppercase tracking-wider",
              delta.positive
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger",
            )}
          >
            {delta.positive ? (
              <TrendingUp className="size-3" strokeWidth={2.6} />
            ) : (
              <TrendingDown className="size-3" strokeWidth={2.6} />
            )}
            {delta.positive ? "+" : ""}
            {delta.value}%
          </span>
        )}
        {sub && <span className="text-muted">{sub}</span>}
      </div>
    </div>
  );
}
