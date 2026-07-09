# Navya Anumula — Portfolio Site

Developer portfolio built with React + TypeScript + Vite. Light theme by default with a dark mode toggle, scroll-reveal animations, hover micro-interactions, expandable project cards, and a typewriter role intro.

## Run locally

```
npm install
npm run dev
```

Opens at http://localhost:5173

**Note:** the `npm install` step will pull in `typescript`, `@types/react`, and `@types/react-dom` (added for the TypeScript conversion) — rerun it even if you already have `node_modules` from before.

## Build for deployment

```
npm run build
```

Runs a TypeScript project check (`tsc -b`) before building, so any type errors are caught before deploy. Outputs a static `dist/` folder — drag it into Netlify, or deploy via Vercel/GitHub Pages.

## Structure

- `src/data.ts` — all content (profile, skills, projects, experience) plus the `Profile` / `SkillGroup` / `Project` / `ExperienceEntry` interfaces. Edit this file to update text without touching layout code.
- `src/hooks.ts` — typed hooks: `useReveal` (scroll animations), `useTheme` (light/dark toggle), `useTypewriter` (hero role cycling).
- `src/App.tsx` — page structure and components.
- `src/index.css` — theme (light default, `[data-theme="dark"]` override), layout, and animation styles.

## Customizing

- Accent color: change `--accent` in `src/index.css` (light: `#0d9488`, dark: `#5ef1c4`).
- Add/remove projects: edit the `projects` array in `src/data.ts`.
- Add/remove roles: edit the `experience` array in `src/data.ts`.
- Hero typewriter titles: edit the `roles` array in `src/data.ts`.

## Cleanup

This project was converted from JavaScript to TypeScript. The old `.jsx`/`.js` files (`App.jsx`, `data.js`, `hooks.js`, `main.jsx`, `vite.config.js`) are no longer used — they're marked deprecated and can be safely deleted:

```
rm src/App.jsx src/data.js src/hooks.js src/main.jsx vite.config.js
```
