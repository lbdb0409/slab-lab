import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

import {
  AdminCard,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { StatusPill } from "@/components/admin/status-pill";
import { getAllOrders, getOrderStatusCounts } from "@/lib/orders";
import { formatCents, formatRelative } from "@/lib/format";
import type { OrderStatus } from "@/lib/schema";

type Props = { searchParams: Promise<{ status?: string; q?: string }> };

export default async function OrdersPage({ searchParams }: Props) {
  const params = await searchParams;
  const filterStatus = params.status as OrderStatus | undefined;
  const q = (params.q ?? "").trim().toLowerCase();

  const [allOrders, counts] = await Promise.all([
    getAllOrders(),
    getOrderStatusCounts(),
  ]);

  const filtered = allOrders.filter((o) => {
    if (filterStatus && o.status !== filterStatus) return false;
    if (q) {
      const haystack = [o.number, o.customerName, o.customerEmail]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const filters: { value?: OrderStatus; label: string; count: number }[] = [
    { label: "All", count: allOrders.length },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "paid", label: "Paid", count: counts.paid },
    { value: "shipped", label: "Shipped", count: counts.shipped },
    { value: "delivered", label: "Delivered", count: counts.delivered },
    { value: "refunded", label: "Refunded", count: counts.refunded },
    { value: "cancelled", label: "Cancelled", count: counts.cancelled },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Sales"
        title="Orders"
        body={`${filtered.length} of ${allOrders.length} orders shown`}
      />

      <AdminContent className="flex flex-col gap-4">
        <form
          method="get"
          className="flex flex-wrap items-center gap-3 rounded-md border border-line bg-white p-3"
        >
          {filterStatus && (
            <input type="hidden" name="status" value={filterStatus} />
          )}
          <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-bg-soft px-3 py-1.5">
            <Search className="size-4 text-muted" strokeWidth={2.4} />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by order #, customer, email…"
              className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-text px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-orange"
          >
            Search
          </button>
          {q && (
            <Link
              href={filterStatus ? `/admin/orders?status=${filterStatus}` : "/admin/orders"}
              className="text-[11px] font-bold uppercase tracking-wider text-muted hover:text-orange"
            >
              Clear
            </Link>
          )}
        </form>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = (filterStatus ?? "") === (f.value ?? "");
            const qs = new URLSearchParams();
            if (f.value) qs.set("status", f.value);
            if (q) qs.set("q", q);
            const href = qs.toString()
              ? `/admin/orders?${qs.toString()}`
              : "/admin/orders";
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
          {allOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-bg-soft text-muted">
                <ShoppingBag className="size-6" strokeWidth={2.2} />
              </span>
              <h2 className="font-display text-2xl uppercase">
                No orders yet
              </h2>
              <p className="max-w-sm text-sm text-muted">
                Orders appear here once Stripe Checkout is wired up. Until
                then this table waits empty.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <h2 className="font-display text-2xl uppercase">
                No orders match this filter
              </h2>
              <Link
                href="/admin/orders"
                className="text-[11px] font-bold uppercase tracking-wider text-orange hover:underline"
              >
                Show all orders
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-bg-soft text-left">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Order
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Customer
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Ships to
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Items
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Total
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Placed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-line transition-colors last:border-b-0 hover:bg-bg-soft"
                    >
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-bold text-text hover:text-orange"
                        >
                          {order.number}
                        </Link>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {order.customerName}
                          </span>
                          <span className="text-xs text-muted">
                            {order.customerEmail}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-text-soft">
                        {order.shippingCity ?? "–"}
                        {order.shippingState ? `, ${order.shippingState}` : ""}
                      </td>
                      <td className="px-5 py-3 text-text-soft">
                        {order.items.reduce((s, i) => s + i.quantity, 0)}
                      </td>
                      <td className="px-5 py-3">
                        <StatusPill status={order.status} />
                      </td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums">
                        {formatCents(order.totalCents)}
                      </td>
                      <td className="px-5 py-3 text-right text-xs text-muted">
                        {formatRelative(order.createdAt)}
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
