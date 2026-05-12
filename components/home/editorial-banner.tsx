import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";

type Props = {
  eyebrow: string;
  eyebrowColor?: "orange" | "magenta" | "cyan" | "lime" | "purple" | "yellow";
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  bg?: "white" | "pink" | "sky" | "cream" | "lavender";
};

const EYEBROW_COLOR: Record<NonNullable<Props["eyebrowColor"]>, string> = {
  orange: "text-orange",
  magenta: "text-magenta",
  cyan: "text-cyan-deep",
  lime: "text-lime-deep",
  purple: "text-purple",
  yellow: "text-yellow-deep",
};

const HALO_RGBA: Record<NonNullable<Props["eyebrowColor"]>, string> = {
  orange: "rgba(255,106,0,0.18)",
  magenta: "rgba(255,44,146,0.18)",
  cyan: "rgba(0,184,224,0.18)",
  lime: "rgba(92,211,26,0.18)",
  purple: "rgba(139,62,255,0.18)",
  yellow: "rgba(255,203,0,0.18)",
};

const OCTA_TINT: Record<NonNullable<Props["eyebrowColor"]>, string> = {
  orange: "text-orange/30",
  magenta: "text-magenta/30",
  cyan: "text-cyan/30",
  lime: "text-lime/30",
  purple: "text-purple/30",
  yellow: "text-yellow/40",
};

const BG: Record<NonNullable<Props["bg"]>, string> = {
  white: "bg-white",
  pink: "bg-pink-tint",
  sky: "bg-sky-tint",
  cream: "bg-cream",
  lavender: "bg-lavender",
};

export function EditorialBanner({
  eyebrow,
  eyebrowColor = "orange",
  title,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  reverse = false,
  bg = "pink",
}: Props) {
  const accentText = EYEBROW_COLOR[eyebrowColor];
  const accentTint = OCTA_TINT[eyebrowColor];
  const haloColor = HALO_RGBA[eyebrowColor];
  return (
    <section className={`relative overflow-hidden border-b border-line ${BG[bg]}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(50% 50% at 20% 50%, ${haloColor} 0%, transparent 60%)`,
        }}
      />
      <Octagon className={`absolute -left-12 top-6 size-40 rotate-12 md:size-52 ${accentTint}`} />
      <Octagon className={`absolute -right-14 bottom-4 size-36 -rotate-12 md:size-48 ${accentTint}`} />
      <ConfettiField />

      <Container className="relative py-12 md:py-16">
        <div
          className={`grid items-center gap-8 md:gap-14 ${reverse ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"}`}
        >
          <div className={`flex flex-col gap-5 ${reverse ? "md:order-2" : ""}`}>
            <span className={`eyebrow ${accentText}`}>{eyebrow}</span>
            <h2 className="section-h2">{title}</h2>
            <p className="max-w-lg text-base leading-relaxed text-text-soft md:text-lg">
              {body}
            </p>
            <div>
              <Link href={ctaHref} className="btn">
                {ctaLabel}
                <ArrowRight className="size-3.5" strokeWidth={2.6} />
              </Link>
            </div>
          </div>

          <div
            className={`relative aspect-[5/4] overflow-hidden border-2 border-text bg-white ${reverse ? "md:order-1" : ""}`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute right-3 top-3 inline-flex size-10 rotate-12 items-center justify-center bg-yellow text-text"
            >
              <span className="font-display text-xs leading-none">✶</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
