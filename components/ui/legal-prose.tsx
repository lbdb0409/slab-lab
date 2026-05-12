import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

export function LegalProse({
  lastUpdated,
  children,
}: {
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white">
      <Container className="max-w-3xl py-12 md:py-16">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          Last updated · {lastUpdated}
        </div>
        <div className="flex flex-col gap-1">{children}</div>
      </Container>
    </section>
  );
}

export function LegalSection({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line py-6 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl uppercase leading-tight tracking-tight md:text-2xl">
        <span className="mr-3 text-orange">{n}</span>
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-base leading-relaxed text-text-soft">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5 marker:text-orange">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
