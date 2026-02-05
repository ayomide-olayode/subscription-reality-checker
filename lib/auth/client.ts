"use client";

import { createSupabaseBrowser } from "@/lib/supabase/browser";

export async function signUpWithEmail(email: string, password: string, name: string) {
  const supabase = createSupabaseBrowser();
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }, // stored in user metadata
    },
  });
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createSupabaseBrowser();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = createSupabaseBrowser();
  return supabase.auth.signOut();
}
