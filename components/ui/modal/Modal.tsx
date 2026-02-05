"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  // Focus management: when modal opens, focus the panel so keyboard users land inside it.
  React.useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);

  // Escape key closes modal
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
    >
      {/* Overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal"
        onClick={() => {
          if (closeOnOverlayClick) onClose();
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-md outline-none",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-5">
          <div>
            {title ? (
              <h2 className="text-base font-semibold">{title}</h2>
            ) : null}
          </div>

          <button
            type="button"
            className="rounded-lg px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="p-5">{children}</div>

        {footer ? (
          <div className="border-t border-neutral-200 p-5">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
