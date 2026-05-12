"use server";

import { redirect } from "next/navigation";

import { isCorrectBypassPassword, setBypassSession, clearBypassSession } from "@/lib/auth";

export async function enterBypass(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!isCorrectBypassPassword(password)) {
    redirect("/coming-soon?bypass=invalid#staff");
  }
  await setBypassSession();
  redirect("/");
}

export async function exitBypass() {
  await clearBypassSession();
  redirect("/coming-soon");
}
