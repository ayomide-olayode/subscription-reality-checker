import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollCard } from "@/components/ui/scroll-card";

import { listSubscriptions } from "@/lib/db/subscriptions";

function formatNGN(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

export default async function SubscriptionsPage() {
  const rows = await listSubscriptions();

  return (
    <>
      <Topbar title="Subscriptions" />

      <main className="min-h-[calc(100dvh-64px)] bg-bg-main">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">All subscriptions</h2>
              <p className="mt-1 text-sm text-text-muted">
                Track renewals, usage and value.
              </p>
            </div>

            <Link href="/subscriptions/new" className="inline-block">
              <Button className="bg-primary text-white hover:bg-primary-light">
                Add subscription
              </Button>
            </Link>
          </div>

          <div className="mt-6">
            <ScrollCard
              title="Your subscriptions"
              right={
                <Badge className="border-0 bg-bg-soft text-primary">
                  {rows.length}
                </Badge>
              }
              maxH="max-h-[560px]"
            >
              {rows.length === 0 ? (
                <div className="rounded-lg border border-border bg-bg-main p-4">
                  <p className="text-sm font-semibold text-primary">No subscriptions yet</p>
                  <p className="mt-1 text-sm text-text-muted">
                    Add your first one to start tracking.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {rows.map((row) => (
                    <div
                      key={row.id}
                      className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-primary">
                          {row.name}
                        </p>
                        <p className="mt-1 text-xs text-text-muted">
                          {row.category} • {row.billing_cycle} • {row.status}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-sm font-semibold text-primary">
                          {formatNGN(row.amount_ngn)}
                        </p>

                        {row.renewal_date ? (
                          <Badge className="border-0 bg-bg-soft text-primary">
                            Renews {row.renewal_date}
                          </Badge>
                        ) : (
                          <Badge className="border-0 bg-primary-light/20 text-primary">
                            No date
                          </Badge>
                        )}

                        <Link href={`/subscriptions/${row.id}`} className="inline-block">
                          <Button
                            variant="secondary"
                            className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                          >
                            View
                          </Button>
                        </Link>

                        <Link href={`/subscriptions/${row.id}/edit`} className="inline-block">
                          <Button className="bg-primary text-white hover:bg-primary-light">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollCard>
          </div>
        </div>
      </main>
    </>
  );
}
