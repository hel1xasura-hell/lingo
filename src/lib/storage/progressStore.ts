import { get, put, remove } from "./db";

export type LocalProgress = {
  id: string;
  userId: string;

  xp: number;
  streak: number;

  dailyXp: number;
  dailyGoal: number;

  lessonsCompleted: number;
  exercisesCompleted: number;

  englishLevel: string;
  targetLevel: string;

  updatedAt: string;
};

function createProgressId(userId: string) {
  return `progress:${userId}`;
}

export async function getLocalProgress(
  userId: string,
): Promise<LocalProgress | undefined> {
  return get<LocalProgress>("progress", createProgressId(userId));
}

export async function saveLocalProgress(
  progress: Omit<LocalProgress, "id">,
): Promise<void> {
  await put<LocalProgress>("progress", {
    ...progress,
    id: createProgressId(progress.userId),
  });
}

export async function clearLocalProgress(
  userId: string,
): Promise<void> {
  await remove("progress", createProgressId(userId));
}