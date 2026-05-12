"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { isAuthenticated } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { LAUNCH_NOTIFY, sendEmail } from "@/lib/email";

const schema_ = z.object({
  card: z.string().trim().min(1, "Card name is required.").max(120),
  set: z.string().trim().max(120).optional(),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  notes: z.string().trim().max(2000).optional(),
});

export type RequestCardState = { ok: boolean; message: string };

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function requestCard(
  _prev: RequestCardState,
  formData: FormData,
): Promise<RequestCardState> {
  const parsed = schema_.safeParse({
    card: formData.get("card"),
    set: formData.get("set") || undefined,
    email: formData.get("email"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  const { card, set, email, notes } = parsed.data;

  try {
    await db.insert(schema.cardRequests).values({
      card,
      setName: set || null,
      email,
      notes: notes || null,
      status: "open",
    });
  } catch (err) {
    console.error("[request-card] db insert failed", err);
    return {
      ok: false,
      message: "Couldn't save your request — try again in a moment.",
    };
  }

  // Email notification (fire-and-forget; failures don't unwind the DB row).
  const html = `
    <h2 style="font-family:system-ui,sans-serif;">New card request</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:6px 14px 6px 0;color:#666;">Card</td><td style="padding:6px 0;"><strong>${escape(card)}</strong></td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#666;">Set</td><td style="padding:6px 0;">${escape(set ?? "—")}</td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#666;">From</td><td style="padding:6px 0;">${escape(email)}</td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top;">Notes</td><td style="padding:6px 0;white-space:pre-wrap;">${escape(notes ?? "—")}</td></tr>
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:12px;color:#888;margin-top:18px;">
      Open this and the rest of the inbox in the admin: <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin/requests">/admin/requests</a>
    </p>
  `;

  await sendEmail({
    to: LAUNCH_NOTIFY,
    subject: `Card request: ${card}`,
    html,
    replyTo: email,
  });

  return {
    ok: true,
    message: "Got it. We'll be in touch about your slab.",
  };
}

// --- Admin actions for managing the inbox ---

async function guard() {
  if (!(await isAuthenticated())) throw new Error("Not authorised.");
}

const statusUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  status: z.enum(["open", "contacted", "produced", "declined"]),
});

export async function updateCardRequestStatus(formData: FormData) {
  await guard();
  const { id, status } = statusUpdateSchema.parse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  await db
    .update(schema.cardRequests)
    .set({ status, updatedAt: new Date() })
    .where(eq(schema.cardRequests.id, id));
  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${id}`);
  revalidatePath("/admin");
}

const internalNotesSchema = z.object({
  id: z.coerce.number().int().positive(),
  internalNotes: z.string().max(4000),
});

export async function saveCardRequestNotes(formData: FormData) {
  await guard();
  const { id, internalNotes } = internalNotesSchema.parse({
    id: formData.get("id"),
    internalNotes: formData.get("internalNotes") ?? "",
  });
  await db
    .update(schema.cardRequests)
    .set({ internalNotes: internalNotes || null, updatedAt: new Date() })
    .where(eq(schema.cardRequests.id, id));
  revalidatePath(`/admin/requests/${id}`);
}

const deleteSchema = z.object({ id: z.coerce.number().int().positive() });

export async function deleteCardRequest(formData: FormData) {
  await guard();
  const { id } = deleteSchema.parse({ id: formData.get("id") });
  await db.delete(schema.cardRequests).where(eq(schema.cardRequests.id, id));
  revalidatePath("/admin/requests");
}
