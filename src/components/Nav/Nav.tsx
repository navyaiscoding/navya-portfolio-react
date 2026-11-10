import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { type Theme } from '../../hooks'
import './Nav.css'

interface NavProps {
  theme: Theme
  toggleTheme: () => void
}

export default function Nav({ theme, toggleTheme }: NavProps) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <span className="nav-logo">
          <span className="prompt">~/</span>navya-anumula
        </span>
        <div className="nav-right">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </div>
      </div>
    </header>
  )
}
