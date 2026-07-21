import "server-only";

/**
 * Shopify Storefront API client.
 *
 * Deliberately dependency-free — the Storefront API is a single GraphQL
 * endpoint and the official JS client adds more surface than this needs.
 *
 * Nothing here throws at import time when credentials are absent, so the site
 * keeps building and running on the existing Postgres catalogue until the
 * development store exists. Call `isShopifyConfigured()` before using it.
 */

// 2026-07 is the current stable version (released 1 Jul 2026, supported to
// 16 Jul 2027). It carries breaking changes to cart and product queries versus
// 2026-04 — the queries in ./queries.ts are written against 2026-07.
// Shopify ships a new version quarterly; revisit this roughly every 3 months.
const DEFAULT_API_VERSION = "2026-07";

export type ShopifyConfig = {
  domain: string;
  apiVersion: string;
  /**
   * The Headless channel issues two tokens and they use different headers:
   *
   *  - private: server-side only, higher rate limits, and it reads a store
   *    that still has its password page enabled. Never expose it to a browser.
   *  - public:  safe in client code, but blocked by the password page.
   *
   * This module is `server-only`, so the private token is preferred and the
   * public one is the fallback for a store that's already published.
   */
  privateToken?: string;
  publicToken?: string;
};

export function getShopifyConfig(): ShopifyConfig | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();
  const publicToken = process.env.SHOPIFY_STOREFRONT_TOKEN?.trim();
  if (!domain || (!privateToken && !publicToken)) return null;
  return {
    domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    apiVersion: process.env.SHOPIFY_API_VERSION?.trim() || DEFAULT_API_VERSION,
    privateToken,
    publicToken,
  };
}

export function isShopifyConfigured() {
  return getShopifyConfig() !== null;
}

export class ShopifyError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly errors?: unknown,
  ) {
    super(message);
    this.name = "ShopifyError";
  }
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string; extensions?: Record<string, unknown> }[];
};

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  opts: { revalidate?: number | false; tags?: string[] } = {},
): Promise<T> {
  const cfg = getShopifyConfig();
  if (!cfg) {
    throw new ShopifyError(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN plus either " +
        "SHOPIFY_STOREFRONT_PRIVATE_TOKEN (preferred, server-side) or " +
        "SHOPIFY_STOREFRONT_TOKEN (public).",
    );
  }

  // Private and public tokens use different headers. Sending both is invalid,
  // so pick one — private wins because this runs server-side and works even
  // while the store's password page is still up.
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cfg.privateToken) {
    headers["Shopify-Storefront-Private-Token"] = cfg.privateToken;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = cfg.publicToken!;
  }

  const res = await fetch(
    `https://${cfg.domain}/api/${cfg.apiVersion}/graphql.json`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      // Carts must never be cached; product reads can be.
      next:
        opts.revalidate === false
          ? undefined
          : { revalidate: opts.revalidate ?? 60, tags: opts.tags },
      cache: opts.revalidate === false ? "no-store" : undefined,
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // A password-protected store answers 401/403 here rather than a GraphQL error.
    const hint =
      res.status === 401 || res.status === 403
        ? cfg.privateToken
          ? " (check the storefront's Storefront API permissions in the Headless channel)"
          : " (the public token is blocked while the store password page is on —" +
            " use SHOPIFY_STOREFRONT_PRIVATE_TOKEN instead)"
        : "";
    throw new ShopifyError(
      `Storefront API ${res.status}${hint}: ${body.slice(0, 300)}`,
      res.status,
    );
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new ShopifyError(
      `Storefront API returned errors: ${json.errors.map((e) => e.message).join("; ")}`,
      res.status,
      json.errors,
    );
  }
  if (!json.data) throw new ShopifyError("Storefront API returned no data.");
  return json.data;
}
