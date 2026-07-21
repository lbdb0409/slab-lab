"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Mail,
  Package,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<
    Array<{ left: string; top: string; bg: string; size: string }>
  >([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderNumber(params.get("order"));
  }, []);

  useEffect(() => {
    const colors = ["bg-yellow", "bg-magenta", "bg-cyan", "bg-lime", "bg-orange", "bg-purple"];
    const sizes = ["size-1.5", "size-2", "size-2.5", "size-3"];
    const dots = Array.from({ length: 40 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      bg: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
    }));
    setConfetti(dots);
  }, []);

  return (
    <section className="relative overflow-hidden bg-text text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 30%, rgba(255,106,0,0.35) 0%, rgba(255,106,0,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 15% 75%, rgba(139,62,255,0.28) 0%, rgba(139,62,255,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 85% 75%, rgba(0,184,224,0.28) 0%, rgba(0,184,224,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-14 top-12 size-48 rotate-12 text-white/10 md:size-60" />
      <Octagon className="absolute -right-12 -bottom-10 size-48 -rotate-12 text-white/10 md:size-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {confetti.map((c, i) => (
          <span
            key={i}
            className={`confetti-dot ${c.bg} ${c.size}`}
            style={{ left: c.left, top: c.top }}
          />
        ))}
      </div>

      <Container className="relative grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-24">
        {/* LEFT. Big celebration */}
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-success/40 bg-success/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-success">
            <Check className="size-3.5" strokeWidth={3} />
            Payment confirmed
          </span>

          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.88] tracking-tight">
            ORDER
            <br />
            <span className="text-orange">PLACED.</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Thanks for the order. Your kit is on the press. We&apos;ll email
            you the second it ships.
          </p>

          <div className="grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="border border-white/15 bg-white/5 p-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow">
                Order
              </span>
              <p className="mt-1 font-display text-2xl tracking-tight">
                {orderNumber ?? "–"}
              </p>
            </div>
            <div className="border border-white/15 bg-white/5 p-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-magenta">
                Ships in
              </span>
              <p className="mt-1 font-display text-2xl tracking-tight">3–5 days</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/account/orders`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-deep"
            >
              View order
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-text"
            >
              Keep shopping
            </Link>
          </div>
        </div>

        {/* RIGHT. Next steps */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-white bg-text p-6 md:p-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl uppercase leading-none tracking-tight">
                What happens next
              </h2>
              <span className="rounded-full bg-orange px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text">
                Slab + case only
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Your order confirmation is on its way. Check your inbox for the
              receipt and tracking link. Once your kit is printed and packed
              we&apos;ll send a second email when it ships.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <NextStep
              Icon={Mail}
              title="Email"
              body="Confirmation on its way"
              accent="text-yellow"
            />
            <NextStep
              Icon={Package}
              title="Print"
              body="On the press"
              accent="text-magenta"
            />
            <NextStep
              Icon={Truck}
              title="Ship"
              body="3–5 days AU"
              accent="text-cyan"
            />
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-orange/30 bg-orange/10 px-4 py-3 text-sm">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-orange" strokeWidth={2.4} />
            <p className="text-white/90">
              <strong>Reminder:</strong> your card is{" "}
              <strong>not included</strong>. Have it ready. Kit slots straight
              over the top.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function NextStep({
  Icon,
  title,
  body,
  accent,
}: {
  Icon: typeof Mail;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
      <span className={`inline-flex size-9 items-center justify-center rounded-full bg-white/10 ${accent}`}>
        <Icon className="size-4" strokeWidth={2.4} />
      </span>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${accent}`}>
        {title}
      </span>
      <span className="text-xs text-white/80">{body}</span>
    </div>
  );
}
