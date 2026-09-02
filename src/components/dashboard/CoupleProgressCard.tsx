import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { PartnerProgress } from "@/types";

interface CoupleProgressCardProps {
  partners: PartnerProgress[];
  togetherStreak: number;
}

export function CoupleProgressCard({ partners, togetherStreak }: CoupleProgressCardProps) {
  return (
    <Card className="animate-fade-slide-up">
      <h3 className="font-display text-lg font-semibold">💕 Our Progress</h3>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="rounded-xl bg-plum-50 dark:bg-white/5 p-3 text-center"
          >
            <p className="text-2xl" aria-hidden="true">
              {partner.countryFlag}
            </p>
            <p className="mt-1 text-sm font-medium">{partner.name}</p>
            <p className="mt-1 text-xs text-plum-400">⭐ {partner.xp.toLocaleString()} XP</p>
            <p className="text-xs text-plum-400">🔥 {partner.streak} day streak</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm font-medium text-rose-600 dark:text-rose-300">
        Together streak: 💕 {togetherStreak} days
      </p>

      <button
        type="button"
        disabled
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-plum-200 dark:border-white/10 py-2 text-sm text-plum-400 cursor-not-allowed"
        aria-disabled="true"
        title="Coming soon"
      >
        View leaderboard
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </Card>
  );
}
