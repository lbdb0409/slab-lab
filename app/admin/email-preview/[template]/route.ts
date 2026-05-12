import { notFound } from "next/navigation";

import { notificationEmail, welcomeEmail } from "@/lib/email-templates";

type Params = { params: Promise<{ template: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { template } = await params;

  let result: { subject: string; html: string };
  if (template === "welcome") {
    result = welcomeEmail("you@trainer.com");
  } else if (template === "notification") {
    result = notificationEmail("you@trainer.com", 42);
  } else {
    notFound();
  }

  // Prepend a small dev banner so it's obviously a preview
  const banner = `
    <div style="position:sticky;top:0;background:#ff6a00;color:#0a0a0a;padding:10px 16px;font-family:system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #0a0a0a;">
      Email preview · ${template} · subject: <span style="font-weight:400;text-transform:none;letter-spacing:0;">${result.subject}</span>
    </div>
  `;
  return new Response(banner + result.html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
