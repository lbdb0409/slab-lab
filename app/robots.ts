import type { MetadataRoute } from "next";

import { SITE_URL } from "@/components/seo/json-ld";

export default function robots(): MetadataRoute.Robots {
  if (process.env.COMING_SOON !== "0") {
    return {
      rules: [
        {
          userAgent: "*",
          allow: ["/coming-soon"],
          disallow: ["/"],
        },
      ],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/account",
          "/account/",
          "/api/",
          "/checkout",
          "/cart",
          "/sign-in",
          "/wishlist",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
