import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 text-sm",
  {
    variants: {
      variant: {
        info: "border-blue-200 bg-blue-50 text-blue-800",
        success: "border-green-200 bg-green-50 text-green-800",
        warning: "border-amber-200 bg-amber-50 text-amber-800",
        danger: "border-red-200 bg-red-50 text-red-800",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

export function AlertTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className="mb-1 font-semibold" {...props} />;
}

export function AlertDescription(
  props: React.HTMLAttributes<HTMLParagraphElement>
) {
  return <p className="text-sm opacity-90" {...props} />;
}
