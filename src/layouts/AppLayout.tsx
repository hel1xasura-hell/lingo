import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-base dark:bg-plum-900">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-10 lg:pb-10 lg:pt-8">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
        <MobileNavigation />
      </div>
    </div>
  );
}
