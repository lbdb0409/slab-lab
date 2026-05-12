import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_COOKIE,
  BYPASS_COOKIE,
  isValidBypassToken,
  isValidSessionToken,
} from "@/lib/auth";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|brand/|fonts/).*)",
  ],
};

const COMING_SOON_ALLOWLIST = new Set([
  "/coming-soon",
]);

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Admin auth gate (always on)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (isValidSessionToken(token)) return NextResponse.next();
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = `?from=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(loginUrl);
  }

  // Pre-launch gate. ON by default. Set COMING_SOON=0 to open the full site.
  if (process.env.COMING_SOON !== "0") {
    if (COMING_SOON_ALLOWLIST.has(pathname)) return NextResponse.next();
    const bypass = req.cookies.get(BYPASS_COOKIE)?.value;
    if (isValidBypassToken(bypass)) return NextResponse.next();
    const target = req.nextUrl.clone();
    target.pathname = "/coming-soon";
    target.search = "";
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}
