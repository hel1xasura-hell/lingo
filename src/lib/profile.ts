import { supabase } from "./supabase";

function throwSupabaseError(error: unknown, fallback: string): never {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
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
    throwSupabaseError(error, "Unable to load your profile.");
  }

  return data;
}

export async function createProfile(profile: {
  id: string;
  username: string;
  country: string;
  explanation_language: string;
  english_level: string;
  target_level: string;
}) {
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  if (error) {
    throwSupabaseError(error, "Unable to save your profile.");
  }

  return data;
}

export async function updateProfile(
  userId: string,
  updates: {
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

  return data;
}
