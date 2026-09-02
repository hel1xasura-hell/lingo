export interface NavItemConfig {
  label: string;
  path: string;
  icon:
    | "home"
    | "book-open"
    | "brain"
    | "book-marked"
    | "pen-line"
    | "trophy"
    | "user"
    | "settings";
  enabled: boolean;
}

export const SIDEBAR_ITEMS: NavItemConfig[] = [
  { label: "Dashboard", path: "/dashboard", icon: "home", enabled: true },
  { label: "Learn", path: "/learn", icon: "book-open", enabled: false },
  { label: "Practice", path: "/practice", icon: "brain", enabled: false },
  { label: "Dictionary", path: "/dictionary", icon: "book-marked", enabled: false },
  { label: "Essays", path: "/essays", icon: "pen-line", enabled: false },
  { label: "Leaderboard", path: "/leaderboard", icon: "trophy", enabled: false },
  { label: "Profile", path: "/profile", icon: "user", enabled: true },
  { label: "Settings", path: "/settings", icon: "settings", enabled: false },
];

export const MOBILE_NAV_ITEMS: NavItemConfig[] = [
  { label: "Home", path: "/dashboard", icon: "home", enabled: true },
  { label: "Learn", path: "/learn", icon: "book-open", enabled: false },
  { label: "Practice", path: "/practice", icon: "brain", enabled: false },
  { label: "Leaderboard", path: "/leaderboard", icon: "trophy", enabled: false },
  { label: "Profile", path: "/profile", icon: "user", enabled: true },
];
