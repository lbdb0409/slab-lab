import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Trash2 } from "lucide-react";

import {
  AdminCard,
  AdminCardHeader,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { getCardRequestById, type CardRequestStatus } from "@/lib/card-requests";
import {
  deleteCardRequest,
  saveCardRequestNotes,
  updateCardRequestStatus,
} from "@/lib/actions/request-card";
import { formatDate, formatRelative } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

const STATUS_OPTIONS: { value: CardRequestStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "contacted", label: "Contacted" },
  { value: "produced", label: "Produced" },
  { value: "declined", label: "Declined" },
];

export default async function AdminRequestDetailPage({ params }: Props) {
  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId) || requestId <= 0) notFound();

  const request = await getCardRequestById(requestId);
  if (!request) notFound();

  return (
    <>
      <AdminPageHeader
        eyebrow={`Received ${formatRelative(request.createdAt)}`}
        title={request.card}
        body={request.setName ? `${request.setName} · ${request.email}` : request.email}
        crumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/requests", label: "Requests" },
          { label: request.card },
        ]}
        actions={
          <>
            <Link
              href="/admin/requests"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text hover:border-text"
            >
              <ArrowLeft className="size-3.5" strokeWidth={2.6} />
              Back
            </Link>
            <a
              href={`mailto:${request.email}?subject=Re%3A%20your%20Slablabs%20request%20for%20${encodeURIComponent(request.card)}`}
              className="inline-flex items-center gap-2 rounded-md bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange"
            >
              <Mail className="size-3.5" strokeWidth={2.6} />
              Reply
            </a>
          </>
        }
      />

      <AdminContent className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <AdminCard>
            <AdminCardHeader title="Request" />
            <div className="flex flex-col gap-4 p-5 text-sm">
              <FieldRow label="Card">
                <span className="font-bold">{request.card}</span>
              </FieldRow>
              <FieldRow label="Set / expansion">
                {request.setName ?? <span className="text-muted">Not specified</span>}
              </FieldRow>
              <FieldRow label="From">
                <a
                  href={`mailto:${request.email}`}
                  className="text-text hover:text-orange"
                >
                  {request.email}
                </a>
              </FieldRow>
              <FieldRow label="Received">
                {formatDate(request.createdAt)}
              </FieldRow>
              <FieldRow label="Customer notes">
                {request.notes ? (
                  <p className="whitespace-pre-wrap text-text-soft">
                    {request.notes}
                  </p>
                ) : (
                  <span className="text-muted">No notes</span>
                )}
              </FieldRow>
            </div>
          </AdminCard>

          <AdminCard>
            <AdminCardHeader title="Internal notes" />
            <form action={saveCardRequestNotes} className="flex flex-col gap-3 p-5">
              <input type="hidden" name="id" value={request.id} />
              <textarea
                name="internalNotes"
                rows={5}
                defaultValue={request.internalNotes ?? ""}
                placeholder="Sourcing notes, manufacturing decisions, communication log…"
                className="rounded-md border border-line bg-white px-3 py-2.5 text-sm placeholder:text-muted focus:border-text focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex w-fit items-center gap-2 rounded-md bg-text px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-orange"
              >
                Save notes
              </button>
            </form>
          </AdminCard>
        </div>

        <div className="flex flex-col gap-6">
          <AdminCard>
            <AdminCardHeader title="Status" />
            <form
              action={updateCardRequestStatus}
              className="flex flex-col gap-3 p-5"
            >
              <input type="hidden" name="id" value={request.id} />
              <select
                name="status"
                defaultValue={request.status}
                className="rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-text focus:outline-none"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-orange px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-deep"
              >
                Update status
              </button>
              <p className="text-[10px] text-muted">
                Last updated {formatRelative(request.updatedAt)}
              </p>
            </form>
          </AdminCard>

          <AdminCard className="border-danger/30">
            <AdminCardHeader title="Danger zone" />
            <form action={deleteCardRequest} className="flex flex-col gap-3 p-5">
              <input type="hidden" name="id" value={request.id} />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-danger bg-danger px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-danger/90"
              >
                <Trash2 className="size-3.5" strokeWidth={2.6} />
                Delete request
              </button>
              <p className="text-xs text-muted">
                Removes this request permanently from the database. The
                original notification email still lives in your inbox.
              </p>
            </form>
          </AdminCard>
        </div>
      </AdminContent>
    </>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-baseline gap-3">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}
