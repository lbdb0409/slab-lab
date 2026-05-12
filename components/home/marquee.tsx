import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const ITEMS = [
  "ENCASE THE ART",
  "SLABLABS",
  "CUSTOM-PRINTED FOR YOUR CARD",
  "SLABLABS",
  "YOUR CARD NEVER LEAVES YOUR HANDS",
  "SLABLABS",
  "DISPLAY-GRADE PET",
  "SLABLABS",
];

type Props = {
  bg?: "yellow" | "orange" | "magenta" | "cyan" | "lime" | "text";
  text?: "black" | "white";
};

const BG: Record<NonNullable<Props["bg"]>, string> = {
  yellow: "bg-yellow",
  orange: "bg-orange",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
  lime: "bg-lime",
  text: "bg-text",
};

export function Marquee({ bg = "yellow", text = "black" }: Props) {
  const textColor = text === "white" ? "text-white" : "text-text";

  const renderRun = (key: string): ReactNode => (
    <div
      key={key}
      className="flex shrink-0 items-center gap-8 px-5 font-display text-2xl uppercase tracking-tight md:gap-10 md:text-3xl"
    >
      {ITEMS.map((it, i) => (
        <span key={`${key}-${i}`} className="inline-flex shrink-0 items-center gap-8 md:gap-10">
          <span>{it}</span>
          <Octagon />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden border-y-2 border-text", BG[bg], textColor)}>
      <div className="anim-marquee flex w-max items-center py-3 md:py-4">
        {renderRun("a")}
        {renderRun("b")}
      </div>
    </div>
  );
}

function Octagon() {
  return (
    <svg viewBox="0 0 100 100" className="size-5 md:size-6" aria-hidden>
      <polygon
        points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
        fill="currentColor"
      />
    </svg>
  );
}
