import type {
  Country,
  ExplanationLanguageOption,
  UserProfile,
  DailyGoal,
  ContinueLearningItem,
  DailyWord,
  PartnerProgress,
  EnglishLevel,
} from "@/types";

export const COUNTRIES: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿" },
];

export const EXPLANATION_LANGUAGES: ExplanationLanguageOption[] = [
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "uz", label: "Uzbek", flag: "🇺🇿" },
];

export const ENGLISH_LEVELS: EnglishLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const mockUser: UserProfile = {
  username: "Ananya",
  email: "ananya@example.com",
  avatarInitial: "A",
  country: "IN",
  explanationLanguage: "hi",
  englishLevel: "B1",
  targetLevel: "B2",
  streak: 7,
  longestStreak: 14,
  xp: 1240,
  wordsLearned: 342,
  grammarProgress: 64,
  weeklyActivity: [true, true, true, false, true, true, false],
};

export const mockDailyGoal: DailyGoal = {
  completed: 4,
  total: 5,
};

export const mockContinueLearning: ContinueLearningItem = {
  title: "Present Perfect",
  category: "B1 Grammar",
  level: "B1",
  durationMinutes: 12,
};

export const mockDailyWord: DailyWord = {
  word: "Nevertheless",
  definition: "In spite of that; even so.",
  example: "The lesson was difficult. Nevertheless, she finished it.",
  level: "B2",
  saved: false,
};

export const mockPartners: PartnerProgress[] = [
  { name: "India", countryFlag: "🇮🇳", xp: 1240, streak: 18 },
  { name: "Uzbekistan", countryFlag: "🇺🇿", xp: 1180, streak: 16 },
];

export const mockTogetherStreak = 15;

export const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
