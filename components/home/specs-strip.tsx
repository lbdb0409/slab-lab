import { Truck, Brush, Hand, Shield } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";

const FEATURES = [
  {
    Icon: Truck,
    title: "Free AU shipping",
    body: "On every order over $99",
    bg: "bg-magenta",
    rot: "-3deg",
  },
  {
    Icon: Brush,
    title: "Custom artwork",
    body: "Printed per card · per set",
    bg: "bg-cyan",
    rot: "2deg",
  },
  {
    Icon: Hand,
    title: "Card stays home",
    body: "You insert. We never touch it.",
    bg: "bg-purple",
    rot: "-2deg",
  },
  {
    Icon: Shield,
    title: "Display-grade PET",
    body: "UV-resistant & acid-free",
    bg: "bg-lime",
    rot: "3deg",
  },
];

export function SpecsStrip() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gold">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 60% at 100% 0%, rgba(255,106,0,0.2) 0%, rgba(255,106,0,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-10 -top-6 size-36 rotate-12 text-orange/30 md:size-44" />
      <Octagon className="absolute -right-12 -bottom-6 size-36 -rotate-12 text-magenta/25 md:size-44" />
      <ConfettiField />

      <Container className="relative grid gap-x-6 gap-y-8 py-14 sm:grid-cols-2 lg:grid-cols-4 md:py-16">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col items-start gap-4">
            <span
              className={`inline-flex size-14 items-center justify-center rounded-full text-white shadow-[3px_3px_0_var(--color-text)] hover-wiggle ${f.bg}`}
              style={{ transform: `rotate(${f.rot})` }}
            >
              <f.Icon className="size-6" strokeWidth={2.4} />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-xl uppercase leading-tight tracking-tight md:text-2xl">
                {f.title}
              </h3>
              <p className="text-sm text-text-soft md:text-base">{f.body}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
