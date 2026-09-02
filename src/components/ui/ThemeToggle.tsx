import { Sun, Moon, Monitor } from "lucide-react";
import type { Theme } from "@/types";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme preference"
      className="inline-flex items-center gap-1 rounded-xl bg-plum-50 dark:bg-plum-800 p-1"
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-white text-rose-600 shadow-soft dark:bg-plum-600 dark:text-lavender-200"
                : "text-plum-400 hover:text-plum-600 dark:hover:text-plum-100"
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {!compact && label}
          </button>
        );
      })}
    </div>
  );
}
