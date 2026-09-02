import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  colorClassName?: string;
  trackClassName?: string;
  className?: string;
}

export function ProgressBar({
  value,
  label,
  colorClassName = "bg-rose-500",
  trackClassName = "bg-rose-100 dark:bg-plum-800",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setWidth(clamped));
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  return (
    <div className={cn("w-full", className)}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn("h-2.5 w-full overflow-hidden rounded-full", trackClassName)}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-700 ease-out", colorClassName)}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
