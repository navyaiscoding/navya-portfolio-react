// Maps a skill label (must match the exact string in data.ts) to a devicon
// CDN icon. Not every skill has a well-established logo (e.g. "REST APIs",
// "JWT", acronyms, concepts) — those are intentionally left out and just
// render with initials instead of guessing at the wrong icon.
//
// `invert` marks icons that are solid black/monochrome, so they'd otherwise
// disappear on the dark theme's dark card background — Skills.tsx applies a
// CSS filter to flip them to white in dark mode.
export interface SkillIcon {
  src: string
  invert?: boolean
}

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
// Simple Icons hosts a `/<slug>` per brand and renders it in black by
// default — matches the `invert: true` treatment used for other
// monochrome logos below (GitHub, Next.js) so it stays visible in dark mode.
const SIMPLEICONS = 'https://cdn.simpleicons.org'

export const skillIcons: Record<string, SkillIcon> = {
  React: { src: `${DEVICON}/react/react-original.svg` },
  Angular: { src: `${DEVICON}/angular/angular-original.svg` },
  'Next.js': { src: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
  TypeScript: { src: `${DEVICON}/typescript/typescript-original.svg` },
  'JavaScript (ES6+)': { src: `${DEVICON}/javascript/javascript-original.svg` },
  'React Native': { src: `${DEVICON}/react/react-original.svg` },
  HTML5: { src: `${DEVICON}/html5/html5-original.svg` },
  CSS3: { src: `${DEVICON}/css3/css3-original.svg` },
  SCSS: { src: `${DEVICON}/sass/sass-original.svg` },
  'Tailwind CSS': { src: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  Storybook: { src: `${DEVICON}/storybook/storybook-original.svg` },
  Redux: { src: `${DEVICON}/redux/redux-original.svg` },
  Jest: { src: `${DEVICON}/jest/jest-plain.svg` },
  Postman: { src: `${DEVICON}/postman/postman-original.svg` },
  Git: { src: `${DEVICON}/git/git-original.svg` },
  GitHub: { src: `${DEVICON}/github/github-original.svg`, invert: true },
  Jenkins: { src: `${DEVICON}/jenkins/jenkins-original.svg` },
  Webpack: { src: `${DEVICON}/webpack/webpack-original.svg` },
  Vite: { src: `${DEVICON}/vitejs/vitejs-original.svg` },
  Figma: { src: `${DEVICON}/figma/figma-original.svg` },
  'Node.js': { src: `${DEVICON}/nodejs/nodejs-original.svg` },
  GraphQL: { src: `${DEVICON}/graphql/graphql-plain.svg` },
  PostgreSQL: { src: `${DEVICON}/postgresql/postgresql-original.svg` },
  // Best-guess slugs for newer AI tooling — couldn't verify these resolve
  // from this environment (network restricted), but the onError fallback
  // in Skills.tsx quietly swaps in initials if any of these 404.
  'GitHub Copilot': { src: `${SIMPLEICONS}/githubcopilot`, invert: true },
  Cursor: { src: `${SIMPLEICONS}/cursor`, invert: true },
  Claude: { src: `${SIMPLEICONS}/claude`, invert: true },
}
