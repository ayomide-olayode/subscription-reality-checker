"use client";

import { useState } from "react";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default function Topbar({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-start gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-0.5 inline-flex rounded-lg border border-border bg-bg-white px-2 py-1 text-xs font-semibold text-primary hover:bg-bg-soft lg:hidden"
            >
              Menu
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-primary">
                {title}
              </h1>
              <p className="mt-1 text-xs text-text-muted">
                Track spend, usage, and value.
              </p>
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
