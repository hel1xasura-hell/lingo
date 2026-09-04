import { useEffect, useState } from "react";
import { Flame, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  COUNTRIES,
  EXPLANATION_LANGUAGES,
  ENGLISH_LEVELS,
} from "@/data/mockData";
import type { CountryCode, ExplanationLanguage, EnglishLevel } from "@/types";
import { getCurrentUser } from "@/lib/auth";
import { getProfile, updateProfile } from "@/lib/profile";

interface ProfileData {
  username: string;
  email: string;
  country: CountryCode;
  explanationLanguage: ExplanationLanguage;
  englishLevel: EnglishLevel;
  targetLevel: EnglishLevel;
  streak: number;
  xp: number;
}

export function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [country, setCountry] = useState<CountryCode>("IN");
  const [explanationLanguage, setExplanationLanguage] =
    useState<ExplanationLanguage>("hi");
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>("A1");
  const [targetLevel, setTargetLevel] = useState<EnglishLevel>("B1");

  useEffect(() => {
    async function loadProfile() {
      try {
        setError(null);

        const user = await getCurrentUser();

        if (!user) {
          setError("Please log in again.");
          return;
        }

        const data = await getProfile(user.id);

        const loadedProfile: ProfileData = {
          username: data.username,
          email: user.email ?? "",
          country: data.country as CountryCode,
          explanationLanguage:
            data.explanation_language as ExplanationLanguage,
          englishLevel: data.english_level as EnglishLevel,
          targetLevel: data.target_level as EnglishLevel,
          streak: data.streak ?? 0,
          xp: data.xp ?? 0,
        };

        setProfile(loadedProfile);

        setUsername(loadedProfile.username);
        setCountry(loadedProfile.country);
        setExplanationLanguage(loadedProfile.explanationLanguage);
        setEnglishLevel(loadedProfile.englishLevel);
        setTargetLevel(loadedProfile.targetLevel);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load your profile.";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  function startEditing() {
    if (!profile) return;

    setUsername(profile.username);
    setCountry(profile.country);
    setExplanationLanguage(profile.explanationLanguage);
    setEnglishLevel(profile.englishLevel);
    setTargetLevel(profile.targetLevel);
    setError(null);
    setIsEditing(true);
  }

  function cancelEditing() {
    if (!profile) return;

    setUsername(profile.username);
    setCountry(profile.country);
    setExplanationLanguage(profile.explanationLanguage);
    setEnglishLevel(profile.englishLevel);
    setTargetLevel(profile.targetLevel);
    setError(null);
    setIsEditing(false);
  }

  async function saveProfile() {
    if (!profile) return;

    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const user = await getCurrentUser();

      if (!user) {
        setError("Your session has expired. Please log in again.");
        return;
      }

      const updated = await updateProfile(user.id, {
        username: username.trim(),
        country,
        explanation_language: explanationLanguage,
        english_level: englishLevel,
        target_level: targetLevel,
      });

      const updatedProfile: ProfileData = {
        ...profile,
        username: updated.username,
        country: updated.country as CountryCode,
        explanationLanguage:
          updated.explanation_language as ExplanationLanguage,
        englishLevel: updated.english_level as EnglishLevel,
        targetLevel: updated.target_level as EnglishLevel,
        streak: updated.streak ?? profile.streak,
        xp: updated.xp ?? profile.xp,
      };

      setProfile(updatedProfile);
      setUsername(updatedProfile.username);
      setCountry(updatedProfile.country);
      setExplanationLanguage(updatedProfile.explanationLanguage);
      setEnglishLevel(updatedProfile.englishLevel);
      setTargetLevel(updatedProfile.targetLevel);
      setIsEditing(false);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to save your profile.";

      setError(message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-plum-400">Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">
          Profile
        </h1>

        <Card>
          <p className="text-sm text-rose-600 dark:text-rose-300">
            {error ?? "Unable to load your profile."}
          </p>
        </Card>
      </div>
    );
  }

  const countryInfo = COUNTRIES.find(
    (item) => item.code === profile.country,
  );

  const explanationInfo = EXPLANATION_LANGUAGES.find(
    (item) => item.code === profile.explanationLanguage,
  );

  const avatarInitial =
    profile.username.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">
        Profile
      </h1>

      <Card className="animate-fade-slide-up">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar initial={avatarInitial} size="lg" />

          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">
              {profile.username}
            </h2>

            <p className="text-sm text-plum-400">{profile.email}</p>

            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="rose">
                {countryInfo?.flag} {countryInfo?.name}
              </Badge>

              <Badge variant="lavender">
                Explains in {explanationInfo?.flag}{" "}
                {explanationInfo?.label}
              </Badge>
            </div>
          </div>

          {!isEditing && (
            <Button variant="outline" onClick={startEditing}>
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing && (
          <div className="mt-6 border-t border-plum-100 pt-6 dark:border-white/10">
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <Select
                label="Country"
                value={country}
                onChange={(event) =>
                  setCountry(event.target.value as CountryCode)
                }
              >
                {COUNTRIES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.flag} {item.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Explanation language"
                value={explanationLanguage}
                onChange={(event) =>
                  setExplanationLanguage(
                    event.target.value as ExplanationLanguage,
                  )
                }
              >
                {EXPLANATION_LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.flag} {item.label}
                  </option>
                ))}
              </Select>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  label="English level"
                  value={englishLevel}
                  onChange={(event) =>
                    setEnglishLevel(
                      event.target.value as EnglishLevel,
                    )
                  }
                >
                  {ENGLISH_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Target level"
                  value={targetLevel}
                  onChange={(event) =>
                    setTargetLevel(
                      event.target.value as EnglishLevel,
                    )
                  }
                >
                  {ENGLISH_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Select>
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-sm text-rose-600 dark:text-rose-300"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={cancelEditing}
                  disabled={isSaving}
                >
                  Cancel
                </Button>

                <Button onClick={saveProfile} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="text-center">
          <p className="text-xs text-plum-400">English level</p>
          <p className="mt-1 font-display text-lg font-semibold">
            {profile.englishLevel}
          </p>
        </Card>

        <Card className="text-center">
          <p className="text-xs text-plum-400">Target level</p>
          <p className="mt-1 font-display text-lg font-semibold">
            {profile.targetLevel}
          </p>
        </Card>

        <Card className="text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-plum-400">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            Streak
          </p>
          <p className="mt-1 font-display text-lg font-semibold">
            {profile.streak} days
          </p>
        </Card>

        <Card className="text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-plum-400">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            XP
          </p>
          <p className="mt-1 font-display text-lg font-semibold">
            {profile.xp.toLocaleString()}
          </p>
        </Card>
      </div>
    </div>
  );
}