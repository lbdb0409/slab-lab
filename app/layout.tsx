import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

import {
  JsonLd,
  ORGANIZATION_JSONLD,
  SITE_URL,
  WEBSITE_JSONLD,
} from "@/components/seo/json-ld";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Slablabs. Encase the art.",
    template: "%s · Slablabs",
  },
  description:
    "Custom-printed display slabs for Pokémon trading cards. Print-and-assemble. Your card never leaves your hands. Made for the cards that won't grade.",
  keywords: [
    "Pokémon TCG",
    "display slab",
    "card display",
    "Pokémon slab",
    "TCG accessories",
    "custom card slab",
    "Australia",
  ],
  applicationName: "Slablabs",
  authors: [{ name: "Slablabs" }],
  creator: "Slablabs",
  publisher: "Slablabs",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Slablabs",
    title: "Slablabs. Encase the art.",
    description:
      "Custom-printed display slabs for Pokémon trading cards. Your card never leaves your hands.",
    url: SITE_URL,
    locale: "en_AU",
    images: [
      {
        url: "/brand/slab-mockup.png",
        width: 1200,
        height: 630,
        alt: "Slablabs Mega Gengar EX expanded-art display slab kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slablabs. Encase the art.",
    description:
      "Custom-printed display slabs for Pokémon trading cards. Your card never leaves your hands.",
    images: ["/brand/slab-mockup.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "ecommerce",
};

export const viewport: Viewport = {
  themeColor: "#FF6A00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={ORGANIZATION_JSONLD} />
        <JsonLd data={WEBSITE_JSONLD} />
        {children}
      </body>
    </html>
  );
}
