import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";

export function Newsletter() {
  return (
    <section className="relative overflow-hidden border-b border-line text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #8b3eff 0%, #ff2c92 50%, #ff6a00 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="confetti-dot left-[8%] top-[20%] size-2 bg-yellow" />
        <span className="confetti-dot left-[16%] top-[70%] size-1.5 bg-cyan" />
        <span className="confetti-dot right-[12%] top-[30%] size-2 bg-yellow" />
        <span className="confetti-dot right-[8%] top-[80%] size-1.5 bg-lime" />
      </div>

      <Container className="relative grid items-center gap-8 py-14 md:grid-cols-[1fr_1fr] md:gap-16 md:py-16">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            <Sparkles className="size-3.5" strokeWidth={2.6} />
            Get drops first
          </span>
          <h2 className="font-display text-[clamp(2rem,5.5vw,4rem)] uppercase leading-[0.95] tracking-tight">
            Be the first to know
            <br />
            <span className="text-yellow">when slabs drop.</span>
          </h2>
        </div>

        <form className="flex flex-col gap-3">
          <div className="flex flex-col items-stretch rounded-full border-2 border-white bg-white/10 backdrop-blur-sm transition-colors focus-within:bg-white/20 sm:flex-row sm:items-center">
            <input
              type="email"
              placeholder="you@trainer.com"
              className="flex-1 bg-transparent px-5 py-3.5 text-base placeholder:text-white/60 focus:outline-none"
              aria-label="Email"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-text px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-yellow hover:text-text"
            >
              Join
              <ArrowRight className="size-3.5" strokeWidth={2.6} />
            </button>
          </div>
          <p className="text-xs text-white/80">
            No spam — just new drops, restocks, and set previews. Unsubscribe anytime.
          </p>
        </form>
      </Container>
    </section>
  );
}
