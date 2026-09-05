import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-2 bg-foreground px-4 py-2 text-center text-xs font-medium text-background shadow-sm"
    >
      <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
      <span>You’re offline. Some features that need the internet may be unavailable.</span>
    </div>
  );
}
