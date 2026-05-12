import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

import {
  AdminCard,
  AdminCardHeader,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { StatCard } from "@/components/admin/stat-card";
import { BarChart } from "@/components/admin/bar-chart";
import { formatCents } from "@/lib/format";
import {
  getDailyRevenue,
  getDashboardStats,
  getRevenueBySet,
  getTopProducts,
} from "@/lib/analytics";
import { getAllOrders, getOrderStatusCounts } from "@/lib/orders";
import { countCustomers } from "@/lib/customers";

export default async function AdminAnalyticsPage() {
  const [stats, daily, topProducts, statusCounts, allOrders, setRevenue, customerCount] =
    await Promise.all([
      getDashboardStats(),
      getDailyRevenue(30),
      getTopProducts(9),
      getOrderStatusCounts(),
      getAllOrders(),
      getRevenueBySet(),
      countCustomers(),
    ]);

  const revenueChart = daily.map((value, i) => {
    const date = new Date(Date.now() - (29 - i) * 86400000);
    return {
      label: date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
      }),
      value: Math.round(value / 100),
    };
  });

  const dailyOrders = Array.from({ length: 30 }, (_, i) => {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);
    dayStart.setDate(dayStart.getDate() - (29 - i));
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const dayCount = allOrders.filter((o) => {
      const t = o.createdAt.getTime();
      return t >= dayStart.getTime() && t < dayEnd.getTime();
    }).length;
    return {
      label: dayStart.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
      }),
      value: dayCount,
    };
  });

  const totalUnits = allOrders.reduce(
    (s, o) => s + o.items.reduce((ss, i) => ss + i.quantity, 0),
    0,
  );
  const maxSetRev = Math.max(1, ...setRevenue.map((s) => s.revenueCents));

  const empty = allOrders.length === 0;

  return (
    <>
      <AdminPageHeader
        eyebrow="Reports"
        title="Analytics"
        body={
          empty
            ? "No orders yet. Charts and rankings will populate once Stripe Checkout starts taking real orders."
            : "Sales, units, and customer trends across the last 30–90 days."
        }
      />

      <AdminContent className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Total revenue · 90d"
            value={formatCents(stats.revenueCents)}
            Icon={DollarSign}
            accent="orange"
            sub={empty ? "awaiting first order" : "completed orders only"}
          />
          <StatCard
            label="Units sold"
            value={String(totalUnits)}
            Icon={Package}
            accent="cyan"
            sub="across all kits"
          />
          <StatCard
            label="AOV"
            value={formatCents(stats.aovCents)}
            Icon={ShoppingBag}
            accent="magenta"
            sub={empty ? "–" : `across ${stats.orderCount} orders`}
          />
          <StatCard
            label="Customers"
            value={String(customerCount)}
            Icon={Users}
            accent="purple"
            sub={empty ? "–" : "unique buyers"}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminCard>
            <AdminCardHeader title="Revenue · daily · last 30d" />
            <div className="p-5">
              {empty ? (
                <EmptyChart label="Revenue" />
              ) : (
                <BarChart data={revenueChart} prefix="$" height={220} />
              )}
            </div>
          </AdminCard>
          <AdminCard>
            <AdminCardHeader title="Orders · daily · last 30d" />
            <div className="p-5">
              {empty ? (
                <EmptyChart label="Orders" />
              ) : (
                <BarChart data={dailyOrders} height={220} />
              )}
            </div>
          </AdminCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <AdminCard>
            <AdminCardHeader title="Top products · units sold · 90d" />
            {topProducts.length === 0 ? (
              <EmptyState message="No product sales yet. Once orders flow in, top sellers rank here." />
            ) : (
              <ul className="flex flex-col">
                {topProducts.map((p, i) => {
                  const maxQty = topProducts[0]?.quantity ?? 1;
                  const pct = (p.quantity / maxQty) * 100;
                  return (
                    <li
                      key={p.slug}
                      className="border-b border-line px-5 py-4 last:border-b-0"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-orange/10 text-xs font-bold text-orange">
                            {i + 1}
                          </span>
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate text-sm font-bold">
                              {p.card}
                            </span>
                            <span className="text-xs text-muted">{p.set}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="font-display text-base tabular-nums">
                            {p.quantity}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                            {formatCents(p.revenueCents)}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-line/40">
                        <div
                          className="h-full rounded-full bg-orange"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </AdminCard>

          <div className="flex flex-col gap-6">
            <AdminCard>
              <AdminCardHeader title="Revenue by set" />
              {setRevenue.length === 0 ? (
                <EmptyState message="Set revenue appears here as orders land." />
              ) : (
                <ul className="flex flex-col gap-4 p-5">
                  {setRevenue.map((s, i) => {
                    const pct = (s.revenueCents / maxSetRev) * 100;
                    const color = ["bg-magenta", "bg-cyan", "bg-purple"][i % 3];
                    return (
                      <li key={s.slug}>
                        <div className="mb-1.5 flex items-baseline justify-between">
                          <span className="text-sm font-bold">{s.name}</span>
                          <span className="font-mono text-xs tabular-nums">
                            {formatCents(s.revenueCents)}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-line/40">
                          <div
                            className={"h-full rounded-full " + color}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AdminCard>

            <AdminCard>
              <AdminCardHeader title="Order status mix" />
              <ul className="flex flex-col gap-3 p-5">
                {(
                  [
                    ["delivered", "Delivered", "bg-success"],
                    ["shipped", "Shipped", "bg-purple"],
                    ["paid", "Paid", "bg-cyan"],
                    ["pending", "Pending", "bg-yellow-deep"],
                    ["refunded", "Refunded", "bg-magenta"],
                    ["cancelled", "Cancelled", "bg-line-strong"],
                  ] as const
                ).map(([key, label, color]) => {
                  const count = statusCounts[key];
                  const pct = (count / Math.max(1, allOrders.length)) * 100;
                  return (
                    <li key={key}>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {label}
                        </span>
                        <span className="text-xs tabular-nums text-muted">
                          {count} · {pct.toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-line/40">
                        <div
                          className={"h-full rounded-full " + color}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </AdminCard>
          </div>
        </div>
      </AdminContent>
    </>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-[220px] flex-col items-center justify-center gap-2 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-bg-soft text-muted">
        <DollarSign className="size-5" strokeWidth={2.2} />
      </span>
      <p className="font-display text-lg uppercase">{label} chart waits</p>
      <p className="max-w-xs text-xs text-muted">
        Fills in once orders start landing.
      </p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-bg-soft text-muted">
        <Package className="size-5" strokeWidth={2.2} />
      </span>
      <p className="max-w-xs text-xs text-muted">{message}</p>
    </div>
  );
}
