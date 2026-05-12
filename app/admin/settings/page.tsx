import { AlertTriangle, ExternalLink } from "lucide-react";

import {
  AdminCard,
  AdminCardHeader,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";

type EnvRow = {
  key: string;
  value?: string;
  hint: string;
  redact?: boolean;
};

function row(
  key: string,
  hint: string,
  opts: { redact?: boolean; fallback?: string } = {},
): EnvRow {
  const raw = process.env[key];
  const value = raw ?? opts.fallback;
  return { key, value, hint, redact: opts.redact };
}

function display(row: EnvRow): string {
  if (row.value == null || row.value === "") return "— not set —";
  if (row.redact) {
    const v = row.value;
    if (v.length <= 8) return "•".repeat(v.length);
    return `${v.slice(0, 4)}…${v.slice(-4)}`;
  }
  return row.value;
}

export default function AdminSettingsPage() {
  const store: EnvRow[] = [
    row("LAUNCH_NOTIFY", "Address that receives system notifications", {
      fallback: "slablabsoz@gmail.com",
    }),
    row("LAUNCH_FROM", "FROM address for transactional email", {
      fallback: "Slablabs <onboarding@resend.dev>",
    }),
    row("NEXT_PUBLIC_SITE_URL", "Public site origin used in emails / links"),
    row("COMING_SOON", `Set to "0" to open the full site to the public`, {
      fallback: "1 (gate ON by default)",
    }),
  ];

  const auth: EnvRow[] = [
    row("ADMIN_PASSWORD", "Admin login password", { redact: true }),
    row("ADMIN_SECRET", "Secret used to sign admin session cookies", {
      redact: true,
    }),
    row("COMING_SOON_PASSWORD", "Staff bypass on /coming-soon", {
      redact: true,
    }),
  ];

  const integrations: EnvRow[] = [
    row("DATABASE_URL", "Supabase Postgres connection (transaction pooler)", {
      redact: true,
    }),
    row("RESEND_API_KEY", "Resend API key for transactional email", {
      redact: true,
    }),
  ];

  const shipping: { id: string; label: string; configured: boolean }[] = [
    { id: "auspost", label: "Australia Post", configured: !!process.env.AUSPOST_API_KEY },
    {
      id: "couriers-please",
      label: "Couriers Please",
      configured: !!process.env.COURIERS_PLEASE_API_KEY,
    },
    { id: "fedex", label: "FedEx", configured: !!process.env.FEDEX_CLIENT_ID },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Configuration"
        title="Settings"
        body="Read-only view of the current environment. Edit these in your Vercel project to change them."
      />

      <AdminContent className="flex flex-col gap-6">
        <div className="flex items-start gap-3 rounded-md border-2 border-yellow-deep/40 bg-yellow/10 p-4 text-sm text-text">
          <AlertTriangle
            className="mt-0.5 size-4 shrink-0 text-yellow-deep"
            strokeWidth={2.6}
          />
          <div className="flex flex-col gap-1">
            <p className="font-bold">All settings live in environment variables.</p>
            <p className="text-text-soft">
              Change them in your{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-text underline-offset-4 hover:text-orange hover:underline"
              >
                Vercel project settings
                <ExternalLink className="size-3" strokeWidth={2.4} />
              </a>
              {" "}→ Environment Variables, then redeploy. A real settings UI
              (with form-based persistence) comes later — not worth half-baking
              it now.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Store">
            {store.map((r) => (
              <Row key={r.key} row={r} />
            ))}
          </Section>

          <Section title="Auth &amp; secrets">
            {auth.map((r) => (
              <Row key={r.key} row={r} />
            ))}
          </Section>

          <Section title="Integrations">
            {integrations.map((r) => (
              <Row key={r.key} row={r} />
            ))}
          </Section>

          <AdminCard>
            <AdminCardHeader title="Shipping carriers" />
            <ul className="flex flex-col">
              {shipping.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between border-b border-line px-5 py-3 last:border-b-0"
                >
                  <span className="text-sm font-bold">{s.label}</span>
                  <span
                    className={
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider " +
                      (s.configured
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-line-strong bg-line/30 text-muted")
                    }
                  >
                    <span
                      className={
                        "inline-block size-1.5 rounded-full " +
                        (s.configured ? "bg-success" : "bg-line-strong")
                      }
                    />
                    {s.configured ? "Live" : "Manual entry"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="border-t border-line bg-bg-soft px-5 py-3 text-xs text-muted">
              Set the relevant API key env vars (see{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono">
                lib/shipping/&lt;carrier&gt;.ts
              </code>
              ) to switch a carrier from manual tracking-entry mode to real
              label generation.
            </p>
          </AdminCard>
        </div>
      </AdminContent>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AdminCard>
      <AdminCardHeader title={title} />
      <ul className="flex flex-col">{children}</ul>
    </AdminCard>
  );
}

function Row({ row }: { row: EnvRow }) {
  const isSet = row.value != null && row.value !== "";
  return (
    <li className="flex items-start justify-between gap-4 border-b border-line px-5 py-3 last:border-b-0">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-text">
          {row.key}
        </span>
        <span className="text-xs text-muted">{row.hint}</span>
      </div>
      <span
        className={
          "shrink-0 text-right font-mono text-xs " +
          (isSet ? "text-text" : "text-danger")
        }
      >
        {display(row)}
      </span>
    </li>
  );
}
