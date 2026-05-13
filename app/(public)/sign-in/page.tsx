import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Customer sign-in. Coming soon alongside Stripe Checkout.",
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/sign-in", label: "Sign in" }]}
        eyebrow="Customer accounts"
        EyebrowIcon={LogIn}
        eyebrowColor="orange"
        title={
          <>
            Sign-in <span className="text-orange">coming soon.</span>
          </>
        }
        body="Customer accounts land when Stripe Checkout does. Until then every kit ships from the bag — no account required, no password to forget."
        bg="cream"
      />

      <Container className="py-12 md:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 border-2 border-text bg-white p-10 text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-orange/10 text-orange">
            <LogIn className="size-7" strokeWidth={2.2} />
          </span>
          <h2 className="font-display text-3xl uppercase leading-tight tracking-tight">
            We&apos;re wiring this up.
          </h2>
          <p className="max-w-md text-sm text-text-soft">
            Once accounts are live, you&apos;ll be able to track orders, save
            addresses, and keep a wishlist. For the launch we wanted to skip
            the friction of a sign-up step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-orange-deep"
            >
              Browse slabs
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-full border-2 border-text bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-text hover:bg-text hover:text-white"
            >
              Need help with an order?
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
