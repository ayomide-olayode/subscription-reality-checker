import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollCard } from "@/components/ui/scroll-card";

import { listSubscriptions } from "@/lib/db/subscriptions";
import { listRecentCheckinsForSubscriptions } from "@/lib/db/checkins";

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}
function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}
function formatNGN(amount: number) {
  return `₦${amount.toLocaleString()}`;
}
function monthlyCost(amount_ngn: number, billing: "monthly" | "yearly") {
  return billing === "yearly" ? Math.round(amount_ngn / 12) : amount_ngn;
}

type Score = "Good" | "Watch" | "Cut";

function computeScore(monthly: number, usedCount: number, avgValue: number | null): Score {
  // simple, readable rules
  if (usedCount === 0) return "Cut";
  if (avgValue !== null && avgValue <= 2) return "Cut";
  if (avgValue !== null && avgValue >= 4 && usedCount >= 4) return "Good";
  if (monthly >= 15000 && usedCount <= 1) return "Cut";
  return "Watch";
}

export default async function DashboardPage() {
  const subs = await listSubscriptions();
  const active = subs.filter((s) => s.status === "active");

  const monthlyEstimate = active.reduce((sum, s) => sum + monthlyCost(s.amount_ngn, s.billing_cycle), 0);
  const yearlyEstimate = active.reduce((sum, s) => {
    return sum + (s.billing_cycle === "yearly" ? s.amount_ngn : s.amount_ngn * 12);
  }, 0);

  const ids = active.map((s) => s.id);
  const recentCheckins = await listRecentCheckinsForSubscriptions(ids, 30);

  // group checkins by subscription_id
  const bySub = new Map<string, typeof recentCheckins>();
  for (const c of recentCheckins) {
    const arr = bySub.get(c.subscription_id) ?? [];
    arr.push(c);
    bySub.set(c.subscription_id, arr);
  }

  const scored = active.map((s) => {
    const list = bySub.get(s.id) ?? [];
    const usedCount = list.filter((x) => x.used).length;
    const avgValue = list.length ? list.reduce((a, x) => a + x.value_rating, 0) / list.length : null;

    const m = monthlyCost(s.amount_ngn, s.billing_cycle);
    const score = computeScore(m, usedCount, avgValue);

    return {
      ...s,
      monthly: m,
      usedCount,
      avgValue,
      score,
    };
  });

  // renewals next 14 days
  const todayISO = toISODate(new Date());
  const dueISO = toISODate(daysFromNow(14));

  const renewSoon = active
    .filter((s) => s.renewal_date && s.renewal_date >= todayISO && s.renewal_date <= dueISO)
    .sort((a, b) => (a.renewal_date || "").localeCompare(b.renewal_date || ""))
    .slice(0, 20);

  // Top leaks = Cut, sorted by monthly cost desc
  const leaks = scored
    .filter((s) => s.score === "Cut")
    .sort((a, b) => b.monthly - a.monthly);

  // Recommendations = Cut first, then Watch; sorted by monthly cost
  const recs = [...scored]
    .filter((s) => s.score !== "Good")
    .sort((a, b) => {
      const prio = (x: Score) => (x === "Cut" ? 0 : x === "Watch" ? 1 : 2);
      return prio(a.score) - prio(b.score) || b.monthly - a.monthly;
    })
    .slice(0, 6);

  return (
    <>
      <Topbar title="Dashboard" />

      <main className="min-h-[calc(100dvh-64px)] bg-bg-main">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">Overview</h2>
              <p className="mt-1 text-sm text-text-muted">
                Monthly spend, renewals, and decisions based on the last 30 days.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/subscriptions/new" className="inline-block">
                <Button className="bg-primary text-white hover:bg-primary-light">
                  Add subscription
                </Button>
              </Link>

              <Link href="/subscriptions" className="inline-block">
                <Button
                  variant="secondary"
                  className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                >
                  View all
                </Button>
              </Link>
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="This month (est.)" value={formatNGN(monthlyEstimate)} hint="Active only" tone="primary" />
            <KpiCard title="Yearly (est.)" value={formatNGN(yearlyEstimate)} hint="Active only" tone="purple" />
            <KpiCard title="Active subs" value={`${active.length}`} hint={`${recentCheckins.length} check-ins (30d)`} tone="mint" />
            <KpiCard title="Top leaks" value={`${leaks.length}`} hint="Score = Cut" tone="coral" />
          </div>

          {/* Top grid */}
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Renewals */}
            <div className="lg:col-span-2">
              <ScrollCard
                title="Upcoming renewals"
                right={<Badge className="border-0 bg-bg-soft text-primary">{renewSoon.length} due</Badge>}
                maxH="max-h-[460px]"
              >
                {renewSoon.length === 0 ? (
                  <div className="rounded-lg border border-border bg-bg-main p-4">
                    <p className="text-sm font-semibold text-primary">No renewals soon</p>
                    <p className="mt-1 text-sm text-text-muted">
                      Add renewal dates to subscriptions to see them here.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {renewSoon.map((x) => (
                      <div
                        key={x.id}
                        className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-primary">{x.name}</p>
                          <p className="mt-1 text-xs text-text-muted">Renews {x.renewal_date}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <p className="text-sm font-semibold text-primary">{formatNGN(x.amount_ngn)}</p>
                          <Link href={`/subscriptions/${x.id}`} className="inline-block">
                            <Button
                              variant="secondary"
                              className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollCard>
            </div>

            {/* Quick guidance */}
            <Card className="border-border bg-bg-white">
              <CardContent className="p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-primary">Next best action</h3>
                <p className="mt-1 text-sm text-text-muted">
                  Add a check-in on subscriptions you’re unsure about.
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-lg border border-border bg-bg-main p-3">
                    <p className="text-xs font-semibold text-primary">Rule of thumb</p>
                    <p className="mt-1 text-sm text-text-muted">
                      No usage in 30 days = probably Cut.
                    </p>
                  </div>

                  <Link href="/subscriptions" className="inline-block w-full">
                    <Button className="w-full bg-primary text-white hover:bg-primary-light">
                      Add check-ins
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom grid */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {/* Spend by category */}
            <Card className="border-border bg-bg-white">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-primary">Spend by category</h3>
                  <Badge className="border-0 bg-primary-light/20 text-primary">Live</Badge>
                </div>

                <div className="mt-5 space-y-3">
                  {groupByCategory(active).map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-sm">
                        <p className="font-semibold text-primary">{row.label}</p>
                        <p className="text-text-muted">{row.pct}%</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-bg-main">
                        <div
                          className="h-2 rounded-full bg-primary-light"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <ScrollCard
              title="Recommendations"
              right={<Badge className="border-0 bg-primary-light/20 text-primary">Live</Badge>}
              maxH="max-h-[360px]"
            >
              <p className="text-sm text-text-muted">
                Based on your last 30 days check-ins.
              </p>

              <div className="mt-4 space-y-3">
                {recs.length === 0 ? (
                  <div className="rounded-lg border border-border bg-bg-main p-3">
                    <p className="text-sm font-semibold text-primary">No recommendations yet</p>
                    <p className="mt-1 text-xs text-text-muted">
                      Add check-ins to get keep/watch/cut suggestions.
                    </p>
                  </div>
                ) : (
                  recs.map((s) => (
                    <ActionRow
                      key={s.id}
                      title={`${s.score}: ${s.name}`}
                      desc={
                        s.score === "Cut"
                          ? `Low usage. Monthly cost ~ ${formatNGN(s.monthly)}.`
                          : `Not clear yet. Monthly cost ~ ${formatNGN(s.monthly)}.`
                      }
                      badge={s.score}
                      href={`/subscriptions/${s.id}`}
                    />
                  ))
                )}
              </div>
            </ScrollCard>
          </div>
        </div>
      </main>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function groupByCategory(subs: any[]) {
  const totals = new Map<string, number>();
  let sum = 0;

  for (const s of subs) {
    const v = s.billing_cycle === "yearly" ? Math.round(s.amount_ngn / 12) : s.amount_ngn;
    sum += v;
    totals.set(s.category, (totals.get(s.category) || 0) + v);
  }

  const rows = Array.from(totals.entries())
    .map(([label, value]) => ({
      label,
      value,
      pct: sum === 0 ? 0 : Math.round((value / sum) * 100),
    }))
    .sort((a, b) => b.value - a.value);

  return rows.length ? rows : [{ label: "—", value: 0, pct: 0 }];
}

function KpiCard({
  title,
  value,
  hint,
  tone,
}: {
  title: string;
  value: string;
  hint: string;
  tone: "primary" | "purple" | "mint" | "coral";
}) {
  const pill =
    tone === "primary"
      ? "bg-primary-light/20 text-primary"
      : tone === "purple"
      ? "bg-primary-light/25 text-primary"
      : tone === "mint"
      ? "bg-bg-soft text-primary"
      : "bg-accent/20 text-accent";

  return (
    <Card className="border-border bg-bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-text-muted">{title}</p>
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${pill}`}>
            {tone === "coral" ? "Cut" : "Active"}
          </span>
        </div>
        <p className="mt-2 text-2xl font-semibold text-primary">{value}</p>
        <p className="mt-2 text-xs text-text-muted">{hint}</p>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: "Good" | "Watch" | "Cut" }) {
  const cls =
    status === "Good"
      ? "bg-bg-soft text-primary"
      : status === "Watch"
      ? "bg-primary-light/20 text-primary"
      : "bg-accent/20 text-accent";

  return <Badge className={`border-0 ${cls}`}>{status}</Badge>;
}

function ActionRow({
  title,
  desc,
  badge,
  href,
}: {
  title: string;
  desc: string;
  badge: "Good" | "Watch" | "Cut";
  href: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-bg-main p-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <p className="mt-1 text-xs text-text-muted">{desc}</p>
      </div>

      <div className="flex items-center gap-2">
        <StatusBadge status={badge} />
        <Link href={href} className="inline-block">
          <Button
            variant="secondary"
            className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
          >
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
