import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { COUNTRIES, EXPLANATION_LANGUAGES, ENGLISH_LEVELS } from "@/data/mockData";
import type { ProfileSetupFormValues } from "@/types";

const initialValues: ProfileSetupFormValues = {
  username: "",
  country: "IN",
  explanationLanguage: "hi",
  englishLevel: "A1",
  targetLevel: "B1",
};

export function ProfileSetup() {
  const navigate = useNavigate();
  const [values, setValues] = useState<ProfileSetupFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProfileSetupFormValues>(key: K, value: ProfileSetupFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.username.trim()) {
      setError("Please enter a username so we know what to call you.");
      return;
    }
    setError(null);
    // Milestone 2: persist this to the user's Supabase profile row.
    navigate("/dashboard");
  }

  return (
    <AuthLayout>
      <Card className="animate-fade-slide-up">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold">Set up your profile</h1>
          <span className="text-xs font-medium text-plum-400">Step 1 of 1</span>
        </div>
        <p className="mt-1 text-sm text-plum-400">
          A few details to personalize your learning experience.
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="Username"
            value={values.username}
            onChange={(event) => update("username", event.target.value)}
          />

          <Select
            label="Country"
            value={values.country}
            onChange={(event) => update("country", event.target.value as ProfileSetupFormValues["country"])}
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </Select>

          <Select
            label="What language would you like to use for explanations?"
            value={values.explanationLanguage}
            onChange={(event) =>
              update("explanationLanguage", event.target.value as ProfileSetupFormValues["explanationLanguage"])
            }
          >
            {EXPLANATION_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="English level"
              value={values.englishLevel}
              onChange={(event) => update("englishLevel", event.target.value as ProfileSetupFormValues["englishLevel"])}
            >
              {ENGLISH_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>

            <Select
              label="Target level"
              value={values.targetLevel}
              onChange={(event) => update("targetLevel", event.target.value as ProfileSetupFormValues["targetLevel"])}
            >
              {ENGLISH_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </div>

          {error && (
            <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="mt-2 w-full">
            Go to dashboard
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}
