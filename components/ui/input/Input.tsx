import * as React from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export default function Input({ className, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          "h-10 w-full rounded-xl border px-3 text-sm outline-none transition-colors",
          "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400",
          "focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20",
          error && "border-red-500 focus:border-red-600 focus:ring-red-600/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      />
      {error ? (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
