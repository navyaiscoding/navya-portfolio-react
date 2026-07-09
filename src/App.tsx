import { useState } from 'react'
import { profile, skills, experience, roles, type SkillGroup } from './data'
import { useReveal, useTheme, useTypewriter, type Theme } from './hooks'
import CommandPalette from './CommandPalette'
import ContactForm from './ContactForm'

interface NavLink {
  id: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

interface ThemeToggleProps {
  theme: Theme
  toggle: () => void
}

function ThemeToggle({ theme, toggle }: ThemeToggleProps) {
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="knob">
        {theme === 'light' ? (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
          </svg>
        )}
      </span>
    </button>
  )
}

interface NavProps {
  theme: Theme
  toggleTheme: () => void
}

function Nav({ theme, toggleTheme }: NavProps) {
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

function Hero() {
  const typed = useTypewriter(roles)
  return (
    <section className="hero" id="top">
      <p className="mono accent">Hi, my name is</p>
      <h1>{profile.name}.</h1>
      <h2 className="hero-title">
        I'm a <span className="accent">{typed}</span>
        <span className="cursor">&nbsp;</span>
      </h2>
      <p className="hero-sub">{profile.title}</p>
      <p className="mono muted">
        {profile.location} · {profile.availability}
      </p>
      <div className="hero-cta">
        <a className="btn" href="#projects">View Projects</a>
        <a className="btn btn-ghost" href={`mailto:${profile.email}`}>Get in Touch</a>
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  title: string
}

function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <h2 className="section-heading">
      {title}
      <span className="rule" />
    </h2>
  )
}

function About() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="about" ref={ref}>
      <div className={className}>
        <SectionHeading title="About" />
        <p className="about-text">{profile.summary}</p>
      </div>
    </section>
  )
}

interface SkillCardProps {
  group: SkillGroup
  index: number
}

function SkillCard({ group, index }: SkillCardProps) {
  const { ref, className } = useReveal<HTMLDivElement>()
  return (
    <div
      className={`skill-card ${className}`}
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms`, ['--level' as string]: `${group.level}%` }}
    >
      <h3 className="mono">{group.category}</h3>
      <div className="skill-level">
        <div className="skill-level-track">
          <div className="skill-level-fill" />
        </div>
        <span className="skill-level-value mono">{group.level}%</span>
      </div>
      <ul className="pill-list">
        {group.items.map((item) => (
          <li key={item} className="pill">{item}</li>
        ))}
      </ul>
    </div>
  )
}

function Skills() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="skills" ref={ref}>
      <div className={className}>
        <SectionHeading title="Skills" />
        <div className="skills-grid">
          {skills.map((group, i) => (
            <SkillCard group={group} index={i} key={group.category} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const [active, setActive] = useState(0)
  const { ref, className } = useReveal()
  return (
    <section className="section" id="experience" ref={ref}>
      <div className={className}>
        <SectionHeading title="Experience" />
        <div className="exp-layout">
          <div className="exp-tabs">
            {experience.map((e, i) => (
              <button
                key={e.company + e.period}
                className={`exp-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {e.company}
              </button>
            ))}
          </div>
          <div className="exp-panel">
            <h3>
              {experience[active].role} <span className="accent">@ {experience[active].company}</span>
            </h3>
            <p className="mono muted small">{experience[active].period} · {experience[active].stack}</p>
            <ul className="project-highlights">
              {experience[active].bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, className } = useReveal()
  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className={className}>
        <p className="mono accent">What's Next?</p>
        <h2>Get In Touch</h2>
        <p className="about-text center">
          Currently based in Stockholm with full EU work authorization and available immediately.
          Open to Senior Frontend / Full-Stack roles — reach out and let's talk.
        </p>
        <ContactForm />
        <div className="contact-links mono">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>·</span>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          <span>·</span>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">{profile.linkedin}</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer mono muted small">
      Designed &amp; built by {profile.name} · {new Date().getFullYear()}
    </footer>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <div className="app">
      <Nav theme={theme} toggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
