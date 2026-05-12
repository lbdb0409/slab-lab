import { LOGO_DATA_URI } from "./email-assets";

const ORANGE = "#ff6a00";
const ORANGE_DEEP = "#e55c00";
const DARK = "#0a0a0a";
const DARK_2 = "#141414";
const WHITE = "#ffffff";
const MUTED = "rgba(255,255,255,0.65)";
const YELLOW = "#ffcb00";
const MAGENTA = "#ff2d92";
const CYAN = "#00b8e0";
const LIME = "#5cd31a";

const OCT_POINTS = "29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3";

function octagonSvg(opts: {
  size: number;
  stroke: string;
  fill?: string;
  strokeWidth?: number;
}): string {
  const { size, stroke, fill = "none", strokeWidth = 4 } = opts;
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="display:block;"><polygon points="${OCT_POINTS}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="miter" /></svg>`;
}

// Build the dramatic offset-shadow card. Outer table is orange (sits behind),
// inner table is dark and slightly offset up-and-left to simulate `8px 8px 0` box-shadow.
function offsetCard(innerHtml: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;">
      <tr>
        <td style="padding:0;">
          <!--[if mso]>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="background:${DARK_2};border:2px solid ${ORANGE};">
          <![endif]-->
          <div style="position:relative;background:${ORANGE};border-radius:18px;">
            <div style="position:relative;top:-8px;left:-8px;background:${DARK_2};border:2px solid ${WHITE};border-radius:18px;overflow:hidden;">
              ${innerHtml}
            </div>
          </div>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </table>
  `;
}

// Top header bar — logo chip + status pill
function header(): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:22px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
            <td style="vertical-align:middle;">
              <span style="display:inline-block;padding:10px 14px;background:${DARK};border:1.5px solid rgba(255,255,255,0.18);border-radius:10px;line-height:0;">
                <img src="${LOGO_DATA_URI}" alt="Slablabs" width="120" height="auto" style="display:block;height:auto;width:120px;border:0;outline:0;" />
              </span>
            </td>
            <td align="right" style="vertical-align:middle;">
              <span style="display:inline-block;padding:6px 12px;background:rgba(255,106,0,0.16);border:1.5px solid rgba(255,106,0,0.5);border-radius:999px;font-family:'Helvetica Neue',Arial,sans-serif;color:${ORANGE};font-weight:900;letter-spacing:0.22em;font-size:10px;text-transform:uppercase;">
                <span style="display:inline-block;width:6px;height:6px;background:${ORANGE};border-radius:50%;vertical-align:middle;margin-right:6px;"></span>Launching soon
              </span>
            </td>
          </tr></table>
        </td>
      </tr>
    </table>
  `;
}

// Big display headline component. Splits a leading word and an accented final.
function displayHeading(args: { lead: string; accent: string; size?: number }): string {
  const size = args.size ?? 72;
  return `
    <h1 style="margin:0;padding:0;font-family:'Anton','Arial Narrow',Impact,Arial,sans-serif;font-weight:400;font-size:${size}px;line-height:0.86;letter-spacing:-0.015em;text-transform:uppercase;color:${WHITE};">
      ${args.lead}<br /><span style="color:${ORANGE};">${args.accent}</span>
    </h1>
  `;
}

// Confetti dots row — a horizontal strip of brand colored dots
function confettiStrip(): string {
  const dots = [YELLOW, MAGENTA, CYAN, LIME, ORANGE, YELLOW, MAGENTA, CYAN];
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
      <tr>
        ${dots
          .map(
            (color, i) => `
          <td style="padding:0 6px;">
            <div style="width:${i % 2 === 0 ? 9 : 6}px;height:${i % 2 === 0 ? 9 : 6}px;background:${color};border-radius:50%;"></div>
          </td>`,
          )
          .join("")}
      </tr>
    </table>
  `;
}

// Footer with disclaimers
function footer(): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:22px 28px 26px;border-top:1px solid rgba(255,255,255,0.08);font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;line-height:1.65;color:${MUTED};">
          <p style="margin:0 0 6px;">
            <strong style="color:${WHITE};letter-spacing:0.06em;">SLABLABS</strong> · Independent Australian display-slab studio · Encase the art.
          </p>
          <p style="margin:0 0 6px;">
            Slab kits include the surround &amp; case only. <strong style="color:${WHITE};">Your card is not included</strong> — you supply it from your own collection. Display product, not graded.
          </p>
          <p style="margin:0;">
            Not affiliated with The Pokémon Company, Nintendo, Bandai, Wizards of the Coast, or Disney/Ravensburger. All trademarks property of their respective owners.
          </p>
        </td>
      </tr>
    </table>
  `;
}

// Outer shell — ambient dark page, centered card, generous gutters
function shell(args: { preheader: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark only" />
    <meta name="supported-color-schemes" content="dark only" />
    <title>Slablabs</title>
  </head>
  <body style="margin:0;padding:0;background:${DARK};font-family:'Helvetica Neue',Arial,sans-serif;color:${WHITE};-webkit-font-smoothing:antialiased;">
    <span style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:${DARK};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escape(args.preheader)}</span>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${DARK};">
      <tr>
        <td align="center" style="padding:40px 16px 48px;background:${DARK};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
            <tr><td style="padding:0;">
              ${offsetCard(header() + args.body + footer())}
            </td></tr>
            <tr><td style="padding:18px 8px 0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:${MUTED};">
              Sent from Slablabs · Melbourne, Australia
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// ---------- Welcome email ----------

export function welcomeEmail(email: string): { subject: string; html: string } {
  const subject = "You're on the Slablabs launch list.";

  const heroBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:48px 28px 26px;text-align:center;background:linear-gradient(180deg,rgba(255,106,0,0.18) 0%,rgba(255,106,0,0) 75%);">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;"><tr>
            <td style="padding:0 0 22px;text-align:center;">
              <!-- Logo on dark chip with orange offset shadow (table-in-table) -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;border-collapse:separate;"><tr>
                <td style="padding:0;">
                  <div style="position:relative;display:inline-block;background:${ORANGE};border-radius:14px;">
                    <div style="position:relative;top:-6px;left:-6px;display:inline-block;background:${DARK};border:2px solid ${WHITE};border-radius:14px;padding:18px 28px;line-height:0;">
                      <img src="${LOGO_DATA_URI}" alt="Slablabs" width="260" height="auto" style="display:block;width:260px;height:auto;max-width:100%;border:0;outline:0;" />
                    </div>
                  </div>
                </td>
              </tr></table>
            </td>
          </tr></table>
          ${displayHeading({ lead: "YOU'RE", accent: "IN.", size: 84 })}
          <p style="margin:18px auto 0;max-width:420px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:1.55;color:rgba(255,255,255,0.85);">
            Welcome to the launch list. We'll send <strong style="color:${WHITE};">one email</strong> the moment Slablabs goes live — first dibs on every custom-printed slab kit we drop.
          </p>
          <div style="padding-top:24px;">${confettiStrip()}</div>
        </td>
      </tr>
    </table>
  `;

  const pillarsBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:8px 22px 28px;">
          <p style="margin:0 0 16px;padding:0 6px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:${ORANGE};">
            ● What you're waiting for
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:6px 6px;">
            <tr>
              ${pillarCell({ n: "01", title: "Custom surrounds", body: "Artwork keyed to each card extends past the border.", accent: YELLOW })}
              ${pillarCell({ n: "02", title: "Print + assemble", body: "We print and ship; you snap it together at home.", accent: MAGENTA })}
              ${pillarCell({ n: "00", title: "Card stays home", body: "Your card never leaves your hands. Display, not graded.", accent: CYAN })}
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const mantraBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:28px 28px 32px;border-top:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg,rgba(255,106,0,0) 0%,rgba(255,106,0,0.08) 100%);text-align:center;">
          <p style="margin:0;padding:0 8px;font-family:'Anton','Arial Narrow',Impact,Arial,sans-serif;font-weight:400;font-size:30px;line-height:1.08;letter-spacing:-0.005em;text-transform:uppercase;color:${WHITE};">
            "Not every card needs a <span style="color:${ORANGE};">10</span> to deserve the spotlight."
          </p>
          <p style="margin:14px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:${MUTED};">
            — Slablabs · Encase the art.
          </p>
        </td>
      </tr>
    </table>
  `;

  const roadmapBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:20px 22px 28px;">
          <p style="margin:0 0 14px;padding:0 6px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:${CYAN};">
            ● Coming TCGs
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:6px 0;">
            <tr>
              ${tcgCell({ name: "Pokémon", status: "first in", color: YELLOW, dark: true })}
              ${tcgCell({ name: "One Piece", status: "coming", color: "rgba(255,255,255,0.05)", dark: false })}
              ${tcgCell({ name: "MTG", status: "coming", color: "rgba(255,255,255,0.05)", dark: false })}
              ${tcgCell({ name: "Lorcana", status: "coming", color: "rgba(255,255,255,0.05)", dark: false })}
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const signedUpBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:0 22px 26px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-left:3px solid ${ORANGE};border-radius:8px;">
            <tr>
              <td style="padding:14px 18px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.55;color:${MUTED};">
                You signed up with <strong style="color:${WHITE};">${escape(email)}</strong>. If this wasn't you, ignore this email — we won't message you again unless we launch.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const body = heroBlock + pillarsBlock + mantraBlock + roadmapBlock + signedUpBlock;

  return {
    subject,
    html: shell({
      preheader:
        "You're on the launch list. One email when Slablabs goes live — first dibs on every kit.",
      body,
    }),
  };
}

function pillarCell(args: {
  n: string;
  title: string;
  body: string;
  accent: string;
}): string {
  return `
    <td width="33%" style="vertical-align:top;padding:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;height:100%;">
        <tr>
          <td style="padding:16px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;height:100%;">
            <span style="display:block;font-family:'Anton','Arial Narrow',Impact,Arial,sans-serif;font-weight:400;font-size:30px;line-height:1;color:${args.accent};">${args.n}</span>
            <p style="margin:6px 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:${WHITE};">${args.title}</p>
            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.5;color:${MUTED};">${args.body}</p>
          </td>
        </tr>
      </table>
    </td>
  `;
}

function tcgCell(args: {
  name: string;
  status: string;
  color: string;
  dark: boolean;
}): string {
  const textColor = args.dark ? DARK : WHITE;
  return `
    <td width="25%" style="vertical-align:top;padding:0;">
      <div style="padding:12px 10px;background:${args.color};border:1.5px solid ${args.dark ? args.color : "rgba(255,255,255,0.1)"};border-radius:8px;text-align:center;">
        <p style="margin:0;font-family:'Anton','Arial Narrow',Impact,Arial,sans-serif;font-weight:400;font-size:16px;letter-spacing:0.02em;text-transform:uppercase;color:${textColor};line-height:1;">${args.name}</p>
        <p style="margin:6px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;color:${args.dark ? "rgba(10,10,10,0.7)" : MUTED};">${args.status}</p>
      </div>
    </td>
  `;
}

// ---------- Notification email (to admin) ----------

export function notificationEmail(
  email: string,
  total: number,
): { subject: string; html: string } {
  const subject = `↑ New Slablabs subscriber · ${email}`;

  const heroBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:36px 28px 22px;text-align:center;background:linear-gradient(180deg,rgba(255,106,0,0.16) 0%,rgba(255,106,0,0) 70%);">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;border-collapse:separate;"><tr>
            <td style="padding-bottom:16px;text-align:center;">
              <span style="display:inline-block;padding:12px 18px;background:${DARK};border:1.5px solid rgba(255,255,255,0.18);border-radius:10px;line-height:0;">
                <img src="${LOGO_DATA_URI}" alt="Slablabs" width="160" height="auto" style="display:block;width:160px;height:auto;border:0;outline:0;" />
              </span>
            </td>
          </tr></table>
          ${displayHeading({ lead: "NEW", accent: "SIGNUP.", size: 68 })}
          <p style="margin:14px auto 0;max-width:380px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.55;color:${MUTED};">
            Someone just joined the Slablabs launch list.
          </p>
        </td>
      </tr>
    </table>
  `;

  const emailBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:6px 22px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;background:rgba(255,106,0,0.1);border:1.5px solid rgba(255,106,0,0.45);border-radius:10px;">
            <tr>
              <td style="padding:18px 20px;">
                <p style="margin:0 0 6px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:${ORANGE};">● Subscriber</p>
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:800;color:${WHITE};word-break:break-all;">${escape(email)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const statsBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:0 22px 22px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:6px 0;">
            <tr>
              ${statCell({ label: "Total list", value: String(total), accent: ORANGE })}
              ${statCell({ label: "Signed up", value: "just now", accent: CYAN })}
              ${statCell({ label: "Status", value: "Pre-launch", accent: MAGENTA })}
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  const ctaBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:0 22px 28px;text-align:center;">
          <a href="${escape(siteOrigin())}/admin/subscribers" style="display:inline-block;padding:14px 28px;background:${ORANGE};border:2px solid ${WHITE};border-radius:999px;color:${DARK};font-family:'Helvetica Neue',Arial,sans-serif;font-weight:900;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">
            View full list →
          </a>
          <p style="margin:14px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:${MUTED};">
            /admin/subscribers · admin login required
          </p>
        </td>
      </tr>
    </table>
  `;

  const body = heroBlock + emailBlock + statsBlock + ctaBlock;

  return {
    subject,
    html: shell({
      preheader: `${email} just joined the launch list. Total: ${total}.`,
      body,
    }),
  };
}

function statCell(args: { label: string; value: string; accent: string }): string {
  return `
    <td width="33%" style="vertical-align:top;padding:0;">
      <div style="padding:12px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;border-top:3px solid ${args.accent};">
        <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;color:${MUTED};">${escape(args.label)}</p>
        <p style="margin:4px 0 0;font-family:'Anton','Arial Narrow',Impact,Arial,sans-serif;font-weight:400;font-size:22px;letter-spacing:-0.005em;text-transform:uppercase;color:${WHITE};line-height:1.05;">${escape(args.value)}</p>
      </div>
    </td>
  `;
}

function siteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

// ---------- Shipping confirmation ----------

export function shippingConfirmationEmail(args: {
  customerName: string;
  orderNumber: string;
  carrierLabel: string;
  trackingNumber: string;
  trackingUrl: string;
}): { subject: string; html: string } {
  const subject = `Your Slablabs order ${args.orderNumber} is on the way`;
  const heroBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:40px 28px 22px;text-align:center;background:linear-gradient(180deg,rgba(0,184,224,0.16) 0%,rgba(0,184,224,0) 75%);">
          ${displayHeading({ lead: "ON THE", accent: "WAY.", size: 72 })}
          <p style="margin:18px auto 0;max-width:440px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:1.55;color:rgba(255,255,255,0.85);">
            Hey ${escape(args.customerName)} — your Slablabs kit just left the workshop. Tracking is live below.
          </p>
        </td>
      </tr>
    </table>
  `;
  const trackingBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:6px 22px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:0;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;">
            <tr>
              <td style="padding:18px 20px 6px;">
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:${MUTED};">Order</p>
                <p style="margin:4px 0 14px;font-family:'Anton','Arial Narrow',Impact,Arial,sans-serif;font-weight:400;font-size:22px;letter-spacing:-0.005em;text-transform:uppercase;color:${WHITE};line-height:1.05;">${escape(args.orderNumber)}</p>
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:${MUTED};">Carrier</p>
                <p style="margin:4px 0 14px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${WHITE};">${escape(args.carrierLabel)}</p>
                <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:${MUTED};">Tracking number</p>
                <p style="margin:4px 0 18px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${WHITE};word-break:break-all;">${escape(args.trackingNumber)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 20px 20px;">
                <a href="${args.trackingUrl}" style="display:inline-block;padding:12px 20px;background:${ORANGE};color:${DARK};font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;text-decoration:none;border-radius:999px;">Track shipment →</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
  const reminderBlock = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:6px 28px 28px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:18px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.55;color:rgba(255,255,255,0.78);">
            When it lands, slot in your card, snap the case shut, put it on the shelf. Need a hand?
            <a href="${siteOrigin()}/build-guide" style="color:${YELLOW};text-decoration:underline;">Read the build guide</a>.
          </p>
        </td>
      </tr>
    </table>
  `;
  return {
    subject,
    html: shell({
      preheader: `Your Slablabs order ${args.orderNumber} just shipped — tracking inside.`,
      body: heroBlock + trackingBlock + reminderBlock,
    }),
  };
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
