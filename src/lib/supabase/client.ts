import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/** Browser client, or null when Supabase isn't configured yet. */
export function createClient() {
  return isSupabaseConfigured ? createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
}
