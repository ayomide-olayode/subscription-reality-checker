import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function WelcomePage() {
  return (
    <div>
      <section className="relative h-screen px-25">
        {/* BACKGROUND (clipped, cannot cause scroll) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Mint → transparent gradient wash */}
          <div className="absolute inset-0 bg-linear-to-b from-bg-soft to-transparent" />

          {/* Purple accent glow */}
          <div className="absolute -top-32 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-primary-light/40 blur-3xl" />

          {/* Coral glow */}
          <div className="absolute bottom-0 -right-40 h-90 w-90 rounded-full bg-accent/30 blur-3xl" />
        </div>

        {/* CONTENT */}
        <div className="relative h-full w-full px-6 py-10">
          {/* Badge (replaces inline-flex div) */}
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
                Track subscriptions, add quick usage and value check-ins, and
                see clearly what’s worth keeping — and what isn’t.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* Button (primary) */}
                <Link href="/signup" className="inline-block">
                  <Button className="bg-primary text-white hover:bg-primary-light">
                    Create account
                  </Button>
                </Link>

                {/* Button (secondary) */}
                <Link href="/login" className="inline-block">
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
                  {
                    title: "Total spend",
                    desc: "Monthly and yearly totals in one view.",
                  },
                  {
                    title: "Reality score",
                    desc: "Cost vs usage vs value, simplified.",
                  },
                  { title: "Top leaks", desc: "Know what to cancel first." },
                ].map((item) => (
                  <Card key={item.title} className="border-border bg-bg-white">
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold text-primary">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-text-muted">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Preview card */}
            <Card className="border-border bg-bg-white">
              <CardContent className="p-6">
                <p className="text-sm font-semibold text-primary">This month</p>
                <p className="mt-1 text-3xl font-semibold text-primary">
                  ₦38,400
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  6 active subscriptions
                </p>

                <div className="mt-6 space-y-3">
                  <Card className="border-border bg-bg-white">
                    <CardContent className="flex items-center justify-between gap-4 p-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          AI Tool
                        </p>
                        <p className="text-xs text-text-muted">
                          2 uses → ₦6,000 / use
                        </p>
                      </div>

                      {/* Cut badge */}
                      <Badge className="border-0 bg-accent/20 text-accent">
                        Cut
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-bg-white">
                    <CardContent className="flex items-center justify-between gap-4 p-3">
                      <div>
                        <p className="text-sm font-semibold text-primary">
                          Streaming
                        </p>
                        <p className="text-xs text-text-muted">
                          18 uses → ₦250 / use
                        </p>
                      </div>

                      {/* Keep badge */}
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
            <Link href="#" className="underline">
              OLAYODE AYOMIDE OLUWAFERANMI
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
