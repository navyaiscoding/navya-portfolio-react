import { useState } from 'react'
import { experience } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Experience.css'

export default function Experience() {
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
            <p className="muted small">{experience[active].period} · {experience[active].stack}</p>
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
