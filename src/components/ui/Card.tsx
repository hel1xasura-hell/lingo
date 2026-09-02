import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface dark:bg-surface-dark shadow-soft dark:shadow-soft-dark",
        "border border-plum-100/60 dark:border-white/5",
        padded && "p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
