/**
 * Shared cart shapes.
 *
 * These live outside `lib/actions/cart.ts` because a "use server" module may
 * only export async functions — exporting a plain object or class from one is
 * a build error. Types are erased so they'd be fine, but keeping the constant
 * and the types together is clearer than splitting them across files.
 */

/** Which printing of a card a line was bought in. */
export type CartLineLanguage = "en" | "jp";

export type CartLineView = {
  /** Shopify cart line id — the handle for quantity and remove operations. */
  id: string;
  merchandiseId: string;
  slug: string;
  language: CartLineLanguage;
  card: string;
  set: string;
  setSlug: string;
  priceCents: number;
  imageUrl: string;
  quantity: number;
};

export type CartView = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotalCents: number;
  currencyCode: string;
  lines: CartLineView[];
};

export const EMPTY_CART: CartView = {
  id: "",
  checkoutUrl: "",
  totalQuantity: 0,
  subtotalCents: 0,
  currencyCode: "AUD",
  lines: [],
};
