import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface DashboardStatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  accent?: "rose" | "lavender";
}

export function DashboardStatCard({ icon, label, value, accent = "rose" }: DashboardStatCardProps) {
  return (
    <Card className="animate-fade-slide-up" padded>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            accent === "rose"
              ? "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-200"
              : "bg-lavender-100 text-lavender-600 dark:bg-lavender-500/15 dark:text-lavender-200"
          )}
        >
          {icon}
        </div>
        <div>
          <p className="text-lg font-semibold leading-tight">{value}</p>
          <p className="text-xs text-plum-400">{label}</p>
        </div>
      </div>
    </Card>
  );
}
