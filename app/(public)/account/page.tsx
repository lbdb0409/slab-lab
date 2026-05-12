import Link from "next/link";
import { ArrowRight, LogIn, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export default function AccountOverviewPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/account", label: "Account" }]}
        eyebrow="Your account"
        EyebrowIcon={Sparkles}
        eyebrowColor="magenta"
        title={
          <>
            Sign in to see your{" "}
            <span className="text-magenta">collection HQ.</span>
          </>
        }
        body="Customer accounts are coming with Stripe Checkout. For now, every kit ships from the bag — no account required."
        bg="pink"
      />

      <Container className="py-12 md:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 border-2 border-text bg-white p-10 text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-magenta/10 text-magenta">
            <LogIn className="size-7" strokeWidth={2.2} />
          </span>
          <h2 className="font-display text-3xl uppercase leading-tight tracking-tight">
            Customer accounts coming soon.
          </h2>
          <p className="max-w-md text-sm text-muted">
            When Stripe Checkout goes live, you&apos;ll be able to track orders,
            save shipping addresses, and keep a wishlist. Until then, just hit
            the bag and check out as a guest.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/shop" className="btn-orange">
              Browse slabs
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
            <Link href="/support" className="btn-ghost">
              Need help with an order?
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
