import * as React from "react";
import { cn } from "@/lib/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export default function Select({
  className,
  error,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      <select
        className={cn(
          "h-10 w-full appearance-none rounded-xl border px-3 pr-10 text-sm outline-none transition-colors",
          "border-neutral-200 bg-white text-neutral-900",
          "focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20",
          error && "border-red-500 focus:border-red-600 focus:ring-red-600/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      >
        {children}
      </select>

      {/* simple chevron indicator */}
      <div className="pointer-events-none relative -mt-10 flex h-10 items-center justify-end pr-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-neutral-500"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
