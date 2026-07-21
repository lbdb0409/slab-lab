import { Hand, ShieldAlert } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

export function CardNotIncluded() {
  return (
    <section className="relative overflow-hidden border-y-2 border-text bg-white">
      <Octagon className="pointer-events-none absolute -left-12 -top-10 size-44 rotate-12 text-orange/20 md:size-56" />
      <Octagon className="pointer-events-none absolute -right-12 -bottom-10 size-40 -rotate-12 text-magenta/20 md:size-52" />

      <Container className="relative grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-20">
        <div className="flex flex-col gap-5">
          <span className="eyebrow inline-flex items-center gap-1.5 text-orange">
            <ShieldAlert className="size-3.5" strokeWidth={2.6} />
            What you get · what you don&apos;t
          </span>
          <h2 className="section-h2">
            Card <span className="text-orange">not</span> included.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-text-soft md:text-lg">
            Slablabs ships the surround and case only. You supply the card from
            your own collection and snap it together at home. Your card never
            leaves your hands.
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            We&apos;re a display-product studio. Not a grading company. No card
            shipped to us. No grading queue. No third-party handling.
          </p>
        </div>

        {/* RIGHT. What's in the box */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <Box
              tone="orange"
              label="In the kit"
              items={["Custom-printed surround", "Optical-PET case", "Build instructions"]}
              accent="text-orange"
            />
            <Box
              tone="magenta"
              label="Not included"
              items={["Your trading card", "Grading service", "Sleeves"]}
              accent="text-magenta"
              strike
            />
          </div>
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border-2 border-text bg-cream p-4 text-[13px] leading-relaxed text-text md:p-5">
            <Hand className="mt-0.5 size-4 shrink-0 text-orange" strokeWidth={2.4} />
            <p>
              <strong>You insert your card.</strong> The surround &amp; case
              click around it. We never touch it.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Box({
  tone,
  label,
  items,
  accent,
  strike,
}: {
  tone: "orange" | "magenta";
  label: string;
  items: string[];
  accent: string;
  strike?: boolean;
}) {
  const borderTone =
    tone === "orange" ? "border-orange/60 bg-orange/5" : "border-magenta/60 bg-magenta/5";
  return (
    <div className={`flex flex-col gap-3 rounded-2xl border-2 p-3 sm:p-4 md:p-5 ${borderTone}`}>
      <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${accent}`}>
        {label}
      </span>
      <ul className="flex flex-col gap-1.5 text-sm font-medium text-text">
        {items.map((item) => (
          <li key={item} className={strike ? "line-through opacity-70" : ""}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
