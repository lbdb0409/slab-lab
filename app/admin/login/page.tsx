import Image from "next/image";
import { Lock } from "lucide-react";

import { login } from "@/lib/actions/admin-auth";
import { Container } from "@/components/ui/container";
import { Octagon } from "@/components/ui/decorations";

export const metadata = {
  title: "Admin sign-in",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ error?: string; from?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const error = params.error === "1";
  const from = params.from ?? "/admin";

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-text text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 25% 30%, rgba(255,106,0,0.28) 0%, rgba(255,106,0,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 50% at 80% 80%, rgba(139,62,255,0.22) 0%, rgba(139,62,255,0) 60%)",
        }}
      />
      <Octagon className="absolute -left-12 -top-8 size-48 rotate-12 text-white/10 md:size-60" />
      <Octagon className="absolute -right-12 -bottom-8 size-48 -rotate-12 text-white/10 md:size-60" />

      <Container className="relative max-w-md py-16">
        <div className="rounded-2xl border-2 border-white bg-white p-6 text-text shadow-[8px_8px_0_rgba(255,106,0,0.4)] md:p-8">
          <div className="mb-6 flex flex-col items-start gap-3">
            <div className="rounded-xl border-2 border-text bg-text px-4 py-3">
              <Image
                src="/brand/logo.png"
                alt="Slablabs"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
              <Lock className="size-3" strokeWidth={2.6} />
              Admin sign-in
            </span>
            <h1 className="font-display text-3xl uppercase leading-tight tracking-tight">
              Slablabs admin.
            </h1>
            <p className="text-sm text-text-soft">
              This area is for staff only. Enter the admin password to continue.
            </p>
          </div>

          <form action={login} className="flex flex-col gap-3">
            <input type="hidden" name="from" value={from} />
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Admin password
              </span>
              <input
                type="password"
                name="password"
                required
                autoFocus
                placeholder="••••••••"
                className="rounded-md border border-line bg-white px-3 py-2.5 text-sm focus:border-text focus:outline-none"
              />
            </label>

            {error && (
              <p className="rounded-md border border-danger/40 bg-danger/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-danger">
                Wrong password. Try again
              </p>
            )}

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-text px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange"
            >
              <Lock className="size-4" strokeWidth={2.4} />
              Sign in
            </button>
            <p className="mt-1 text-[11px] text-muted">
              Set <code className="rounded bg-bg-soft px-1.5 py-0.5 font-mono">ADMIN_PASSWORD</code> in
              your environment to change it.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
