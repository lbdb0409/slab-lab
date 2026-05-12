"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { isAuthenticated } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { shippingConfirmationEmail } from "@/lib/email-templates";
import { getCarrier, type CarrierId } from "@/lib/shipping";

async function guard() {
  if (!(await isAuthenticated())) {
    throw new Error("Not authorised.");
  }
}

const carrierSchema = z.enum(["auspost", "couriers-please", "fedex"]);

const markShippedSchema = z.object({
  orderId: z.string().min(1),
  carrier: carrierSchema,
  trackingNumber: z.string().trim().min(2, "Tracking number is required."),
});

export async function markOrderShipped(formData: FormData) {
  await guard();
  const parsed = markShippedSchema.safeParse({
    orderId: formData.get("orderId"),
    carrier: formData.get("carrier"),
    trackingNumber: formData.get("trackingNumber"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.");
  }

  const order = await db.query.orders.findFirst({
    where: eq(schema.orders.id, parsed.data.orderId),
    with: { customer: true },
  });
  if (!order) throw new Error("Order not found.");
  if (order.status === "shipped" || order.status === "delivered") {
    throw new Error("Order is already shipped.");
  }

  const carrier = getCarrier(parsed.data.carrier as CarrierId);
  const shipment = await carrier.createShipment({
    orderNumber: order.number,
    recipientName: order.customer.name,
    recipientEmail: order.customer.email,
    city: order.shippingCity,
    state: order.shippingState,
    manualTrackingNumber: parsed.data.trackingNumber,
  });

  await db
    .update(schema.orders)
    .set({
      status: "shipped",
      fulfilledAt: new Date(),
      trackingCarrier: shipment.carrier,
      trackingNumber: shipment.trackingNumber,
      trackingUrl: shipment.trackingUrl,
      labelUrl: shipment.labelUrl ?? null,
    })
    .where(eq(schema.orders.id, order.id));

  const tmpl = shippingConfirmationEmail({
    customerName: order.customer.name,
    orderNumber: order.number,
    carrierLabel: carrier.label,
    trackingNumber: shipment.trackingNumber,
    trackingUrl: shipment.trackingUrl,
  });
  await sendEmail({
    to: order.customer.email,
    subject: tmpl.subject,
    html: tmpl.html,
  });

  revalidatePath(`/admin/orders/${order.id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

const statusOnlySchema = z.object({
  orderId: z.string().min(1),
});

export async function markOrderDelivered(formData: FormData) {
  await guard();
  const { orderId } = statusOnlySchema.parse({ orderId: formData.get("orderId") });
  await db
    .update(schema.orders)
    .set({ status: "delivered" })
    .where(eq(schema.orders.id, orderId));
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function markOrderRefunded(formData: FormData) {
  await guard();
  const { orderId } = statusOnlySchema.parse({ orderId: formData.get("orderId") });
  await db
    .update(schema.orders)
    .set({ status: "refunded" })
    .where(eq(schema.orders.id, orderId));
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function markOrderCancelled(formData: FormData) {
  await guard();
  const { orderId } = statusOnlySchema.parse({ orderId: formData.get("orderId") });
  await db
    .update(schema.orders)
    .set({ status: "cancelled" })
    .where(eq(schema.orders.id, orderId));
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

const notesSchema = z.object({
  orderId: z.string().min(1),
  notes: z.string().max(4000),
});

export async function saveOrderNotes(formData: FormData) {
  await guard();
  const { orderId, notes } = notesSchema.parse({
    orderId: formData.get("orderId"),
    notes: formData.get("notes") ?? "",
  });
  await db
    .update(schema.orders)
    .set({ notes: notes || null })
    .where(eq(schema.orders.id, orderId));
  revalidatePath(`/admin/orders/${orderId}`);
}
