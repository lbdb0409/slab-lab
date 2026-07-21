"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { CartLine } from "@/components/cart/cart-line";
import { Octagon, ConfettiField } from "@/components/ui/decorations";
import {
  cartCount,
  cartSubtotalCents,
  formatPrice,
  lineKey,
  useCart,
} from "@/lib/cart-store";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const checkoutUrl = useCart((s) => s.checkoutUrl);

  useEffect(() => setMounted(true), []);

  const validItems = mounted ? items : [];

  const count = cartCount(validItems);
  const subtotal = cartSubtotalCents(validItems);
  const isEmpty = mounted && validItems.length === 0;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line bg-bg-soft">
        <Container className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <Link href="/" className="inline-flex items-center hover:text-orange max-md:min-h-11">
            Home
          </Link>
          <ChevronRight className="size-3" strokeWidth={2.6} />
          <span className="text-text">Your bag</span>
        </Container>
      </div>

      {/* Page header */}
      <div className="relative overflow-hidden border-b border-line bg-cream">
        <Octagon className="absolute -left-12 -top-8 size-40 rotate-12 text-magenta/25 md:size-52" />
        <Octagon className="absolute -right-14 -bottom-6 size-40 -rotate-12 text-cyan/25 md:size-52" />
        <ConfettiField />
        <Container className="relative flex flex-col gap-3 py-10 md:py-14">
          <span className="eyebrow inline-flex items-center gap-1.5 text-magenta">
            <ShoppingBag className="size-3.5" strokeWidth={2.6} />
            Your bag
          </span>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.92] tracking-tight">
            {mounted && count > 0
              ? `${count} kit${count === 1 ? "" : "s"} ready to slab.`
              : "Your bag."}
          </h1>
          {mounted && count > 0 && (
            <p className="text-sm text-muted md:text-base">
              You supply the cards. We print the surrounds. Shipping is free
              across Australia.
            </p>
          )}
        </Container>
      </div>

      <Container className="py-10 md:py-14">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-5 border-2 border-line bg-bg-soft px-6 py-20 text-center">
            <div className="inline-flex size-20 items-center justify-center rounded-full bg-tint text-muted">
              <ShoppingBag className="size-9" strokeWidth={2} />
            </div>
            <h2 className="font-display text-4xl uppercase leading-tight">
              Your bag is empty.
            </h2>
            <p className="max-w-sm text-base text-muted">
              Find a slab kit for a card you own and add it to your bag. Your
              card never leaves your hands.
            </p>
            <Link href="/shop" className="btn-orange mt-2">
              Browse slabs
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
            {/* LINE ITEMS */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b-2 border-text pb-3">
                <span className="font-display text-2xl uppercase leading-none">
                  Bag
                </span>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] font-bold uppercase tracking-wider text-muted hover:text-orange"
                >
                  Clear bag
                </button>
              </div>
              {validItems.map((item) => (
                <CartLine key={lineKey(item.slug, item.language)} item={item} variant="page" />
              ))}
              <p className="mt-4 text-xs text-muted">
                Slab kits include the surround + case only.{" "}
                <strong>Your card is not included</strong>. You supply it from
                your own collection.
              </p>
            </div>

            {/* ORDER SUMMARY */}
            <aside className="md:sticky md:top-[180px] md:h-fit">
              <div className="flex flex-col gap-4 border-2 border-text bg-white p-6 md:p-7">
                <h2 className="font-display text-2xl uppercase leading-none">
                  Order summary
                </h2>
                <dl className="flex flex-col gap-2 border-y border-line py-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-bold uppercase tracking-wider text-muted">
                      Items
                    </dt>
                    <dd className="font-bold tabular-nums">
                      {count} {count === 1 ? "kit" : "kits"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-bold uppercase tracking-wider text-muted">
                      Subtotal
                    </dt>
                    <dd className="font-bold tabular-nums">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-muted">
                      <Truck className="size-3.5" strokeWidth={2.4} /> Shipping
                    </dt>
                    <dd className="font-bold uppercase tracking-wider text-success">
                      Free AU
                    </dd>
                  </div>
                </dl>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Total
                  </span>
                  <span className="font-display text-3xl leading-none">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <a href={checkoutUrl || "#"} className="btn-orange w-full">
                  Checkout
                  <ArrowRight className="size-4" strokeWidth={2.6} />
                </a>

                <p className="text-center text-[11px] text-muted">
                  Tax included where applicable · Card not handled by Slablabs
                </p>
              </div>

              {/* Promo placeholder */}
              <div className="mt-4 border-2 border-dashed border-line bg-white p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Promo code
                </span>
                <div className="mt-2 flex items-center border border-line bg-bg-soft">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="w-full min-w-0 flex-1 bg-transparent px-3 py-3.5 text-base placeholder:text-muted focus:outline-none md:py-2.5 md:text-sm"
                  />
                  <button
                    type="button"
                    className="shrink-0 bg-text px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white md:py-2.5 hover:bg-orange"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
}
