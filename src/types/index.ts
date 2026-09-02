export type Theme = "light" | "dark" | "system";

export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type CountryCode = "IN" | "UZ";

export type ExplanationLanguage = "hi" | "uz";

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
}

export interface ExplanationLanguageOption {
  code: ExplanationLanguage;
  label: string;
  flag: string;
}

export interface UserProfile {
  username: string;
  email: string;
  avatarInitial: string;
  country: CountryCode;
  explanationLanguage: ExplanationLanguage;
  englishLevel: EnglishLevel;
  targetLevel: EnglishLevel;
  streak: number;
  longestStreak: number;
  xp: number;
  wordsLearned: number;
  grammarProgress: number; // percentage 0-100
  weeklyActivity: boolean[]; // 7 entries, Mon..Sun
}

export interface DailyGoal {
  completed: number;
  total: number;
}

export interface ContinueLearningItem {
  title: string;
  category: string;
  level: EnglishLevel;
  durationMinutes: number;
}

export interface DailyWord {
  word: string;
  definition: string;
  example: string;
  level: EnglishLevel;
  saved: boolean;
}

export interface PartnerProgress {
  name: string;
  countryFlag: string;
  xp: number;
  streak: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  enabled: boolean;
}

/** Form-related types kept separate from any persistence concerns. */
export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileSetupFormValues {
  username: string;
  country: CountryCode;
  explanationLanguage: ExplanationLanguage;
  englishLevel: EnglishLevel;
  targetLevel: EnglishLevel;
}
