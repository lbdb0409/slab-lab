"use server";

import { z } from "zod";

import { LAUNCH_NOTIFY, sendEmail } from "@/lib/email";

const schema = z.object({
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
  const parsed = schema.safeParse({
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

  const html = `
    <h2 style="font-family:system-ui,sans-serif;">New card request</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:6px 14px 6px 0;color:#666;">Card</td><td style="padding:6px 0;"><strong>${escape(card)}</strong></td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#666;">Set</td><td style="padding:6px 0;">${escape(set ?? "—")}</td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#666;">From</td><td style="padding:6px 0;">${escape(email)}</td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top;">Notes</td><td style="padding:6px 0;white-space:pre-wrap;">${escape(notes ?? "—")}</td></tr>
    </table>
  `;

  const result = await sendEmail({
    to: LAUNCH_NOTIFY,
    subject: `Card request: ${card}`,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    return {
      ok: false,
      message: "Couldn't send your request — try again in a moment.",
    };
  }

  return {
    ok: true,
    message: "Got it. We'll be in touch about your slab.",
  };
}
