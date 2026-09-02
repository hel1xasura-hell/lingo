import { Home, BookOpen, Brain, BookMarked, PenLine, Trophy, User, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NavItemConfig } from "./navItems";

const ICON_MAP: Record<NavItemConfig["icon"], LucideIcon> = {
  home: Home,
  "book-open": BookOpen,
  brain: Brain,
  "book-marked": BookMarked,
  "pen-line": PenLine,
  trophy: Trophy,
  user: User,
  settings: Settings,
};

export function NavIcon({ icon, className }: { icon: NavItemConfig["icon"]; className?: string }) {
  const Icon = ICON_MAP[icon];
  return <Icon className={className} aria-hidden="true" />;
}
