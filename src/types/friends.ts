export type FriendRequestStatus =
  | "pending"
  | "accepted"
  | "declined";

export type FriendSearchResult = {
  id: string;
  username: string;
  name: string;
};

export type FriendRequest = {
  id: string;
  sender_id: string;
  username: string;
  name: string;
  created_at: string;
  status?: FriendRequestStatus;
};

export type FriendProfile = {
  id: string;
  username: string;
  name: string;
  xp: number;
  streak: number;
};