import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import {
  LegalProse,
  LegalSection,
  LegalList,
} from "@/components/ui/legal-prose";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Slablabs website and purchase of Slablabs slab kits.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/terms", label: "Terms" }]}
        eyebrow="Legal"
        EyebrowIcon={FileText}
        eyebrowColor="cyan"
        title={
          <>
            Terms of <span className="text-cyan-deep">Service.</span>
          </>
        }
        body="The rules that govern using slablabs.com.au and buying Slablabs slab kits. Plain English where we can, lawyer-speak only where we must."
        bg="sky"
      />

      <LegalProse lastUpdated="11 May 2026">
        <LegalSection n="01" title="Welcome">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to
            and use of the website at slablabs.com.au (the &quot;Site&quot;)
            and any products, services, or content provided by Slablabs Pty
            Ltd (&quot;Slablabs&quot;, &quot;we&quot;, &quot;us&quot;).
          </p>
          <p>
            By browsing the Site, creating an account, or placing an order you
            agree to these Terms. If you don&apos;t agree, please don&apos;t
            use the Site.
          </p>
        </LegalSection>

        <LegalSection n="02" title="About Slablabs">
          <p>
            Slablabs designs and sells custom-printed display slabs for trading
            cards. We are an independent Australian company. We are not
            affiliated with, sponsored by, or endorsed by The Pokémon Company,
            Nintendo, Game Freak, Creatures, Bandai (One Piece), Wizards of
            the Coast (Magic: The Gathering), Disney, or Ravensburger
            (Lorcana). All third-party trademarks belong to their respective
            owners.
          </p>
        </LegalSection>

        <LegalSection n="03" title="Your account">
          <p>
            You can browse the Site without an account. Some features —
            wishlist, order history, magic-link sign-in — require one.
          </p>
          <LegalList
            items={[
              "Provide accurate information when signing up",
              "Keep your sign-in details confidential — you're responsible for activity under your account",
              "Tell us promptly if you suspect unauthorised access",
              "Don't share, sell, or transfer your account",
            ]}
          />
        </LegalSection>

        <LegalSection n="04" title="Orders &amp; pricing">
          <p>
            Prices are shown in Australian Dollars (AUD) and include GST where
            applicable. Shipping is shown at checkout.
          </p>
          <p>
            Placing an order is an offer to buy a kit. We may accept or
            decline that offer — common reasons we decline include incorrect
            pricing on the Site, unavailable stock, or a suspected fraudulent
            order. If we decline, we won&apos;t charge you.
          </p>
          <p>
            Once we accept your order we&apos;ll send you a confirmation
            email. Acceptance is when we say so — not when you click
            &quot;Place order&quot;.
          </p>
        </LegalSection>

        <LegalSection n="05" title="What you get">
          <p>
            <strong>Slab kits include the printed surround and the
            slab case only.</strong> Your trading card is{" "}
            <strong>not included</strong> — you supply it from your own
            collection.
          </p>
          <p>
            Slab kits are display products. They are not grading, authentication,
            or condition-assessment services. We do not value or authenticate
            cards.
          </p>
        </LegalSection>

        <LegalSection n="06" title="Shipping">
          <p>
            We ship within Australia only. See our{" "}
            <Link
              href="/shipping"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              Shipping page
            </Link>{" "}
            for current rates and delivery times.
          </p>
          <p>
            Risk of loss and title transfer when we hand the parcel to the
            courier. Once the parcel is in transit any claims related to
            damage or loss are handled through the courier&apos;s process.
          </p>
        </LegalSection>

        <LegalSection n="07" title="Returns &amp; refunds">
          <p>
            Slab kits are{" "}
            <strong>custom-printed to order and final sale</strong>. We
            don&apos;t accept change-of-mind returns. See our full{" "}
            <Link
              href="/returns"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              Returns Policy
            </Link>{" "}
            for what we do cover (defects, courier damage, wrong item shipped)
            and how to claim.
          </p>
          <p>
            Nothing in these Terms limits your rights under the Australian
            Consumer Law.
          </p>
        </LegalSection>

        <LegalSection n="08" title="Intellectual property">
          <p>
            All Site content — design, code, illustrations, photography,
            copywriting, the Slablabs brand mark — is owned by Slablabs or
            licensed to us. Don&apos;t copy, reproduce, or use it without
            written permission.
          </p>
          <p>
            Slab surround artwork is custom-designed by Slablabs to extend the
            artwork of specific trading cards. Card names and set names are
            used for identification only and are the property of their
            respective trademark holders.
          </p>
        </LegalSection>

        <LegalSection n="09" title="Acceptable use">
          <p>You agree not to:</p>
          <LegalList
            items={[
              "Use the Site to do anything illegal, harmful, or fraudulent",
              "Scrape, mirror, or otherwise harvest content at scale",
              "Reverse-engineer or attempt to extract source code",
              "Use Slablabs branding, the octagonal mark, or our artwork in your own products without written permission",
              "Resell Slablabs kits commercially without prior agreement",
            ]}
          />
        </LegalSection>

        <LegalSection n="10" title="Disclaimers">
          <p>
            The Site is provided &quot;as is&quot;. We don&apos;t guarantee
            uninterrupted availability, accuracy of every piece of content, or
            compatibility with every device.
          </p>
          <p>
            Photography and renders may differ slightly from the physical
            product. Print colours may vary based on the underlying card
            artwork and the optical-grade PET surface.
          </p>
        </LegalSection>

        <LegalSection n="11" title="Limitation of liability">
          <p>
            To the extent permitted by law, Slablabs is not liable for
            indirect, incidental, or consequential loss arising from use of
            the Site or our products. Where liability cannot be excluded, our
            total liability is limited to the price paid for the kit in
            question.
          </p>
        </LegalSection>

        <LegalSection n="12" title="Changes to these terms">
          <p>
            We may update these Terms occasionally. The current version with
            its last-updated date will always live at this URL. Material
            changes will be flagged in our newsletter or on the Site for at
            least 14 days before they take effect.
          </p>
        </LegalSection>

        <LegalSection n="13" title="Governing law">
          <p>
            These Terms are governed by the laws of Victoria, Australia. Any
            disputes will be handled in Victorian courts unless required
            otherwise by Australian Consumer Law.
          </p>
        </LegalSection>

        <LegalSection n="14" title="Contact">
          <p>
            Questions about these Terms?{" "}
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
