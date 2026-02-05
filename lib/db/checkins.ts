import { createSupabaseServer } from "@/lib/supabase/server";

export type Checkin = {
  id: string;
  subscription_id: string;
  user_id: string;
  used: boolean;
  value_rating: number; // 1..5
  note: string | null;
  created_at: string;
};

export async function listCheckins(subscriptionId: string, limit = 10) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("subscription_checkins")
    .select("*")
    .eq("subscription_id", subscriptionId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data as Checkin[];
}

export async function createCheckin(input: Omit<Checkin, "id" | "created_at">) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("subscription_checkins")
    .insert(input)
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function deleteCheckin(id: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase.from("subscription_checkins").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function listRecentCheckinsForSubscriptions(
  subscriptionIds: string[],
  days = 30
) {
  if (subscriptionIds.length === 0) return [];

  const supabase = await createSupabaseServer();

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffISO = cutoff.toISOString();

  const { data, error } = await supabase
    .from("subscription_checkins")
    .select("*")
    .in("subscription_id", subscriptionIds)
    .gte("created_at", cutoffISO)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Checkin[];
}
