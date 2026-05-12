import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Mail,
  Package,
  Shield,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with your Slablabs slab kit. Orders, shipping, builds, and returns. FAQs and direct contact.",
  alternates: { canonical: "/support" },
};

const TOPICS = [
  {
    Icon: Package,
    title: "Order & shipping",
    body: "Tracking, delivery times, missing kits, address changes.",
    href: "/shipping",
    color: "text-magenta",
    bg: "bg-pink-tint",
  },
  {
    Icon: Sparkles,
    title: "Build help",
    body: "Assembly steps, alignment, removing your card later.",
    href: "/build-guide",
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
  },
  {
    Icon: Shield,
    title: "Defects & returns",
    body: "Damaged kit, wrong item, or change of mind.",
    href: "/shipping",
    color: "text-purple",
    bg: "bg-lavender",
  },
  {
    Icon: HelpCircle,
    title: "Account & wishlist",
    body: "Login issues, saved kits, email notifications.",
    href: "/sign-in",
    color: "text-lime-deep",
    bg: "bg-mint-tint",
  },
];

const FAQ = [
  {
    q: "Does my kit come with the card?",
    a: "No. Slablabs kits include the printed surround and the slab case only. You supply the trading card from your own collection.",
  },
  {
    q: "Is this a grading service?",
    a: "No. Slablabs is for display. We don't authenticate, grade, or assign condition. Your card never leaves your hands.",
  },
  {
    q: "How long is shipping?",
    a: "Standard AU shipping is 3–5 business days. Express is 1–2 days. Free standard shipping on orders over $99.",
  },
  {
    q: "Can I return a kit?",
    a: "Yes. Unassembled kits can be returned within 30 days for a full refund. Once you've built it, we offer replacements only for defects.",
  },
  {
    q: "What if my card doesn't fit?",
    a: "All Slablabs kits are sized for standard 63 × 88mm TCG cards. Email us before assembling if you have a non-standard card and we'll work it out.",
  },
  {
    q: "Do you ship outside Australia?",
    a: "Not yet. We ship within Australia only for now. International shipping is on the roadmap.",
  },
  {
    q: "When will more TCGs go live?",
    a: "Pokémon is live now. One Piece, Magic: The Gathering, and Lorcana are in development. Sign up to be notified.",
  },
  {
    q: "Can I request a specific card?",
    a: "Yes. Use the Request a Card form on the home page. Tell us the card and set, and we'll source the artwork and design a kit.",
  },
];

export default function SupportPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader
        crumbs={[{ href: "/support", label: "Support" }]}
        eyebrow="Support"
        EyebrowIcon={HelpCircle}
        eyebrowColor="cyan"
        title={
          <>
            How can we <span className="text-cyan-deep">help?</span>
          </>
        }
        body="Quick answers, build help, and a direct line to a human if you need it."
        bg="sky"
      />

      {/* TOPICS */}
      <section className="border-b border-line bg-white">
        <Container className="py-14 md:py-20">
          <div className="mb-8 flex flex-col items-start gap-2 md:mb-10">
            <span className="eyebrow text-purple">Browse by topic</span>
            <h2 className="section-h2">
              Pick a <span className="text-purple">category.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {TOPICS.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className={`group relative flex flex-col gap-3 overflow-hidden border-2 border-text p-6 transition-transform duration-300 hover:-translate-y-1 ${t.bg}`}
              >
                <Octagon
                  className={`pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 opacity-30 ${t.color}`}
                />
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-full bg-white text-text shadow-sm`}
                >
                  <t.Icon className={`size-5 ${t.color}`} strokeWidth={2.4} />
                </span>
                <h3 className="font-display text-xl uppercase leading-tight">
                  {t.title}
                </h3>
                <p className="text-sm text-text-soft">{t.body}</p>
                <span
                  className={`mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${t.color}`}
                >
                  Read more
                  <ArrowRight
                    className="size-3 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.6}
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-orange">Frequently asked</span>
            <h2 className="section-h2">
              Quick <span className="text-orange">answers.</span>
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group border-2 border-text bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 font-display text-lg uppercase leading-tight tracking-tight md:p-6">
                  {item.q}
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-orange text-white transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t border-line p-5 text-sm leading-relaxed text-text-soft md:p-6 md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section className="relative overflow-hidden border-b border-line bg-text text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 25% 30%, rgba(255,106,0,0.3) 0%, rgba(255,106,0,0) 60%)",
          }}
        />
        <Octagon className="absolute -left-12 top-8 size-44 rotate-12 text-orange/30 md:size-56" />
        <Octagon className="absolute -right-14 -bottom-8 size-40 -rotate-12 text-magenta/30 md:size-52" />
        <ConfettiField />

        <Container className="relative grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-yellow">Still need help?</span>
            <h2 className="section-h2">
              Email a <span className="text-yellow">human.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              We&apos;re a small Australian team. Every email is read by
              someone, not a bot. Expect a reply within a working day.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border-2 border-white bg-text p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-orange text-white">
                <Mail className="size-5" strokeWidth={2.4} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-yellow">
                  Support email
                </span>
                <p className="font-display text-xl uppercase leading-tight">
                  hello@slablabs.com.au
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-magenta text-white">
                <MessageCircle className="size-5" strokeWidth={2.4} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-yellow">
                  DM us
                </span>
                <p className="font-display text-xl uppercase leading-tight">
                  @slablabs
                </p>
              </div>
            </div>
            <Link href="/contact" className="btn-orange mt-3">
              Open contact form
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
