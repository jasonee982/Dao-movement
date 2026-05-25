# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

All commands must be run from the `freq-app/` directory.

```bash
npm run dev      # Start dev server at localhost:3000 (uses Turbopack)
npm run build    # Production build
npm run lint     # ESLint (flat config v9)
```

There is no test suite configured.

## Architecture

**Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · Radix UI · Framer Motion

### Directory layout

```
freq-app/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout: metadata, fonts, Navbar + Footer
│   ├── page.tsx            # Home (hero, stats, stories, products, newsletter CTA)
│   ├── stories/
│   │   ├── page.tsx        # Stories list with search, tag filter, EN/CN toggle
│   │   └── [id]/page.tsx   # Dynamic story detail
│   ├── products/page.tsx
│   ├── newsletter/page.tsx
│   ├── build-in-public/page.tsx
│   └── about/page.tsx
├── components/
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # StoryCard, ProductCard, Toast
└── data/
    └── content.ts          # Single source of truth for all static content
```

### Data model

All content — stories, products, stats, platform links, roadmap — lives in `data/content.ts` as exported TypeScript objects. There is no backend, database, or API. To add or edit content, edit this file only.

### Client vs server components

`app/layout.tsx` is a server component. Every page under `app/` uses `"use client"` because they contain state or event handlers. New pages should follow the same pattern unless they are fully static.

### Styling

- Tailwind CSS v4 (configured via `postcss.config.mjs` with `@tailwindcss/postcss`)
- Custom animations and color tokens are defined in `app/globals.css`
- Dark-mode palette: background `#0a0a0f`/`#12121a`, accent violet `#7c3aed`, text `#e8e8f0`
- Path alias `@/*` maps to the repo root (e.g. `@/components/...`, `@/data/...`)

### TypeScript

Strict mode is enabled. Use the `@/*` path alias for all internal imports.
