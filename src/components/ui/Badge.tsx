import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "rose" | "lavender" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  lavender: "bg-lavender-100 text-lavender-600 dark:bg-lavender-500/20 dark:text-lavender-200",
  neutral: "bg-plum-50 text-plum-600 dark:bg-white/5 dark:text-plum-100",
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
