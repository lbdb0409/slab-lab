"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";

import {
  sendBroadcast,
  type BroadcastState,
} from "@/lib/actions/broadcast";
import {
  AdminCard,
  AdminCardHeader,
} from "@/components/admin/page-shell";

const INITIAL: BroadcastState = { ok: false, message: "" };

export function BroadcastForm({ subscriberCount }: { subscriberCount: number }) {
  const [state, action, pending] = useActionState(sendBroadcast, INITIAL);

  return (
    <form action={action} className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <AdminCard>
          <AdminCardHeader title="Compose" />
          <div className="flex flex-col gap-4 p-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Subject *
              </span>
              <input
                type="text"
                name="subject"
                required
                placeholder="Slablabs is live. First kits drop today"
                className="rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-text focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Body (HTML) *
              </span>
              <textarea
                name="html"
                required
                rows={14}
                placeholder={'<p style="font-family:system-ui,sans-serif;line-height:1.5;">We just launched. <a href="https://slablab.com.au/shop">Shop the first kits →</a></p>'}
                className="rounded-md border border-line bg-white px-3 py-2.5 font-mono text-xs leading-relaxed placeholder:text-muted focus:border-text focus:outline-none"
              />
              <span className="text-[11px] text-muted">
                Inline HTML. Use inline styles. Most email clients strip{" "}
                <code className="rounded bg-bg-soft px-1 py-0.5 font-mono">&lt;style&gt;</code>{" "}
                tags. Plain paragraphs and links work fine.
              </span>
            </label>
          </div>
        </AdminCard>
      </div>

      <aside className="flex flex-col gap-6">
        <AdminCard>
          <AdminCardHeader title="Send" />
          <div className="flex flex-col gap-3 p-5">
            <div className="rounded-md border border-line bg-bg-soft px-3 py-2.5 text-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Audience
              </span>
              <p className="mt-0.5 font-display text-xl tabular-nums">
                {subscriberCount}{" "}
                <span className="text-sm text-text-soft">
                  {subscriberCount === 1 ? "subscriber" : "subscribers"}
                </span>
              </p>
            </div>

            <label className="flex items-start gap-2.5 rounded-md border border-line bg-bg-soft p-3 text-sm">
              <input
                type="checkbox"
                name="confirm"
                value="yes"
                required
                className="mt-0.5 size-4 shrink-0 accent-orange"
              />
              <span className="text-text-soft">
                I&apos;ve previewed the body and I&apos;m ready to send it to
                everyone on the list.
              </span>
            </label>

            <button
              type="submit"
              disabled={pending || subscriberCount === 0}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="size-3.5" strokeWidth={2.6} />
              {pending
                ? "Sending…"
                : `Send to ${subscriberCount} ${subscriberCount === 1 ? "subscriber" : "subscribers"}`}
            </button>

            {state.message && (
              <p
                role="status"
                className={
                  "rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider " +
                  (state.ok
                    ? "border border-success/40 bg-success/10 text-success"
                    : "border border-danger/40 bg-danger/5 text-danger")
                }
              >
                {state.message}
              </p>
            )}
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Sending notes" />
          <ul className="flex flex-col gap-2 p-5 text-xs leading-relaxed text-text-soft">
            <li>
              · Sends one at a time to keep things tidy. Slow for large lists,
              fine for the launch announcement.
            </li>
            <li>
              · FROM address comes from{" "}
              <code className="rounded bg-bg-soft px-1 py-0.5 font-mono">
                LAUNCH_FROM
              </code>
              . Verify your domain at resend.com/domains before sending to
              non-test addresses.
            </li>
            <li>
              · No unsubscribe link is injected automatically yet. Add one to
              the body manually for now.
            </li>
          </ul>
          <div className="border-t border-line bg-bg-soft px-5 py-3 text-[11px] uppercase tracking-wider text-muted">
            Preview transactional templates:{" "}
            <a
              href="/admin/email-preview/welcome"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              welcome
            </a>
            {" · "}
            <a
              href="/admin/email-preview/notification"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-text underline-offset-4 hover:text-orange hover:underline"
            >
              notification
            </a>
          </div>
        </AdminCard>
      </aside>
    </form>
  );
}
