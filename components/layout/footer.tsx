import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { EXPANSIONS } from "@/data/kits";

const HELP = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/build-guide", label: "Build guide" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/support", label: "Support / FAQ" },
  { href: "/contact", label: "Contact" },
];

const COMPANY = [
  { href: "/about", label: "About Slablabs" },
  { href: "/gallery", label: "Customer gallery" },
  { href: "/contact", label: "Wholesale enquiries" },
];

const LEGAL = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/returns", label: "Returns" },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 md:py-20">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit rounded-2xl bg-text px-5 py-3.5">
            <Image
              src="/brand/logo.png"
              alt="Slablabs"
              width={200}
              height={100}
              className="h-10 w-auto"
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-text-soft">
            Custom-printed display slabs for Pokémon trading cards. We print the
            surround. You slot the card and snap it shut.
          </p>
          <div className="mt-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-success">
            <span className="size-2 rounded-full bg-success" />
            Shipping daily across Australia
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base uppercase tracking-tight">Shop by set</h3>
          <ul className="flex flex-col gap-2">
            {EXPANSIONS.map((s) => (
              <li key={s.slug}>
                <Link href={`/sets/${s.slug}`} className="text-sm text-text-soft transition-colors hover:text-orange">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base uppercase tracking-tight">Help</h3>
          <ul className="flex flex-col gap-2">
            {HELP.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-text-soft transition-colors hover:text-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base uppercase tracking-tight">Company</h3>
          <ul className="flex flex-col gap-2">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-text-soft transition-colors hover:text-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Disclaimer block */}
      <div className="border-t border-line bg-bg-soft">
        <Container className="grid gap-6 py-8 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
              What you get
            </span>
            <p className="text-xs leading-relaxed text-text-soft">
              Slablabs slab kits include the <strong>custom-printed surround
              and slab case only</strong>. Your trading card is{" "}
              <strong>not included</strong>. You supply your own card from
              your collection. Slab kits are display products, not graded
              authentications.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
              Independent &amp; unaffiliated
            </span>
            <p className="text-xs leading-relaxed text-text-soft">
              Slablabs is an independent Australian company. We are{" "}
              <strong>not affiliated with, sponsored by, or endorsed by</strong>{" "}
              The Pokémon Company, Nintendo, Game Freak, Creatures, Bandai
              (One Piece), Wizards of the Coast (Magic: The Gathering), Disney,
              or Ravensburger (Lorcana). All trademarks, product names, logos,
              and brand names are the property of their respective owners and
              are referenced here for identification purposes only.
            </p>
          </div>
        </Container>
      </div>

      <div className="border-t border-line bg-bg-soft">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">We accept</span>
            {["VISA", "MC", "AMEX", "PayPal", "Afterpay"].map((p) => (
              <span key={p} className="inline-flex items-center bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-text-soft">
                {p}
              </span>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-t border-line">
        <Container className="flex flex-col items-start justify-between gap-3 py-4 text-xs text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Slablabs · Independent Australian studio</span>
          <ul className="flex flex-wrap items-center gap-x-4">
            {LEGAL.map((l) => (
              <li key={l.href}>
                {/* ~16px tall as bare text; the min-h only applies below sm,
                    where these are the sole footer nav targets. */}
                <Link
                  href={l.href}
                  className="inline-flex items-center hover:text-orange max-sm:min-h-11"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
