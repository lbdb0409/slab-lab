import { MapPin, Plus } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { AccountShell } from "@/components/account/account-shell";

const PLACEHOLDER_NAME = "Trainer";
const PLACEHOLDER_EMAIL = "you@trainer.com";

export default function AccountAddressesPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/account", label: "Account" },
          { href: "/account/addresses", label: "Addresses" },
        ]}
        eyebrow="Shipping addresses"
        EyebrowIcon={MapPin}
        eyebrowColor="cyan"
        title={
          <>
            Saved <span className="text-cyan-deep">addresses.</span>
          </>
        }
        body="Reuse these at checkout. The primary address is used by default."
        bg="sky"
      />

      <Container className="py-10 md:py-14">
        <AccountShell name={PLACEHOLDER_NAME} email={PLACEHOLDER_EMAIL}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-line-strong bg-white px-6 py-16 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-cyan/15 text-cyan-deep">
                <MapPin className="size-6" strokeWidth={2.2} />
              </span>
              <p className="font-display text-2xl uppercase leading-none">
                No addresses saved
              </p>
              <p className="max-w-sm text-sm text-muted">
                Save shipping addresses to reuse them at checkout. Sign in
                first. Addresses are tied to your account.
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-2 rounded-md border border-line bg-bg-soft px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted max-md:min-h-11"
                disabled
              >
                <Plus className="size-3.5" strokeWidth={2.6} />
                Add address (sign in required)
              </button>
            </div>
          </div>
        </AccountShell>
      </Container>
    </>
  );
}
