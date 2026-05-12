import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

// REPLACE WITH REAL REVIEWS WHEN YOU HAVE THEM.
// To add a photo, set `avatar` to a path under /public, e.g. "/brand/reviews/liam.jpg".
// Without `avatar`, the card renders the initials from `author` on a tinted octagon.
type Review = {
  body: string;
  author: string;
  handle?: string;
  location: string;
  avatar?: string;
  tone: "yellow" | "magenta" | "cyan" | "lime";
};

const REVIEWS: Review[] = [
  {
    body:
      "Pulled a Charizard ex and didn't want to send it to PSA. Slab kit arrived, snapped it together in under a minute, and now it sits on the shelf looking better than half my graded cards.",
    author: "Liam",
    handle: "@liamsslabs",
    location: "Brisbane, QLD",
    tone: "yellow",
  },
  {
    body:
      "The custom surround art is the thing. The slab looks like part of the card. Nothing else on the market does this. My binder cards finally have a real display option.",
    author: "Mia",
    handle: "@hardcellophane",
    location: "Melbourne, VIC",
    tone: "magenta",
  },
  {
    body:
      "Bought three. Build quality is genuinely good. The case is clear, no warping, the print on the surround is crisp. For the price I'd expected worse.",
    author: "James",
    handle: "@jpullsem",
    location: "Sydney, NSW",
    tone: "cyan",
  },
];

const TONE_BG: Record<Review["tone"], string> = {
  yellow: "bg-yellow text-text",
  magenta: "bg-magenta text-white",
  cyan: "bg-cyan text-text",
  lime: "bg-lime text-text",
};

const OCTAGON_CLIP =
  "polygon(29.3% 0,70.7% 0,100% 29.3%,100% 70.7%,70.7% 100%,29.3% 100%,0 70.7%,0 29.3%)";

function initialsFrom(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <Octagon className="pointer-events-none absolute -right-12 -top-6 size-40 rotate-12 text-orange/15 md:size-52" />
      <Octagon className="pointer-events-none absolute -left-14 -bottom-10 size-44 -rotate-12 text-magenta/15 md:size-56" />

      <Container className="relative py-14 md:py-20">
        <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
          <span className="eyebrow inline-flex items-center gap-1.5 text-magenta">
            <Quote className="size-3.5" strokeWidth={2.6} />
            From the shelf
          </span>
          <h2 className="section-h2 max-w-2xl">
            Built by collectors. <span className="text-magenta">Reviewed</span> by them too.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {REVIEWS.map((r) => (
            <article
              key={r.author + r.body.slice(0, 12)}
              className="relative flex flex-col gap-5 overflow-hidden border-2 border-text bg-white p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7"
            >
              <span
                aria-hidden
                className={`absolute -right-4 -top-4 inline-flex size-16 rotate-12 items-center justify-center ${TONE_BG[r.tone]}`}
                style={{ clipPath: OCTAGON_CLIP }}
              >
                <Quote className="size-5" strokeWidth={2.4} />
              </span>

              <div className="flex items-center gap-1 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-orange" strokeWidth={0} />
                ))}
              </div>

              <p className="text-[15px] leading-relaxed text-text">&ldquo;{r.body}&rdquo;</p>

              <div className="mt-auto flex items-center gap-3 border-t border-line pt-4">
                {r.avatar ? (
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-text">
                    <Image
                      src={r.avatar}
                      alt={r.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span
                    aria-hidden
                    className={`inline-flex size-10 shrink-0 items-center justify-center font-display text-sm leading-none ${TONE_BG[r.tone]}`}
                    style={{ clipPath: OCTAGON_CLIP }}
                  >
                    {initialsFrom(r.author)}
                  </span>
                )}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-bold uppercase tracking-wide text-text">
                    {r.author}
                    {r.handle ? (
                      <span className="ml-1.5 text-[11px] font-medium normal-case text-muted">
                        {r.handle}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-muted">
                    {r.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-muted">
          Bought a kit? Email{" "}
          <a
            href="mailto:slablabsoz@gmail.com"
            className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
          >
            slablabsoz@gmail.com
          </a>{" "}
          and we&apos;ll feature your build.
        </p>
      </Container>
    </section>
  );
}
