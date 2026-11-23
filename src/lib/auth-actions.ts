"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

const MIN_PASSWORD = 8;
const NOT_SET_UP = "Login isn't set up yet.";

function field(form: FormData, name: string) {
  return String(form.get(name) ?? "").trim();
}

/** Only allow redirects back into this site. */
function safeNext(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

async function siteOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** Turns Supabase errors into clear messages without leaking details. */
function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Wrong email or password.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Email already used.";
  if (m.includes("email not confirmed")) return "Please confirm your email first. Check your inbox.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many attempts. Please wait a minute and try again.";
  if (m.includes("password")) return `Password must be at least ${MIN_PASSWORD} characters.`;
  return "Something went wrong. Please try again.";
}

export async function login(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: NOT_SET_UP };
  const email = field(form, "email");
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: friendly(error.message) };
  redirect(safeNext(field(form, "next")));
}

export async function signup(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: NOT_SET_UP };
  const fullName = field(form, "fullName");
  const email = field(form, "email");
  const password = String(form.get("password") ?? "");
  if (!fullName || !email) return { error: "Enter your full name and email." };
  if (password.length < MIN_PASSWORD) return { error: `Password must be at least ${MIN_PASSWORD} characters.` };
  if (password !== String(form.get("confirm") ?? "")) return { error: "Passwords don't match." };
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name: fullName }, emailRedirectTo: `${await siteOrigin()}/auth/callback?next=/dashboard` },
  });
  if (error) return { error: friendly(error.message) };
  // Supabase returns a user with no identities when the email is already registered.
  if (data.user && data.user.identities?.length === 0) return { error: "Email already used." };
  if (!data.session) return { message: "Check your email to confirm your account, then log in." };
  redirect("/dashboard");
}

export async function forgotPassword(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: NOT_SET_UP };
  const email = field(form, "email");
  if (!email) return { error: "Enter your email." };
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${await siteOrigin()}/auth/callback?next=/reset-password` });
  // Same answer whether or not the account exists, so emails can't be probed.
  return { message: "If an account exists for that email, a reset link is on its way." };
}

export async function resetPassword(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: NOT_SET_UP };
  const password = String(form.get("password") ?? "");
  if (password.length < MIN_PASSWORD) return { error: `Password must be at least ${MIN_PASSWORD} characters.` };
  if (password !== String(form.get("confirm") ?? "")) return { error: "Passwords don't match." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message.toLowerCase().includes("session") ? "This reset link has expired. Ask for a new one." : friendly(error.message) };
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/");
}
