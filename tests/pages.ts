/**
 * Every public route worth a visual baseline. Admin is out of scope.
 *
 * Product paths use Shopify handles — CATALOG_SOURCE=shopify in .env.local
 * makes Shopify the catalogue, and the old Postgres slugs (151-charizard and
 * friends) 404 against it.
 */
export const PAGES: { name: string; path: string }[] = [
  { name: "home", path: "/" },
  { name: "shop", path: "/shop" },
  { name: "kit-detail", path: "/kits/alakazam-ex-sir-151" },
  { name: "set-detail", path: "/sets/scarlet-violet" },
  { name: "search", path: "/search?q=charizard" },
  { name: "search-empty", path: "/search" },
  { name: "gallery", path: "/gallery" },
  { name: "wishlist", path: "/wishlist" },
  { name: "cart", path: "/cart" },
  // /checkout is now a redirect to Shopify's hosted checkout (or /cart when
  // the bag is empty), so there is no page of our own left to screenshot.
  { name: "checkout-success", path: "/checkout/success" },
  { name: "how-it-works", path: "/how-it-works" },
  { name: "build-guide", path: "/build-guide" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "support", path: "/support" },
  { name: "terms", path: "/terms" },
  { name: "privacy", path: "/privacy" },
  { name: "cookies", path: "/cookies" },
  { name: "returns", path: "/returns" },
  { name: "shipping", path: "/shipping" },
  { name: "sign-in", path: "/sign-in" },
  { name: "account", path: "/account" },
  { name: "account-orders", path: "/account/orders" },
  { name: "account-addresses", path: "/account/addresses" },
  { name: "account-settings", path: "/account/settings" },
  { name: "not-found", path: "/this-route-does-not-exist" },
];
