import { supabase } from "./supabase";
import type {
  FriendProfile,
  FriendRequest,
  FriendSearchResult,
} from "@/types/friends";

function throwFriendError(error: unknown, fallback: string): never {
  if (typeof error === "object" && error !== null && "message" in error) {
    throw new Error(String(error.message));
  }

  throw new Error(fallback);
}

export async function searchFriends(
  username: string,
): Promise<FriendSearchResult[]> {
  const searchText = username.trim();

  if (searchText.length < 2) {
    return [];
  }

  const { data, error } = await supabase.rpc(
    "search_profiles_by_username",
    { search_text: searchText },
  );

  if (error) {
    throwFriendError(error, "Unable to search for users.");
  }

  return (data ?? []) as FriendSearchResult[];
}

export async function sendFriendRequest(
  targetUserId: string,
): Promise<FriendRequest> {
  const { data, error } = await supabase.rpc("send_friend_request", {
    target_user_id: targetUserId,
  });

  if (error) {
    throwFriendError(error, "Unable to send friend request.");
  }

  return data as FriendRequest;
}

export async function getIncomingFriendRequests(): Promise<FriendRequest[]> {
  const { data, error } = await supabase.rpc(
    "get_incoming_friend_requests",
  );

  if (error) {
    throwFriendError(error, "Unable to load friend requests.");
  }

  return (data ?? []) as FriendRequest[];
}

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
    throwFriendError(error, "Unable to respond to friend request.");
  }

  return data as FriendRequest;
}

export async function getFriends(): Promise<FriendProfile[]> {
  const { data, error } = await supabase.rpc("get_my_friends");

  if (error) {
    throwFriendError(error, "Unable to load your friends.");
  }

  return (data ?? []) as FriendProfile[];
}

export async function removeFriend(targetUserId: string): Promise<void> {
  const { error } = await supabase.rpc("remove_friend", {
    target_user_id: targetUserId,
  });

  if (error) {
    throwFriendError(error, "Unable to remove friend.");
  }
}
