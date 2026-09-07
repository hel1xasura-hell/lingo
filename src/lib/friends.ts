import { supabase } from "./supabase";

import type {
  FriendProfile,
  FriendRequest,
  FriendSearchResult,
} from "@/types/friends";

function throwFriendError(error: unknown, fallback: string): never {
  if (error instanceof Error) {
    throw error;
  }

  throw new Error(fallback);
}

/**
 * Search users by username.
 *
 * The Supabase RPC excludes the currently logged-in user.
 */
export async function searchFriends(
  username: string,
): Promise<FriendSearchResult[]> {
  const searchText = username.trim();

  if (!searchText) {
    return [];
  }

  const { data, error } = await supabase.rpc(
    "search_profiles_by_username",
    {
      search_text: searchText,
    },
  );

  if (error) {
    throwFriendError(error, "Unable to search for users.");
  }

  return (data ?? []) as FriendSearchResult[];
}

/**
 * Send a friend request to another user.
 */
export async function sendFriendRequest(
  targetUserId: string,
): Promise<FriendRequest> {
  const { data, error } = await supabase.rpc("send_friend_request", {
    target_user_id: targetUserId,
  });

  if (error) {
    throwFriendError(error, "Unable to send friend request.");
  }

  if (!data) {
    throw new Error("No friend request was returned.");
  }

  return data as FriendRequest;
}

/**
 * Get pending incoming friend requests.
 */
export async function getIncomingFriendRequests(): Promise<
  FriendRequest[]
> {
  const { data, error } = await supabase.rpc(
    "get_incoming_friend_requests",
  );

  if (error) {
    throwFriendError(
      error,
      "Unable to load incoming friend requests.",
    );
  }

  return (data ?? []) as FriendRequest[];
}

/**
 * Accept or decline an incoming friend request.
 */
export async function respondToFriendRequest(
  requestId: string,
  status: "accepted" | "declined",
): Promise<FriendRequest> {
  const { data, error } = await supabase.rpc(
    "respond_to_friend_request",
    {
      request_id: requestId,
      new_status: status,
    },
  );

  if (error) {
    throwFriendError(
      error,
      "Unable to update the friend request.",
    );
  }

  if (!data) {
    throw new Error("No updated friend request was returned.");
  }

  return data as FriendRequest;
}

/**
 * Get the currently logged-in user's friends.
 */
export async function getFriends(): Promise<FriendProfile[]> {
  const { data, error } = await supabase.rpc("get_my_friends");

  if (error) {
    throwFriendError(error, "Unable to load your friends.");
  }

  return (data ?? []) as FriendProfile[];
}

/**
 * Remove an existing friend.
 */
export async function removeFriend(
  targetUserId: string,
): Promise<void> {
  const { error } = await supabase.rpc("remove_friend", {
    target_user_id: targetUserId,
  });

  if (error) {
    throwFriendError(error, "Unable to remove friend.");
  }
}