import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { cn } from "@/lib/utils";

type TCG = {
  name: string;
  logo: string;
  status: "active" | "soon";
  subtitle: string;
  accent: string;
};

const TCGS: TCG[] = [
  {
    name: "Pokémon",
    logo: "/brand/tcgs/pokemon.png",
    status: "active",
    subtitle: "Live now",
    accent: "#ffcb00",
  },
  {
    name: "One Piece",
    logo: "/brand/tcgs/one-piece.webp",
    status: "soon",
    subtitle: "Coming soon",
    accent: "#ff2d3e",
  },
  {
    name: "Magic: The Gathering",
    logo: "/brand/tcgs/mtg.png",
    status: "soon",
    subtitle: "Coming soon",
    accent: "#8b3eff",
  },
  {
    name: "Lorcana",
    logo: "/brand/tcgs/lorcana.avif",
    status: "soon",
    subtitle: "Coming soon",
    accent: "#00b8e0",
  },
];

export function TCGRoadmap() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-sky-tint">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 0% 0%, rgba(0,184,224,0.18) 0%, rgba(0,184,224,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 100% 100%, rgba(139,62,255,0.15) 0%, rgba(139,62,255,0) 60%)",
        }}
      />
      <Octagon className="absolute -right-12 top-12 size-44 rotate-12 text-cyan/30 md:size-56" />
      <Octagon className="absolute -left-14 -bottom-6 size-40 -rotate-12 text-purple/25 md:size-52" />
      <ConfettiField />

      <Container className="relative py-14 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div className="flex flex-col gap-2">
            <span className="eyebrow inline-flex items-center gap-1.5 text-cyan-deep">
              <Sparkles className="size-3.5" strokeWidth={2.6} />
              What&apos;s next
            </span>
            <h2 className="section-h2">
              More TCGs <span className="text-cyan-deep">coming.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted md:text-base">
            Starting with Pokémon. The rest of the lineup is in the works.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {TCGS.map((tcg) => (
            <div
              key={tcg.name}
              className="group relative flex aspect-[5/4] flex-col overflow-hidden border-2 border-text bg-white transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className={cn(
                  "relative flex flex-1 items-center justify-center p-6",
                  tcg.status === "soon" && "opacity-90",
                )}
              >
                <Image
                  src={tcg.logo}
                  alt={tcg.name}
                  width={260}
                  height={130}
                  className="h-auto max-h-[90px] w-auto max-w-[80%] object-contain md:max-h-[110px]"
                />
              </div>

              <div
                className="flex items-center justify-between gap-2 border-t-2 border-text px-3 py-2.5"
                style={{
                  background: tcg.status === "active" ? tcg.accent : "#ffffff",
                  color: "#0a0a0a",
                }}
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider md:text-[11px]">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      tcg.status === "active" ? "animate-pulse bg-success" : "bg-line-strong",
                    )}
                  />
                  {tcg.subtitle}
                </span>
                {tcg.status === "active" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                    Shop ↓
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted md:text-base">
          Want a different TCG?{" "}
          <Link
            href="#request"
            className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
          >
            Tell us.
          </Link>
        </p>
      </Container>
    </section>
  );
}
