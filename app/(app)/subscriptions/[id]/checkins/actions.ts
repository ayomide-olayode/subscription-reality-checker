"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServer } from "@/lib/supabase/server";
import { createCheckin } from "@/lib/db/checkins";

const schema = z.object({
  subscription_id: z.string().uuid(),
  used: z.enum(["yes", "no"]),
  value_rating: z.coerce.number().int().min(1).max(5),
  note: z.string().optional().nullable(),
});

export async function addCheckinAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid check-in");

  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) throw new Error("Not authenticated");

  await createCheckin({
    subscription_id: parsed.data.subscription_id,
    user_id: data.user.id,
    used: parsed.data.used === "yes",
    value_rating: parsed.data.value_rating,
    note: parsed.data.note || null,
  });

  revalidatePath(`/subscriptions/${parsed.data.subscription_id}`);
}
