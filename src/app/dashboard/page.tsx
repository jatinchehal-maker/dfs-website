import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import { createClient, getUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { logout } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured) redirect("/login");
  // The real check: never trust the proxy alone.
  const user = await getUser();
  if (!user) redirect("/login?next=/dashboard");

  const supabase = await createClient();
  const { data: profile } = await supabase!.from("profiles").select("full_name, role").eq("id", user.id).maybeSingle();
  const name = profile?.full_name || (user.user_metadata?.full_name as string | undefined) || user.email;

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Dashboard</p>
      <h1 className="font-display mt-3 text-5xl font-bold uppercase leading-none">Welcome, {name}</h1>
      <p className="mt-4 text-neutral-600">Signed in as {user.email}{profile?.role ? ` · ${profile.role}` : ""}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/jobs">See open jobs</ButtonLink>
        <form action={logout}>
          <button type="submit" className="rounded-full border-2 border-black px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white">Log out</button>
        </form>
      </div>
    </section>
  );
}
