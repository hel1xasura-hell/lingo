import { getAll, put, remove, STORES } from "./db";

export type SyncActionType =
  | "profile.update"
  | "progress.update"
  | "lesson.complete"
  | "exercise.complete";

export interface SyncQueueItem {
  id?: number;
  userId: string;
  type: SyncActionType;
  payload: Record<string, unknown>;
  createdAt: number;
  attempts: number;
}

export async function queueSyncAction(
  userId: string,
  type: SyncActionType,
  payload: Record<string, unknown>,
): Promise<void> {
  await put<SyncQueueItem>(STORES.syncQueue, {
    userId,
    type,
    payload,
    createdAt: Date.now(),
    attempts: 0,
  });
}

export async function getPendingSyncActions(userId: string): Promise<SyncQueueItem[]> {
  const items = await getAll<SyncQueueItem>(STORES.syncQueue);
  return items
    .filter((item) => item.userId === userId)
    .sort((a, b) => a.createdAt - b.createdAt);
}

export async function removeSyncAction(id: number): Promise<void> {
  await remove(STORES.syncQueue, id);
}
