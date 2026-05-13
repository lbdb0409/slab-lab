import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-text text-white">
      {/* Color halos */}
      <div className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(50% 50% at 78% 40%, rgba(255,106,0,0.45) 0%, rgba(255,106,0,0) 65%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(50% 50% at 15% 75%, rgba(139,62,255,0.35) 0%, rgba(139,62,255,0) 60%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(40% 40% at 80% 85%, rgba(255,44,146,0.3) 0%, rgba(255,44,146,0) 60%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(40% 40% at 25% 25%, rgba(0,184,224,0.3) 0%, rgba(0,184,224,0) 60%)" }}
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="confetti-dot left-[8%] top-[20%] size-2 bg-yellow" />
        <span className="confetti-dot left-[18%] top-[60%] size-1.5 bg-cyan" />
        <span className="confetti-dot left-[6%] top-[85%] size-2 bg-magenta" />
        <span className="confetti-dot right-[12%] top-[18%] size-1.5 bg-lime" />
        <span className="confetti-dot right-[24%] top-[65%] size-2 bg-yellow" />
        <span className="confetti-dot right-[4%] top-[35%] size-1.5 bg-cyan" />
      </div>

      <Container className="relative grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-24 lg:py-28">
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-magenta/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-magenta">
            <Sparkles className="size-3.5" strokeWidth={2.6} />
            Custom slab kits · Pokémon TCG
          </span>

          <h1 className="font-display text-[clamp(3.25rem,11vw,8.5rem)] uppercase leading-[0.88] tracking-tight">
            <span className="block">Not every card</span>
            <span className="block">
              needs a{" "}
              <span className="relative inline-block align-baseline">
                <span aria-hidden className="absolute inset-0 -skew-x-6 bg-magenta" />
                <span className="relative inline-block px-3 py-0.5 text-white">10</span>
              </span>
            </span>
            <span className="block">to deserve the</span>
            <span
              className="block text-yellow"
              style={{ textShadow: "0 0 48px rgba(255,203,0,0.55)" }}
            >
              spotlight.
            </span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
            Custom-printed slab kits for Pokémon trading cards. Pick your card,
            we print, you snap it together at home. No grading queue, no
            shipping your card off.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/shop" className="btn-orange">
              Shop slab kits
              <ArrowRight className="size-3.5" strokeWidth={2.6} />
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-bold uppercase tracking-wider text-cyan underline-offset-4 transition-colors hover:text-yellow hover:underline"
            >
              How it works →
            </Link>
          </div>
        </div>

        {/* Featured slab tile */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="relative aspect-[3/4] overflow-hidden border-2 border-orange bg-purple/20">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(139,62,255,0.4) 0%, rgba(139,62,255,0) 70%)" }}
            />
            <Image
              src="/brand/slab-mockup.png"
              alt="Slablabs Mega Gengar EX expanded-art slab kit"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-full bg-magenta px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              ✶ Featured kit
            </span>
          </div>
          <div className="absolute -bottom-3 left-4 right-4 flex items-center justify-between border-2 border-orange bg-text px-4 py-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow">
                Available now
              </span>
              <span className="text-sm font-bold uppercase tracking-wide">
                Mega Gengar EX
              </span>
            </div>
            <span className="text-sm font-bold tabular-nums text-orange">$149</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
