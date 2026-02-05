import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollCard } from "@/components/ui/scroll-card";
import { deleteCheckinAction } from "@/app/(app)/subscriptions/[id]/checkins/delete-actions";
import { getSubscription } from "@/lib/db/subscriptions";
import { listCheckins } from "@/lib/db/checkins";
import { deleteSubscriptionAction } from "@/app/(app)/subscriptions/actions";
import { addCheckinAction } from "@/app/(app)/subscriptions/[id]/checkins/actions";

function formatNGN(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

function computeScore({
  amount_ngn,
  billing_cycle,
  recentUsedCount,
  avgValue,
}: {
  amount_ngn: number;
  billing_cycle: "monthly" | "yearly";
  recentUsedCount: number;
  avgValue: number | null;
}) {
  const monthlyCost =
    billing_cycle === "yearly" ? Math.round(amount_ngn / 12) : amount_ngn;

  if (recentUsedCount === 0) {
    return { label: "Cut" as const, costPerUse: null, monthlyCost };
  }
  if (avgValue !== null && avgValue <= 2) {
    return {
      label: "Cut" as const,
      costPerUse: Math.round(monthlyCost / recentUsedCount),
      monthlyCost,
    };
  }
  if (avgValue !== null && avgValue >= 4 && recentUsedCount >= 4) {
    return {
      label: "Good" as const,
      costPerUse: Math.round(monthlyCost / recentUsedCount),
      monthlyCost,
    };
  }
  return {
    label: "Watch" as const,
    costPerUse: Math.round(monthlyCost / recentUsedCount),
    monthlyCost,
  };
}

export default async function SubscriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sub = await getSubscription(id);
  const checkins = await listCheckins(id, 50);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  const recent = checkins.filter((c) => new Date(c.created_at) >= cutoff);
  const recentUsed = recent.filter((c) => c.used);
  const recentUsedCount = recentUsed.length;

  const avgValue =
    recent.length === 0
      ? null
      : recent.reduce((sum, c) => sum + c.value_rating, 0) / recent.length;

  const score = computeScore({
    amount_ngn: sub.amount_ngn,
    billing_cycle: sub.billing_cycle,
    recentUsedCount,
    avgValue,
  });

  const amountLabel =
    sub.billing_cycle === "yearly"
      ? `${formatNGN(sub.amount_ngn)} / year`
      : `${formatNGN(sub.amount_ngn)} / month`;

  const renewalLabel = sub.renewal_date ?? "—";
  const avgValueLabel = avgValue === null ? "—" : `${avgValue.toFixed(1)}/5`;
  const costPerUseLabel =
    score.costPerUse === null ? "—" : formatNGN(score.costPerUse);

  return (
    <>
      <Topbar title="Subscription" />

      <main className="min-h-[calc(100dvh-64px)] bg-bg-main">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">{sub.name}</h2>
              <p className="mt-1 text-sm text-text-muted">
                {sub.category} • {sub.billing_cycle} • {sub.status}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/subscriptions" className="inline-block">
                <Button
                  variant="secondary"
                  className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                >
                  Back
                </Button>
              </Link>

              <Link href={`/subscriptions/${id}/edit`} className="inline-block">
                <Button className="bg-primary text-white hover:bg-primary-light">
                  Edit
                </Button>
              </Link>

              <form action={deleteSubscriptionAction.bind(null, id)}>
                <Button
                  type="submit"
                  variant="secondary"
                  className="border border-border bg-bg-white text-accent hover:bg-bg-soft"
                >
                  Delete
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Summary */}
            <Card className="border-border bg-bg-white lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-text-muted">
                      Next renewal
                    </p>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {renewalLabel}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-text-muted">
                      Amount
                    </p>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {amountLabel}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-text-muted">
                      Reality score
                    </p>
                    <div className="mt-2">
                      <ScoreBadge score={score.label} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <MiniStat
                    label="30-day usage"
                    value={`${recentUsedCount} used`}
                  />
                  <MiniStat label="Cost per use" value={costPerUseLabel} />
                  <MiniStat label="Avg value" value={avgValueLabel} />
                </div>

                <div className="mt-6 rounded-lg border border-border bg-bg-main p-4">
                  <p className="text-sm font-semibold text-primary">Notes</p>
                  <p className="mt-2 text-sm text-text-muted">
                    {sub.notes?.trim() ? sub.notes : "No notes yet."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Add check-in */}
            <Card className="border-border bg-bg-white">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-semibold text-primary">
                  Add check-in
                </h3>
                <p className="text-sm text-text-muted">
                  Log usage + value. This updates the score.
                </p>

                <form action={addCheckinAction} className="space-y-3">
                  <input type="hidden" name="subscription_id" value={id} />

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-primary">
                      Used it?
                    </label>
                    <Select name="used" defaultValue="yes">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-primary">
                      Value (1–5)
                    </label>
                    <Select name="value_rating" defaultValue="3">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-primary">
                      Note (optional)
                    </label>
                    <Textarea name="note" placeholder="Short note..." />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary-light"
                  >
                    Save check-in
                  </Button>
                </form>

                <p className="text-xs text-text-muted">
                  Score uses your last 30 days.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Check-ins + Insights */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <ScrollCard
              title="Recent check-ins"
              right={
                <Badge className="border-0 bg-bg-soft text-primary">
                  {checkins.length}
                </Badge>
              }
              maxH="max-h-[420px]"
            >
              {checkins.length === 0 ? (
                <div className="rounded-lg border border-border bg-bg-main p-4">
                  <p className="text-sm font-semibold text-primary">
                    No check-ins yet
                  </p>
                  <p className="mt-1 text-sm text-text-muted">
                    Add one to start tracking this subscription.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {checkins.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-lg border border-border bg-bg-main p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-primary">
                          {new Date(c.created_at).toLocaleDateString()}
                        </p>

                        <div className="flex items-center gap-2">
                          <Badge className="border-0 bg-primary-light/20 text-primary">
                            Value {c.value_rating}/5
                          </Badge>

                          <form
                            action={deleteCheckinAction.bind(null, c.id, id)}
                          >
                            <Button
                              type="submit"
                              variant="secondary"
                              className="border border-border bg-bg-white px-3 py-1 text-xs font-semibold text-accent hover:bg-bg-soft"
                            >
                              Delete
                            </Button>
                          </form>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-text-muted">
                        Used: {c.used ? "Yes" : "No"}
                        {c.note?.trim() ? ` • ${c.note}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollCard>

            <Card className="border-border bg-bg-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-primary">Insights</h3>
                <p className="mt-1 text-sm text-text-muted">
                  Based on your last 30 days.
                </p>

                <div className="mt-5 space-y-3">
                  <InsightRow
                    tone={
                      score.label === "Cut"
                        ? "coral"
                        : score.label === "Good"
                          ? "mint"
                          : "purple"
                    }
                    title={`Score: ${score.label}`}
                    desc={
                      score.label === "Cut"
                        ? "Low usage or low value. Consider cancelling."
                        : score.label === "Good"
                          ? "High value and consistent usage."
                          : "Not clear yet. Keep tracking."
                    }
                  />

                  <InsightRow
                    tone="purple"
                    title="Cost per use"
                    desc={
                      score.costPerUse === null
                        ? "No usage in 30 days."
                        : `${costPerUseLabel} per use (est.).`
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-white p-4">
      <p className="text-xs font-semibold text-text-muted">{label}</p>
      <p className="mt-2 text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

function ScoreBadge({ score }: { score: "Good" | "Watch" | "Cut" }) {
  const cls =
    score === "Good"
      ? "bg-bg-soft text-primary"
      : score === "Watch"
        ? "bg-primary-light/20 text-primary"
        : "bg-accent/20 text-accent";
  return <Badge className={`border-0 ${cls}`}>{score}</Badge>;
}

function InsightRow({
  tone,
  title,
  desc,
}: {
  tone: "mint" | "purple" | "coral";
  title: string;
  desc: string;
}) {
  const dot =
    tone === "mint"
      ? "bg-bg-soft"
      : tone === "purple"
        ? "bg-primary-light"
        : "bg-accent";

  return (
    <div className="flex gap-3 rounded-lg border border-border bg-bg-main p-3">
      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <div>
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="mt-1 text-sm text-text-muted">{desc}</p>
      </div>
    </div>
  );
}
