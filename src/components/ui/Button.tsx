import type { ButtonHTMLAttributes, ReactNode } from "react";.
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 shadow-soft disabled:bg-rose-300",
  secondary:
    "bg-lavender-200 text-plum-800 hover:bg-lavender-300 dark:bg-lavender-600 dark:text-white dark:hover:bg-lavender-500",
  outline:
    "border border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-lavender-400 dark:text-lavender-200 dark:hover:bg-plum-800",
  ghost:
    "text-plum-600 hover:bg-plum-50 dark:text-plum-100 dark:hover:bg-plum-800",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-5 py-3 gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-150",
        "disabled:cursor-not-allowed disabled:opacity-70",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
