# Navya Anumula — Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](./LICENSE)

Personal developer portfolio. Senior Frontend Engineer specializing in React, Angular, TypeScript, and React Native. Built with React, TypeScript, and Vite.

**Live site:** [navya-anumula-portfolio.vercel.app](https://navya-anumula-portfolio.vercel.app/)

## Features

- Light theme by default with a persisted dark mode toggle
- Animated, scrolling code-snippet background rendered from real snippets used in this app
- Command palette (`⌘K` / `Ctrl+K` or `/`) for jumping to any section
- Scroll-reveal animations on sections and cards
- Typewriter hero intro that cycles through role titles
- Core Competencies grid and animated skill-proficiency bars
- **Resume Fit Score** — a live LangGraph agent (not a single prompt) that takes a pasted job description and scores this resume's fit out of 100, with a self-critique step that checks its own score and strengths against the actual resume data before returning
- Tabbed Experience section
- Fully typed with TypeScript, including a typed content model in `src/data.ts`

## Tech stack

React 18 · TypeScript · Vite · plain CSS (no UI framework) · Vercel serverless functions · LangGraph.js · Anthropic Claude API (Resume Fit Score)

## Getting started

```
npm install
npm run dev
```

Opens at http://localhost:5173

### Resume Fit Score setup (optional)

The Resume Fit Score feature calls a Vercel serverless function (`api/fit-score.ts`) backed by the Anthropic API. To run it locally or deploy it:

1. Get an API key from [console.anthropic.com](https://console.anthropic.com/settings/keys) and make sure the account has credit — a fresh key starts at $0 balance. Each run is 2 short Claude Haiku calls, so cost per run is a fraction of a cent.
2. Copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY`.
3. `api/fit-score.ts` is a Vercel Function, not a Vite dev-server route — `npm run dev` alone won't serve it. Use the [Vercel CLI](https://vercel.com/docs/cli) and run `vercel dev` instead to test it locally.
4. For production, add `ANTHROPIC_API_KEY` in Vercel → Project → Settings → Environment Variables, then redeploy.

Without the key set (or without credit on the account), every other part of the site works normally — the fit-score form will just return an error.

The endpoint has a basic in-memory per-instance rate limit (8 requests/hour/IP) as a first line of defense against abuse, since it's a public-facing endpoint that spends real API credits. That's a best-effort check only (serverless instances aren't persistent), so it's also worth adding a proper rate-limit rule in Vercel → Project → Settings → Firewall for real protection.

## Build for deployment

```
npm run build
```

Runs a TypeScript project check (`tsc -b`) before building, so type errors are caught before deploy. Outputs a static `dist/` folder — deployed on Vercel.

```
npm run preview
```

Serves the production build locally to sanity-check before deploying.

## Project structure

```
api/
  fit-score.ts           LangGraph agent (Vercel serverless function) behind the Resume Fit Score

src/
  App.tsx               page structure and components
  data.ts                all content — profile, skills, core competencies, experience — with typed interfaces
  hooks.ts                typed hooks: useReveal, useTheme, useTypewriter
  CommandPalette.tsx      ⌘K / "/" command palette for section navigation
  CodeBackground.tsx      animated scrolling code-snippet background
  ResumeFitScore.tsx      frontend for the Resume Fit Score (calls api/fit-score.ts)
  ContactForm.tsx         Formspree-backed contact form (currently disabled in App.tsx, see below)
  index.css               theme (light default, [data-theme="dark"] override), layout, animations
  main.tsx                app entry point
```

## Customizing

- **Content:** edit `src/data.ts` — `profile` (including `bio`), `skills`, `coreCompetencies`, `experience`, and `roles` (hero typewriter titles). No layout code changes needed.
- **Accent color:** `--accent` in `src/index.css` (light: `#0d9488`, dark: `#5ef1c4`).
- **Theme default:** `useTheme()` in `src/hooks.ts` defaults to `'light'`.
- **Contact form:** `ContactForm` is built but currently commented out in `App.tsx` pending a live Formspree endpoint. Set `contactFormEndpoint` in `src/data.ts`, then uncomment the import and `<ContactForm />` usage in `App.tsx` to re-enable it.

## Contact

- Email: navyaanumula@gmail.com
- LinkedIn: [linkedin.com/in/navya-anumula-frontend-engineer](https://www.linkedin.com/in/navya-anumula-frontend-engineer/)

## License

MIT
