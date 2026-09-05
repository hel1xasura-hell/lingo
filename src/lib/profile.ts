import { supabase } from "./supabase";
import { getCachedProfile, saveCachedProfile } from "./storage/profileStore";

function throwSupabaseError(error: unknown, fallback: string): never {
  if (typeof error === "object" && error !== null && "message" in error) {
    throw new Error(String(error.message));
  }

  throw new Error(fallback);
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
  }
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

  return data;
}