import { useState } from "react";
import { Bookmark, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { DailyWord } from "@/types";

interface VocabularyCardProps {
  word: DailyWord;
}

export function VocabularyCard({ word }: VocabularyCardProps) {
  const [saved, setSaved] = useState(word.saved);

  function handleListen() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <Card className="animate-fade-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-plum-400">Word of the day</p>
          <h3 className="mt-1 font-display text-xl font-semibold">{word.word}</h3>
        </div>
        <Badge variant="lavender">{word.level}</Badge>
      </div>

      <p className="mt-3 text-sm text-plum-600 dark:text-plum-100">{word.definition}</p>
      <p className="mt-2 text-sm italic text-plum-400">"{word.example}"</p>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleListen}
          className="flex items-center gap-1.5 rounded-xl border border-plum-100 dark:border-white/10 px-3 py-1.5 text-sm text-plum-600 dark:text-plum-100 hover:bg-plum-50 dark:hover:bg-white/5"
          aria-label={`Listen to pronunciation of ${word.word}`}
        >
          <Volume2 className="h-4 w-4" aria-hidden="true" />
          Listen
        </button>
        <button
          type="button"
          onClick={() => setSaved((prev) => !prev)}
          aria-pressed={saved}
          className={cn(
            "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm transition-colors",
            saved
              ? "border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-200"
              : "border-plum-100 dark:border-white/10 text-plum-600 dark:text-plum-100 hover:bg-plum-50 dark:hover:bg-white/5"
          )}
        >
          <Bookmark className="h-4 w-4" aria-hidden="true" fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </Card>
  );
}
