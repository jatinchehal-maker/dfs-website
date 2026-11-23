"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/lib/auth-actions";
import { HEADER } from "@/content/site";

/** "Log in" when signed out; "Dashboard" + "Log out" when signed in. */
export default function AuthLinks({ onNavigate }: { onNavigate?: () => void }) {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!signedIn) return <Link href={HEADER.login.href} onClick={onNavigate} className="px-2 text-sm font-medium hover:underline">{HEADER.login.label}</Link>;
  return (
    <span className="flex items-center gap-3 text-sm font-medium">
      <Link href="/dashboard" onClick={onNavigate} className="hover:underline">Dashboard</Link>
      <form action={logout}><button type="submit" className="hover:underline">Log out</button></form>
    </span>
  );
}
