# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for Rohan Nagpure built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Deployed on Vercel. Visual identity is the **Chrome Noir** design — animated canvas chrome shader background, pearl-bordered glass cards, chrome-pill buttons, letter-by-letter hero text streaming. Features: project showcases, blog with Supabase backend, stock portfolio page, and RSS feed.

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build (TS and ESLint errors are IGNORED via next.config.mjs)
npm run lint         # ESLint
npm run test         # Vitest in watch mode
npm run test:run     # Vitest single run (CI)
```

Add shadcn/ui components: `npx shadcn@latest add <component-name>`

## Architecture

### Data Flow: Blog Posts (Dual-Source with Fallback)

Blog data comes from two sources merged together in `lib/supabaseClient.ts`:
1. **Supabase** (`blog_posts` table) - primary source, fetched first
2. **Local backup** (`localBackupPosts` array in `lib/supabaseClient.ts`) - hardcoded posts with negative IDs to avoid DB conflicts

`getBlogPosts()` merges both: DB posts take priority by slug, unique local posts are appended, all sorted by date descending. `getBlogPostBySlug()` tries Supabase first, falls back to local. This means the site works without Supabase credentials.

Blog post detail pages (`app/blog/[slug]/page.tsx`) use `generateStaticParams` for SSG and have custom markdown-like rendering (bold headers, lists) in `renderContent()` -- not a standard markdown library.

### Data Flow: Stock API (Cache-First with Background Refresh)

`app/api/stocks/route.ts` implements a cache-first strategy:
1. Read from `stock_cache` Supabase table
2. If cache exists and is fresh (<4 hours), return immediately
3. If cache is stale, return cached data immediately AND trigger a background refresh for the oldest stock (one at a time to avoid rate limits)
4. If cache is empty (first load), fetch all 10 stocks from Alpha Vantage in parallel and seed the cache

Alpha Vantage free tier has strict rate limits (5 calls/min, 500/day). The one-at-a-time background refresh is intentional.

### RSS Feed

`app/api/rss/route.ts` generates an RSS feed from `getBlogPosts()`. Linked in the root layout metadata and the blog page.

### Routing

- `/` - Home: spotlight hero with `<StreamText>` + consulting card + 3 featured projects + 2 recent blog posts (client component)
- `/blog` - Blog listing (client component, calls `getBlogPosts()` directly)
- `/blog/[slug]` - Blog post detail (server component with SSG)
- `/projects` - Project grid with Newest/Oldest sort (reads from `lib/projects.ts`)
- `/projects/*` - Individual project demo pages (stock-analyzer, movie-recommendations, healthcare-chatbot)
- `/portfolio` - Stock portfolio table; fetches `/api/stocks`
- `/about` - About page with Education, Skills, Coursework, Experience timeline, Activities

### Styling (Chrome Noir)

- **Fonts**: Poppins (UI/headings), Lora (body prose), JetBrains Mono (date badges) — all loaded via `next/font/google` in `app/layout.tsx`. CSS vars: `--font-poppins`, `--font-lora`, `--font-mono`.
- **Theme**: deep black bg (`#080807`), light text (`#faf9f5`), muted (`#b0aea5`), accent terracotta (`#d97757`).
- **Background**: `<ChromeShader />` (canvas + RAF) is mounted globally in the root layout — fixed `inset:0`, `z-index:0`, draws fluid blobs + warm glow + specular hot-spots + edge vignette. Pauses when `document.hidden`.
- **Glass card** (`.gc`): `rgba(255,255,255,.038)` + 22px backdrop-blur + animated conic-gradient pearl border that spins on hover.
- **Buttons** (`.btn-p` primary, `.btn-o` outline): chrome-pill with inset specular highlights and warm halo glow.
- **Badges**: `.ba` accent, `.bn` neutral, `.bd` mono date.
- **Animations**: `wordStream` (letter-by-letter), `fadeUp`, `pearl-spin`. Defined in `app/globals.css`.
- Legacy aliases (`.card`, `.card-elevated`, `.btn-primary`, `.btn-outline`, `.glass-card`, `.hero-gradient`) are mapped to the new classes so subpages inherit cleanly.
- shadcn/ui components in `components/ui/` use Radix UI + Tailwind CSS variables.

### Chrome Noir components (`components/chrome/`)

- `ChromeShader.tsx` — canvas-based animated background.
- `StreamText.tsx` — letter-by-letter text reveal with `wordStream` keyframe.
- `PageHero.tsx` — eyebrow / title / subtitle hero shell used by Projects, Blog, About, Portfolio.
- `GlassCard.tsx` — thin wrapper that emits `<div className="gc ...">`.

### Project data

Projects are defined in `lib/projects.ts` and consumed by both the home page (top 3 as "Selected Work") and `/projects` (full grid). The `Project` type lives there too — add new entries to that file and both pages pick them up automatically.

### Legacy Code

`lib/api.ts` contains fetch wrappers for an external API (`localhost:5000`) that is not actively used. Blog data is served through Supabase (with local backup); project data is in `lib/projects.ts`.

## Environment Variables

```
ALPHA_VANTAGE_API_KEY           # Stock data (required for live prices)
NEXT_PUBLIC_SUPABASE_URL        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Supabase anonymous key
```

All are optional for local dev -- the site degrades gracefully (local backup posts, stock API returns 500).

## Testing

Tests use Vitest with jsdom environment. Config in `vitest.config.ts`, setup in `vitest.setup.ts`. Path alias `@/` is configured in the Vitest resolve config.

Test files live adjacent to source: `app/api/stocks/__tests__/route.test.ts`. Tests use `vi.mock` for Supabase client and `vi.fn()` for global fetch. Each test dynamically imports the route handler (`await import('../route')`) to get fresh module state after `vi.resetModules()`.

## Key Conventions

- All imports use `@/*` path alias (maps to repo root)
- Pages are mix of client (`"use client"`) and server components -- check the top of each file
- Images use `unoptimized: true` in Next.js config (external blob URLs)
- Build ignores TypeScript and ESLint errors (`ignoreBuildErrors: true`)
