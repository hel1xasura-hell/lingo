import { forwardRef, useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, type = "text", id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword && showPassword ? "text" : type;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-plum-600 dark:text-plum-100">
          {label}
        </label>
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={resolvedType}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              "w-full rounded-xl border bg-white dark:bg-plum-800 px-4 py-2.5 text-sm",
              "text-ink-light dark:text-ink-dark placeholder:text-plum-400/70",
              "border-plum-100 dark:border-white/10 focus:border-rose-400 dark:focus:border-lavender-400",
              "transition-colors outline-none",
              error && "border-rose-600 focus:border-rose-600",
              isPassword && "pr-11",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-plum-400 hover:text-plum-600 dark:hover:text-plum-100"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-xs text-rose-600 dark:text-rose-300">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="text-xs text-plum-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
