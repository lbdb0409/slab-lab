export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Production domain is slablab.com.au (singular). The brand is "Slablabs"
// (plural) — but the URL is the singular form.
export const SITE_URL = "https://slablab.com.au";

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Slablabs",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.png`,
  description:
    "Custom-printed display slabs for Pokémon trading cards. Print-and-assemble. Your card never leaves your hands.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
  },
} as const;

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Slablabs",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
} as const;
