import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: "" };
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label } = getStrength(password);
  if (!password) return null;

  const barColor =
    score <= 1 ? "bg-rose-500" : score === 2 ? "bg-rose-300" : score === 3 ? "bg-lavender-400" : "bg-lavender-600";

  return (
    <div aria-live="polite" className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full bg-plum-100 dark:bg-plum-800 transition-colors",
              index < score && barColor
            )}
          />
        ))}
      </div>
      <span className="text-xs text-plum-400">{label}</span>
    </div>
  );
}
