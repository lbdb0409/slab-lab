import { Container } from "@/components/ui/container";

export function Mantra() {
  return (
    <section className="relative overflow-hidden border-y-2 border-text bg-text text-white">
      {/* Color halos */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 25% 30%, rgba(255,203,0,0.16) 0%, rgba(255,203,0,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 80% 80%, rgba(255,44,146,0.18) 0%, rgba(255,44,146,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 100%, rgba(255,106,0,0.16) 0%, rgba(255,106,0,0) 60%)",
        }}
      />

      {/* Decorative octagons */}
      <Octagon className="pointer-events-none absolute -left-12 top-8 size-36 rotate-12 text-white/8 md:size-48" />
      <Octagon className="pointer-events-none absolute -right-14 bottom-8 size-44 -rotate-12 text-white/8 md:size-56" />

      {/* Confetti */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="confetti-dot left-[12%] top-[18%] size-1.5 bg-yellow" />
        <span className="confetti-dot left-[6%] top-[70%] size-2 bg-magenta" />
        <span className="confetti-dot right-[12%] top-[28%] size-2 bg-cyan" />
        <span className="confetti-dot right-[8%] top-[78%] size-1.5 bg-lime" />
      </div>

      <Container className="relative py-24 md:py-32">
        <div className="flex flex-col items-start gap-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow/30 bg-yellow/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-yellow">
            <span className="inline-block size-1.5 rounded-full bg-yellow" />
            Our mantra · why we make slabs
          </span>

          <h2 className="font-display text-[clamp(2.5rem,9vw,8rem)] leading-[0.92] tracking-tight">
            NOT EVERY CARD
            <br />
            NEEDS A{" "}
            <span className="relative inline-block align-baseline">
              <span
                aria-hidden
                className="absolute inset-0 -skew-x-6 bg-magenta"
              />
              <span className="relative inline-block px-3 py-0.5 text-white">
                10
              </span>
            </span>
            <br />
            TO DESERVE THE
            <br />
            <span
              className="text-yellow"
              style={{ textShadow: "0 0 48px rgba(255,203,0,0.55)" }}
            >
              SPOTLIGHT.
            </span>
          </h2>

          <div className="flex items-center gap-3 pl-1">
            <span className="h-px w-12 bg-orange" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              The Slablabs mantra
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Octagon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <polygon
        points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
