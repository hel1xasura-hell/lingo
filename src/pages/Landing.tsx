import { Link } from "react-router-dom";
import { GraduationCap, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const linkButtonBase =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium transition-colors duration-150 w-full sm:w-auto";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-base to-base dark:from-plum-900 dark:via-plum-900 dark:to-plum-900">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-semibold">Lingo</span>
        </div>
        <ThemeToggle compact />
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-20 pt-10 text-center sm:pt-16">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 dark:bg-lavender-500/15 px-3 py-1 text-xs font-medium text-lavender-600 dark:text-lavender-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Built for two, one lesson at a time
        </span>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Learn English at your own pace,
          <br className="hidden sm:block" /> explained your way.
        </h1>

        <p className="mt-5 max-w-lg text-base text-plum-500 dark:text-plum-100">
          Daily words, grammar, and practice — with explanations in the language you understand
          best, and a shared streak to keep you both going.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/register"
            className={cn(linkButtonBase, "bg-rose-500 text-white hover:bg-rose-600 shadow-soft")}
          >
            Create account
          </Link>
          <Link
            to="/login"
            className={cn(
              linkButtonBase,
              "border border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-lavender-400 dark:text-lavender-200 dark:hover:bg-plum-800"
            )}
          >
            Log in
          </Link>
        </div>

        <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { emoji: "📚", title: "Daily vocabulary", copy: "One word, a real example, every day." },
            { emoji: "🔥", title: "Shared streaks", copy: "Stay accountable together, not alone." },
            { emoji: "🎯", title: "Levels A1–C2", copy: "Explanations that meet you where you are." },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-plum-100/60 dark:border-white/5 bg-surface dark:bg-surface-dark p-5 text-left shadow-soft dark:shadow-soft-dark"
            >
              <p className="text-2xl" aria-hidden="true">
                {feature.emoji}
              </p>
              <p className="mt-2 font-semibold">{feature.title}</p>
              <p className="mt-1 text-sm text-plum-400">{feature.copy}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
