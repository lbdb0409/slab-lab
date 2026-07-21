"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, User } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { CartButton } from "@/components/cart/cart-button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { EXPANSIONS } from "@/data/kits";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/shop", label: "Sets", hasMega: true },
  { href: "/how-it-works", label: "How it works" },
  { href: "/build-guide", label: "Build guide" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export function Header() {
  const [setsOpen, setSetsOpen] = useState(false);

  return (
    <>
      {/* BAND 1. Promo */}
      <div className="bg-text text-white">
        <Container className="flex items-center justify-center gap-6 py-2 text-[11px] font-bold uppercase tracking-[0.14em]">
          <span className="text-yellow">Free Australia shipping over $99</span>
          <span className="hidden opacity-30 sm:inline">·</span>
          <span className="hidden sm:inline opacity-90">Custom-printed for your card</span>
          <span className="hidden opacity-30 md:inline">·</span>
          <span className="hidden text-magenta md:inline">Your card never leaves your hands</span>
        </Container>
      </div>

      {/* BAND 2. Logo + big search + icons. DARK so logo reads.
          Sticks below md, where band 3 is hidden and this is the only way
          back to navigation without scrolling to the top of the page. */}
      <div className="border-b-2 border-white/10 bg-text text-white max-md:sticky max-md:top-0 max-md:z-40">
        <Container className="flex h-[88px] items-center gap-4 max-md:h-[68px] md:gap-8">
          <Link href="/" aria-label="Slablabs" className="group inline-flex shrink-0 items-center">
            <Image
              src="/brand/logo.png"
              alt="Slablabs"
              width={220}
              height={110}
              priority
              className="h-11 w-auto transition-transform duration-200 group-hover:scale-105 md:h-14"
            />
          </Link>

          {/* Mega search. White pill on dark band */}
          <form
            role="search"
            action="/search"
            method="get"
            className="hidden flex-1 items-center rounded-full bg-white md:flex"
          >
            <Search className="ml-5 size-5 text-muted" strokeWidth={2.4} />
            <input
              type="search"
              name="q"
              placeholder="Search by Pokémon set or card…"
              className="w-full bg-transparent px-3 py-3 text-sm font-medium text-text placeholder:text-muted focus:outline-none"
              aria-label="Search"
            />
            <button
              type="submit"
              className="m-1 rounded-full bg-text px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange"
            >
              Search
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/search"
              aria-label="Search"
              className="inline-flex size-11 items-center justify-center text-white transition-colors hover:text-orange md:hidden"
            >
              <Search className="size-5" strokeWidth={2.4} />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden flex-col items-center justify-center px-2 text-white transition-colors hover:text-yellow md:inline-flex"
            >
              <User className="size-5" strokeWidth={2.4} />
              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider">Account</span>
            </Link>
            <CartButton />
            <MobileMenu />
          </div>
        </Container>
      </div>

      {/* BAND 3. Nav row with sets mega menu (white, sticky).
          Below md the inner row is hidden, so `sticky` would pin a bare 1px
          border across the top of every page — hence max-md:static. */}
      <div className="sticky top-0 z-50 border-b border-line bg-white max-md:static max-md:border-b-0">
        <Container className="hidden h-[48px] items-center justify-center gap-1 lg:flex">
          {NAV.map((item) => {
            if (item.hasMega) {
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => setSetsOpen(true)}
                  onMouseLeave={() => setSetsOpen(false)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center px-4 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-text transition-colors hover:text-orange"
                  >
                    {item.label}
                    <span className="ml-1 text-[10px]">▾</span>
                  </Link>

                  {setsOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-screen max-w-[640px] -translate-x-1/2 border border-line bg-white shadow-[0_24px_48px_rgba(0,0,0,0.12)]">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-6">
                        <div className="col-span-2 mb-2 flex items-baseline justify-between">
                          <span className="eyebrow text-magenta">Pokémon TCG · Sets</span>
                          <Link
                            href="/shop"
                            className="text-xs font-bold uppercase tracking-wider text-text hover:text-orange"
                          >
                            Browse all →
                          </Link>
                        </div>
                        {EXPANSIONS.map((set) => (
                          <Link
                            key={set.slug}
                            href={`/sets/${set.slug}`}
                            className="group flex items-center justify-between border-b border-line py-2 text-sm transition-colors hover:text-orange"
                          >
                            <span className="font-bold">{set.name}</span>
                            <span className="text-xs text-muted group-hover:text-orange">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative px-4 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-text transition-colors hover:text-orange"
              >
                {item.label}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 w-0 bg-orange transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </Link>
            );
          })}
        </Container>
      </div>
    </>
  );
}
