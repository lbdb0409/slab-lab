"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, Search, User, X } from "lucide-react";
import { useEffect, useState } from "react";

import { EXPANSIONS } from "@/data/kits";

const PRIMARY = [
  { href: "/shop", label: "Shop all slabs" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/build-guide", label: "Build guide" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export function MobileMenu() {
  const pathname = usePathname();

  // Close on route change rather than relying on each link's onClick. Those
  // handlers were previously swallowed by PackTransition (since removed), and
  // deriving from the route is robust regardless: any navigation closes the
  // drawer, including back/forward.
  //
  // Storing the route the drawer was opened on (rather than a bare boolean)
  // makes "open" derived state: navigating changes `pathname`, which closes
  // the drawer for free — no effect, no cascading render.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn !== null && openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center text-white lg:hidden"
      >
        <Menu className="size-5" strokeWidth={2.4} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[110] bg-black/55 backdrop-blur-[2px]"
            />
            <motion.aside
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: [0.22, 1, 0.36, 1],
                duration: 0.4,
              }}
              className="fixed inset-y-0 right-0 z-[111] flex w-[88%] max-w-md flex-col bg-text text-white shadow-[-12px_0_32px_rgba(0,0,0,0.4)]"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="inline-flex"
                >
                  <Image
                    src="/brand/logo.png"
                    alt="Slablabs"
                    width={150}
                    height={75}
                    className="h-9 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="-mr-2 inline-flex size-11 items-center justify-center text-white hover:text-orange"
                >
                  <X className="size-5" strokeWidth={2.4} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* SEARCH. The header's search form is desktop-only, so this
                    is the only way to search from a phone. */}
                <form
                  role="search"
                  action="/search"
                  method="get"
                  className="flex items-center gap-2 border-b border-white/10 px-5 py-4"
                >
                  <div className="flex flex-1 items-center rounded-full bg-white/10">
                    <Search className="ml-3 size-4 shrink-0 text-white/60" strokeWidth={2.4} />
                    <input
                      type="search"
                      name="q"
                      placeholder="Search sets or cards…"
                      aria-label="Search"
                      className="w-full min-w-0 bg-transparent px-3 py-3 text-base font-medium text-white placeholder:text-white/45 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-orange px-4 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    Go
                  </button>
                </form>

                {/* PRIMARY NAV */}
                <nav className="flex flex-col">
                  {PRIMARY.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-display text-xl uppercase leading-none tracking-tight hover:bg-white/5 hover:text-orange"
                    >
                      {item.label}
                      <ChevronRight
                        className="size-4 text-white/40"
                        strokeWidth={2.4}
                      />
                    </Link>
                  ))}
                </nav>

                {/* SETS */}
                <div className="border-b border-white/10 px-5 py-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow">
                    Pokémon sets
                  </span>
                  <ul className="mt-1 flex flex-col">
                    {EXPANSIONS.map((set) => (
                      <li key={set.slug}>
                        <Link
                          href={`/sets/${set.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center justify-between text-sm hover:text-orange"
                        >
                          {set.name}
                          <ChevronRight
                            className="size-3 text-white/40"
                            strokeWidth={2.4}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACCOUNT */}
                <div className="px-5 py-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-magenta">
                    You
                  </span>
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="mt-3 flex min-h-11 items-center gap-2 border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider hover:border-orange hover:text-orange"
                  >
                    <User className="size-4" strokeWidth={2.4} />
                    Account
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/15 bg-bg-soft px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-text">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
                  Free Australia shipping over $99
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
