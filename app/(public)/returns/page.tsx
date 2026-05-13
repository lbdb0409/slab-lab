import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Camera,
  CheckCircle2,
  Mail,
  Package,
  Printer,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Returns Policy",
  description:
    "Slablabs kits are custom-printed and final sale. Here's what we still cover. Defects, courier damage, and wrong items. And how to claim.",
  alternates: { canonical: "/returns" },
};

const NO_RETURN_REASONS = [
  {
    Icon: Printer,
    title: "Each kit is printed to order",
    body: "When you place an order we print a surround specifically for the card you chose. Your kit is on a press within hours. Once printed it can't be unprinted or re-sold to another collector.",
  },
  {
    Icon: Sparkles,
    title: "The art is keyed to one card",
    body: "Every surround is custom-designed so the artwork continues a specific card's art. A Mega Gengar surround can't be repurposed for a Charizard. There's nobody else to resell it to.",
  },
  {
    Icon: Package,
    title: "We can't verify what's been done",
    body: "Once a kit leaves our warehouse, opened, and comes back, we can't confirm the surround is uncreased, the case unscratched, or whether anything's been swapped. We'd rather not pretend.",
  },
  {
    Icon: ShieldCheck,
    title: "We'd rather keep the price honest",
    body: "We're a small Australian operation. Returns processing, restock fees, and write-offs would push kit prices up. Skipping change-of-mind returns keeps the price where it is.",
  },
];

const WE_DO_COVER = [
  {
    Icon: CheckCircle2,
    title: "Print defect",
    body: "Misaligned art, ink bleed, smudges, missing layers. Anything that's our fault on the press. Free replacement, no return required.",
    accent: "text-success",
    border: "border-success",
  },
  {
    Icon: AlertCircle,
    title: "Damaged in transit",
    body: "Cracked case, bent surround, water-damaged box. Send a photo within 7 days of delivery and we'll dispatch a replacement.",
    accent: "text-orange",
    border: "border-orange",
  },
  {
    Icon: RefreshCw,
    title: "Wrong kit shipped",
    body: "We sent you the wrong surround, the wrong set, or the wrong card. Free replacement plus a prepaid return label for the wrong one.",
    accent: "text-cyan",
    border: "border-cyan",
  },
  {
    Icon: X,
    title: "Never arrived",
    body: "Tracking says delivered but the box never showed. We work with the courier to investigate, and if it can't be found we replace the kit.",
    accent: "text-magenta",
    border: "border-magenta",
  },
];

const CLAIM_STEPS = [
  {
    n: "01",
    Icon: Mail,
    title: "Email us within 7 days",
    body: "slablabsoz@gmail.com with your order number in the subject line. Earlier is better. Couriers have tight claim windows.",
  },
  {
    n: "02",
    Icon: Camera,
    title: "Send a photo (or two)",
    body: "We need to see the issue. Phone photos are fine. Clearly show the defect, damage, or wrong item. No card needed in the shot.",
  },
  {
    n: "03",
    Icon: Package,
    title: "We dispatch a replacement",
    body: "Same kit, same shipping speed, no extra cost. You don't have to send the original back unless we explicitly ask.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/support", label: "Support" },
          { href: "/returns", label: "Returns" },
        ]}
        eyebrow="Returns policy"
        EyebrowIcon={RefreshCw}
        eyebrowColor="orange"
        title={
          <>
            Custom-printed. <span className="text-orange">Final sale.</span>
          </>
        }
        body="Slablabs kits are printed to order, so we can't take change-of-mind returns. We still cover defects, damage, and anything we get wrong on our end. Free replacements, no return required."
        bg="cream"
      />

      {/* THE POLICY UP FRONT */}
      <section className="border-b border-line bg-white">
        <Container className="grid items-start gap-8 py-12 md:grid-cols-2 md:gap-14 md:py-16">
          <div className="border-2 border-orange bg-orange/5 p-6 md:p-8">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-orange text-white">
              <X className="size-6" strokeWidth={2.6} />
            </span>
            <h2 className="mt-4 font-display text-3xl uppercase leading-tight md:text-4xl">
              No change-of-mind returns
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-soft">
              Once your order is placed and the surround is printed, the kit
              is yours. We don&apos;t accept returns or issue refunds because
              you changed your mind, picked the wrong card, or decided the
              colour wasn&apos;t for you.
            </p>
            <p className="mt-3 text-base leading-relaxed text-text-soft">
              Pick carefully. Every kit page lists the exact card the
              surround is keyed to.
            </p>
          </div>

          <div className="border-2 border-success bg-success/5 p-6 md:p-8">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-success text-white">
              <CheckCircle2 className="size-6" strokeWidth={2.6} />
            </span>
            <h2 className="mt-4 font-display text-3xl uppercase leading-tight md:text-4xl">
              We still cover our own mistakes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-soft">
              Defective prints, damaged-in-transit kits, wrong items shipped.
              all replaced free of charge. No restocking fee, no return
              shipping cost, no quibbling.
            </p>
            <p className="mt-3 text-base leading-relaxed text-text-soft">
              Your statutory rights under the{" "}
              <strong>Australian Consumer Law</strong> aren&apos;t affected by
              this policy.
            </p>
          </div>
        </Container>
      </section>

      {/* WHY */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-magenta">Why we&apos;re strict</span>
            <h2 className="section-h2">
              Four <span className="text-magenta">reasons.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {NO_RETURN_REASONS.map((r, i) => (
              <article
                key={r.title}
                className="relative overflow-hidden border-2 border-text bg-white p-6 md:p-8"
              >
                <Octagon
                  className={`pointer-events-none absolute -right-6 -bottom-6 size-28 rotate-12 opacity-25 ${
                    ["text-magenta", "text-cyan", "text-purple", "text-orange"][
                      i % 4
                    ]
                  }`}
                />
                <div className="relative flex items-start gap-4">
                  <span
                    className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full text-white ${
                      ["bg-magenta", "bg-cyan", "bg-purple", "bg-orange"][i % 4]
                    }`}
                  >
                    <r.Icon className="size-5" strokeWidth={2.4} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight md:text-2xl">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-soft md:text-base">
                      {r.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* WHAT WE COVER */}
      <section className="relative overflow-hidden border-b border-line bg-text text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 25% 30%, rgba(0,184,224,0.25) 0%, rgba(0,184,224,0) 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 75% 75%, rgba(255,106,0,0.25) 0%, rgba(255,106,0,0) 60%)",
          }}
        />
        <Octagon className="absolute -left-14 top-8 size-48 rotate-12 text-cyan/30 md:size-60" />
        <Octagon className="absolute -right-12 -bottom-8 size-44 -rotate-12 text-orange/30 md:size-56" />
        <ConfettiField />

        <Container className="relative py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-yellow">What we do cover</span>
            <h2 className="section-h2">
              Free replacements,{" "}
              <span className="text-yellow">no fuss.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {WE_DO_COVER.map((c) => (
              <article
                key={c.title}
                className={`border-2 bg-white/5 p-6 md:p-8 ${c.border}`}
              >
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-full bg-white ${c.accent}`}
                >
                  <c.Icon className="size-6" strokeWidth={2.4} />
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase leading-tight">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 md:text-base">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW TO CLAIM */}
      <section className="border-b border-line bg-white">
        <Container className="py-14 md:py-20">
          <div className="mb-10 flex flex-col items-start gap-2 md:mb-12">
            <span className="eyebrow text-purple">How to claim</span>
            <h2 className="section-h2">
              Three steps, <span className="text-purple">real human.</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {CLAIM_STEPS.map((s, i) => (
              <article
                key={s.n}
                className={`relative overflow-hidden border-2 border-text p-6 md:p-8 ${
                  ["bg-pink-tint", "bg-sky-tint", "bg-mint-tint"][i]
                }`}
              >
                <Octagon
                  className={`pointer-events-none absolute -right-6 -bottom-6 size-24 rotate-12 opacity-30 ${
                    ["text-magenta", "text-cyan-deep", "text-lime-deep"][i]
                  }`}
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className={`font-display text-6xl leading-none ${
                      ["text-magenta", "text-cyan-deep", "text-lime-deep"][i]
                    }`}
                  >
                    {s.n}
                  </span>
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-text">
                    <s.Icon
                      className={`size-5 ${
                        ["text-magenta", "text-cyan-deep", "text-lime-deep"][i]
                      }`}
                      strokeWidth={2.4}
                    />
                  </span>
                </div>
                <h3 className="relative mt-4 font-display text-xl uppercase leading-tight md:text-2xl">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-text-soft md:text-base">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              Have an issue?{" "}
              <Link
                href="mailto:slablabsoz@gmail.com"
                className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
              >
                Email support
              </Link>{" "}
              with your order number.
            </p>
            <Link href="/contact" className="btn-orange">
              Open a claim
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Container>
      </section>

      {/* FINE PRINT */}
      <section className="border-b border-line bg-bg-soft">
        <Container className="py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                Quick check before you order
              </span>
              <ul className="ml-5 list-disc space-y-1.5 text-sm leading-relaxed text-text-soft marker:text-orange">
                <li>
                  Confirm the card name and set on the kit page matches the
                  card you own.
                </li>
                <li>
                  Slab kits are sized for standard 63 × 88mm TCG cards. Email
                  us before ordering if your card is a different size.
                </li>
                <li>
                  Shipping addresses can&apos;t be changed once the courier has
                  the parcel.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                Australian Consumer Law
              </span>
              <p className="text-sm leading-relaxed text-text-soft">
                Nothing in this policy limits your rights under the{" "}
                <strong>Australian Consumer Law</strong>. You&apos;re entitled
                to a remedy if a product is faulty, doesn&apos;t do what we said
                it would, or wasn&apos;t delivered within a reasonable time.
                regardless of what&apos;s on this page.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
