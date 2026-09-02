import { Card } from "@/components/ui/Card";
import { WEEKDAY_LABELS } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: boolean[];
}

export function StreakCard({ currentStreak, longestStreak, weeklyActivity }: StreakCardProps) {
  return (
    <Card className="animate-fade-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-plum-400">Current streak</p>
          <p className="mt-1 font-display text-2xl font-semibold">
            <span className="mr-1 inline-block motion-safe:animate-flicker" aria-hidden="true">
              🔥
            </span>
            {currentStreak} Day Streak
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-plum-400">Longest</p>
          <p className="font-semibold">{longestStreak} days</p>
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-1.5" role="img" aria-label={`${weeklyActivity.filter(Boolean).length} of 7 days active this week`}>
        {WEEKDAY_LABELS.map((label, index) => {
          const isActive = weeklyActivity[index];
          return (
            <div key={`${label}-${index}`} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  isActive
                    ? "bg-rose-500 text-white"
                    : "bg-plum-50 text-plum-300 dark:bg-white/5 dark:text-plum-500"
                )}
              >
                {isActive ? "✓" : ""}
              </div>
              <span className="text-[11px] text-plum-400">{label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
