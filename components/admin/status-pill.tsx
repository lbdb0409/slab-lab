import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/schema";

const STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow/15 text-yellow-deep border-yellow/40",
  paid: "bg-cyan/10 text-cyan-deep border-cyan/40",
  shipped: "bg-purple/10 text-purple border-purple/40",
  delivered: "bg-success/10 text-success border-success/40",
  refunded: "bg-magenta/10 text-magenta border-magenta/40",
  cancelled: "bg-line/40 text-muted border-line-strong",
};

const LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered",
  refunded: "Refunded",
  cancelled: "Cancelled",
};

export function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        STYLES[status],
      )}
    >
      <span
        className={cn(
          "inline-block size-1.5 rounded-full",
          status === "pending" && "bg-yellow-deep",
          status === "paid" && "bg-cyan",
          status === "shipped" && "bg-purple",
          status === "delivered" && "bg-success",
          status === "refunded" && "bg-magenta",
          status === "cancelled" && "bg-line-strong",
        )}
      />
      {LABELS[status]}
    </span>
  );
}
