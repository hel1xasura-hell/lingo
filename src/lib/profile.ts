import { supabase } from "./supabase";
import { getCachedProfile, saveCachedProfile } from "./storage/profileStore";
import {
  getLocalProgress,
  saveLocalProgress,
} from "./storage/progressStore";

function throwSupabaseError(error: unknown, fallback: string): never {
  if (typeof error === "object" && error !== null && "message" in error) {
    throw new Error(String(error.message));
  }

  throw new Error(fallback);
}

async function cacheProfileProgress(data: {
  id: string;
  xp?: number | null;
  streak?: number | null;
}) {
  const existing = await getLocalProgress(data.id);

  await saveLocalProgress({
    userId: data.id,
    xp: data.xp ?? 0,
    streak: data.streak ?? 0,
    dailyXp: existing?.dailyXp ?? 0,
    dailyGoal: existing?.dailyGoal ?? 20,
    lessonsCompleted: existing?.lessonsCompleted ?? 0,
    exercisesCompleted: existing?.exercisesCompleted ?? 0,
    englishLevel: existing?.englishLevel ?? "",
    targetLevel: existing?.targetLevel ?? "",
    updatedAt: new Date().toISOString(),
  });
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    const cached = await getCachedProfile(userId);

    if (cached) {
      await cacheProfileProgress(cached);
      return cached;
    }

    throwSupabaseError(error, "Unable to load your profile.");
  }

  await saveCachedProfile({
    id: data.id,
    name: data.name ?? "",
    username: data.username ?? "",
    country: data.country ?? "",
    explanation_language: data.explanation_language ?? "",
    english_level: data.english_level ?? "",
    target_level: data.target_level ?? "",
    xp: data.xp ?? 0,
    streak: data.streak ?? 0,
  });

  await cacheProfileProgress(data);

  return data;
}

export async function updateProfile(
  userId: string,
  updates: {
    name?: string;
    username?: string;
    country?: string;
    explanation_language?: string;
    english_level?: string;
    target_level?: string;
  },
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throwSupabaseError(error, "Unable to update your profile.");
  }

  await saveCachedProfile({
    id: data.id,
    name: data.name ?? "",
    username: data.username ?? "",
    country: data.country ?? "",
    explanation_language: data.explanation_language ?? "",
    english_level: data.english_level ?? "",
    target_level: data.target_level ?? "",
    xp: data.xp ?? 0,
    streak: data.streak ?? 0,
  });

  await cacheProfileProgress(data);

  return data;
}