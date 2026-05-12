"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import {
  cartCount,
  cartSubtotalCents,
  formatPrice,
  useCart,
} from "@/lib/cart-store";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);

  useEffect(() => setMounted(true), []);

  const validItems = mounted ? items : [];

  const count = cartCount(validItems);
  const subtotal = cartSubtotalCents(validItems);
  const isEmpty = mounted && validItems.length === 0;

  return (
    <>
      <div className="border-b border-line bg-bg-soft">
        <Container className="flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <Link href="/" className="hover:text-orange">
            Home
          </Link>
          <ArrowRight className="size-3 rotate-180" strokeWidth={2.6} />
          <Link href="/cart" className="hover:text-orange">
            Bag
          </Link>
          <ArrowRight className="size-3 rotate-180" strokeWidth={2.6} />
          <span className="text-text">Checkout</span>
        </Container>
      </div>

      <div className="border-b border-line bg-cream">
        <Container className="flex flex-col gap-3 py-10 md:py-14">
          <span className="eyebrow inline-flex items-center gap-1.5 text-orange">
            <Lock className="size-3.5" strokeWidth={2.6} />
            Secure checkout
          </span>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] uppercase leading-[0.92] tracking-tight">
            Checkout.
          </h1>
        </Container>
      </div>

      <Container className="py-10 md:py-14">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-5 border-2 border-line bg-bg-soft px-6 py-20 text-center">
            <h2 className="font-display text-4xl uppercase leading-tight">
              Your bag is empty.
            </h2>
            <p className="max-w-sm text-base text-muted">
              Add a slab kit before checking out.
            </p>
            <Link href="/shop" className="btn-orange mt-2">
              Browse slabs
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
            {/* FORM */}
            <form className="flex flex-col gap-10">
              <FormSection step="01" title="Contact">
                <Field label="Email" placeholder="you@trainer.com" type="email" />
              </FormSection>

              <FormSection step="02" title="Delivery">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" placeholder="Ash" />
                  <Field label="Last name" placeholder="Ketchum" />
                </div>
                <Field label="Address" placeholder="Street address" />
                <div className="grid gap-4 sm:grid-cols-[1fr_1fr_120px]">
                  <Field label="Suburb" placeholder="City / suburb" />
                  <Field label="State" placeholder="VIC" />
                  <Field label="Postcode" placeholder="3000" />
                </div>
                <Field label="Phone" placeholder="0400 000 000" type="tel" />
              </FormSection>

              <FormSection step="03" title="Shipping method">
                <label className="flex items-center justify-between gap-3 border-2 border-orange bg-orange/5 p-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="ship"
                      defaultChecked
                      className="accent-orange"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold uppercase">
                        Standard · 3–5 days
                      </span>
                      <span className="text-xs text-muted">
                        Tracked, all of Australia
                      </span>
                    </div>
                  </div>
                  <span className="font-display text-lg leading-none text-success">
                    Free
                  </span>
                </label>
                <label className="flex items-center justify-between gap-3 border-2 border-line bg-white p-4">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="ship" className="accent-text" />
                    <div className="flex flex-col">
                      <span className="font-bold uppercase">
                        Express · 1–2 days
                      </span>
                      <span className="text-xs text-muted">
                        Priority delivery
                      </span>
                    </div>
                  </div>
                  <span className="font-display text-lg leading-none">
                    $14.95
                  </span>
                </label>
              </FormSection>

              <FormSection step="04" title="Payment">
                <div className="rounded-2xl border-2 border-dashed border-line-strong bg-bg-soft p-6 text-center">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-tint text-muted">
                    <Lock className="size-5" strokeWidth={2.4} />
                  </span>
                  <p className="mt-3 font-display text-xl uppercase leading-tight">
                    Stripe Checkout
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Card, Apple Pay, Google Pay, and Afterpay wire in here.
                    Hosted by Stripe — no card details touch this site.
                  </p>
                </div>
              </FormSection>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-text hover:text-orange"
                >
                  <ArrowLeft className="size-4" strokeWidth={2.6} />
                  Back to bag
                </Link>
                <button type="button" className="btn-orange" disabled>
                  Place order — coming soon
                </button>
              </div>
            </form>

            {/* SUMMARY */}
            <aside className="md:sticky md:top-[180px] md:h-fit">
              <div className="border-2 border-text bg-white p-6 md:p-7">
                <h2 className="font-display text-2xl uppercase leading-none">
                  Order
                </h2>
                <div className="mt-4 flex max-h-72 flex-col gap-3 overflow-y-auto">
                  {validItems.map((item) => (
                    <div key={item.slug} className="flex items-center gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden border border-line bg-tint">
                        <Image
                          src={item.imageUrl}
                          alt={item.card}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                        <span className="absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-text text-[10px] font-bold tabular-nums text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate text-sm font-bold">
                          {item.card}
                        </span>
                        <span className="truncate text-[11px] uppercase tracking-wider text-muted">
                          {item.set}
                        </span>
                      </div>
                      <span className="font-display text-base tabular-nums">
                        {formatPrice(item.quantity * item.priceCents)}
                      </span>
                    </div>
                  ))}
                </div>

                <dl className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Subtotal ({count})</dt>
                    <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Shipping</dt>
                    <dd className="text-success">Free</dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
                  <span className="text-sm font-bold uppercase">Total</span>
                  <span className="font-display text-2xl">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-md border border-line bg-bg-soft p-3 text-[11px] leading-relaxed text-text-soft">
                  <ShieldCheck
                    className="size-4 shrink-0 text-success"
                    strokeWidth={2.4}
                  />
                  <span>
                    Slab kits include the surround &amp; case only. Your card is
                    not included — you supply it from your own collection.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
}

function FormSection({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b-2 border-text pb-3">
        <span className="font-display text-3xl leading-none text-orange">
          {step}
        </span>
        <h2 className="font-display text-2xl uppercase leading-none">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-full border border-line bg-white px-4 py-3 text-sm placeholder:text-muted focus:border-text focus:outline-none"
      />
    </label>
  );
}
