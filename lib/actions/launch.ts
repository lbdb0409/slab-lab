"use server";

import { z } from "zod";

import { db, schema } from "@/lib/db";
import { LAUNCH_NOTIFY, sendEmail } from "@/lib/email";
import { notificationEmail, welcomeEmail } from "@/lib/email-templates";
import { countSubscribers } from "@/lib/subscribers";

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
});

export type SubscribeState = {
  ok: boolean;
  message: string;
};

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid email.",
    };
  }

  const email = parsed.data.email;

  let inserted = false;
  try {
    const result = await db
      .insert(schema.launchSubscribers)
      .values({ email })
      .onConflictDoNothing({ target: schema.launchSubscribers.email })
      .returning({ id: schema.launchSubscribers.id });
    inserted = result.length > 0;
  } catch {
    return { ok: false, message: "Couldn't save that email. Try again." };
  }

  // Fire emails only for genuinely new signups. Failures here must not
  // unwind the DB insert — the subscriber is already on the list.
  if (inserted) {
    const total = await countSubscribers().catch(() => 0);

    const welcome = welcomeEmail(email);
    const notify = notificationEmail(email, total);

    await Promise.allSettled([
      sendEmail({
        to: email,
        subject: welcome.subject,
        html: welcome.html,
        replyTo: LAUNCH_NOTIFY,
      }),
      sendEmail({
        to: LAUNCH_NOTIFY,
        subject: notify.subject,
        html: notify.html,
        replyTo: email,
      }),
    ]);
  }

  return {
    ok: true,
    message: inserted
      ? "You're on the list. Check your inbox — we just sent a confirmation."
      : "You're already on the list. We'll email you at launch.",
  };
}
