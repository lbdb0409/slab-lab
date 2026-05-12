"use server";

import { z } from "zod";

import { isAuthenticated } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { getAllSubscribers } from "@/lib/subscribers";

async function guard() {
  if (!(await isAuthenticated())) {
    return { ok: false, message: "Not authorised." } as const;
  }
  return null;
}

const schema = z.object({
  subject: z.string().trim().min(2, "Subject is required.").max(200),
  html: z.string().trim().min(10, "Body looks too short."),
  confirm: z.string().refine((v) => v === "yes", {
    message: "Tick the confirmation box first.",
  }),
});

export type BroadcastState = {
  ok: boolean;
  message: string;
  sent?: number;
  failed?: number;
};

export async function sendBroadcast(
  _prev: BroadcastState,
  formData: FormData,
): Promise<BroadcastState> {
  const auth = await guard();
  if (auth) return auth;

  const parsed = schema.safeParse({
    subject: formData.get("subject"),
    html: formData.get("html"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Check the form.",
    };
  }
  const { subject, html } = parsed.data;

  const subscribers = await getAllSubscribers();
  if (subscribers.length === 0) {
    return { ok: false, message: "No subscribers to send to yet." };
  }

  let sent = 0;
  let failed = 0;
  for (const sub of subscribers) {
    const result = await sendEmail({
      to: sub.email,
      subject,
      html,
    });
    if (result.ok) sent += 1;
    else failed += 1;
  }

  return {
    ok: true,
    message:
      failed === 0
        ? `Sent to ${sent} ${sent === 1 ? "subscriber" : "subscribers"}.`
        : `Sent to ${sent}, ${failed} failed.`,
    sent,
    failed,
  };
}
