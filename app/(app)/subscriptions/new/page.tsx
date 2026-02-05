import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createSubscriptionAction } from "../actions";

export default function NewSubscriptionPage() {
  return (
    <>
      <Topbar title="New subscription" />
      <main className="min-h-[calc(100dvh-64px)] bg-bg-main">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Card className="border-border bg-bg-white">
            <CardContent className="p-6 space-y-6">
              <form action={createSubscriptionAction} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <Input name="name" placeholder="e.g. Netflix" />
                  </Field>

                  <Field label="Category">
                    <Select name="category" defaultValue="tools">
                      <option value="tools">Tools</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="storage">Storage</option>
                    </Select>
                  </Field>

                  <Field label="Amount (NGN)">
                    <Input name="amount_ngn" type="number" placeholder="4500" />
                  </Field>

                  <Field label="Billing cycle">
                    <Select name="billing_cycle" defaultValue="monthly">
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </Select>
                  </Field>

                  <Field label="Renewal date">
                    <Input name="renewal_date" type="date" />
                  </Field>

                  <Field label="Status">
                    <Select name="status" defaultValue="active">
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                  </Field>
                </div>

                <Field label="Notes">
                  <Textarea name="notes" placeholder="Optional" />
                </Field>

                <div className="flex gap-3">
                  <Button
                    className="bg-primary text-white hover:bg-primary-light"
                    type="submit"
                  >
                    Save subscription
                  </Button>

                  <Link href="/subscriptions" className="inline-block">
                    <Button
                      variant="secondary"
                      className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                      type="button"
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
