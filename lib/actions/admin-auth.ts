"use server";

import { redirect } from "next/navigation";

import { clearAdminSession, isCorrectPassword, setAdminSession } from "@/lib/auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");
  if (!isCorrectPassword(password)) {
    redirect(`/admin/login?error=1&from=${encodeURIComponent(from)}`);
  }
  await setAdminSession();
  redirect(from || "/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/login");
}
