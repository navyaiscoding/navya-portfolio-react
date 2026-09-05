// One accent per skill category, used to tint each icon badge and the
// category header dot. Keeps the logo wall from feeling monochrome while
// staying cohesive — each category has its own identity, not a rainbow.
export const categoryColors: Record<string, string> = {
  Frontend: '#663399',
  'State Management & Architecture': '#2563eb',
  'Testing & Quality': '#b45309',
  'DevOps & Tooling': '#0f6e56',
  'Backend & APIs': '#c2410c',
  'AI-Assisted Development': '#be185d',
}

export const defaultCategoryColor = '#663399'

// Fallback for skills without a logo (skillIcons.ts) — initials in a badge,
// same treatment as the icon ones, so the grid stays visually consistent
// instead of mixing logo circles with plain text.
export function getInitials(label: string): string {
  const words = label.replace(/\(.*?\)/g, '').trim().split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}
