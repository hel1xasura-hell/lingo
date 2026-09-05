import { get, put, remove, STORES } from "./db";

export interface CachedProfile {
  id: string;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  country?: string | null;
  explanation_language?: string | null;
  english_level?: string | null;
  target_level?: string | null;
  xp?: number;
  streak?: number;
  cachedAt: number;
}

export async function saveCachedProfile(profile: Omit<CachedProfile, "cachedAt">): Promise<void> {
  await put(STORES.profile, { ...profile, cachedAt: Date.now() });
}

export async function getCachedProfile(userId: string): Promise<CachedProfile | undefined> {
  return get<CachedProfile>(STORES.profile, userId);
}

export async function clearCachedProfile(userId: string): Promise<void> {
  await remove(STORES.profile, userId);
}
