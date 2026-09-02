import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base dark:bg-plum-900 px-6 text-center">
      <p className="font-display text-5xl font-semibold text-rose-400">404</p>
      <h1 className="font-display text-xl font-semibold">This page hasn't been built yet</h1>
      <p className="max-w-sm text-sm text-plum-400">
        The page you're looking for doesn't exist yet, or is part of a future milestone.
      </p>
      <Link to="/dashboard" className="mt-2 font-medium text-rose-600 hover:underline dark:text-rose-300">
        Back to dashboard
      </Link>
    </div>
  );
}
