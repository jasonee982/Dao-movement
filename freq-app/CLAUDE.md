@AGENTS.md

# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## ⚠️ Read this first

This project runs **Next.js 16** (see `package.json`). It has breaking changes
relative to older Next.js versions — APIs, conventions, and file structure may
differ from training data. **Before writing framework code, read the relevant
guide in `node_modules/next/dist/docs/`** and heed deprecation notices. This is
the same instruction carried in `AGENTS.md` (imported above).

## What this is

**FREQ** is the marketing + content website for a bilingual (English / 简体中文)
sci-fi storytelling brand, built and run as a one-person company (OPC) — "a GM
by day, writer by night." The site showcases short stories, sells digital
products (lead magnets, ebooks, memberships), documents the build-in-public
journey, and captures newsletter signups.

There is **no backend, database, or CMS**. All content is static data defined in
`data/content.ts` and rendered by React components. Newsletter/product CTAs are
UI-only stubs (they pop a `Toast`, they do not submit anywhere).

## Repository layout

```
Dao-movement/              # repo root (contains only freq-app)
└── freq-app/              # the Next.js application — work here
    ├── app/               # App Router pages (route = folder)
    │   ├── layout.tsx     # root layout: fonts, Navbar, Footer, dark theme
    │   ├── page.tsx       # home / landing page
    │   ├── globals.css    # Tailwind import + CSS variables + keyframe animations
    │   ├── stories/       # /stories list + /stories/[id] story reader
    │   ├── products/      # /products store page
    │   ├── build-in-public/   # /build-in-public blog-style updates
    │   ├── newsletter/    # /newsletter signup page
    │   └── about/         # /about founder/brand page
    ├── components/
    │   ├── layout/        # Navbar, Footer (site chrome)
    │   └── ui/            # StoryCard, ProductCard, Toast (reusable pieces)
    ├── data/content.ts    # ⭐ single source of content — edit here, not in pages
    ├── public/
    │   └── index.html     # standalone single-file mirror of the site (see below)
    └── (config files)     # next.config.ts, tsconfig.json, eslint.config.mjs, etc.
```

## Tech stack

- **Next.js 16.2.6** with the **App Router**
- **React 19.2** — most pages/components are `"use client"` (they use hooks,
  state, animation). Server components are the exception here, not the rule.
- **TypeScript 5**, `strict: true`, `noEmit` (Next handles the build)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — there is **no
  `tailwind.config.js`**. Tailwind is imported with `@import "tailwindcss";` at
  the top of `app/globals.css`; theming is done with CSS custom properties.
- **framer-motion** for animations, **lucide-react** for icons,
  **@radix-ui** (dialog, scroll-area, tabs) for accessible primitives
- **Geist / Geist Mono** fonts via `next/font/google`
- Path alias: **`@/*` → project root** (e.g. `@/data/content`, `@/components/...`)

## Commands

Run all commands from inside `freq-app/`:

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (eslint-config-next: core-web-vitals + typescript)
```

There is **no test suite** configured. Verify changes by running `npm run dev`
and/or `npm run build` and checking the affected pages.

## Conventions & patterns

- **Content lives in `data/content.ts`.** Pages import the exported arrays and
  map over them. When adding/changing stories, products, posts, stats,
  platforms, or roadmap phases, edit this file — do not hardcode content in
  pages. Exports: `stories`, `products`, `buildInPublicPosts`, `stats`,
  `platforms`, `roadmapPhases`.
- **Bilingual fields.** Content objects carry paired fields: `title`/`titleCN`,
  `excerpt`/`excerptCN`, `name`/`nameCN`, `description`/`descriptionCN`. Many
  pages have an EN/CN language toggle in local state. When adding content,
  always provide both languages.
- **Full story prose** for the reader is in a separate `storyContent` map inside
  `app/stories/[id]/page.tsx` (keyed by story `id`, with `en`/`cn` paragraph
  arrays), kept apart from the story metadata in `data/content.ts`.
- **Client components.** Add `"use client"` at the top of any file using hooks,
  event handlers, or framer-motion. The dynamic route uses React's `use()` to
  unwrap params.
- **Styling.** Use Tailwind utility classes. The palette is a dark
  violet-accented theme; reuse the CSS variables defined in `app/globals.css`
  (`--accent` `#7c3aed`, `--surface`, `--border`, etc.) and the helper classes
  there (`grid-bg`, `scan-line`, animation keyframes) rather than inventing new
  colors. `coverGradient` strings on stories are Tailwind gradient class lists.
- **Icons** come from `lucide-react`. **Toasts** are the standard feedback
  mechanism for stubbed CTAs — render `<Toast>` and set a message string.
- **Routing** follows App Router file conventions: a folder under `app/` with a
  `page.tsx` is a route; `[id]` is a dynamic segment.

## The standalone `public/index.html`

`public/index.html` is a **fully self-contained, single-file** version of the
entire site (inline CSS + JS, ~1100 lines, no build step). It mirrors the React
app's content and design for zero-dependency hosting/preview. It is **not
generated** from the React source — if you change site content or design and the
single-file version is meant to stay in sync, update it manually too. When in
doubt about which is canonical, the Next.js app under `app/` is the primary
implementation.

## Git workflow

- Active development branch: **`claude/claude-md-docs-rpfXW`**.
- Commit with clear, descriptive messages; push with
  `git push -u origin <branch>`. Do not open a pull request unless explicitly
  asked.
- Do not push to other branches without explicit permission.
