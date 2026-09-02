import { supabase } from "./supabase";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
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
    throw error;
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
  }
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
