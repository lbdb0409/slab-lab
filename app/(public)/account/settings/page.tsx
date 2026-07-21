import { Bell, Settings, Trash2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { AccountShell } from "@/components/account/account-shell";

const PLACEHOLDER_NAME = "Trainer";
const PLACEHOLDER_EMAIL = "you@trainer.com";

export default function AccountSettingsPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/account", label: "Account" },
          { href: "/account/settings", label: "Settings" },
        ]}
        eyebrow="Account settings"
        EyebrowIcon={Settings}
        eyebrowColor="purple"
        title={
          <>
            Profile &amp; <span className="text-purple">preferences.</span>
          </>
        }
        body="Your details, your emails, your security."
        bg="lavender"
      />

      <Container className="py-10 md:py-14">
        <AccountShell name={PLACEHOLDER_NAME} email={PLACEHOLDER_EMAIL}>
          <div className="flex flex-col gap-5">
            <Section title="Profile">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Display name" defaultValue="" />
                <Field label="Email" defaultValue="" type="email" />
              </div>
              <Save />
            </Section>

            <Section title="Email notifications" Icon={Bell}>
              <Toggle
                label="Order updates"
                hint="Shipped, delivered, refunds"
                defaultChecked
              />
              <Toggle
                label="New drops"
                hint="When a queued kit goes live"
                defaultChecked
              />
              <Toggle
                label="Restocks"
                hint="When a sold-out kit is back"
              />
              <Toggle
                label="Build guides & tips"
                hint="Monthly, no fluff"
              />
            </Section>

            <Section title="Security">
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between rounded-md border border-line bg-bg-soft px-4 py-3 text-left hover:border-text">
                  <div>
                    <p className="text-sm font-bold">Magic-link sign-in</p>
                    <p className="text-xs text-muted">
                      We send a one-time link to your email
                    </p>
                  </div>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                    Active
                  </span>
                </button>
                <button className="flex items-center justify-between rounded-md border border-line bg-bg-soft px-4 py-3 text-left hover:border-text">
                  <div>
                    <p className="text-sm font-bold">Connected: Google</p>
                    <p className="text-xs text-muted">Not connected</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-text">
                    Connect →
                  </span>
                </button>
              </div>
            </Section>

            <Section title="Danger zone" danger>
              <button className="inline-flex items-center gap-2 rounded-md border border-danger/40 bg-danger/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-danger max-md:min-h-11 md:py-2 hover:bg-danger hover:text-white">
                <Trash2 className="size-3.5" strokeWidth={2.6} />
                Delete account
              </button>
              <p className="text-xs text-muted">
                Permanently deletes your profile, addresses, and wishlist. Past
                order records are retained for AU tax compliance.
              </p>
            </Section>
          </div>
        </AccountShell>
      </Container>
    </>
  );
}

function Section({
  title,
  children,
  Icon,
  danger,
}: {
  title: string;
  children: React.ReactNode;
  Icon?: typeof Bell;
  danger?: boolean;
}) {
  return (
    <section
      className={
        "border-2 bg-white p-5 md:p-6 " +
        (danger ? "border-danger/30" : "border-text")
      }
    >
      <h2 className="mb-4 flex items-center gap-2 font-display text-xl uppercase leading-none tracking-tight">
        {Icon && <Icon className="size-4" strokeWidth={2.4} />}
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="rounded-md border border-line bg-white px-3 py-3 text-base focus:border-text focus:outline-none md:py-2.5 md:text-sm"
      />
    </label>
  );
}

function Save() {
  return (
    <button className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-text px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange max-md:min-h-11 md:py-2">
      Save changes
    </button>
  );
}

function Toggle({
  label,
  hint,
  defaultChecked,
}: {
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-line bg-bg-soft px-4 py-3">
      <div>
        <p className="text-sm font-bold">{label}</p>
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-6 accent-orange md:size-5"
      />
    </label>
  );
}
