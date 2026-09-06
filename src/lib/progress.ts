import {
  getLocalProgress,
  saveLocalProgress,
  type LocalProgress,
} from "./storage/progressStore";

const DEFAULT_DAILY_GOAL = 20;

function createDefaultProgress(userId: string): LocalProgress {
  return {
    id: `progress:${userId}`,
    userId,

    xp: 0,
    streak: 0,

    dailyXp: 0,
    dailyGoal: DEFAULT_DAILY_GOAL,

    lessonsCompleted: 0,
    exercisesCompleted: 0,

    englishLevel: "",
    targetLevel: "",

    updatedAt: new Date().toISOString(),
  };
}

export async function getProgress(
  userId: string,
): Promise<LocalProgress> {
  const existing = await getLocalProgress(userId);

  if (existing) {
    return existing;
  }

  const progress = createDefaultProgress(userId);
  await saveLocalProgress(progress);

  return progress;
}

export async function addXp(
  userId: string,
  amount: number,
): Promise<LocalProgress> {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("XP amount must be greater than zero.");
  }

  const progress = await getProgress(userId);

  const updated: LocalProgress = {
    ...progress,
    xp: progress.xp + Math.round(amount),
    dailyXp: progress.dailyXp + Math.round(amount),
    updatedAt: new Date().toISOString(),
  };

  await saveLocalProgress(updated);

  return updated;
}

export async function completeLesson(
  userId: string,
  xp = 10,
): Promise<LocalProgress> {
  const progress = await addXp(userId, xp);

  const updated: LocalProgress = {
    ...progress,
    lessonsCompleted: progress.lessonsCompleted + 1,
    updatedAt: new Date().toISOString(),
  };

  await saveLocalProgress(updated);

  return updated;
}

export async function completeExercise(
  userId: string,
  xp = 5,
): Promise<LocalProgress> {
  const progress = await addXp(userId, xp);

  const updated: LocalProgress = {
    ...progress,
    exercisesCompleted: progress.exercisesCompleted + 1,
    updatedAt: new Date().toISOString(),
  };

  await saveLocalProgress(updated);

  return updated;
}

export async function updateStreak(
  userId: string,
  streak: number,
): Promise<LocalProgress> {
  if (!Number.isInteger(streak) || streak < 0) {
    throw new Error("Streak must be a non-negative integer.");
  }

  const progress = await getProgress(userId);

  const updated: LocalProgress = {
    ...progress,
    streak,
    updatedAt: new Date().toISOString(),
  };

  await saveLocalProgress(updated);

  return updated;
}

export async function resetDailyXp(
  userId: string,
): Promise<LocalProgress> {
  const progress = await getProgress(userId);

  const updated: LocalProgress = {
    ...progress,
    dailyXp: 0,
    updatedAt: new Date().toISOString(),
  };

  await saveLocalProgress(updated);

  return updated;
}