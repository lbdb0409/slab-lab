import type { MetadataRoute } from "next";

import { EXPANSIONS } from "@/data/kits";
import { SITE_URL } from "@/components/seo/json-ld";
import { getAllProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  if (process.env.COMING_SOON !== "0") {
    return [
      {
        url: `${SITE_URL}/coming-soon`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }

  const staticPages: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, freq: "daily" },
    { path: "/shop", priority: 0.9, freq: "daily" },
    { path: "/how-it-works", priority: 0.8, freq: "monthly" },
    { path: "/build-guide", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/gallery", priority: 0.6, freq: "weekly" },
    { path: "/support", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "monthly" },
    { path: "/shipping", priority: 0.5, freq: "monthly" },
    { path: "/returns", priority: 0.5, freq: "monthly" },
    { path: "/terms", priority: 0.3, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "monthly" },
    { path: "/cookies", priority: 0.3, freq: "monthly" },
  ];

  const products = await getAllProducts();

  const staticEntries = staticPages.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  const kitEntries = products.map((kit) => ({
    url: `${SITE_URL}/kits/${kit.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: kit.status === "live" ? 0.85 : 0.6,
  }));

  const setEntries = EXPANSIONS.map((set) => ({
    url: `${SITE_URL}/sets/${set.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...setEntries, ...kitEntries];
}
