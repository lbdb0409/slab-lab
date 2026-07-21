import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100dvh-200px)] items-center overflow-hidden bg-text text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 25% 30%, rgba(255,106,0,0.32) 0%, rgba(255,106,0,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 75% 75%, rgba(255,44,146,0.28) 0%, rgba(255,44,146,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 40% at 80% 20%, rgba(0,184,224,0.22) 0%, rgba(0,184,224,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-16 top-8 size-56 rotate-12 text-white/10 md:size-72" />
      <Octagon className="absolute -right-14 -bottom-12 size-52 -rotate-12 text-white/10 md:size-64" />
      <ConfettiField />

      <Container className="relative flex flex-col items-center gap-8 py-20 text-center md:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-yellow/30 bg-yellow/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-yellow">
          Error 404
        </span>

        <h1 className="font-display text-[clamp(3rem,16vw,12rem)] uppercase leading-[0.88] tracking-tight">
          PACK
          <br />
          <span className="text-orange">NOT FOUND.</span>
        </h1>

        <p className="max-w-md text-base leading-relaxed text-white/80 md:text-lg">
          We looked everywhere on the shelf. That page doesn&apos;t exist
          (anymore, or yet). Try one of these instead.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-orange">
            <Home className="size-4" strokeWidth={2.6} />
            Back to home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-text"
          >
            <Search className="size-4" strokeWidth={2.4} />
            Browse slabs
          </Link>
        </div>

        <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { href: "/how-it-works", label: "How it works" },
            { href: "/build-guide", label: "Build guide" },
            { href: "/about", label: "About" },
            { href: "/support", label: "Support" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between border border-white/20 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/80 transition-colors hover:border-yellow hover:text-yellow max-md:min-h-11"
            >
              {l.label}
              <ArrowRight
                className="size-3 transition-transform group-hover:translate-x-1"
                strokeWidth={2.6}
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
