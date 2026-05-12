import Link from "next/link";
import { ArrowRight, Package, ShoppingBag } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export default function AccountOrdersPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/account", label: "Account" },
          { href: "/account/orders", label: "Orders" },
        ]}
        eyebrow="Order history"
        EyebrowIcon={Package}
        eyebrowColor="magenta"
        title={
          <>
            Your <span className="text-magenta">orders.</span>
          </>
        }
        body="Once Stripe Checkout is live, every kit you order shows up here with its current status and tracking."
        bg="pink"
      />

      <Container className="py-10 md:py-14">
        <div className="flex flex-col items-center justify-center gap-4 border-2 border-line bg-bg-soft px-6 py-20 text-center">
          <div className="inline-flex size-16 items-center justify-center rounded-full bg-tint text-muted">
            <ShoppingBag className="size-7" strokeWidth={2} />
          </div>
          <h2 className="font-display text-3xl uppercase leading-tight">
            Nothing here yet.
          </h2>
          <p className="max-w-sm text-sm text-muted">
            You haven&apos;t ordered a slab kit yet. Once you do, the history
            shows up here.
          </p>
          <Link href="/shop" className="btn-orange mt-2">
            Find your slab
            <ArrowRight className="size-4" strokeWidth={2.6} />
          </Link>
        </div>
      </Container>
    </>
  );
}
