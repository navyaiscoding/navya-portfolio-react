import { useState } from 'react'
import { experience, type ExperienceEntry } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import SkillIcon from '../Skills/SkillIcon'
import './Experience.css'

// "06/2019 – 04/2022" style periods -> the company's overall span, e.g. "2019 – 2022".
function yearSpan(entry: ExperienceEntry): string {
  const years = entry.roles.flatMap((r) => r.period.match(/\d{4}/g) ?? []).map(Number)
  const start = Math.min(...years)
  const end = Math.max(...years)
  return start === end ? `${start}` : `${start} – ${end}`
}

export default function Experience() {
  // Steps run oldest -> newest (left to right); open on the most recent employer.
  const [active, setActive] = useState(experience.length - 1)
  const { ref, className } = useReveal()
  const current = experience[active]
  const multi = current.roles.length > 1

  return (
    <section className="section" id="experience" ref={ref}>
      <div className={className}>
        <SectionHeading title="Experience" />

        <nav className="exp-steps" aria-label="Career path">
          {experience.map((e, i) => (
            <button
              key={e.company}
              type="button"
              className={`exp-step ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-current={active === i ? 'step' : undefined}
            >
              <span className="exp-step-dot" />
              <span className="exp-step-years">{yearSpan(e)}</span>
              <span className="exp-step-company">{e.company}</span>
            </button>
          ))}
        </nav>

        {/* key={company} re-mounts the panel so each switch replays the fade-in */}
        <div className={`exp-roles ${multi ? 'multi' : ''}`} key={current.company}>
          {current.roles.map((r) => (
            <article className="exp-role" key={r.role + r.period}>
              {multi && <span className="exp-role-dot" aria-hidden="true" />}
              <h3>{r.role}</h3>
              <p className="muted small">{r.period}</p>

              <ul className="exp-chips" aria-label="Key facts">
                {r.highlights.map((h) => (
                  <li key={h} className="exp-chip">{h}</li>
                ))}
              </ul>

              <div className="skill-icons-row exp-stack">
                {r.stack.map((item, i) => (
                  <SkillIcon name={item} raised={i % 2 === 0} key={item} />
                ))}
              </div>

              <div className="exp-body">
                {r.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
