import type { CSSProperties } from 'react'
import { skills } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import { categoryColors, defaultCategoryColor } from './categoryColors'
import SkillIcon from './SkillIcon'
import './Skills.css'

// Flatten every category into one list, remembering each skill's category colour.
const tickerItems = skills.flatMap((group) =>
  group.items.map((name) => ({
    name,
    color: categoryColors[group.category] ?? defaultCategoryColor,
  })),
)

// ~2s per logo keeps the scroll speed steady however many skills there are.
const durationSeconds = tickerItems.length * 2

interface TickerRowProps {
  // The second copy exists only to make the loop seamless; hide it from screen readers.
  duplicate?: boolean
}

function TickerRow({ duplicate }: TickerRowProps) {
  return (
    <ul className={`skills-set ${duplicate ? 'skills-set-copy' : ''}`} aria-hidden={duplicate || undefined}>
      {tickerItems.map(({ name, color }, i) => (
        <li key={name} style={{ '--cat-color': color } as CSSProperties}>
          <SkillIcon name={name} raised={i % 2 === 0} labelOnHover />
        </li>
      ))}
    </ul>
  )
}

export default function Skills() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="skills" ref={ref}>
      <div className={className}>
        <SectionHeading title="Skills" />
        <div className="skills-wall">
          {/* Two identical sets side by side, translated by -50% in a loop. */}
          <div className="skills-ticker">
            <div className="skills-track" style={{ animationDuration: `${durationSeconds}s` }}>
              <TickerRow />
              <TickerRow duplicate />
            </div>
          </div>
          <ul className="skills-legend" aria-label="Skill categories">
            {skills.map((group) => (
              <li key={group.category}>
                <span
                  className="skills-legend-dot"
                  style={{ background: categoryColors[group.category] ?? defaultCategoryColor }}
                />
                {group.category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
