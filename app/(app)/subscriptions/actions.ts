/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createSubscription,
  deleteSubscription,
  requireUserId,
  updateSubscription,
} from "@/lib/db/subscriptions";

const subSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  status: z.enum(["active", "paused", "cancelled"]),
  billing_cycle: z.enum(["monthly", "yearly"]),
  amount_ngn: z.coerce.number().int().min(0),
  renewal_date: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function createSubscriptionAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = subSchema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid form");

  const user_id = await requireUserId();

  const id = await createSubscription({
    user_id,
    name: parsed.data.name,
    category: parsed.data.category,
    status: parsed.data.status,
    billing_cycle: parsed.data.billing_cycle,
    amount_ngn: parsed.data.amount_ngn,
    renewal_date: parsed.data.renewal_date || null,
    notes: parsed.data.notes || null,
  } as any);

  revalidatePath("/subscriptions");
  redirect(`/subscriptions/${id}`);
}

export async function updateSubscriptionAction(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = subSchema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid form");

  await updateSubscription(id, {
    name: parsed.data.name,
    category: parsed.data.category,
    status: parsed.data.status,
    billing_cycle: parsed.data.billing_cycle,
    amount_ngn: parsed.data.amount_ngn,
    renewal_date: parsed.data.renewal_date || null,
    notes: parsed.data.notes || null,
  });

  revalidatePath(`/subscriptions/${id}`);
  revalidatePath("/subscriptions");
  redirect(`/subscriptions/${id}`);
}

export async function deleteSubscriptionAction(id: string) {
  await deleteSubscription(id);
  revalidatePath("/subscriptions");
  redirect("/subscriptions");
}
