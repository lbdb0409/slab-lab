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
    name: "slablabs-cart-v1",
    type: "Essential (localStorage)",
    purpose: "Keeps the items you've added to your bag",
    duration: "Until you clear browser storage",
  },
  {
    name: "slablabs-intro-v1",
    type: "Functional (localStorage)",
    purpose: "Remembers whether you've seen the pack-opening intro",
    duration: "Until you clear browser storage",
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
          <div className="my-4 overflow-x-auto">
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

        <LegalSection n="04" title="Functional storage">
          <p>
            The pack-opening intro flag is one piece of functional storage.
            we use it to remember whether you&apos;ve seen the intro so it
            doesn&apos;t replay every visit. You can clear this manually any
            time:
          </p>
          <pre className="my-3 overflow-x-auto rounded-md bg-bg-soft p-3 text-xs">
            {`localStorage.removeItem("slablabs-intro-v1")`}
          </pre>
        </LegalSection>

        <LegalSection n="05" title="What we don't use">
          <p>The site does not set:</p>
          <ul className="ml-5 list-disc space-y-1.5 marker:text-orange">
            <li>Cross-site tracking cookies for advertising</li>
            <li>Facebook Pixel, TikTok Pixel, or Google Ads remarketing</li>
            <li>Analytics that fingerprint you across the web</li>
          </ul>
        </LegalSection>

        <LegalSection n="06" title="Managing cookies">
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

        <LegalSection n="07" title="Updates">
          <p>
            If we add or remove cookies we&apos;ll update this page. The
            last-updated date at the top reflects the most recent change.
          </p>
        </LegalSection>

        <LegalSection n="08" title="Contact">
          <p>
            Questions?{" "}
            <Link
              href="mailto:hello@slablabs.com.au"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              hello@slablabs.com.au
            </Link>
            .
          </p>
        </LegalSection>
      </LegalProse>
    </>
  );
}
