# Lingo — English Learning App (Milestone 1: Foundation)

A private English-learning PWA foundation for two users, built with React, TypeScript, Vite, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To type-check and build for production:

```bash
npm run build
```

## What's in this milestone

- App shell with React Router: `/`, `/login`, `/register`, `/profile-setup`, `/dashboard`, `/profile`
- Light / Dark / System theme, persisted to `localStorage`
- Mobile-first responsive layout: bottom nav on mobile, sidebar on desktop
- Dashboard with streak, daily goal, stats, continue learning, daily word, and a couple-progress preview — all backed by mock data in `src/data/mockData.ts`
- Reusable, typed UI components in `src/components/ui`
- Auth logic isolated in `src/hooks/useAuth.ts`, so Supabase Auth can be dropped in during Milestone 2 without touching page UI
- PWA scaffolding via `vite-plugin-pwa` (manifest + icons + service worker registration)

## Notes on icons

The icons in `public/` (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon.svg`) are simple placeholders. Swap them for real branded artwork before shipping.

## What's NOT in this milestone (by design)

Real Supabase database/auth, dictionary API, AI features, full grammar/vocabulary/essay systems, full leaderboard, speech recognition, gamification logic, and payments are all intentionally deferred — see Milestone 2 notes.


## GitHub Pages

The project is configured for GitHub Pages project sites. The included GitHub Actions workflow builds the app, creates a `404.html` SPA fallback, and deploys the `dist` folder.

After pushing to the `main` branch:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually).

The Vite base path is derived automatically from the GitHub repository name in Actions. Local development continues to use `/`. The workflow uses `npm install` so the repository can be deployed even if a lockfile has not yet been generated.
