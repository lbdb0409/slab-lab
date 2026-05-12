export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const SITE_URL = "https://slablabs.com.au";

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Slablabs",
  legalName: "Slablabs Pty Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.png`,
  description:
    "Custom-printed display slabs for Pokémon trading cards. Print-and-assemble — your card never leaves your hands.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
  },
  sameAs: [
    "https://instagram.com/slablabs",
    "https://tiktok.com/@slablabs",
    "https://youtube.com/@slablabs",
  ],
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
