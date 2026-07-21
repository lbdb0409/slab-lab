import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCheckoutUrl } from "@/lib/actions/cart";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

// The cart is per-visitor and lives behind a cookie, so this can never be
// prerendered or cached.
export const dynamic = "force-dynamic";

/**
 * Checkout is Shopify's.
 *
 * Payment, tax, shipping rates and PCI compliance all belong to Shopify's
 * hosted checkout — replicating any of it here would mean handling card data.
 * Customising that checkout requires Shopify Plus, so on Basic this route's
 * only job is to hand the visitor over with their cart intact.
 *
 * The form that previously lived here collected an address and could not
 * charge anything. It has been removed rather than left as a dead end.
 */
export default async function CheckoutPage() {
  const checkoutUrl = await getCheckoutUrl();

  // Empty bag, or no Shopify cart yet — nothing to check out.
  if (!checkoutUrl) redirect("/cart");

  redirect(checkoutUrl);
}
