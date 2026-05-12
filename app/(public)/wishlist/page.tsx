import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Slabs you've saved to come back to.",
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
            Your <span className="text-magenta">wishlist.</span>
          </>
        }
        body="Slabs you've tapped the heart on. Saved here so you can come back when you're ready."
        bg="pink"
      />

      <Container className="py-14 md:py-20">
        <div className="flex flex-col items-center justify-center gap-5 border-2 border-line bg-bg-soft px-6 py-20 text-center">
          <div className="inline-flex size-20 items-center justify-center rounded-full bg-pink-tint text-magenta">
            <Heart className="size-9" strokeWidth={2} />
          </div>
          <h2 className="font-display text-4xl uppercase leading-tight">
            Wishlist is empty.
          </h2>
          <p className="max-w-sm text-base text-muted">
            Tap the heart on any slab kit to save it. Your wishlist syncs across
            devices when you&apos;re signed in.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn-orange">
              Browse slabs
              <ArrowRight className="size-4" strokeWidth={2.6} />
            </Link>
            <Link href="/sign-in" className="btn-ghost">
              Sign in to sync
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
