"use server";

import { revalidatePath } from "next/cache";
import { deleteCheckin } from "@/lib/db/checkins";

export async function deleteCheckinAction(checkinId: string, subscriptionId: string) {
  await deleteCheckin(checkinId);
  revalidatePath(`/subscriptions/${subscriptionId}`);
}
