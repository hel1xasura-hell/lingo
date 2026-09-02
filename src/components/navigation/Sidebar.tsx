import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { SIDEBAR_ITEMS } from "./navItems";
import { NavIcon } from "./navIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-plum-100/60 dark:border-white/5 lg:bg-surface dark:bg-surface-dark lg:px-4 lg:py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white">
          <GraduationCap className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="font-display text-lg font-semibold">Lingo</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Primary">
        {SIDEBAR_ITEMS.map((item) => {
          if (!item.enabled) {
            return (
              <div
                key={item.path}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-plum-300 dark:text-plum-400"
                aria-disabled="true"
              >
                <span className="flex items-center gap-3">
                  <NavIcon icon={item.icon} className="h-[18px] w-[18px]" />
                  {item.label}
                </span>
                <span className="rounded-full bg-plum-50 dark:bg-white/5 px-2 py-0.5 text-[10px] font-medium">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-200"
                    : "text-plum-600 hover:bg-plum-50 dark:text-plum-100 dark:hover:bg-white/5"
                )
              }
            >
              <NavIcon icon={item.icon} className="h-[18px] w-[18px]" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-plum-100/60 dark:border-white/5 pt-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}
