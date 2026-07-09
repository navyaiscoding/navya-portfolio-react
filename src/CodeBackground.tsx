import { Fragment, type ReactNode } from 'react'

// Real, representative snippets pulled from this project's own source
// (hooks.ts, App.tsx, ContactForm.tsx, CommandPalette.tsx) — the background
// is literally her own code, not generic filler.
const SNIPPETS: string[] = [
  `export function useTheme(): ThemeResult {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  return { theme, toggle }
}`,
  `function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setVisible(true)
  })
  return { ref, visible }
}`,
  `interface Project {
  title: string
  company: string
  stack: string[]
  highlights: string[]
}`,
  `const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  setStatus('submitting')
  const res = await fetch(contactFormEndpoint, {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  })
}`,
  `window.addEventListener('keydown', (e) => {
  const cmdK = (e.metaKey || e.ctrlKey) && e.key === 'k'
  if (cmdK) {
    e.preventDefault()
    setOpen(true)
  }
})`,
  `function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  const currentWord = words[wordIndex % words.length]
  return text
}`,
  `<SkillCard
  group={group}
  index={i}
  key={group.category}
/>`,
  `export const skills: SkillGroup[] = [
  { category: 'Frontend', level: 95 },
  { category: 'Testing & Quality', level: 85 },
]`,
]

const KEYWORDS = new Set([
  'export', 'function', 'const', 'let', 'return', 'if', 'import', 'from',
  'interface', 'type', 'async', 'await', 'new', 'default', 'extends',
])

const HOOKS_AND_TYPES = new Set([
  'useTheme', 'useReveal', 'useEffect', 'useState', 'useRef', 'useTypewriter',
  'ThemeResult', 'Theme', 'HTMLElement', 'IntersectionObserver', 'Project',
  'FormEvent', 'SkillGroup', 'SkillCard',
])

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
      } else if (HOOKS_AND_TYPES.has(word)) {
        parts.push(<span className="tok-type" key={`${key}-t-${i}`}>{word}</span>)
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

function SnippetBlock({ code }: { code: string }) {
  return (
    <pre className="code-bg-block mono">
      {code.split('\n').map((line, i) => (
        <div key={i}>{highlightLine(line, i)}</div>
      ))}
    </pre>
  )
}

function Column({ snippets, duration, reverse }: { snippets: string[]; duration: number; reverse?: boolean }) {
  const doubled = [...snippets, ...snippets]
  return (
    <div className="code-bg-column">
      <div
        className={`code-bg-track ${reverse ? 'reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((code, i) => (
          <SnippetBlock code={code} key={i} />
        ))}
      </div>
    </div>
  )
}

export default function CodeBackground() {
  const columns = [
    { snippets: [SNIPPETS[0], SNIPPETS[3], SNIPPETS[6]], duration: 48, reverse: false },
    { snippets: [SNIPPETS[1], SNIPPETS[4], SNIPPETS[7]], duration: 62, reverse: true },
    { snippets: [SNIPPETS[2], SNIPPETS[5], SNIPPETS[0]], duration: 55, reverse: false },
    { snippets: [SNIPPETS[3], SNIPPETS[6], SNIPPETS[1]], duration: 40, reverse: true },
  ]
  return (
    <div className="code-bg" aria-hidden="true">
      {columns.map((col, i) => (
        <Column key={i} snippets={col.snippets} duration={col.duration} reverse={col.reverse} />
      ))}
    </div>
  )
}
