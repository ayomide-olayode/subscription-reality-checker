import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex max-w-3xl flex-col px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Subscription Reality Checker
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
          See what you pay for, what you use, and what to cut.
        </h1>

        <p className="mt-4 text-sm text-neutral-600">
          Track subscriptions, add quick check-ins, and get a clear “keep vs cut”
          view.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/signup"
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Create account
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Log in
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Total spend", d: "Monthly and yearly totals in one view." },
            { t: "Reality score", d: "Cost vs usage vs value, made clear." },
            { t: "Top leaks", d: "See what to cancel first." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border border-neutral-200 bg-white p-4">
              <p className="text-sm font-semibold text-neutral-900">{x.t}</p>
              <p className="mt-1 text-sm text-neutral-600">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
