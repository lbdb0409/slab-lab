import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

import {
  AdminCard,
  AdminCardHeader,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { StatCard } from "@/components/admin/stat-card";
import { StatusPill } from "@/components/admin/status-pill";
import {
  getCustomerById,
  getCustomerOrders,
} from "@/lib/customers";
import { formatCents, formatDate, formatRelative } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export default async function AdminCustomerDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = await getCustomerById(id);
  if (!customer) notFound();

  const orders = await getCustomerOrders(customer.id);
  const totalSpent = orders.reduce((s, o) => s + o.totalCents, 0);
  const firstOrder = orders.length
    ? orders[orders.length - 1]?.createdAt
    : null;
  const lastOrder = orders[0]?.createdAt ?? null;
  const aov =
    orders.length > 0 ? Math.round(totalSpent / orders.length) : 0;

  return (
    <>
      <AdminPageHeader
        eyebrow="Customer"
        title={customer.name}
        crumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/customers", label: "Customers" },
          { label: customer.name },
        ]}
        actions={
          <>
            <Link
              href="/admin/customers"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text hover:border-text"
            >
              <ArrowLeft className="size-3.5" strokeWidth={2.6} />
              Back
            </Link>
            <a
              href={`mailto:${customer.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange"
            >
              <Mail className="size-3.5" strokeWidth={2.6} />
              Email
            </a>
          </>
        }
      />

      <AdminContent className="flex flex-col gap-6">
        <AdminCard className="flex flex-wrap items-start gap-5 p-5">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-orange/15 font-display text-2xl text-orange">
            {customer.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 className="font-display text-2xl uppercase leading-none tracking-tight">
              {customer.name}
            </h2>
            <a
              href={`mailto:${customer.email}`}
              className="inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-orange"
            >
              <Mail className="size-3.5" strokeWidth={2.4} />
              {customer.email}
            </a>
            {(customer.city || customer.state) && (
              <span className="inline-flex items-center gap-1.5 text-sm text-text-soft">
                <MapPin className="size-3.5" strokeWidth={2.4} />
                {customer.city ?? "—"}
                {customer.state ? `, ${customer.state}` : ""}, Australia
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Customer since
            </span>
            <span className="font-display text-lg">
              {firstOrder ? formatDate(firstOrder) : "—"}
            </span>
            {lastOrder && (
              <span className="text-xs text-muted">
                Last order {formatRelative(lastOrder)}
              </span>
            )}
          </div>
        </AdminCard>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Orders"
            value={String(orders.length)}
            Icon={ShoppingBag}
            accent="cyan"
          />
          <StatCard
            label="Lifetime spend"
            value={formatCents(totalSpent)}
            Icon={TrendingUp}
            accent="orange"
          />
          <StatCard
            label="AOV"
            value={formatCents(aov)}
            Icon={Package}
            accent="magenta"
          />
          <StatCard
            label="First order"
            value={firstOrder ? formatRelative(firstOrder) : "—"}
            Icon={ShoppingBag}
            accent="purple"
          />
        </div>

        <AdminCard>
          <AdminCardHeader title={`Orders · ${orders.length}`} />
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-bg-soft text-muted">
                <ShoppingBag className="size-5" strokeWidth={2.2} />
              </span>
              <p className="font-display text-lg uppercase">No orders yet</p>
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
                  {orders.map((order) => {
                    const itemCount = order.items.reduce(
                      (s, i) => s + i.quantity,
                      0,
                    );
                    return (
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
                        <td className="px-5 py-3 text-text-soft">
                          {itemCount} kit{itemCount === 1 ? "" : "s"}
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </AdminContent>
    </>
  );
}
