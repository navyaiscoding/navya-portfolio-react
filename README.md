# Navya Anumula — Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](./LICENSE)

Personal developer portfolio for Navya Anumula, Senior Frontend Engineer specializing in React, Angular, TypeScript, and React Native. Built with React, TypeScript, and Vite.

**Live site:** (https://navya-anumula-portfolio.vercel.app/)

## Features

- Light theme by default with a persisted dark mode toggle
- Scroll-reveal animations on sections and cards
- Hover micro-interactions on project cards, skill cards, and pills
- Expandable project cards — click to reveal full case-study detail
- Typewriter hero intro that cycles through role titles
- Fully typed with TypeScript, including a typed content model in `src/data.ts`

## Tech stack

React 18 · TypeScript · Vite · plain CSS (no UI framework)

## Getting started

```
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for deployment

```
npm run build
```

Runs a TypeScript project check (`tsc -b`) before building, so type errors are caught before deploy. Outputs a static `dist/` folder — deploy it to Netlify, Vercel, or GitHub Pages.

```
npm run preview
```

Serves the production build locally to sanity-check before deploying.

## Project structure

```
src/
  App.tsx        page structure and components
  data.ts        all content — profile, skills, projects, experience — with typed interfaces
  hooks.ts       typed hooks: useReveal, useTheme, useTypewriter
  index.css      theme (light default, [data-theme="dark"] override), layout, animations
  main.tsx       app entry point
```

## Customizing

- **Content:** edit `src/data.ts` — `profile`, `skills`, `projects`, `experience`, and `roles` (hero typewriter titles). No layout code changes needed.
- **Accent color:** `--accent` in `src/index.css` (light: `#0d9488`, dark: `#5ef1c4`).
- **Theme default:** `useTheme()` in `src/hooks.ts` defaults to `'light'`.

## Contact

- Email: navyaanumula@gmail.com
- LinkedIn: [linkedin.com/in/navya-anumula-software-engineer](https://https://www.linkedin.com/in/navya-anumula-software-engineer/)

## License

MIT
