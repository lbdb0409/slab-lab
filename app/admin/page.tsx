import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

import {
  AdminCard,
  AdminCardHeader,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { StatCard } from "@/components/admin/stat-card";
import { StatusPill } from "@/components/admin/status-pill";
import { BarChart } from "@/components/admin/bar-chart";
import {
  getDailyRevenue,
  getDashboardStats,
  getTopProducts,
} from "@/lib/analytics";
import {
  countLiveProducts,
  getAllProductsAdmin,
} from "@/lib/products";
import { formatCents, formatRelative } from "@/lib/format";
import { getAllOrders, getOrderStatusCounts } from "@/lib/orders";

export default async function AdminDashboard() {
  const [stats, daily, topProducts, statusCounts, recentOrders, liveProducts, productCount] =
    await Promise.all([
      getDashboardStats(),
      getDailyRevenue(30),
      getTopProducts(5),
      getOrderStatusCounts(),
      getAllOrders(),
      countLiveProducts(),
      getAllProductsAdmin().then((p) => p.length),
    ]);

  const chartData = daily.map((value, i) => {
    const date = new Date(Date.now() - (29 - i) * 86400000);
    return {
      label: date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
      }),
      value: Math.round(value / 100),
    };
  });

  const recent = recentOrders.slice(0, 8);
  const noActivity = stats.orderCount === 0;

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        body={
          noActivity
            ? "No orders yet. KPIs and charts will populate once Stripe Checkout is wired up."
            : "Last 30 days of trading activity."
        }
        actions={
          <>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 rounded-md bg-text px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange"
            >
              <Package className="size-3.5" strokeWidth={2.6} />
              New product
            </Link>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text hover:border-text"
            >
              View orders
              <ArrowUpRight className="size-3.5" strokeWidth={2.6} />
            </Link>
          </>
        }
      />

      <AdminContent className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Revenue (30d)"
            value={formatCents(stats.revenueCents)}
            sub={noActivity ? "Awaiting first order" : "completed orders"}
            Icon={DollarSign}
            accent="orange"
          />
          <StatCard
            label="Orders"
            value={String(stats.orderCount)}
            sub={noActivity ? "Awaiting first order" : "completed"}
            Icon={ShoppingBag}
            accent="cyan"
          />
          <StatCard
            label="AOV"
            value={formatCents(stats.aovCents)}
            sub="avg order value"
            Icon={Package}
            accent="magenta"
          />
          <StatCard
            label="Customers"
            value={String(stats.customerCount)}
            sub={
              stats.customerCount === 0 ? "no signups yet" : "unique buyers"
            }
            Icon={Users}
            accent="purple"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <AdminCard>
            <AdminCardHeader
              title="Revenue · last 30 days"
              action={
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Hover for daily
                </span>
              }
            />
            <div className="p-5">
              {chartData.every((d) => d.value === 0) ? (
                <div className="flex h-[220px] flex-col items-center justify-center gap-2 text-center">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-bg-soft text-muted">
                    <DollarSign className="size-5" strokeWidth={2.2} />
                  </span>
                  <p className="font-display text-lg uppercase">
                    Chart fills in once orders land
                  </p>
                  <p className="max-w-xs text-xs text-muted">
                    Wire up Stripe Checkout and revenue will start showing
                    here, day by day.
                  </p>
                </div>
              ) : (
                <BarChart data={chartData} prefix="$" />
              )}
            </div>
          </AdminCard>

          <AdminCard>
            <AdminCardHeader
              title="Order status"
              action={
                <Link
                  href="/admin/orders"
                  className="text-[11px] font-bold uppercase tracking-wider text-text hover:text-orange"
                >
                  See all →
                </Link>
              }
            />
            <ul className="flex flex-col">
              {(
                [
                  ["pending", "Pending payment"],
                  ["paid", "Paid · ready to ship"],
                  ["shipped", "Shipped"],
                  ["delivered", "Delivered"],
                  ["refunded", "Refunded"],
                  ["cancelled", "Cancelled"],
                ] as const
              ).map(([key, label]) => (
                <li
                  key={key}
                  className="flex items-center justify-between border-b border-line px-5 py-3 last:border-b-0"
                >
                  <span className="flex items-center gap-2">
                    <StatusPill status={key} />
                    <span className="text-sm text-text-soft">{label}</span>
                  </span>
                  <span className="font-display text-lg tabular-nums">
                    {statusCounts[key]}
                  </span>
                </li>
              ))}
            </ul>
          </AdminCard>
        </div>

        <AdminCard>
          <AdminCardHeader
            title="Recent orders"
            action={
              <Link
                href="/admin/orders"
                className="text-[11px] font-bold uppercase tracking-wider text-text hover:text-orange"
              >
                View all →
              </Link>
            }
          />
          {recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-bg-soft text-muted">
                <ShoppingBag className="size-5" strokeWidth={2.2} />
              </span>
              <p className="font-display text-lg uppercase">No orders yet</p>
              <p className="max-w-xs text-xs text-muted">
                Once you wire Stripe, every paid order shows up here in real
                time.
              </p>
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
                      Items
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      Total
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted">
                      When
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((order) => (
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
                            {order.shippingCity ?? "–"}
                            {order.shippingState
                              ? `, ${order.shippingState}`
                              : ""}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} kit
                        {order.items.length === 1 ? "" : "s"}
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

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminCard>
            <AdminCardHeader title="Top products · 90 days" />
            {topProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-bg-soft text-muted">
                  <Package className="size-5" strokeWidth={2.2} />
                </span>
                <p className="font-display text-lg uppercase">
                  No product sales yet
                </p>
                <p className="max-w-xs text-xs text-muted">
                  Top sellers rank here once orders flow in.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col">
                {topProducts.map((p, i) => (
                  <li
                    key={p.slug}
                    className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 last:border-b-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-orange/10 text-xs font-bold text-orange">
                        {i + 1}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <Link
                          href={`/admin/products/${p.slug}`}
                          className="truncate text-sm font-bold hover:text-orange"
                        >
                          {p.card}
                        </Link>
                        <span className="text-xs text-muted">{p.set}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-display text-base tabular-nums">
                        {p.quantity} sold
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                        {formatCents(p.revenueCents)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>

          <AdminCard>
            <AdminCardHeader
              title="Catalog status"
              action={
                <Link
                  href="/admin/products"
                  className="text-[11px] font-bold uppercase tracking-wider text-text hover:text-orange"
                >
                  Manage →
                </Link>
              }
            />
            <div className="flex flex-col gap-3 p-5">
              <Link
                href="/admin/products?status=live"
                className="flex items-center justify-between rounded-md border border-line bg-bg-soft px-4 py-3 hover:border-orange"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-cyan/10 text-cyan-deep">
                    <Package className="size-4" strokeWidth={2.4} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Live products</p>
                    <p className="text-xs text-muted">
                      Available for purchase right now
                    </p>
                  </div>
                </div>
                <span className="font-display text-2xl tabular-nums">
                  {liveProducts}
                </span>
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center justify-between rounded-md border border-line bg-bg-soft px-4 py-3 hover:border-orange"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-purple/10 text-purple">
                    <Package className="size-4" strokeWidth={2.4} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Total products</p>
                    <p className="text-xs text-muted">
                      Including coming-soon kits
                    </p>
                  </div>
                </div>
                <span className="font-display text-2xl tabular-nums">
                  {productCount}
                </span>
              </Link>

              <Link
                href="/admin/products/new"
                className="flex items-center justify-between rounded-md border-2 border-dashed border-line-strong bg-white px-4 py-3 hover:border-text"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-orange/10 text-orange">
                    <AlertCircle className="size-4" strokeWidth={2.4} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Add a new product</p>
                    <p className="text-xs text-muted">
                      Goes live on the catalog instantly
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted" strokeWidth={2.4} />
              </Link>
            </div>
          </AdminCard>
        </div>
      </AdminContent>
    </>
  );
}
