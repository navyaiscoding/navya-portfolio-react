import { useState } from 'react'
import CommandPalette from '../CommandPalette/CommandPalette'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { type Theme } from '../../hooks'
import './Nav.css'

interface NavLink {
  id: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'competencies', label: 'Competencies' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

interface NavProps {
  theme: Theme
  toggleTheme: () => void
}

export default function Nav({ theme, toggleTheme }: NavProps) {
  const [open, setOpen] = useState(false)
  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <header className="nav">
      <div className="nav-inner">
        <span className="nav-logo">
          <span className="prompt">~/</span>navya-anumula
        </span>
        <div className="nav-right">
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}>{l.label}</button>
            ))}
          </nav>
          <CommandPalette />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
