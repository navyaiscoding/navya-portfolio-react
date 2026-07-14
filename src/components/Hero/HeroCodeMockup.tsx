import { Fragment, type ReactNode } from 'react'
import { profile, skills } from '../../data'
import { useTypedCode } from '../../hooks'
import './HeroCodeMockup.css'

const KEYWORDS = new Set(['const', 'true', 'false'])

function highlightLine(line: string, key: number): ReactNode {
  const tokenPattern = /('[^']*'|"[^"]*")|(\b[A-Za-z_][A-Za-z0-9_]*\b)|([{}()[\]<>.,:;=])/g
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0

  while ((match = tokenPattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={`${key}-gap-${i}`}>{line.slice(lastIndex, match.index)}</Fragment>)
    }
    const [full, str, word, punct] = match
    if (str) {
      parts.push(<span className="tok-str" key={`${key}-t-${i}`}>{str}</span>)
    } else if (word) {
      if (KEYWORDS.has(word)) {
        parts.push(<span className="tok-kw" key={`${key}-t-${i}`}>{word}</span>)
      } else {
        parts.push(<Fragment key={`${key}-t-${i}`}>{word}</Fragment>)
      }
    } else if (punct) {
      parts.push(<span className="tok-punct" key={`${key}-t-${i}`}>{punct}</span>)
    }
    lastIndex = match.index + full.length
    i++
  }
  if (lastIndex < line.length) {
    parts.push(<Fragment key={`${key}-end`}>{line.slice(lastIndex)}</Fragment>)
  }
  return parts
}

// Builds the typed snippet straight from real profile/skills data, so it can
// never drift out of sync with the rest of the site.
function buildSnippet(): string {
  const stack = skills[0]?.items.slice(0, 4) ?? []
  const stackLiteral = stack.map((s) => `'${s}'`).join(', ')
  return [
    `const engineer = {`,
    `  name: '${profile.name}',`,
    `  title: '${profile.title}',`,
    `  stack: [${stackLiteral}],`,
    `  location: '${profile.location}',`,
    `  available: true,`,
    `}`,
  ].join('\n')
}

export default function HeroCodeMockup() {
  const code = buildSnippet()
  const { typed, done } = useTypedCode(code, 16)
  const lines = typed.split('\n')

  return (
    <div className="hero-mockup" aria-hidden="true">
      <div className="hero-mockup-bar">
        <span className="hero-mockup-dot dot-red" />
        <span className="hero-mockup-dot dot-yellow" />
        <span className="hero-mockup-dot dot-green" />
        <span className="hero-mockup-title mono">profile.ts</span>
      </div>
      <pre className="hero-mockup-body mono">
        {lines.map((line, i) => (
          <div key={i}>
            {highlightLine(line, i)}
            {!done && i === lines.length - 1 && <span className="hero-mockup-cursor" />}
          </div>
        ))}
      </pre>
    </div>
  )
}
