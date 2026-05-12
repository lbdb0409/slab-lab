"use client";

import { useActionState } from "react";
import { ArrowRight, Check, Crosshair } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  requestCard,
  type RequestCardState,
} from "@/lib/actions/request-card";

const INITIAL: RequestCardState = { ok: false, message: "" };

export function RequestACard() {
  const [state, action, pending] = useActionState(requestCard, INITIAL);

  return (
    <section
      id="request"
      className="relative overflow-hidden border-b border-line bg-purple text-white"
    >
      <Octagon className="pointer-events-none absolute -left-12 -top-12 size-44 rotate-12 text-white/10 md:size-56" />
      <Octagon className="pointer-events-none absolute -right-14 -bottom-14 size-48 -rotate-12 text-white/10 md:size-64" />

      <Container className="relative grid items-start gap-10 py-16 md:grid-cols-[1.15fr_1fr] md:gap-16 md:py-24">
        {/* LEFT. Explainer */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-yellow backdrop-blur-sm">
            <Crosshair className="size-3.5" strokeWidth={2.6} />
            Custom requests
          </span>

          <h2 className="font-display text-[clamp(2.5rem,6.5vw,5rem)] uppercase leading-[0.92] tracking-tight">
            DON&apos;T SEE
            <br />
            YOUR CARD?
            <br />
            <span className="text-yellow" style={{ textShadow: "0 0 36px rgba(255,203,0,0.55)" }}>
              REQUEST A SLAB.
            </span>
          </h2>

          <p className="max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Tell us the card you want a slab for. We&apos;ll source the
            artwork, design the surround, and let you know when it&apos;s ready
            to ship.
          </p>

          <ul className="flex flex-col gap-2.5 text-sm text-white/90">
            <li className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-yellow" />
              Any Pokémon card · any expansion
            </li>
            <li className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-cyan" />
              Free to request · no obligation
            </li>
            <li className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-magenta" />
              We&apos;ll be in touch when it&apos;s ready
            </li>
          </ul>
        </div>

        {/* RIGHT. Form */}
        <div className="rounded-2xl border-2 border-white bg-text p-6 shadow-[8px_8px_0_rgba(0,0,0,0.25)] md:p-8">
          {state.ok ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-yellow text-text">
                <Check className="size-7" strokeWidth={3} />
              </span>
              <h3 className="font-display text-3xl uppercase tracking-tight">
                Request received.
              </h3>
              <p className="max-w-xs text-sm text-white/70">
                {state.message}
              </p>
            </div>
          ) : (
            <form action={action} className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl uppercase tracking-tight">
                  Request a slab
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                  Free · no obligation
                </span>
              </div>

              <Field
                label="Card name"
                required
                placeholder="e.g. Charizard ex"
                name="card"
              />
              <Field
                label="Set / expansion"
                placeholder="e.g. Scarlet & Violet"
                name="set"
              />
              <Field
                label="Your email"
                required
                type="email"
                placeholder="you@trainer.com"
                name="email"
              />

              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/55">
                  Notes (optional)
                </span>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Anything we should know?"
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/30 focus:border-yellow focus:bg-white/10 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={pending}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-text transition-all hover:bg-yellow-deep hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {pending ? "Sending…" : "Send request"}
                {!pending && <ArrowRight className="size-3.5" strokeWidth={2.6} />}
              </button>
              {state.message && !state.ok && (
                <p role="alert" className="rounded-full bg-magenta/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-magenta">
                  {state.message}
                </p>
              )}
              <p className="text-xs text-white/40">
                By submitting, you agree to be contacted about your request.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-white/55">
        {label}
        {required && <span className="ml-1 text-yellow">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/30 focus:border-yellow focus:bg-white/10 focus:outline-none"
      />
    </label>
  );
}

function Octagon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <polygon
        points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
