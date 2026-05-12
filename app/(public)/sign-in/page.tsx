"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Container } from "@/components/ui/container";
import { Octagon, ConfettiField } from "@/components/ui/decorations";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="relative flex min-h-[calc(100vh-200px)] items-center overflow-hidden bg-text text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 20% 30%, rgba(255,106,0,0.25) 0%, rgba(255,106,0,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 80% 80%, rgba(139,62,255,0.25) 0%, rgba(139,62,255,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-14 top-8 size-48 rotate-12 text-white/10 md:size-60" />
      <Octagon className="absolute -right-12 -bottom-8 size-44 -rotate-12 text-white/10 md:size-56" />
      <ConfettiField />

      <Container className="relative grid items-center gap-12 py-14 md:grid-cols-2 md:gap-20 md:py-20">
        {/* LEFT. Pitch */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border-2 border-white bg-text px-6 py-4 self-start">
            <Image
              src="/brand/logo.png"
              alt="Slablabs"
              width={180}
              height={48}
              className="h-10 w-auto"
            />
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-[0.92] tracking-tight">
            {mode === "signin" ? (
              <>
                Welcome <span className="text-orange">back.</span>
              </>
            ) : (
              <>
                Start <span className="text-orange">slabbing.</span>
              </>
            )}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/80 md:text-lg">
            {mode === "signin"
              ? "Sign in to see your bag, wishlist, and order history."
              : "Create an account to save kits to your wishlist and track orders."}
          </p>
          <ul className="flex flex-col gap-3 pt-2">
            <li className="flex items-center gap-3 text-sm text-white/80">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-magenta text-white">
                <User className="size-3.5" strokeWidth={2.6} />
              </span>
              Save your wishlist across devices
            </li>
            <li className="flex items-center gap-3 text-sm text-white/80">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-cyan text-text">
                <Mail className="size-3.5" strokeWidth={2.6} />
              </span>
              Get notified when a queued kit drops
            </li>
            <li className="flex items-center gap-3 text-sm text-white/80">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-yellow text-text">
                <Lock className="size-3.5" strokeWidth={2.6} />
              </span>
              Faster checkout, saved address
            </li>
          </ul>
        </div>

        {/* RIGHT. Form */}
        <div className="rounded-2xl border-2 border-white bg-white p-6 text-text shadow-[8px_8px_0_rgba(255,106,0,0.4)] md:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-success/20 text-success">
                <Mail className="size-7" strokeWidth={2.4} />
              </span>
              <h2 className="font-display text-3xl uppercase">Check your email.</h2>
              <p className="max-w-xs text-sm text-text-soft">
                We sent a magic link. Click it from this device to{" "}
                {mode === "signin" ? "sign in" : "finish creating your account"}.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-xs font-bold uppercase tracking-wider text-orange hover:underline"
              >
                Use a different email →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex gap-2 rounded-full bg-bg-soft p-1">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`flex-1 rounded-full py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    mode === "signin"
                      ? "bg-text text-white"
                      : "text-text-soft hover:text-text"
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`flex-1 rounded-full py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    mode === "signup"
                      ? "bg-text text-white"
                      : "text-text-soft hover:text-text"
                  }`}
                >
                  Create account
                </button>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Email
                </span>
                <div className="flex items-center rounded-full border border-line bg-white">
                  <Mail
                    className="ml-4 size-4 text-muted"
                    strokeWidth={2.4}
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@trainer.com"
                    className="w-full bg-transparent px-3 py-3 text-sm placeholder:text-muted focus:outline-none"
                  />
                </div>
              </label>

              <button type="submit" className="btn-orange w-full">
                {mode === "signin" ? "Send magic link" : "Create account"}
                <ArrowRight className="size-4" strokeWidth={2.6} />
              </button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-line" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Or
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-line-strong px-6 py-3 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:border-text"
              >
                Continue with Google
              </button>

              <p className="text-center text-xs text-muted">
                By continuing you agree to our{" "}
                <Link href="/terms" className="underline-offset-4 hover:underline">
                  Terms
                </Link>{" "}
                &amp;{" "}
                <Link href="/privacy" className="underline-offset-4 hover:underline">
                  Privacy
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
