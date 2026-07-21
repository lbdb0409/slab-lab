import type { Metadata } from "next";
import Link from "next/link";
import { Cookie } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import {
  LegalProse,
  LegalSection,
} from "@/components/ui/legal-prose";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and local storage Slablabs uses, what they do, and how to manage them.",
  alternates: { canonical: "/cookies" },
};

type Row = {
  name: string;
  type: string;
  purpose: string;
  duration: string;
};

const COOKIES: Row[] = [
  {
    name: "slablabs_cart_id",
    type: "Essential (cookie)",
    purpose:
      "Links your browser to your bag, which is held by Shopify. Set as httpOnly, so it can't be read by scripts on this site.",
    duration: "30 days",
  },
  {
    name: "next-auth.session-token",
    type: "Essential (cookie)",
    purpose: "Keeps you signed in to your account",
    duration: "30 days",
  },
  {
    name: "__stripe_mid / __stripe_sid",
    type: "Essential (cookie, set by Stripe)",
    purpose: "Fraud prevention during checkout",
    duration: "Stripe-managed",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/cookies", label: "Cookies" }]}
        eyebrow="Legal"
        EyebrowIcon={Cookie}
        eyebrowColor="lime"
        title={
          <>
            Cookie <span className="text-lime-deep">Policy.</span>
          </>
        }
        body="The small files we set in your browser to make the Site work. No tracking pixels, no third-party ad cookies."
        bg="mint"
      />

      <LegalProse lastUpdated="11 May 2026">
        <LegalSection n="01" title="What's a cookie?">
          <p>
            A cookie is a small text file a website asks your browser to
            store. We also use{" "}
            <code className="rounded bg-bg-soft px-1.5 py-0.5 text-sm">
              localStorage
            </code>{" "}
            (a similar mechanism) for things like your bag and the pack
            intro.
          </p>
        </LegalSection>

        <LegalSection n="02" title="What we use">
          <p>
            We keep it minimal. Three categories. And we use zero advertising
            or social-tracking cookies on this site.
          </p>
          {/* Below md the same data renders as stacked cards. The table's
              min-content width exceeds a phone's 327px — `next-auth.session-token`
              alone is a ~152px unbreakable mono token — so a 4-column table
              could only ever be a sideways swipe with no scroll affordance. */}
          <ul className="my-4 flex flex-col gap-3 md:hidden">
            {COOKIES.map((c) => (
              <li key={c.name} className="border border-line bg-bg-soft p-3">
                <p className="break-all font-mono text-xs font-bold">{c.name}</p>
                <dl className="mt-2 flex flex-col gap-1 text-xs">
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-bold uppercase tracking-wider text-muted">Type</dt>
                    <dd>{c.type}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-bold uppercase tracking-wider text-muted">Purpose</dt>
                    <dd>{c.purpose}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-bold uppercase tracking-wider text-muted">Duration</dt>
                    <dd>{c.duration}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <div className="my-4 hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-text text-left">
                  <th className="py-3 pr-4 text-[10px] font-bold uppercase tracking-widest text-muted">
                    Name
                  </th>
                  <th className="py-3 pr-4 text-[10px] font-bold uppercase tracking-widest text-muted">
                    Type
                  </th>
                  <th className="py-3 pr-4 text-[10px] font-bold uppercase tracking-widest text-muted">
                    Purpose
                  </th>
                  <th className="py-3 text-[10px] font-bold uppercase tracking-widest text-muted">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c) => (
                  <tr key={c.name} className="border-b border-line align-top">
                    <td className="py-3 pr-4 font-mono text-xs">{c.name}</td>
                    <td className="py-3 pr-4 text-xs">{c.type}</td>
                    <td className="py-3 pr-4 text-xs">{c.purpose}</td>
                    <td className="py-3 text-xs">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection n="03" title="Essential cookies">
          <p>
            Essential cookies are required for the Site to work. Keeping your
            bag during a session, keeping you signed in, and (for Stripe&apos;s
            cookies) preventing fraud at checkout. These can&apos;t be
            disabled while still using the Site normally.
          </p>
        </LegalSection>

        <LegalSection n="04" title="What we don't use">
          <p>The site does not set:</p>
          <ul className="ml-5 list-disc space-y-1.5 marker:text-orange">
            <li>Cross-site tracking cookies for advertising</li>
            <li>Facebook Pixel, TikTok Pixel, or Google Ads remarketing</li>
            <li>Analytics that fingerprint you across the web</li>
          </ul>
        </LegalSection>

        <LegalSection n="05" title="Managing cookies">
          <p>
            Every modern browser lets you view, manage, and clear cookies and
            local storage. Doing so will sign you out and empty your bag, but
            the Site will continue to work.
          </p>
          <p>
            Stripe&apos;s checkout cookies are set by Stripe directly. See
            their{" "}
            <Link
              href="https://stripe.com/cookie-settings"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              cookie settings
            </Link>{" "}
            for control.
          </p>
        </LegalSection>

        <LegalSection n="06" title="Updates">
          <p>
            If we add or remove cookies we&apos;ll update this page. The
            last-updated date at the top reflects the most recent change.
          </p>
        </LegalSection>

        <LegalSection n="07" title="Contact">
          <p>
            Questions?{" "}
            <Link
              href="mailto:slablabsoz@gmail.com"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              slablabsoz@gmail.com
            </Link>
            .
          </p>
        </LegalSection>
      </LegalProse>
    </>
  );
}
