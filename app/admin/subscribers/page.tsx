import Link from "next/link";
import { Download, Mail, Users } from "lucide-react";

import {
  AdminCard,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { getAllSubscribers } from "@/lib/subscribers";
import { formatDate, formatRelative } from "@/lib/format";

export default async function AdminSubscribersPage() {
  const subscribers = await getAllSubscribers();

  return (
    <>
      <AdminPageHeader
        eyebrow="Launch list"
        title="Subscribers"
        body={`${subscribers.length} ${subscribers.length === 1 ? "person" : "people"} waiting for launch.`}
        actions={
          subscribers.length > 0 ? (
            <a
              href="/admin/subscribers/export"
              download
              className="inline-flex items-center gap-2 rounded-md bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange"
            >
              <Download className="size-3.5" strokeWidth={2.6} />
              Export CSV
            </a>
          ) : null
        }
      />

      <AdminContent className="flex flex-col gap-4">
        <AdminCard className="overflow-hidden">
          {subscribers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-bg-soft text-muted">
                <Users className="size-6" strokeWidth={2.2} />
              </span>
              <h2 className="font-display text-2xl uppercase">
                No subscribers yet
              </h2>
              <p className="max-w-sm text-sm text-muted">
                Once someone drops their email on the{" "}
                <Link
                  href="/coming-soon"
                  target="_blank"
                  className="font-bold text-text hover:text-orange"
                >
                  coming-soon page
                </Link>
                , they appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-bg-soft text-left">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Email
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Signed up
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Exact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-line transition-colors last:border-b-0 hover:bg-bg-soft"
                    >
                      <td className="px-5 py-3">
                        <a
                          href={`mailto:${sub.email}`}
                          className="inline-flex items-center gap-2 font-medium hover:text-orange"
                        >
                          <Mail
                            className="size-3.5 text-muted"
                            strokeWidth={2.4}
                          />
                          {sub.email}
                        </a>
                      </td>
                      <td className="px-5 py-3 text-right text-xs text-muted">
                        {formatRelative(sub.createdAt)}
                      </td>
                      <td className="px-5 py-3 text-right text-xs tabular-nums text-muted">
                        {formatDate(sub.createdAt)}
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
