import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  HelpCircle,
  Mail,
  Package,
  Shield,
  UserCircle,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Slablabs help centre. Order tracking, build help, returns, FAQs, and a direct line to a human.",
  alternates: { canonical: "/support" },
};

// Status banner: set to null when there's nothing to announce. When set,
// the banner shows at the top of the page (above the topic grid).
const STATUS_BANNER: {
  tone: "info" | "warning";
  message: string;
} | null = null;

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
    Icon: Wrench,
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
    href: "/returns",
    color: "text-purple",
    bg: "bg-lavender",
  },
  {
    Icon: UserCircle,
    title: "Your account",
    body: "Login issues, saved kits, email notifications.",
    href: "/account",
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
    a: "No. Slablabs is a display product, not a grading service. We don't authenticate, grade, or assign condition. If you want a grade, send to PSA / BGS / CGC. If you want display, snap your card into a Slablab.",
  },
  {
    q: "What card sizes fit?",
    a: "Standard trading-card size (63 × 88 mm), sleeved or unsleeved. Each kit is sized to fit the specific card it was designed for. Oversized or jumbo promo cards aren't supported yet.",
  },
  {
    q: "Will the case damage or scratch my card?",
    a: "No. The interior of the surround is smooth and the case uses optical-grade PET with anti-static lining. If you're being extra careful, slide the card in sleeved.",
  },
  {
    q: "How long does assembly take?",
    a: "About 60 seconds. Slide the card into the surround, snap the case shut. No tools, no glue. The build guide walks the whole process step by step.",
  },
  {
    q: "What if I damage the kit during assembly?",
    a: "Email us and we'll send a replacement surround at cost. The snap-seal is forgiving and most first builds go fine. Your card stays at home either way.",
  },
  {
    q: "Can I open the slab later to get my card back?",
    a: "Yes. The case is sealed but not destroyed by opening — slide a card-tool or a fingernail along the seam at one corner and the case pops apart. The surround can be reused if it's not damaged.",
  },
  {
    q: "How long is shipping?",
    a: "Standard AU shipping is 3 to 5 business days. Free on orders over $99. We don't ship outside Australia yet — international is on the roadmap.",
  },
  {
    q: "Can I return a kit?",
    a: "Yes. Unassembled kits can be returned within 30 days for a full refund. Once you've built it, we only offer replacements for defects. See the returns page for the full policy.",
  },
  {
    q: "When will more TCGs go live?",
    a: "Pokémon is live now. One Piece, Magic: The Gathering, and Lorcana are queued. Drop your email on the home page to be notified the moment a new TCG launches.",
  },
  {
    q: "Can I request a kit for a specific card?",
    a: "Yes. Use the Request a Slab form on the home page. Tell us the card and the set; we'll source the artwork, design the surround, and let you know when it's ready.",
  },
  {
    q: "Are you affiliated with The Pokémon Company / Nintendo?",
    a: "No. Slablabs is an independent Australian studio. We're not affiliated with The Pokémon Company, Nintendo, Bandai, Wizards of the Coast, or Disney/Ravensburger. All trademarks belong to their respective owners.",
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
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-text bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-text">
            <Clock className="size-3.5 text-orange" strokeWidth={2.6} />
            Replies within 1 business day · AU hours
          </span>
        }
      />

      {STATUS_BANNER && (
        <div
          className={
            "border-b border-line " +
            (STATUS_BANNER.tone === "warning"
              ? "bg-magenta/10"
              : "bg-yellow/10")
          }
        >
          <Container className="flex items-start gap-3 py-3 text-sm">
            <AlertCircle
              className={
                "mt-0.5 size-4 shrink-0 " +
                (STATUS_BANNER.tone === "warning"
                  ? "text-magenta"
                  : "text-yellow-deep")
              }
              strokeWidth={2.4}
            />
            <p className="text-text">{STATUS_BANNER.message}</p>
          </Container>
        </div>
      )}

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
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-text shadow-sm">
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
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3 md:mb-12">
            <div className="flex flex-col gap-2">
              <span className="eyebrow text-orange">Frequently asked</span>
              <h2 className="section-h2">
                Quick <span className="text-orange">answers.</span>
              </h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              {FAQ.length} answers
            </span>
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
            <ul className="mt-2 flex flex-col gap-2 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-yellow" />
                Include your order number if you have one
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-cyan" />
                A photo helps for defects or build issues
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-magenta" />
                AU business hours · usually within a day
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border-2 border-white bg-text p-6 md:p-8">
            <a
              href="mailto:slablabsoz@gmail.com"
              className="flex items-center gap-3 rounded-md transition-colors hover:bg-white/5"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-orange text-white">
                <Mail className="size-5" strokeWidth={2.4} />
              </span>
              <div className="min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-yellow">
                  Email support
                </span>
                <p className="break-all font-display text-xl uppercase leading-tight">
                  slablabsoz@gmail.com
                </p>
              </div>
            </a>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-deep"
            >
              Open contact form
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
