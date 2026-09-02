import { useEffect, useState } from "react";
import { BookOpen, Star, PenSquare, Target } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import {
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
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";

interface DashboardProfile {
  username: string;
  english_level: string;
  xp: number;
  streak: number;
}

export function Dashboard() {
  const greeting = getGreeting();

  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          return;
        }

        const data = await getProfile(user.id);

        setProfile({
          username: data.username,
          english_level: data.english_level,
          xp: data.xp ?? 0,
          streak: data.streak ?? 0,
        });
      } catch (error) {
        console.error("Unable to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const username = loading ? "..." : profile?.username ?? "Learner";
  const englishLevel = profile?.english_level ?? "A1";
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          {greeting} 👋, {username}
        </h1>

        <p className="mt-1 text-plum-400">
          Ready to improve your English today?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StreakCard
          currentStreak={streak}
          longestStreak={streak}
          weeklyActivity={[false, false, false, false, false, false, false]}
        />

        <DailyGoalCard
          completed={mockDailyGoal.completed}
          total={mockDailyGoal.total}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DashboardStatCard
          icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
          label="Words Learned"
          value="0"
        />

        <DashboardStatCard
          icon={<Star className="h-5 w-5" aria-hidden="true" />}
          label="XP"
          value={xp.toLocaleString()}
          accent="lavender"
        />

        <DashboardStatCard
          icon={<PenSquare className="h-5 w-5" aria-hidden="true" />}
          label="Grammar Progress"
          value="0%"
        />

        <DashboardStatCard
          icon={<Target className="h-5 w-5" aria-hidden="true" />}
          label="English Level"
          value={englishLevel}
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
        <CoupleProgressCard
          partners={mockPartners}
          togetherStreak={mockTogetherStreak}
        />
      </div>
    </div>
  );
          }
