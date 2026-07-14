# Navya Anumula — Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](./LICENSE)

Personal developer portfolio. Senior Frontend Engineer specializing in React, Angular, TypeScript, and React Native. Built with React, TypeScript, and Vite.

**Live site:** [navya-anumula-portfolio.vercel.app](https://navya-anumula-portfolio.vercel.app/)

## Features

- Light theme by default with a persisted dark mode toggle, purple accent (`#663399` light / `#cea2fd` dark)
- Animated, scrolling code-snippet background rendered from real snippets used in this app
- Hero includes a browser-chrome-framed code mockup that types itself out live from real profile/skills data
- Floating bottom Section Dock — icon tiles for About/Competencies/Skills/Experience/Contact, always visible, current section highlighted via scroll-spy. Replaces the old top navbar entirely
- Command palette (`⌘K` / `Ctrl+K` or `/`) for jumping to any section
- Scroll-reveal animations on sections and cards
- Typewriter hero intro that cycles through role titles
- Core Competencies grid and animated skill-proficiency bars
- Tabbed Experience section
- Fully typed with TypeScript, including a typed content model in `src/data.ts`

## Tech stack

React 18 · TypeScript · Vite · plain CSS (no UI framework, component-scoped `.css` files)

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

Runs a TypeScript project check (`tsc -b`) before building, so type errors are caught before deploy. Outputs a static `dist/` folder — deployed on Vercel.

```
npm run preview
```

Serves the production build locally to sanity-check before deploying.

## Project structure

```
src/
  App.tsx                     page composition — assembles the components below
  data.ts                     all content — profile, skills, core competencies, experience — with typed interfaces
  hooks.ts                    typed hooks: useReveal, useTheme, useTypewriter, useTypedCode, useActiveSection
  index.css                   global theme (light default, [data-theme="dark"] override), layout, animations
  main.tsx                    app entry point

  components/                 one folder per component, each with its own co-located .css
    Nav/                       top bar — logo, command palette trigger, theme toggle
    SectionDock/               floating bottom nav — icon tiles, active-section highlighting
    CommandPalette/            ⌘K / "/" command palette
    ThemeToggle/                light/dark switch
    Hero/                      intro + HeroCodeMockup (self-typing code panel)
    About/                     bio section
    CoreCompetencies/          competencies grid
    Skills/                    animated skill-proficiency cards
    Experience/                 tabbed experience section
    Contact/                    contact section (+ ContactForm, currently disabled — see below)
    CodeBackground/            animated scrolling code-snippet background
    Footer/
```

## Customizing

- **Content:** edit `src/data.ts` — `profile` (including `bio`), `skills`, `coreCompetencies`, `experience`, and `roles` (hero typewriter titles). The Hero code mockup and Section Dock both read from this file too, so content stays in sync automatically. No layout code changes needed.
- **Accent color:** `--accent` in `src/index.css` (light: `#663399`, dark: `#cea2fd`).
- **Theme default:** `useTheme()` in `src/hooks.ts` defaults to `'light'`.
- **Section Dock:** edit `DOCK_ITEMS` in `src/components/SectionDock/SectionDock.tsx` to add, remove, or reorder nav tiles — each needs a matching section `id` in the page.
- **Contact form:** `ContactForm` is built but currently commented out in `App.tsx` pending a live Formspree endpoint. Set `contactFormEndpoint` in `src/data.ts`, then uncomment the import and `<ContactForm />` usage in `App.tsx` to re-enable it.

## Contact

- Email: navyaanumula@gmail.com
- LinkedIn: [linkedin.com/in/navya-anumula-frontend-engineer](https://www.linkedin.com/in/navya-anumula-frontend-engineer/)

## License

MIT
