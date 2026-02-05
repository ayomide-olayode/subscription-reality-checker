import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { getSubscription } from "@/lib/db/subscriptions";
import { updateSubscriptionAction } from "@/app/(app)/subscriptions/actions";

export default async function EditSubscriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sub = await getSubscription(id);

  return (
    <>
      <Topbar title="Edit subscription" />

      <main className="min-h-[calc(100dvh-64px)] bg-bg-main">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Card className="border-border bg-bg-white">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-primary">Edit</h2>
                <p className="mt-1 text-sm text-text-muted">
                  Update details and save.
                </p>
              </div>

              <form
                action={updateSubscriptionAction.bind(null, id)}
                className="space-y-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <Input name="name" defaultValue={sub.name} />
                  </Field>

                  <Field label="Category">
                    <Select name="category" defaultValue={sub.category}>
                      <option value="tools">Tools</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="storage">Storage</option>
                    </Select>
                  </Field>

                  <Field label="Amount (NGN)">
                    <Input
                      name="amount_ngn"
                      type="number"
                      defaultValue={String(sub.amount_ngn)}
                    />
                  </Field>

                  <Field label="Billing cycle">
                    <Select
                      name="billing_cycle"
                      defaultValue={sub.billing_cycle}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </Select>
                  </Field>

                  <Field label="Renewal date">
                    <Input
                      name="renewal_date"
                      type="date"
                      defaultValue={sub.renewal_date ?? ""}
                    />
                  </Field>

                  <Field label="Status">
                    <Select name="status" defaultValue={sub.status}>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </Field>
                </div>

                <Field label="Notes (optional)">
                  <Textarea name="notes" defaultValue={sub.notes ?? ""} />
                </Field>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary-light"
                  >
                    Save changes
                  </Button>

                  <Link href={`/subscriptions/${id}`} className="inline-block">
                    <Button
                      type="button"
                      variant="secondary"
                      className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-primary">{label}</label>
      {children}
    </div>
  );
}
