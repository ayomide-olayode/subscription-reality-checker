import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function WelcomePage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-bg-main">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-bg-soft to-transparent" />
        <div className="absolute -top-48 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-light/25 blur-3xl sm:h-96 sm:w-96 lg:h-[520px] lg:w-[520px]" />
        <div className="absolute -bottom-56 -right-48 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        {/* =======================
           MOBILE / TABLET (new)
           ======================= */}
        <div className="lg:hidden">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="gap-2 border border-border bg-bg-white text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
              Subscription Reality Checker
            </Badge>
          </div>

          {/* Hero */}
          <div className="mx-auto mt-8 max-w-[22rem] text-center sm:max-w-xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-primary sm:text-5xl">
              See what you pay for.
              <span className="mt-2 block text-primary-light">
                Decide what to keep.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-[20rem] text-sm leading-6 text-text-muted sm:max-w-md sm:text-base">
              Track subscriptions, add quick usage and value check-ins, and see
              clearly what’s worth keeping — and what isn’t.
            </p>

            {/* CTAs */}
            <div className="mt-7 grid gap-3">
              <Link href="/signup?next=/dashboard" className="w-full">
                <Button className="h-11 w-full bg-primary text-white hover:bg-primary-light">
                  Create account
                </Button>
              </Link>

              <Link href="/login?next=/dashboard" className="w-full">
                <Button
                  variant="secondary"
                  className="h-11 w-full border border-border bg-bg-white text-primary hover:bg-bg-soft"
                >
                  Log in
                </Button>
              </Link>

              <p className="text-xs text-text-muted">Email + password only</p>
            </div>
          </div>

          {/* Features (swipe row on mobile, grid on sm) */}
          <div className="mx-auto mt-10 max-w-6xl">
            <div className="flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
              {[
                { title: "Total spend", desc: "Monthly and yearly totals in one view." },
                { title: "Reality score", desc: "Cost vs usage vs value, simplified." },
                { title: "Top leaks", desc: "Know what to cancel first." },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="min-w-[260px] border-border bg-bg-white sm:min-w-0"
                >
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold text-primary">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview card */}
          <div className="mx-auto mt-8 max-w-md">
            <Card className="border-border bg-bg-white">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-text-muted">This month</p>
                    <p className="mt-1 text-3xl font-semibold text-primary">
                      ₦38,400
                    </p>
                    <p className="mt-2 text-sm text-text-muted">
                      6 active subscriptions
                    </p>
                  </div>

                  <Badge className="border-0 bg-primary-light/15 text-primary">
                    Live preview
                  </Badge>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-border bg-bg-main p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-primary">AI Tool</p>
                      <Badge className="border-0 bg-accent/20 text-accent">Cut</Badge>
                    </div>
                    <p className="mt-1 text-xs text-text-muted">
                      2 uses → ₦6,000 / use
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-bg-main p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-primary">Streaming</p>
                      <Badge className="border-0 bg-bg-soft text-primary">Keep</Badge>
                    </div>
                    <p className="mt-1 text-xs text-text-muted">
                      18 uses → ₦250 / use
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs text-text-muted">
              Built as a portfolio SaaS project by{" "}
              <span className="font-semibold text-primary">
                OLAYODE AYOMIDE OLUWAFERANMI
              </span>
              .
            </p>
          </div>
        </div>

        {/* =======================
           DESKTOP (old layout)
           ======================= */}
        <div className="hidden lg:block">
          {/* Badge */}
          <Badge className="gap-2 border border-border bg-bg-white text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            Subscription Reality Checker
          </Badge>

          <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-semibold leading-tight text-primary sm:text-5xl">
                See what you pay for.
                <span className="block text-primary-light">
                  Decide what to keep.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-text-muted">
                Track subscriptions, add quick usage and value check-ins, and see
                clearly what’s worth keeping — and what isn’t.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/signup?next=/dashboard" className="inline-block">
                  <Button className="bg-primary text-white hover:bg-primary-light">
                    Create account
                  </Button>
                </Link>

                <Link href="/login?next=/dashboard" className="inline-block">
                  <Button
                    variant="secondary"
                    className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                  >
                    Log in
                  </Button>
                </Link>

                <span className="text-xs text-text-muted">
                  Email + password only
                </span>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Total spend", desc: "Monthly and yearly totals in one view." },
                  { title: "Reality score", desc: "Cost vs usage vs value, simplified." },
                  { title: "Top leaks", desc: "Know what to cancel first." },
                ].map((item) => (
                  <Card key={item.title} className="border-border bg-bg-white">
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold text-primary">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-text-muted">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Preview card */}
            <Card className="border-border bg-bg-white">
              <CardContent className="p-6">
                <p className="text-sm font-semibold text-primary">This month</p>
                <p className="mt-1 text-3xl font-semibold text-primary">₦38,400</p>
                <p className="mt-2 text-sm text-text-muted">6 active subscriptions</p>

                <div className="mt-6 space-y-3">
                  <Card className="border-border bg-bg-white">
                    <CardContent className="flex items-center justify-between gap-4 p-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">AI Tool</p>
                        <p className="text-xs text-text-muted">2 uses → ₦6,000 / use</p>
                      </div>
                      <Badge className="border-0 bg-accent/20 text-accent">
                        Cut
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-bg-white">
                    <CardContent className="flex items-center justify-between gap-4 p-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">Streaming</p>
                        <p className="text-xs text-text-muted">18 uses → ₦250 / use</p>
                      </div>
                      <Badge className="border-0 bg-bg-soft text-primary">
                        Keep
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="mt-16 text-xs text-text-muted">
            Built as a portfolio SaaS project by{" "}
            <span className="font-semibold text-primary">
              OLAYODE AYOMIDE OLUWAFERANMI
            </span>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
