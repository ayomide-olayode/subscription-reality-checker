import Topbar from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" />

      <main className="min-h-[calc(100dvh-64px)] bg-bg-main">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border bg-bg-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-primary">Account</h3>
                <p className="mt-1 text-sm text-text-muted">
                  Profile details (UI only for now).
                </p>

                <div className="mt-5 space-y-3">
                  <Row label="Email" value="you@example.com" />
                  <Row label="Plan" value="Free (demo)" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-bg-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-primary">
                  Preferences
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  We’ll wire these later.
                </p>

                <div className="mt-5 space-y-3">
                  <Row label="Currency" value="NGN" />
                  <Row label="Renewal reminders" value="Off" />
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="bg-primary text-white hover:bg-primary-light">
                    Save changes
                  </Button>

                  <Button
                    variant="secondary"
                    className="border border-border bg-bg-white text-primary hover:bg-bg-soft"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-bg-main p-3">
      <p className="text-sm font-semibold text-primary">{label}</p>
      <p className="text-sm text-text-muted">{value}</p>
    </div>
  );
}
