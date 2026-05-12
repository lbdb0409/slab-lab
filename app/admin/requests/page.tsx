import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";

import {
  AdminCard,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import {
  getAllCardRequests,
  getCardRequestStatusCounts,
  type CardRequestStatus,
} from "@/lib/card-requests";
import { formatRelative } from "@/lib/format";

type Props = { searchParams: Promise<{ status?: string }> };

const STATUS_LABEL: Record<CardRequestStatus, string> = {
  open: "Open",
  contacted: "Contacted",
  produced: "Produced",
  declined: "Declined",
};

const STATUS_PILL: Record<CardRequestStatus, string> = {
  open: "border-orange/40 bg-orange/10 text-orange",
  contacted: "border-cyan/40 bg-cyan/10 text-cyan-deep",
  produced: "border-success/40 bg-success/10 text-success",
  declined: "border-line-strong bg-line/30 text-muted",
};

export default async function AdminRequestsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filter = params.status as CardRequestStatus | undefined;

  const [requests, counts] = await Promise.all([
    getAllCardRequests(),
    getCardRequestStatusCounts(),
  ]);

  const filtered = filter ? requests.filter((r) => r.status === filter) : requests;

  const filters: { value?: CardRequestStatus; label: string; count: number }[] =
    [
      { label: "All", count: requests.length },
      { value: "open", label: "Open", count: counts.open },
      { value: "contacted", label: "Contacted", count: counts.contacted },
      { value: "produced", label: "Produced", count: counts.produced },
      { value: "declined", label: "Declined", count: counts.declined },
    ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Inbox"
        title="Card requests"
        body={`${filtered.length} of ${requests.length} requests shown`}
      />

      <AdminContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = (filter ?? "") === (f.value ?? "");
            const href = f.value
              ? `/admin/requests?status=${f.value}`
              : "/admin/requests";
            return (
              <Link
                key={f.label}
                href={href}
                className={
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors " +
                  (active
                    ? "border-text bg-text text-white"
                    : "border-line bg-white text-text hover:border-text")
                }
              >
                {f.label}
                <span
                  className={
                    "rounded-full px-1.5 py-0.5 text-[9px] tabular-nums " +
                    (active ? "bg-white/20" : "bg-line/40")
                  }
                >
                  {f.count}
                </span>
              </Link>
            );
          })}
        </div>

        <AdminCard className="overflow-hidden">
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-bg-soft text-muted">
                <MessageSquare className="size-6" strokeWidth={2.2} />
              </span>
              <h2 className="font-display text-2xl uppercase">
                No requests yet
              </h2>
              <p className="max-w-sm text-sm text-muted">
                When someone submits the &ldquo;Request a slab&rdquo; form on
                the home page, their request appears here.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <h2 className="font-display text-2xl uppercase">
                Nothing matches this filter
              </h2>
              <Link
                href="/admin/requests"
                className="text-[11px] font-bold uppercase tracking-wider text-orange hover:underline"
              >
                Show all
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-bg-soft text-left">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Card
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      From
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Received
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-line transition-colors last:border-b-0 hover:bg-bg-soft"
                    >
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/requests/${r.id}`}
                          className="block hover:text-orange"
                        >
                          <p className="font-bold">{r.card}</p>
                          {r.setName && (
                            <p className="text-xs text-muted">{r.setName}</p>
                          )}
                        </Link>
                      </td>
                      <td className="px-5 py-3">
                        <a
                          href={`mailto:${r.email}`}
                          className="inline-flex items-center gap-1.5 text-sm hover:text-orange"
                        >
                          <Mail className="size-3 text-muted" strokeWidth={2.4} />
                          {r.email}
                        </a>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider " +
                            STATUS_PILL[r.status]
                          }
                        >
                          {STATUS_LABEL[r.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right text-xs text-muted">
                        {formatRelative(r.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </AdminContent>
    </>
  );
}
