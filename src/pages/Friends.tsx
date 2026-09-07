import { useEffect, useState } from "react";
import {
  Check,
  UserPlus,
  UserRound,
  UserX,
  Search,
  Users,
  X,
} from "lucide-react";

import {
  getFriends,
  getIncomingFriendRequests,
  removeFriend,
  respondToFriendRequest,
  searchFriends,
  sendFriendRequest,
} from "@/lib/friends";

import type {
  FriendProfile,
  FriendRequest,
  FriendSearchResult,
} from "@/types/friends";

export function Friends() {
  const [friends, setFriends] = useState<FriendProfile[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [searchResults, setSearchResults] = useState<FriendSearchResult[]>([]);

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function loadFriendsData() {
    try {
      setLoading(true);
      setError("");

      const [friendsData, requestsData] = await Promise.all([
        getFriends(),
        getIncomingFriendRequests(),
      ]);

      setFriends(friendsData);
      setRequests(requestsData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your friends right now.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFriendsData();
  }, []);

  async function handleSearch() {
    const query = searchText.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      setSearching(true);
      setError("");
      setSuccess("");

      const results = await searchFriends(query);
      setSearchResults(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to search for users.",
      );
    } finally {
      setSearching(false);
    }
  }

  async function handleSendRequest(userId: string) {
    try {
      setProcessingId(userId);
      setError("");
      setSuccess("");

      await sendFriendRequest(userId);

      setSuccess("Friend request sent.");

      setSearchResults((current) =>
        current.filter((user) => user.id !== userId),
      );

      await loadFriendsData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send the friend request.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleRequestResponse(
    requestId: string,
    status: "accepted" | "declined",
  ) {
    try {
      setProcessingId(requestId);
      setError("");
      setSuccess("");

      await respondToFriendRequest(requestId, status);

      setSuccess(
        status === "accepted"
          ? "Friend request accepted."
          : "Friend request declined.",
      );

      await loadFriendsData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update the friend request.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleRemoveFriend(userId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this friend?",
    );

    if (!confirmed) return;

    try {
      setProcessingId(userId);
      setError("");
      setSuccess("");

      await removeFriend(userId);

      setSuccess("Friend removed.");
      await loadFriendsData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove this friend.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <main className="min-h-full bg-base px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">

        {/* Header */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
              <Users size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-plum-900 dark:text-white">
                Friends
              </h1>

              <p className="text-sm text-plum-600 dark:text-plum-300">
                Find friends, accept requests, and learn together.
              </p>
            </div>
          </div>
        </section>

        {/* Messages */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            <X size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-300">
            <Check size={18} className="mt-0.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Search */}
        <section className="rounded-3xl border border-rose-100 bg-surface p-5 shadow-sm dark:border-rose-950/50">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-plum-900 dark:text-white">
              Find a friend
            </h2>

            <p className="mt-1 text-sm text-plum-600 dark:text-plum-300">
              Search using their username.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSearch();
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-plum-400"
              />

              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Enter username..."
                className="w-full rounded-2xl border border-rose-200 bg-base py-3 pl-11 pr-4 text-sm text-plum-900 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:border-rose-900 dark:bg-base dark:text-white dark:focus:border-rose-600 dark:focus:ring-rose-950"
              />
            </div>

            <button
              type="submit"
              disabled={searching || !searchText.trim()}
              className="rounded-2xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="mt-5 space-y-3">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 rounded-2xl border border-rose-100 bg-base p-4 sm:flex-row sm:items-center sm:justify-between dark:border-rose-950/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
                      <UserRound size={21} />
                    </div>

                    <div>
                      <p className="font-semibold text-plum-900 dark:text-white">
                        {user.name}
                      </p>

                      <p className="text-sm text-plum-500 dark:text-plum-400">
                        @{user.username}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={processingId === user.id}
                    onClick={() => void handleSendRequest(user.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <UserPlus size={17} />
                    {processingId === user.id ? "Sending..." : "Add friend"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {!searching &&
            searchText.trim() &&
            searchResults.length === 0 && (
              <p className="mt-5 rounded-2xl bg-base px-4 py-3 text-sm text-plum-500 dark:text-plum-400">
                No users found.
              </p>
            )}
        </section>

        {/* Friend Requests */}
        <section className="rounded-3xl border border-rose-100 bg-surface p-5 shadow-sm dark:border-rose-950/50">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-plum-900 dark:text-white">
                Friend requests
              </h2>

              <p className="mt-1 text-sm text-plum-600 dark:text-plum-300">
                People who want to connect with you.
              </p>
            </div>

            {requests.length > 0 && (
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                {requests.length}
              </span>
            )}
          </div>

          {loading ? (
            <p className="text-sm text-plum-500 dark:text-plum-400">
              Loading requests...
            </p>
          ) : requests.length === 0 ? (
            <div className="rounded-2xl bg-base px-4 py-6 text-center">
              <UserPlus
                size={25}
                className="mx-auto mb-2 text-plum-400"
              />

              <p className="text-sm text-plum-500 dark:text-plum-400">
                No pending friend requests.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-3 rounded-2xl border border-rose-100 bg-base p-4 sm:flex-row sm:items-center sm:justify-between dark:border-rose-950/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
                      <UserRound size={21} />
                    </div>

                    <div>
                      <p className="font-semibold text-plum-900 dark:text-white">
                        {request.name}
                      </p>

                      <p className="text-sm text-plum-500 dark:text-plum-400">
                        @{request.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={processingId === request.id}
                      onClick={() =>
                        void handleRequestResponse(
                          request.id,
                          "accepted",
                        )
                      }
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50 sm:flex-none"
                    >
                      <Check size={17} />
                      Accept
                    </button>

                    <button
                      type="button"
                      disabled={processingId === request.id}
                      onClick={() =>
                        void handleRequestResponse(
                          request.id,
                          "declined",
                        )
                      }
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-plum-700 transition hover:bg-rose-50 disabled:opacity-50 dark:border-rose-900 dark:text-plum-200 dark:hover:bg-rose-950/30 sm:flex-none"
                    >
                      <X size={17} />
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Friends */}
        <section className="rounded-3xl border border-rose-100 bg-surface p-5 shadow-sm dark:border-rose-950/50">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-plum-900 dark:text-white">
              My friends
            </h2>

            <p className="mt-1 text-sm text-plum-600 dark:text-plum-300">
              Your current friends on Lingo.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-plum-500 dark:text-plum-400">
              Loading friends...
            </p>
          ) : friends.length === 0 ? (
            <div className="rounded-2xl bg-base px-4 py-8 text-center">
              <Users
                size={30}
                className="mx-auto mb-3 text-plum-400"
              />

              <p className="font-medium text-plum-800 dark:text-plum-200">
                You don't have any friends yet.
              </p>

              <p className="mt-1 text-sm text-plum-500 dark:text-plum-400">
                Search for a username above to add someone.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="rounded-2xl border border-rose-100 bg-base p-4 dark:border-rose-950/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
                        <UserRound size={21} />
                      </div>

                      <div>
                        <p className="font-semibold text-plum-900 dark:text-white">
                          {friend.name}
                        </p>

                        <p className="text-sm text-plum-500 dark:text-plum-400">
                          @{friend.username}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      title="Remove friend"
                      disabled={processingId === friend.id}
                      onClick={() =>
                        void handleRemoveFriend(friend.id)
                      }
                      className="rounded-xl p-2 text-plum-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-950/30"
                    >
                      <UserX size={18} />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-surface px-3 py-2">
                      <p className="text-xs text-plum-500 dark:text-plum-400">
                        XP
                      </p>

                      <p className="font-semibold text-plum-900 dark:text-white">
                        {friend.xp}
                      </p>
                    </div>

                    <div className="rounded-xl bg-surface px-3 py-2">
                      <p className="text-xs text-plum-500 dark:text-plum-400">
                        Streak
                      </p>

                      <p className="font-semibold text-plum-900 dark:text-white">
                        {friend.streak} days
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}