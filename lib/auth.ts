import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const ADMIN_COOKIE = "slablabs_admin_session";
export const BYPASS_COOKIE = "slablabs_bypass";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ??
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ??
  "slablabs";

const BYPASS_PASSWORD = process.env.COMING_SOON_PASSWORD ?? "slablabs";

const ADMIN_SECRET =
  process.env.ADMIN_SECRET ?? "dev-only-not-secure-change-me";

function expectedToken() {
  return createHash("sha256")
    .update(`${ADMIN_PASSWORD}:${ADMIN_SECRET}`)
    .digest("hex");
}

function expectedBypassToken() {
  return createHash("sha256")
    .update(`bypass:${BYPASS_PASSWORD}:${ADMIN_SECRET}`)
    .digest("hex");
}

export function isCorrectPassword(input: string) {
  const provided = Buffer.from(input ?? "", "utf8");
  const expected = Buffer.from(ADMIN_PASSWORD, "utf8");
  if (provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(provided, expected);
  } catch {
    return false;
  }
}

export function isValidSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const provided = Buffer.from(token, "hex");
  const expected = Buffer.from(expectedToken(), "hex");
  if (provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(provided, expected);
  } catch {
    return false;
  }
}

export async function isAuthenticated() {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  return isValidSessionToken(value);
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export function usingDefaultAdminPassword() {
  return !process.env.ADMIN_PASSWORD;
}

export function isCorrectBypassPassword(input: string) {
  const provided = Buffer.from(input ?? "", "utf8");
  const expected = Buffer.from(BYPASS_PASSWORD, "utf8");
  if (provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(provided, expected);
  } catch {
    return false;
  }
}

export function isValidBypassToken(token: string | undefined | null) {
  if (!token) return false;
  const provided = Buffer.from(token, "hex");
  const expected = Buffer.from(expectedBypassToken(), "hex");
  if (provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(provided, expected);
  } catch {
    return false;
  }
}

export async function setBypassSession() {
  const store = await cookies();
  store.set(BYPASS_COOKIE, expectedBypassToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearBypassSession() {
  const store = await cookies();
  store.delete(BYPASS_COOKIE);
}
