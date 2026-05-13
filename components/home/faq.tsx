import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

type QA = { q: string; a: string };

// Curated subset for the home page. The canonical FAQ lives at /support with
// FAQPage JSON-LD attached. Keep this list to before-you-buy questions —
// detailed post-purchase / policy questions belong on /support.
const FAQS: QA[] = [
  {
    q: "Does my card come in the kit?",
    a: "No. Slablabs ships the surround and case only. You supply the card from your own collection and slot it in at home. We never handle your card.",
  },
  {
    q: "Is this a grading service?",
    a: "No. Slablabs is a display-product studio, not a graded-slab company. If you want a grade, send to PSA / BGS / CGC. If you want display, snap your card into a Slablab.",
  },
  {
    q: "What card sizes fit?",
    a: "Standard trading-card size (63 × 88 mm), sleeved or unsleeved. Each kit is sized to fit the specific card it was designed for. Oversized or jumbo promo cards aren't supported yet.",
  },
  {
    q: "How long does assembly take?",
    a: "Around 60 seconds. The card slides into the surround, the case snaps shut. No tools required.",
  },
  {
    q: "Will the case damage or scratch my card?",
    a: "No. The interior of the surround is smooth and the case uses optical-grade PET with anti-static lining. If you're being cautious, slide the card in sleeved.",
  },
  {
    q: "Where do you ship?",
    a: "Australia only for now. Free standard shipping on orders over $99, 3 to 5 business days nationwide. International is on the roadmap.",
  },
];

export function FAQ() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <Octagon className="pointer-events-none absolute -left-12 -top-6 size-40 rotate-12 text-cyan/20 md:size-52" />
      <Octagon className="pointer-events-none absolute -right-14 -bottom-10 size-44 -rotate-12 text-purple/20 md:size-56" />

      <Container className="relative grid gap-10 py-14 md:grid-cols-[1fr_1.5fr] md:gap-16 md:py-20">
        <div className="flex flex-col gap-4 md:sticky md:top-[120px] md:h-fit">
          <span className="eyebrow inline-flex items-center gap-1.5 text-cyan-deep">
            <HelpCircle className="size-3.5" strokeWidth={2.6} />
            Common questions
          </span>
          <h2 className="section-h2">
            Before you <span className="text-cyan-deep">slab.</span>
          </h2>
          <p className="text-sm leading-relaxed text-text-soft md:text-base">
            The questions we get most before someone buys. For order, return,
            and account questions head to{" "}
            <Link
              href="/support"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              support
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((qa, i) => (
            <details
              key={qa.q}
              className="group border-2 border-line bg-bg-soft transition-colors open:border-text open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
                <span className="flex items-baseline gap-3 text-left">
                  <span className="font-display text-base leading-none text-orange md:text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide text-text md:text-base">
                    {qa.q}
                  </span>
                </span>
                <ChevronDown
                  className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                  strokeWidth={2.4}
                />
              </summary>
              <div className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-text-soft md:px-6 md:pb-6 md:text-base">
                {qa.a}
              </div>
            </details>
          ))}

          <Link
            href="/support"
            className="mt-2 inline-flex items-center justify-between gap-3 rounded-md border-2 border-text bg-cream px-5 py-4 text-sm font-bold uppercase tracking-wide text-text transition-colors hover:bg-orange hover:text-white md:px-6 md:py-5"
          >
            <span>See all questions in support</span>
            <ArrowRight className="size-4" strokeWidth={2.6} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
