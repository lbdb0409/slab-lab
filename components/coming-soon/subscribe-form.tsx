"use client";

import { useActionState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

import { subscribe, type SubscribeState } from "@/lib/actions/launch";

const INITIAL: SubscribeState = { ok: false, message: "" };

export function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribe, INITIAL);

  if (state.ok) {
    return (
      <div className="flex items-center gap-3 rounded-full border-2 border-success bg-success/10 px-5 py-3 text-white shadow-[6px_6px_0_rgba(255,106,0,0.4)]">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-white">
          <Check className="size-4" strokeWidth={3} />
        </span>
        <p className="text-sm font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-stretch overflow-hidden rounded-full border-2 border-white bg-white shadow-[6px_6px_0_rgba(255,106,0,0.45)]">
        <span className="inline-flex items-center pl-4 text-text-soft">
          <Mail className="size-4" strokeWidth={2.4} />
        </span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@trainer.com"
          autoComplete="email"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-text placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 bg-orange px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-deep disabled:opacity-60"
        >
          {pending ? "Saving…" : "Notify me"}
          <ArrowRight className="size-3.5" strokeWidth={2.6} />
        </button>
      </div>
      {state.message && !state.ok && (
        <p
          role="alert"
          className="rounded-full bg-magenta/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-magenta"
        >
          {state.message}
        </p>
      )}
      <p className="text-[11px] text-white/70">
        One email at launch. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
