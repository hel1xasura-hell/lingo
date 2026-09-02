import { ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ContinueLearningItem } from "@/types";

interface ContinueLearningCardProps {
  item: ContinueLearningItem;
}

export function ContinueLearningCard({ item }: ContinueLearningCardProps) {
  return (
    <Card className="animate-fade-slide-up bg-gradient-to-br from-rose-50 to-lavender-100/60 dark:from-plum-800 dark:to-plum-800">
      <p className="text-sm text-plum-400">Continue Learning</p>
      <h3 className="mt-1 font-display text-2xl font-semibold">{item.title}</h3>
      <div className="mt-2 flex items-center gap-2 text-sm text-plum-500 dark:text-plum-100">
        <Badge variant="rose">{item.category}</Badge>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {item.durationMinutes} minutes
        </span>
      </div>
      <Button className="mt-5" rightIcon={<ArrowRight className="h-4 w-4" />}>
        Continue
      </Button>
    </Card>
  );
}
