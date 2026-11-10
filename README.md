# Navya Anumula — Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](./LICENSE)

Personal developer portfolio. Senior Frontend Engineer specializing in React, Angular, TypeScript, and React Native. Built with React, TypeScript, and Vite, backed by a small Node.js/Express API deployed as Vercel serverless functions.

**Live site:** [navya-anumula-portfolio.vercel.app](https://navya-anumula-portfolio.vercel.app/)

## Features

- Light theme by default with a persisted dark mode toggle, purple accent (`#663399` light / `#cea2fd` dark)
- Animated, scrolling code-snippet background rendered from real snippets used in this app
- Hero includes a browser-chrome-framed code mockup that types itself out live from real profile/skills data
- Floating bottom Section Dock — icon tiles for About/Competencies/Skills/Experience/Contact, always visible, current section highlighted via scroll-spy. Replaces the old top navbar entirely
- Scroll-reveal animations on sections and cards
- Typewriter hero intro that cycles through role titles
- Core Competencies grid, fetched live from a Node/Express API (`/api/competencies`) with a skeleton loading state and a silent fallback to static data if the request fails
- Animated skill-proficiency bars
- Tabbed Experience section
- Fully typed with TypeScript, including a typed content model in `src/data.ts`

## Tech stack

**Frontend:** React 18 · TypeScript · Vite · plain CSS (no UI framework, component-scoped `.css` files)
**API:** Node.js · Express · TypeScript · Zod (validation) · Nodemailer, deployed as Vercel serverless functions alongside the frontend

## Getting started

```
npm install
vercel dev
```

`vercel dev` serves both the frontend and the `/api` functions from one process, so the Core Competencies fetch and the contact form work end to end locally. Opens at `http://localhost:3000` by default.

Plain `npm run dev` (Vite only, no API) also works for frontend-only work — the Core Competencies grid falls back to static data and the contact form fails gracefully in that mode, since there's no API to hit.

## Build for deployment

```
npm run build
```

Runs a TypeScript project check (`tsc -b`) before building, so type errors are caught before deploy. Outputs a static `dist/` folder.

```
npm run preview
```

Serves the production build locally to sanity-check before deploying.

## API

The API lives in `server/` (Express app, routes, controllers, middleware, validation) and is deployed via a single catch-all Vercel serverless function, `api/[...path].ts`, which re-exports the Express app directly — no route rewriting needed, since Vercel passes the original request path through.

**Endpoints:**
- `GET /api/health` — liveness check
- `GET /api/competencies` — returns the core competencies list

**Local development:** `vercel dev` runs the API alongside the frontend on the same origin — no CORS config needed. The standalone `server/` app (`cd server && npm run dev`) also still works independently for API-only testing via curl, on `localhost:4000`.

**Environment variables** (set in Vercel project settings for production, or `server/.env` for standalone local testing — see `server/.env.example`):

Full details in [`server/README.md`](./server/README.md).

## Project structure

```
api/
  [...path].ts               catch-all Vercel serverless function — re-exports the Express app from server/

server/                       Express API source (see server/README.md for the full write-up)
  src/
    index.ts                   starts the standalone HTTP server (local dev only)
    app.ts                     builds the Express app: middleware + routes — this is what api/[...path].ts imports
    config/env.ts               typed environment config
    data/coreCompetencies.ts    the core competencies list served by GET /api/competencies
    routes/                     URL path -> controller (health, contact, competencies)
    controllers/                 request handling logic
    services/mailer.ts           sends (or logs, in dev mode) contact emails
    schemas/                     Zod request-validation schemas
    middleware/                   validate, rateLimiter, errorHandler, notFound
    utils/ApiError.ts             typed error with an HTTP status
    types/                        shared TypeScript types

src/
  App.tsx                     page composition — assembles the components below
  data.ts                     all content — profile, skills, core competencies, experience — with typed interfaces
  hooks.ts                    typed hooks: useReveal, useTheme, useTypewriter, useTypedCode, useActiveSection, useCoreCompetencies
  index.css                   global theme (light default, [data-theme="dark"] override), layout, animations
  main.tsx                    app entry point

  components/                 one folder per component, each with its own co-located .css
    Nav/                       top bar — logo, theme toggle
    SectionDock/               floating bottom nav — icon tiles, active-section highlighting
    ThemeToggle/                light/dark switch
    Hero/                      intro + HeroCodeMockup (self-typing code panel)
    About/                     bio section
    CoreCompetencies/          competencies grid — fetched live via useCoreCompetencies, skeleton loader, static fallback
    Skills/                    animated skill-proficiency cards
    Experience/                 tabbed experience section
    CodeBackground/            animated scrolling code-snippet background
    Footer/
```

## Customizing

- **Content:** edit `src/data.ts` — `profile` (including `bio`), `skills`, `coreCompetencies`, `experience`, and `roles` (hero typewriter titles). The Hero code mockup and Section Dock both read from this file too, so content stays in sync automatically. `coreCompetencies` also doubles as the static fallback if the live API fetch fails. No layout code changes needed.
- **Accent color:** `--accent` in `src/index.css` (light: `#663399`, dark: `#cea2fd`).
- **Theme default:** `useTheme()` in `src/hooks.ts` defaults to `'light'`.
- **Section Dock:** edit `DOCK_ITEMS` in `src/components/SectionDock/SectionDock.tsx` to add, remove, or reorder nav tiles — each needs a matching section `id` in the page.

## Contact

- Email: navyaanumula@gmail.com
- LinkedIn: [linkedin.com/in/navya-anumula-frontend-engineer](https://www.linkedin.com/in/navya-anumula-frontend-engineer/)

## License

MIT

<!-- Test change: checks that pushing opens a PR and Claude reviews it. Safe to delete. -->
