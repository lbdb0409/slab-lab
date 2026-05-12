import { Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

type Review = {
  body: string;
  author: string;
  location: string;
  tone: "yellow" | "magenta" | "cyan" | "lime";
};

const REVIEWS: Review[] = [
  {
    body:
      "Pulled a Charizard ex and didn't want to send it to PSA. Slab kit arrived, snapped it together in under a minute, and now it sits on the shelf looking better than half my graded cards.",
    author: "Liam · @liamsslabs",
    location: "Brisbane, QLD",
    tone: "yellow",
  },
  {
    body:
      "The custom surround art is the thing — the slab looks like part of the card. Nothing else on the market does this. My binder cards finally have a real display option.",
    author: "Mia · @hardcellophane",
    location: "Melbourne, VIC",
    tone: "magenta",
  },
  {
    body:
      "Bought three. Build quality is genuinely good — the case is clear, no warping, the print on the surround is crisp. For the price I'd expected worse.",
    author: "James · @jpullsem",
    location: "Sydney, NSW",
    tone: "cyan",
  },
];

const TONE_BG: Record<Review["tone"], string> = {
  yellow: "bg-yellow",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
  lime: "bg-lime",
};

const TONE_TEXT: Record<Review["tone"], string> = {
  yellow: "text-text",
  magenta: "text-white",
  cyan: "text-text",
  lime: "text-text",
};

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
              key={r.author}
              className="relative flex flex-col gap-5 overflow-hidden border-2 border-text bg-white p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7"
            >
              <span
                aria-hidden
                className={`absolute -right-4 -top-4 inline-flex size-16 rotate-12 items-center justify-center ${TONE_BG[r.tone]} ${TONE_TEXT[r.tone]}`}
                style={{ clipPath: "polygon(29.3% 0,70.7% 0,100% 29.3%,100% 70.7%,70.7% 100%,29.3% 100%,0 70.7%,0 29.3%)" }}
              >
                <Quote className="size-5" strokeWidth={2.4} />
              </span>

              <div className="flex items-center gap-1 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-orange" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-text">&ldquo;{r.body}&rdquo;</p>
              <div className="mt-auto flex flex-col gap-0.5 border-t border-line pt-4">
                <span className="text-sm font-bold uppercase tracking-wide text-text">
                  {r.author}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-muted">
                  {r.location}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
