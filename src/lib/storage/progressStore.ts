import { get, put, STORES } from "./db";

export interface LocalProgress {
  id: string;
  userId: string;
  xp: number;
  streak: number;
  completedLessons: string[];
  updatedAt: number;
}

export async function getLocalProgress(userId: string): Promise<LocalProgress | undefined> {
  return get<LocalProgress>(STORES.progress, `${userId}:main`);
}

export async function saveLocalProgress(
  userId: string,
  updates: Partial<Omit<LocalProgress, "id" | "userId" | "updatedAt">>,
): Promise<LocalProgress> {
  const existing = await getLocalProgress(userId);

  const progress: LocalProgress = {
    id: `${userId}:main`,
    userId,
    xp: updates.xp ?? existing?.xp ?? 0,
    streak: updates.streak ?? existing?.streak ?? 0,
    completedLessons: updates.completedLessons ?? existing?.completedLessons ?? [],
    updatedAt: Date.now(),
  };

  await put(STORES.progress, progress);
  return progress;
}
