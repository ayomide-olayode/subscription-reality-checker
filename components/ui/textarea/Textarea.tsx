import * as React from "react";
import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export default function Textarea({ className, error, ...props}: TextareaProps) {
  return(
  <div className="w-full">
    <textarea
      className={cn(
        "min-h-24 w-full rounded-xl border px-3 py-2 text-sm outline-none transition-colors",
        "border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400",
        "focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
    {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
  </div>
  );
}
