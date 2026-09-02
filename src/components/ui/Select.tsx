import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className, children, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-plum-600 dark:text-plum-100">
          {label}
        </label>
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "w-full appearance-none rounded-xl border bg-white dark:bg-plum-800 px-4 py-2.5 pr-10 text-sm",
              "text-ink-light dark:text-ink-dark border-plum-100 dark:border-white/10",
              "focus:border-rose-400 dark:focus:border-lavender-400 transition-colors outline-none",
              error && "border-rose-600 focus:border-rose-600",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-plum-400"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p id={errorId} className="text-xs text-rose-600 dark:text-rose-300">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
