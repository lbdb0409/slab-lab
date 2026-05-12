import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

declare global {
  // eslint-disable-next-line no-var
  var __slablabs_resend__: Resend | undefined;
}

function getClient(): Resend | null {
  if (!apiKey) return null;
  if (!globalThis.__slablabs_resend__) {
    globalThis.__slablabs_resend__ = new Resend(apiKey);
  }
  return globalThis.__slablabs_resend__;
}

export const LAUNCH_FROM =
  process.env.LAUNCH_FROM ?? "Slablabs <onboarding@resend.dev>";

export const LAUNCH_NOTIFY =
  process.env.LAUNCH_NOTIFY ?? "slablabsoz@gmail.com";

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(args: SendArgs): Promise<{
  ok: boolean;
  skipped?: boolean;
  error?: string;
}> {
  const client = getClient();
  if (!client) {
    console.warn(
      `[email] RESEND_API_KEY not set. Skipping send to ${Array.isArray(args.to) ? args.to.join(", ") : args.to}`,
    );
    return { ok: true, skipped: true };
  }

  try {
    const result = await client.emails.send({
      from: LAUNCH_FROM,
      to: args.to,
      subject: args.subject,
      html: args.html,
      ...(args.replyTo ? { replyTo: args.replyTo } : {}),
    });
    if (result.error) {
      console.error("[email] resend error", result.error);
      return { ok: false, error: result.error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send threw", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
