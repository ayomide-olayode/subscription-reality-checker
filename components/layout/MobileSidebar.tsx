"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/config/nav";
import { cn } from "@/lib/cn";
import LogoutButton from "@/components/layout/LogoutButton";

export default function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* overlay */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* panel */}
      <aside
        className={cn(
          "absolute inset-y-0 left-0 w-70 border-r border-border bg-bg-white transition-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-dvh flex-col">
          <div className="px-6 py-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-primary">
                  Subscription Reality Checker
                </div>
                <div className="mt-1 text-xs text-text-muted">SaaS demo</div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-border bg-bg-white px-2 py-1 text-xs font-semibold text-primary hover:bg-bg-soft"
              >
                Close
              </button>
            </div>
          </div>

          <nav className="px-3 overflow-y-auto">
            <ul className="space-y-1 pb-4">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary text-white"
                          : "text-primary hover:bg-bg-soft"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          active ? "text-white" : "text-primary"
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-border p-4">
            <div className="rounded-lg border border-border bg-bg-main p-3">
              <p className="text-xs font-semibold text-primary">Account</p>
              <p className="mt-1 text-xs text-text-muted">Signed in</p>
              <div className="mt-3">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
