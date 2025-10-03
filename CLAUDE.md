# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website built with **Next.js 15.2.4**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components. The site showcases personal projects, a blog, and real-time stock data integration.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives via shadcn/ui
- **Backend**: Supabase for blog data, Alpha Vantage API for stock data
- **State Management**: React hooks (useState, useEffect)

## Development Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

Note: TypeScript and ESLint errors are ignored during builds (`ignoreBuildErrors: true` in next.config.mjs).

## Project Structure

```
app/
├── layout.tsx              # Root layout with header/footer navigation
├── page.tsx                # Home page (stock portfolio display)
├── projects/               # Project showcase pages
│   ├── page.tsx           # Projects listing
│   ├── movie-recommendations/
│   ├── healthcare-chatbot/
│   └── stock-analyzer/
├── blog/                   # Blog section
│   └── page.tsx
├── about/                  # About page
│   └── page.tsx
└── api/                    # API routes
    ├── stocks/route.ts     # Alpha Vantage stock data
    ├── movies/route.ts
    ├── projects/route.ts
    └── test/route.ts

components/
├── ui/                     # shadcn/ui components (50+ components)
├── DescriptionBox.tsx
├── TryItOutIframe.tsx
└── theme-provider.tsx

lib/
├── supabaseClient.ts       # Supabase client & getBlogPosts()
├── api.ts                  # API utilities (getProjects, addProject, etc.)
└── utils.ts                # Tailwind utility (cn function)

hooks/                      # Custom React hooks
```

## Key Architecture Patterns

### Path Aliases

All imports use `@/*` alias (defined in tsconfig.json):
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
```

### API Routes

API routes are defined in `app/api/*/route.ts` files and export named functions:
- `GET` for fetching data
- `POST` for creating data

Example: `/api/stocks` fetches real-time stock data from Alpha Vantage API.

### Environment Variables

Required environment variables:
```bash
ALPHA_VANTAGE_API_KEY           # For stock data API
NEXT_PUBLIC_SUPABASE_URL        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Supabase anonymous key
NEXT_PUBLIC_API_URL             # Optional: API base URL (defaults to localhost:5000)
```

### Component Library (shadcn/ui)

This project uses shadcn/ui components (not installed via npm). Components are:
- Located in `components/ui/`
- Built on Radix UI primitives
- Styled with Tailwind CSS using CSS variables
- Configured via `components.json`

To add new components, the standard approach would be using shadcn CLI (though not explicitly defined in scripts).

### Data Fetching

1. **Stock Data**: Fetched client-side via `/api/stocks` route (Alpha Vantage)
2. **Blog Posts**: Fetched from Supabase via `getBlogPosts()` in `lib/supabaseClient.ts`
3. **Projects**: Fetched via `lib/api.ts` utilities

### Styling Approach

- **Design System**: Clean, Apple-inspired design with light background
- **Layout**: Fixed header with backdrop blur, centered content containers
- **Colors**: Gradient accents (blue-400 to cyan-400), neutral base colors
- **Typography**: Inter font family

## Important Notes

- The build configuration **ignores TypeScript and ESLint errors** during production builds
- Stock API has rate limits (AlphaVantage free tier)
- Images are unoptimized (`images: { unoptimized: true }`)
- Uses experimental webpack features for faster builds
- The site includes shell scripts for git backdating commits (`backdate_5weeks.sh`, `last_week_commits.sh`)

## Working with Projects

Each project under `app/projects/` is a standalone page showcasing a different demo (movie recommendations, healthcare chatbot, stock analyzer). These pages typically include:
- Interactive UI demonstrations
- Integration with external APIs or ML models
- Custom components for data visualization
