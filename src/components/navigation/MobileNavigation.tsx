import { NavLink } from "react-router-dom";
import { MOBILE_NAV_ITEMS } from "./navItems";
import { NavIcon } from "./navIcon";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 bottom-0 z-20 flex justify-around border-t lg:hidden",
        "border-plum-100/60 dark:border-white/5 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur",
        "pb-[env(safe-area-inset-bottom)]"
      )}
    >
      {MOBILE_NAV_ITEMS.map((item) => {
        if (!item.enabled) {
          return (
            <div
              key={item.path}
              aria-disabled="true"
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-plum-300 dark:text-plum-500"
            >
              <NavIcon icon={item.icon} className="h-5 w-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </div>
          );
        }

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-plum-400 dark:text-plum-300",
                isActive && "text-rose-600 dark:text-rose-300"
              )
            }
          >
            <NavIcon icon={item.icon} className="h-5 w-5" />
            <span className="text-[11px] font-medium">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
