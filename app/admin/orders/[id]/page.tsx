import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Package,
  RefreshCw,
  Truck,
  XCircle,
} from "lucide-react";

import {
  AdminCard,
  AdminCardHeader,
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { StatusPill } from "@/components/admin/status-pill";
import { getOrderById } from "@/lib/orders";
import { formatCents, formatDate, formatRelative } from "@/lib/format";
import {
  markOrderCancelled,
  markOrderDelivered,
  markOrderRefunded,
  markOrderShipped,
  saveOrderNotes,
} from "@/lib/actions/orders";
import { CARRIERS, CARRIER_LABEL, type CarrierId } from "@/lib/shipping";

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
  const isShipped = order.status === "shipped" || order.status === "delivered";

  return (
    <>
      <AdminPageHeader
        eyebrow={`Placed ${formatRelative(order.createdAt)}`}
        title={order.number}
        body={`${itemCount} item${itemCount === 1 ? "" : "s"} · ${formatCents(order.totalCents)} · ${order.customer.name}`}
        crumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/orders", label: "Orders" },
          { label: order.number },
        ]}
        actions={
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text hover:border-text"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2.6} />
            Back
          </Link>
        }
      />

      <AdminContent className="flex flex-col gap-6">
        <AdminCard className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <StatusPill status={order.status} />
            <span className="text-sm text-muted">
              Placed {formatDate(order.createdAt)}
              {order.fulfilledAt && (
                <> · fulfilled {formatDate(order.fulfilledAt)}</>
              )}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {order.status === "shipped" && (
              <form action={markOrderDelivered}>
                <input type="hidden" name="orderId" value={order.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-success px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-success/90"
                >
                  <Check className="size-3.5" strokeWidth={2.6} />
                  Mark delivered
                </button>
              </form>
            )}
            {(order.status === "delivered" || order.status === "shipped") && (
              <form action={markOrderRefunded}>
                <input type="hidden" name="orderId" value={order.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md border border-magenta/30 bg-magenta/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-magenta hover:bg-magenta hover:text-white"
                >
                  <RefreshCw className="size-3.5" strokeWidth={2.6} />
                  Issue refund
                </button>
              </form>
            )}
            {(order.status === "pending" || order.status === "paid") && (
              <form action={markOrderCancelled}>
                <input type="hidden" name="orderId" value={order.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text hover:border-danger hover:text-danger"
                >
                  <XCircle className="size-3.5" strokeWidth={2.6} />
                  Cancel order
                </button>
              </form>
            )}
          </div>
        </AdminCard>

        {/* SHIPPING. Visible once order is paid */}
        {(order.status === "paid" ||
          order.status === "shipped" ||
          order.status === "delivered") && (
          <AdminCard>
            <AdminCardHeader title="Shipping" />
            {isShipped && order.trackingNumber ? (
              <div className="flex flex-col gap-3 p-5 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-success">
                    Shipped via{" "}
                    {CARRIER_LABEL[order.trackingCarrier as CarrierId] ??
                      order.trackingCarrier}
                  </span>
                  <span className="text-xs text-muted">
                    Fulfilled{" "}
                    {order.fulfilledAt
                      ? formatDate(order.fulfilledAt)
                      : "moments ago"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Tracking number
                  </span>
                  <span className="font-mono text-base">
                    {order.trackingNumber}
                  </span>
                </div>
                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-text hover:border-text"
                  >
                    <ExternalLink className="size-3" strokeWidth={2.4} />
                    Track on carrier site
                  </a>
                )}
                {order.labelUrl && (
                  <a
                    href={order.labelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-md border border-orange bg-orange/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange hover:bg-orange hover:text-white"
                  >
                    Print label
                  </a>
                )}
              </div>
            ) : (
              <form
                action={markOrderShipped}
                className="flex flex-col gap-4 p-5"
              >
                <input type="hidden" name="orderId" value={order.id} />
                <p className="text-xs text-muted">
                  Generate a label in your carrier portal, then enter the
                  tracking number below. The customer gets an email
                  automatically when you save.
                </p>
                <div className="grid gap-3 md:grid-cols-[200px_1fr]">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Carrier
                    </span>
                    <select
                      name="carrier"
                      required
                      defaultValue="auspost"
                      className="rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-text focus:outline-none"
                    >
                      {CARRIERS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                          {c.isLive ? "" : " (manual)"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Tracking number
                    </span>
                    <input
                      type="text"
                      name="trackingNumber"
                      required
                      placeholder="e.g. AP123456789AU"
                      className="rounded-md border border-line bg-white px-3 py-2 font-mono text-sm focus:border-text focus:outline-none"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-fit items-center gap-2 rounded-md bg-orange px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-deep"
                >
                  <Truck className="size-3.5" strokeWidth={2.6} />
                  Mark shipped &amp; email customer
                </button>
                <p className="text-[10px] text-muted">
                  Once your carrier API keys are configured (see
                  <code className="mx-1 rounded bg-bg-soft px-1 py-0.5 font-mono">lib/shipping/</code>
                  ), a "Generate label" button will replace this manual form.
                </p>
              </form>
            )}
          </AdminCard>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <AdminCard>
            <AdminCardHeader title="Items" />
            <ul className="flex flex-col">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md border border-line bg-tint">
                    <Image
                      src={item.product.imageUrl ?? "/brand/slab-mockup.png"}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <Link
                      href={`/admin/products/${item.product.slug}`}
                      className="font-bold hover:text-orange"
                    >
                      {item.product.card}
                    </Link>
                    <span className="text-xs text-muted">
                      {item.product.setName} · SL-{item.product.number}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-muted">
                    × {item.quantity}
                  </span>
                  <span className="w-20 text-right font-bold tabular-nums">
                    {formatCents(item.quantity * item.priceCents)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="flex flex-col gap-2 border-t border-line px-5 py-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular-nums">{formatCents(order.totalCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-success">Free AU</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="font-bold uppercase">Total</dt>
                <dd className="font-display text-xl tabular-nums">
                  {formatCents(order.totalCents)}
                </dd>
              </div>
            </dl>
          </AdminCard>

          <div className="flex flex-col gap-6">
            <AdminCard>
              <AdminCardHeader title="Customer" />
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-orange/15 font-display text-orange">
                    {order.customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <Link
                      href={`/admin/customers/${order.customer.id}`}
                      className="font-bold hover:text-orange"
                    >
                      {order.customer.name}
                    </Link>
                    <p className="flex items-center gap-1.5 text-xs text-muted">
                      <Mail className="size-3" strokeWidth={2.4} />
                      {order.customer.email}
                    </p>
                  </div>
                </div>
                <div className="rounded-md bg-bg-soft p-3 text-sm">
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                    <MapPin className="size-3" strokeWidth={2.4} />
                    Shipping address
                  </div>
                  <p>{order.customer.name}</p>
                  <p className="text-text-soft">
                    {order.shippingCity ?? "–"}
                    {order.shippingState ? `, ${order.shippingState}` : ""}
                  </p>
                  <p className="text-text-soft">Australia</p>
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <AdminCardHeader title="Timeline" />
              <ol className="flex flex-col gap-4 p-5">
                <TimelineItem
                  done
                  label="Order placed"
                  detail={formatDate(order.createdAt)}
                />
                <TimelineItem
                  done={order.status !== "pending"}
                  label="Payment received"
                  detail={
                    order.status === "pending"
                      ? "Awaiting payment"
                      : "Paid in full"
                  }
                />
                <TimelineItem
                  done={
                    order.status === "shipped" || order.status === "delivered"
                  }
                  label="Shipped"
                  detail={
                    order.fulfilledAt
                      ? formatDate(order.fulfilledAt)
                      : "Not yet"
                  }
                />
                <TimelineItem
                  done={order.status === "delivered"}
                  label="Delivered"
                  detail={
                    order.status === "delivered"
                      ? "Confirmed"
                      : "Pending"
                  }
                />
              </ol>
            </AdminCard>

            <AdminCard>
              <AdminCardHeader title="Internal notes" />
              <form action={saveOrderNotes} className="flex flex-col gap-3 p-5">
                <input type="hidden" name="orderId" value={order.id} />
                <textarea
                  name="notes"
                  rows={4}
                  defaultValue={order.notes ?? ""}
                  placeholder="Anything to remember about this order…"
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
        </div>
      </AdminContent>
    </>
  );
}

function TimelineItem({
  done,
  label,
  detail,
}: {
  done: boolean;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={
          "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full " +
          (done
            ? "bg-success text-white"
            : "border-2 border-line bg-white text-line-strong")
        }
      >
        {done ? (
          <Check className="size-3" strokeWidth={3} />
        ) : (
          <Package className="size-3" strokeWidth={2.4} />
        )}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-xs text-muted">{detail}</span>
      </div>
    </li>
  );
}
