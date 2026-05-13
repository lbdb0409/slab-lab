import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "Free Australia shipping over $99, 3–5 day standard delivery. Tracked, dispatched within Australia.",
  alternates: { canonical: "/shipping" },
};

const RATES = [
  {
    Icon: Truck,
    title: "Standard",
    price: "Free over $99",
    sub: "$9.95 under",
    time: "3–5 business days",
    color: "text-magenta",
    bg: "bg-pink-tint",
  },
  {
    Icon: Clock,
    title: "Express",
    price: "$14.95 flat",
    sub: "All orders",
    time: "1–2 business days",
    color: "text-cyan-deep",
    bg: "bg-sky-tint",
  },
  {
    Icon: MapPin,
    title: "Regional / WA",
    price: "Free over $99",
    sub: "Same standard rate",
    time: "4–7 business days",
    color: "text-purple",
    bg: "bg-lavender",
  },
];

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/support", label: "Support" },
          { href: "/shipping", label: "Shipping" },
        ]}
        eyebrow="Shipping"
        EyebrowIcon={Truck}
        eyebrowColor="orange"
        title={
          <>
            Shipped <span className="text-orange">across Australia.</span>
          </>
        }
        body="Free standard AU shipping over $99, tracked, 3–5 business days. Express overnight available."
        bg="cream"
      />

      {/* RATES */}
      <section className="border-b border-line bg-white">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-magenta">Rates</span>
            <h2 className="section-h2">
              Australia, <span className="text-magenta">covered.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {RATES.map((r) => (
              <article
                key={r.title}
                className={`relative overflow-hidden border-2 border-text p-6 md:p-8 ${r.bg}`}
              >
                <Octagon
                  className={`pointer-events-none absolute -right-6 -bottom-6 size-28 rotate-12 opacity-30 ${r.color}`}
                />
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-full bg-white text-text shadow-sm`}
                >
                  <r.Icon className={`size-5 ${r.color}`} strokeWidth={2.4} />
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight">
                  {r.title}
                </h3>
                <p
                  className={`mt-2 font-display text-2xl leading-none ${r.color}`}
                >
                  {r.price}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {r.sub}
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wider">
                  {r.time}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">
            International shipping is not yet available. We ship within
            Australia only for now.
          </p>
        </Container>
      </section>

      {/* DETAILS */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-deep">
                <Package className="size-3.5" strokeWidth={2.6} />
                How we ship
              </span>
              <h2 className="font-display text-3xl uppercase leading-tight md:text-4xl">
                Packed flat. <span className="text-cyan-deep">Tracked.</span>
              </h2>
              <p className="text-base leading-relaxed text-text-soft">
                Slab kits ship flat-packed in a rigid mailer. Surround sheet
                on top, snap-seal case below, microfibre wipe tucked
                alongside. Australia Post Tracked is the default. You&apos;ll
                get a tracking link by email the moment we hand it off.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-purple">
                <Clock className="size-3.5" strokeWidth={2.6} />
                Cut-off times
              </span>
              <h2 className="font-display text-3xl uppercase leading-tight md:text-4xl">
                Order by 2pm,{" "}
                <span className="text-purple">we ship same day.</span>
              </h2>
              <p className="text-base leading-relaxed text-text-soft">
                Orders placed Mon–Fri before 2pm AEST go out the same business
                day. Weekend orders ship Monday. Public holidays push the next
                shipping day.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* RETURNS LINK BLOCK */}
      <section className="border-b border-line bg-text text-white">
        <Container className="grid items-center gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:gap-14 md:py-16">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow">
              Returns &amp; defects
            </span>
            <h2 className="font-display text-3xl uppercase leading-tight md:text-4xl">
              Custom-printed kits are{" "}
              <span className="text-yellow">final sale.</span>
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-white/80">
              No change-of-mind returns. Every kit is printed for the
              specific card you ordered. But defects, courier damage, and
              wrong-item shipments are all replaced free of charge.
            </p>
          </div>
          <div>
            <Link
              href="/returns"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:bg-orange hover:text-white"
            >
              Read the returns policy
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
