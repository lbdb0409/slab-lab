import "server-only";

import { storefront } from "./client";

/**
 * Storefront API queries, written against version 2026-07.
 *
 * The Language option maps onto Shopify variants: each product has one variant
 * per printing it's produced in, matching what the manufacturing PO shows.
 */

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    tags
    productType
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        quantityAvailable
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  productType: string;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: ShopifyVariant[] };
};

/** The Language option value for a variant, or null if the product has none. */
export function variantLanguage(v: ShopifyVariant): string | null {
  return (
    v.selectedOptions.find((o) => o.name.toLowerCase() === "language")?.value ??
    null
  );
}

export async function getProducts(first = 250): Promise<ShopifyProduct[]> {
  const data = await storefront<{ products: { nodes: ShopifyProduct[] } }>(
    /* GraphQL */ `
      ${PRODUCT_FRAGMENT}
      query Products($first: Int!) {
        products(first: $first) {
          nodes {
            ...ProductFields
          }
        }
      }
    `,
    { first },
    { revalidate: 60, tags: ["shopify-products"] },
  );
  return data.products.nodes;
}

export async function getProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  const data = await storefront<{ product: ShopifyProduct | null }>(
    /* GraphQL */ `
      ${PRODUCT_FRAGMENT}
      query Product($handle: String!) {
        product(handle: $handle) {
          ...ProductFields
        }
      }
    `,
    { handle },
    { revalidate: 60, tags: ["shopify-products", `product-${handle}`] },
  );
  return data.product;
}

/* ---------------------------------------------------------------- cart --- */

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            product {
              handle
              title
              tags
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        selectedOptions: { name: string; value: string }[];
        price: { amount: string; currencyCode: string };
        product: {
          handle: string;
          title: string;
          tags: string[];
          featuredImage: { url: string; altText: string | null } | null;
        };
      };
    }[];
  };
};

// Carts are per-visitor and must never be cached.
const NO_CACHE = { revalidate: false as const };

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = [],
): Promise<ShopifyCart> {
  const data = await storefront<{ cartCreate: { cart: ShopifyCart } }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { lines },
    NO_CACHE,
  );
  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefront<{ cart: ShopifyCart | null }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      query Cart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
    `,
    { cartId },
    NO_CACHE,
  );
  return data.cart;
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<ShopifyCart> {
  const data = await storefront<{ cartLinesAdd: { cart: ShopifyCart } }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { cartId, lines },
    NO_CACHE,
  );
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<ShopifyCart> {
  const data = await storefront<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { cartId, lines },
    NO_CACHE,
  );
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<ShopifyCart> {
  const data = await storefront<{ cartLinesRemove: { cart: ShopifyCart } }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    { cartId, lineIds },
    NO_CACHE,
  );
  return data.cartLinesRemove.cart;
}

/** Cheap connectivity probe used by `npm run shopify:verify`. */
export async function getShopInfo() {
  return storefront<{
    shop: { name: string; primaryDomain: { url: string } };
  }>(
    /* GraphQL */ `
      query Shop {
        shop {
          name
          primaryDomain {
            url
          }
        }
      }
    `,
    {},
    { revalidate: false },
  );
}
