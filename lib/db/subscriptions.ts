import { createSupabaseServer } from "@/lib/supabase/server";

export type Subscription = {
  id: string;
  name: string;
  category: string;
  status: "active" | "paused" | "cancelled";
  billing_cycle: "monthly" | "yearly";
  amount_ngn: number;
  renewal_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function requireUserId() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Not authenticated");
  return data.user.id;
}

export async function listSubscriptions() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Subscription[];
}

export async function getSubscription(id: string) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Subscription;
}

export async function createSubscription(input: Omit<Subscription, "id" | "created_at" | "updated_at"> & { user_id: string }) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("subscriptions")
    .insert(input)
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function updateSubscription(id: string, patch: Partial<Subscription>) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("subscriptions").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteSubscription(id: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("subscriptions").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
