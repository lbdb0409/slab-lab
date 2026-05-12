import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import {
  LegalProse,
  LegalSection,
  LegalList,
} from "@/components/ui/legal-prose";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Slablabs collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/privacy", label: "Privacy" }]}
        eyebrow="Legal"
        EyebrowIcon={Lock}
        eyebrowColor="purple"
        title={
          <>
            Privacy <span className="text-purple">Policy.</span>
          </>
        }
        body="What we collect, why we collect it, what we never share. Written in plain English."
        bg="lavender"
      />

      <LegalProse lastUpdated="11 May 2026">
        <LegalSection n="01" title="The short version">
          <p>
            Slablabs collects the bare minimum needed to take orders, ship
            kits, and answer your questions. We don&apos;t sell your data, we
            don&apos;t track you across the web, and we never share your card
            collection with anyone.
          </p>
        </LegalSection>

        <LegalSection n="02" title="What we collect">
          <p>When you visit, sign up, or buy from us we collect:</p>
          <LegalList
            items={[
              "Your name and email — needed to confirm orders and send a magic-link sign-in",
              "Your shipping address — needed to ship the kit",
              "Your phone number — used by couriers for delivery questions",
              "Payment details — handled entirely by Stripe; we never see your card number",
              "Order history — what you bought and when",
              "Wishlist — kits you've saved (if you're signed in)",
              "Basic technical data — browser, device type, IP address, page views",
            ]}
          />
        </LegalSection>

        <LegalSection n="03" title="How we use it">
          <p>We use your data to:</p>
          <LegalList
            items={[
              "Process and ship your order",
              "Send order updates, tracking, and shipping notifications",
              "Reply to your support emails and custom requests",
              "Send marketing emails — only if you opted in, unsubscribe in any email",
              "Improve the Site (anonymous, aggregate analytics)",
              "Detect and prevent fraudulent orders",
              "Comply with Australian tax and consumer-protection law",
            ]}
          />
          <p>
            We don&apos;t use your data to build advertising profiles or feed
            it to third-party ad networks.
          </p>
        </LegalSection>

        <LegalSection n="04" title="Who we share with">
          <p>
            We share data only with service providers we need to run the
            business:
          </p>
          <LegalList
            items={[
              "Stripe — to process payments",
              "Australia Post / courier partners — to ship your order",
              "Our email provider — to send transactional and (opted-in) marketing emails",
              "Our customer support tool — only when you email us",
              "Cloud hosting (Vercel / Neon) — where the Site and database run",
            ]}
          />
          <p>
            Each of these providers is bound by their own privacy
            commitments. We sign data-processing agreements with all of them
            where required.
          </p>
          <p>
            We will share information if compelled by law, court order, or to
            protect Slablabs, our customers, or the public from harm.
          </p>
        </LegalSection>

        <LegalSection n="05" title="Cookies &amp; tracking">
          <p>
            We use a small set of cookies and similar storage (like
            localStorage) for essential things — keeping your bag, your
            sign-in state, and our pack-opening intro flag.
          </p>
          <p>
            See the{" "}
            <Link
              href="/cookies"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              Cookie Policy
            </Link>{" "}
            for the full list.
          </p>
        </LegalSection>

        <LegalSection n="06" title="How long we keep it">
          <p>
            Account &amp; order data: 7 years after your last interaction
            (required for AU tax records).
          </p>
          <p>
            Wishlist &amp; preferences: until you delete them or close your
            account.
          </p>
          <p>
            Support emails: 3 years from last contact.
          </p>
          <p>
            Anonymous analytics: 26 months, aggregated only.
          </p>
        </LegalSection>

        <LegalSection n="07" title="Your rights">
          <p>Under the Australian Privacy Act you can:</p>
          <LegalList
            items={[
              "Access the personal information we hold about you",
              "Correct anything inaccurate",
              "Ask us to delete your account and associated data",
              "Object to receiving marketing emails (just unsubscribe — instant)",
              "Complain to the Office of the Australian Information Commissioner if you think we've mishandled your data",
            ]}
          />
          <p>
            To exercise any of these, email{" "}
            <Link
              href="mailto:hello@slablabs.com.au"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              hello@slablabs.com.au
            </Link>{" "}
            with the subject line &quot;Privacy request&quot;.
          </p>
        </LegalSection>

        <LegalSection n="08" title="Security">
          <p>
            We use industry-standard encryption (HTTPS site-wide, encrypted
            databases) and rely on Stripe for payments so card numbers never
            hit our servers. No system is 100% secure — if we ever have a data
            incident affecting your information, we&apos;ll tell you within
            72 hours.
          </p>
        </LegalSection>

        <LegalSection n="09" title="Kids">
          <p>
            We don&apos;t knowingly collect data from anyone under 16. If you
            think a child has signed up, let us know and we&apos;ll delete the
            account.
          </p>
        </LegalSection>

        <LegalSection n="10" title="International users">
          <p>
            We ship within Australia only, but the Site is accessible
            worldwide. If you visit from outside Australia your data is still
            handled per this policy and stored on servers operated by our
            providers (some of which are located outside Australia, e.g.
            Stripe servers in the US/EU).
          </p>
        </LegalSection>

        <LegalSection n="11" title="Changes">
          <p>
            We&apos;ll update this policy as the business changes. The current
            version with its last-updated date will always live at this URL.
          </p>
        </LegalSection>

        <LegalSection n="12" title="Contact">
          <p>
            Privacy questions or requests:{" "}
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
