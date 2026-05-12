import Link from "next/link";
import { Search, Users } from "lucide-react";

import {
  AdminCard,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { getAllCustomers } from "@/lib/customers";
import { formatCents, formatRelative } from "@/lib/format";

export default async function AdminCustomersPage() {
  const customers = await getAllCustomers();

  return (
    <>
      <AdminPageHeader
        eyebrow="People"
        title="Customers"
        body={`${customers.length} unique buyer${customers.length === 1 ? "" : "s"}`}
      />

      <AdminContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-line bg-white p-3">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-bg-soft px-3 py-1.5">
            <Search className="size-4 text-muted" strokeWidth={2.4} />
            <input
              type="search"
              placeholder="Search by name or email…"
              className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>

        <AdminCard className="overflow-hidden">
          {customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-bg-soft text-muted">
                <Users className="size-6" strokeWidth={2.2} />
              </span>
              <h2 className="font-display text-2xl uppercase">
                No customers yet
              </h2>
              <p className="max-w-sm text-sm text-muted">
                Customers appear here once they place their first order via
                Stripe Checkout.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-bg-soft text-left">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Customer
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Location
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Orders
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Lifetime spend
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Last order
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-line transition-colors last:border-b-0 hover:bg-bg-soft"
                    >
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/customers/${c.id}`}
                          className="flex items-center gap-3 hover:text-orange"
                        >
                          <span className="inline-flex size-9 items-center justify-center rounded-full bg-orange/15 font-display text-sm text-orange">
                            {c.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-bold">{c.name}</span>
                            <span className="text-xs text-muted">
                              {c.email}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-text-soft">
                        {c.city ?? "—"}
                        {c.state ? `, ${c.state}` : ""}
                      </td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums">
                        {c.orderCount}
                      </td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums">
                        {formatCents(c.totalSpentCents)}
                      </td>
                      <td className="px-5 py-3 text-right text-xs text-muted">
                        {c.lastOrderAt ? formatRelative(c.lastOrderAt) : "—"}
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
