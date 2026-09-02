import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-rose-50 via-base to-base dark:from-plum-900 dark:via-plum-900 dark:to-plum-900">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-semibold">Lingo</span>
        </div>
        <ThemeToggle compact />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
