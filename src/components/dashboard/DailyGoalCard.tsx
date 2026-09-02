import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface DailyGoalCardProps {
  completed: number;
  total: number;
}

export function DailyGoalCard({ completed, total }: DailyGoalCardProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card className="animate-fade-slide-up">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Today's Goal</h3>
        <span className="text-sm font-medium text-rose-600 dark:text-rose-300">
          {completed} / {total} activities
        </span>
      </div>
      <div className="mt-4">
        <ProgressBar value={percent} label="Today's goal progress" />
        <p className="mt-2 text-sm text-plum-400">{percent}% complete</p>
      </div>
    </Card>
  );
}
