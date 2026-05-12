import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";

type Crumb = { href: string; label: string };

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  EyebrowIcon?: LucideIcon;
  eyebrowColor?: "orange" | "magenta" | "cyan" | "lime" | "purple" | "yellow";
  title: ReactNode;
  body?: ReactNode;
  bg?: "cream" | "pink" | "sky" | "mint" | "lavender" | "gold" | "dark";
};

const EYEBROW_COLOR = {
  orange: "text-orange",
  magenta: "text-magenta",
  cyan: "text-cyan-deep",
  lime: "text-lime-deep",
  purple: "text-purple",
  yellow: "text-yellow-deep",
} as const;

const BG = {
  cream: "bg-cream text-text",
  pink: "bg-pink-tint text-text",
  sky: "bg-sky-tint text-text",
  mint: "bg-mint-tint text-text",
  lavender: "bg-lavender text-text",
  gold: "bg-gold text-text",
  dark: "bg-text text-white",
} as const;

const OCTAGON_TINTS = {
  cream: ["text-magenta/25", "text-purple/25"],
  pink: ["text-magenta/30", "text-orange/25"],
  sky: ["text-cyan/30", "text-purple/25"],
  mint: ["text-lime/30", "text-cyan/30"],
  lavender: ["text-purple/30", "text-magenta/25"],
  gold: ["text-orange/30", "text-magenta/25"],
  dark: ["text-orange/30", "text-purple/30"],
} as const;

export function PageHeader({
  crumbs,
  eyebrow,
  EyebrowIcon,
  eyebrowColor = "magenta",
  title,
  body,
  bg = "cream",
}: Props) {
  const [octa1, octa2] = OCTAGON_TINTS[bg];
  return (
    <>
      <div className="border-b border-line bg-bg-soft">
        <Container className="flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <Link href="/" className="hover:text-orange">
            Home
          </Link>
          {crumbs.map((c, i) => (
            <span key={c.href} className="inline-flex items-center gap-1.5">
              <ChevronRight className="size-3" strokeWidth={2.6} />
              {i === crumbs.length - 1 ? (
                <span className="text-text">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-orange">
                  {c.label}
                </Link>
              )}
            </span>
          ))}
        </Container>
      </div>

      <section
        className={`relative overflow-hidden border-b border-line ${BG[bg]}`}
      >
        <Octagon
          className={`absolute -left-12 -top-8 size-44 rotate-12 ${octa1} md:size-56`}
        />
        <Octagon
          className={`absolute -right-14 -bottom-6 size-40 -rotate-12 ${octa2} md:size-52`}
        />
        <ConfettiField />

        <Container className="relative flex flex-col gap-4 py-12 md:py-16">
          <span
            className={`eyebrow inline-flex items-center gap-1.5 ${EYEBROW_COLOR[eyebrowColor]}`}
          >
            {EyebrowIcon && <EyebrowIcon className="size-3.5" strokeWidth={2.6} />}
            {eyebrow}
          </span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[0.92] tracking-tight">
            {title}
          </h1>
          {body && (
            <p
              className={`max-w-2xl text-base leading-relaxed md:text-lg ${bg === "dark" ? "text-white/80" : "text-text-soft"}`}
            >
              {body}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
