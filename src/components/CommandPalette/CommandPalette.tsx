import { useEffect, useRef, useState } from 'react'
import { navSearchItems, type NavSearchItem } from '../../data'
import './CommandPalette.css'

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered: NavSearchItem[] = navSearchItems.filter((item) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
  })

  const jumpTo = (id: string) => {
    setOpen(false)
    setQuery('')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      const slash = e.key === '/' && !isTypingTarget(e.target)
      if (cmdK || slash) {
        e.preventDefault()
        setOpen(true)
        return
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleGlobalKeydown)
    return () => window.removeEventListener('keydown', handleGlobalKeydown)
  }, [])

  useEffect(() => {
    if (open) {
      setActiveIndex(0)
      const t = setTimeout(() => inputRef.current?.focus(), 10)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  if (!open) {
    return (
      <button
        className="palette-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open quick navigation"
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span className="palette-hint">/</span>
      </button>
    )
  }

  return (
    <div className="palette-overlay" onClick={() => setOpen(false)}>
      <div className="palette-panel" onClick={(e) => e.stopPropagation()}>
        <div className="palette-search">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section..."
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActiveIndex((i) => Math.max(i - 1, 0))
              } else if (e.key === 'Enter' && filtered[activeIndex]) {
                jumpTo(filtered[activeIndex].id)
              }
            }}
          />
          <span className="palette-esc">esc</span>
        </div>
        <ul className="palette-list">
          {filtered.length === 0 && <li className="palette-empty">No matches</li>}
          {filtered.map((item, i) => (
            <li key={item.id}>
              <button
                className={`palette-item ${i === activeIndex ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => jumpTo(item.id)}
              >
                <span>{item.label}</span>
                <span className="muted small">{item.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
