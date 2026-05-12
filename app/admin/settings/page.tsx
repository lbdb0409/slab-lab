import {
  AdminCard,
  AdminCardHeader,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Configuration"
        title="Settings"
        body="Store-wide configuration. Most of this wires to your database once auth + DB are connected."
      />

      <AdminContent className="grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <AdminCardHeader title="Store details" />
          <div className="flex flex-col gap-4 p-5">
            <Field label="Store name" defaultValue="Slablabs" />
            <Field label="Support email" defaultValue="hello@slablabs.com.au" />
            <Field label="Phone" defaultValue="" placeholder="Optional" />
            <Field label="ABN" defaultValue="" placeholder="00 000 000 000" />
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Shipping" />
          <div className="flex flex-col gap-4 p-5">
            <Field
              label="Free shipping threshold (AUD)"
              defaultValue="99"
              mono
            />
            <Field
              label="Standard rate under threshold (AUD)"
              defaultValue="9.95"
              mono
            />
            <Field label="Express flat rate (AUD)" defaultValue="14.95" mono />
            <Toggle label="Ship internationally" />
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Payments" />
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-bg-soft px-3 py-3">
              <div>
                <p className="text-sm font-bold">Stripe</p>
                <p className="text-xs text-muted">Not connected yet</p>
              </div>
              <button className="rounded-md bg-text px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-orange">
                Connect
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-bg-soft px-3 py-3">
              <div>
                <p className="text-sm font-bold">Afterpay</p>
                <p className="text-xs text-muted">Available via Stripe</p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Via Stripe
              </span>
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Notifications" />
          <div className="flex flex-col gap-3 p-5">
            <Toggle label="Email me on every new order" defaultChecked />
            <Toggle label="Email me on refund requests" defaultChecked />
            <Toggle label="Daily sales digest" />
            <Toggle label="Low-stock alerts" defaultChecked />
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Brand &amp; site" />
          <div className="flex flex-col gap-4 p-5">
            <Field
              label="Site title"
              defaultValue="Slablabs — Encase the art."
            />
            <Field
              label="Meta description"
              defaultValue="Custom-printed display slabs for trading cards."
            />
            <Field
              label="Theme color"
              defaultValue="#FF6A00"
              mono
            />
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Team" />
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between rounded-md border border-line bg-bg-soft px-3 py-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-orange/15 font-display text-orange">
                  A
                </span>
                <div>
                  <p className="text-sm font-bold">Adam</p>
                  <p className="text-xs text-muted">
                    adam@eccohardware.com.au · Owner
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-success">
                Active
              </span>
            </div>
            <button className="rounded-md border border-dashed border-line-strong bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-text hover:border-text">
              + Invite teammate
            </button>
          </div>
        </AdminCard>
      </AdminContent>
    </>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
  mono,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={
          "rounded-md border border-line bg-white px-3 py-2 text-sm placeholder:text-muted focus:border-text focus:outline-none " +
          (mono ? "font-mono" : "")
        }
      />
    </label>
  );
}

function Toggle({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-line bg-bg-soft px-3 py-2.5">
      <span className="text-sm font-bold">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-5 accent-orange"
      />
    </label>
  );
}
