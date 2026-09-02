import { cn } from "@/lib/utils";

interface AvatarProps {
  initial: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-8 w-8 text-sm",
  md: "h-11 w-11 text-base",
  lg: "h-20 w-20 text-2xl",
};

export function Avatar({ initial, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-display font-semibold",
        "bg-gradient-to-br from-rose-300 to-lavender-300 text-white shadow-soft",
        sizeStyles[size],
        className
      )}
      aria-hidden="true"
    >
      {initial.toUpperCase()}
    </div>
  );
}
