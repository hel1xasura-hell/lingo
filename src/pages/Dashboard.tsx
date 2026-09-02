import { BookOpen, Star, PenSquare, Target } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import {
  mockUser,
  mockDailyGoal,
  mockContinueLearning,
  mockDailyWord,
  mockPartners,
  mockTogetherStreak,
} from "@/data/mockData";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { DailyGoalCard } from "@/components/dashboard/DailyGoalCard";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { VocabularyCard } from "@/components/dashboard/VocabularyCard";
import { CoupleProgressCard } from "@/components/dashboard/CoupleProgressCard";

export function Dashboard() {
  const greeting = getGreeting();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          {greeting} 👋, {mockUser.username}
        </h1>
        <p className="mt-1 text-plum-400">Ready to improve your English today?</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StreakCard
          currentStreak={mockUser.streak}
          longestStreak={mockUser.longestStreak}
          weeklyActivity={mockUser.weeklyActivity}
        />
        <DailyGoalCard completed={mockDailyGoal.completed} total={mockDailyGoal.total} />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DashboardStatCard
          icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
          label="Words Learned"
          value={mockUser.wordsLearned.toLocaleString()}
        />
        <DashboardStatCard
          icon={<Star className="h-5 w-5" aria-hidden="true" />}
          label="XP"
          value={mockUser.xp.toLocaleString()}
          accent="lavender"
        />
        <DashboardStatCard
          icon={<PenSquare className="h-5 w-5" aria-hidden="true" />}
          label="Grammar Progress"
          value={`${mockUser.grammarProgress}%`}
        />
        <DashboardStatCard
          icon={<Target className="h-5 w-5" aria-hidden="true" />}
          label="English Level"
          value={mockUser.englishLevel}
          accent="lavender"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContinueLearningCard item={mockContinueLearning} />
        </div>
        <VocabularyCard word={mockDailyWord} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CoupleProgressCard partners={mockPartners} togetherStreak={mockTogetherStreak} />
      </div>
    </div>
  );
}
