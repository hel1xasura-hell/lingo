import { useEffect, useState } from "react";
import {
  UserPlus,
  Users,
  Check,
  X,
  UserMinus,
  Search,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  searchUsers,
  sendFriendRequest,
  getIncomingFriendRequests,
  respondToFriendRequest,
  getFriends,
  removeFriend,
} from "@/lib/friends";
import type {
  Friend,
  FriendRequest,
  ProfileSearchResult,
} from "@/types/friends";

export function Friends() {
  const [userId, setUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ProfileSearchResult[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");

  async function loadData(id: string) {
    const [incoming, friendList] = await Promise.all([
      getIncomingFriendRequests(id),
      getFriends(id),
    ]);

    setRequests(incoming);
    setFriends(friendList);
  }

  useEffect(() => {
    async function load() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          setLoading(false);
          return;
        }

        setUserId(user.id);
        await loadData(user.id);
      } catch (error) {
        console.error("Unable to load friends:", error);
        setMessage("Unable to load friends.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSearch() {
    if (!userId || !search.trim()) {
      setResults([]);
      return;
    }

    try {
      setSearching(true);
      setMessage("");

      const data = await searchUsers(search.trim(), userId);
      setResults(data);
    } catch (error) {
      console.error("Unable to search users:", error);
      setMessage("Unable to search users.");
    } finally {
      setSearching(false);
    }
  }

  async function handleSendRequest(targetUserId: string) {
    if (!userId) return;

    try {
      await sendFriendRequest(userId, targetUserId);
      setMessage("Friend request sent.");
      setResults((current) =>
        current.filter((user) => user.id !== targetUserId),
      );
    } catch (error) {
      console.error("Unable to send friend request:", error);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send friend request.",
      );
    }
  }

  async function handleRequest(
    requestId: string,
    accept: boolean,
  ) {
    try {
      await respondToFriendRequest(requestId, accept);
      setMessage(accept ? "Friend request accepted." : "Friend request declined.");

      if (userId) {
        await loadData(userId);
      }
    } catch (error) {
      console.error("Unable to respond to friend request:", error);
      setMessage("Unable to update friend request.");
    }
  }

  async function handleRemoveFriend(friendId: string) {
    if (!userId) return;

    try {
      await removeFriend(userId, friendId);
      setMessage("Friend removed.");
      await loadData(userId);
    } catch (error) {
      console.error("Unable to remove friend:", error);
      setMessage("Unable to remove friend.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading friends...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">
          Friends
        </h1>
        <p className="mt-1 text-muted-foreground">
          Connect with people and learn together.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border bg-card p-3 text-sm">
          {message}
        </div>
      )}

      {/* Search */}
      <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          <h2 className="font-semibold">Find friends</h2>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search by username"
              className="h-11 w-full rounded-xl border bg-background pl-10 pr-3 outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={searching}
            className="rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-4 space-y-2">
            {results.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <div>
                  <p className="font-medium">
                    {person.name || person.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{person.username}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendRequest(person.id)}
                  className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                >
                  <UserPlus className="h-4 w-4" />
                  Add
                </button>
              </div>
            ))}
          </div>
        )}

        {!searching && search.trim() && results.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            No users found.
          </p>
        )}
      </section>

      {/* Requests */}
      <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="font-semibold">Friend requests</h2>
        </div>

        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No pending friend requests.
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <div>
                  <p className="font-medium">
                    {request.sender?.name || request.sender?.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{request.sender?.username}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleRequest(request.id, true)}
                    className="rounded-lg p-2 hover:bg-muted"
                    aria-label="Accept friend request"
                  >
                    <Check className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRequest(request.id, false)}
                    className="rounded-lg p-2 hover:bg-muted"
                    aria-label="Decline friend request"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Friends */}
      <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="font-semibold">My friends</h2>
        </div>

        {friends.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You don't have any friends yet.
          </p>
        ) : (
          <div className="space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.user_id}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <div>
                  <p className="font-medium">
                    {friend.name || friend.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{friend.username}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFriend(friend.user_id)}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
                >
                  <UserMinus className="h-4 w-4" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
