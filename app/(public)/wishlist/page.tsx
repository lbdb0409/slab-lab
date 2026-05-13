import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save kits to come back to. Coming with customer accounts.",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/wishlist", label: "Wishlist" }]}
        eyebrow="Saved slabs"
        EyebrowIcon={Heart}
        eyebrowColor="magenta"
        title={
          <>
            Wishlist <span className="text-magenta">coming soon.</span>
          </>
        }
        body="Saving slabs to come back to lands with customer accounts. For now, the kits don't go anywhere — bookmark a set page or drop us a request."
        bg="pink"
      />

      <Container className="py-14 md:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 border-2 border-text bg-white p-10 text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-magenta/10 text-magenta">
            <Heart className="size-7" strokeWidth={2.2} />
          </span>
          <h2 className="font-display text-3xl uppercase leading-tight tracking-tight">
            We&apos;re wiring this up alongside accounts.
          </h2>
          <p className="max-w-md text-sm text-text-soft">
            Once accounts are live, you&apos;ll be able to heart any kit and
            come back to it. Until then the inventory isn&apos;t big enough to
            get lost in.
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
              href="/#request"
              className="inline-flex items-center gap-2 rounded-full border-2 border-text bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-text hover:bg-text hover:text-white"
            >
              Request a slab
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
