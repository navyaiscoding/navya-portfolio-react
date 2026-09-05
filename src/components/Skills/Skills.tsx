import type { CSSProperties } from 'react'
import { skills, type SkillGroup } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import { categoryColors, defaultCategoryColor, getInitials } from './categoryColors'
import { skillIcons } from './skillIcons'
import './Skills.css'

interface SkillCategoryProps {
  group: SkillGroup
  index: number
}

function SkillCategory({ group, index }: SkillCategoryProps) {
  const { ref, className } = useReveal<HTMLDivElement>()
  const color = categoryColors[group.category] ?? defaultCategoryColor

  return (
    <div
      className={`skill-category ${className}`}
      ref={ref}
      style={{ '--cat-color': color, transitionDelay: `${index * 60}ms` } as CSSProperties}
    >
      <div className="skill-category-header">
        <span className="skill-category-dot" />
        <span className="skill-category-title">{group.category}</span>
        <span className="skill-category-line" />
      </div>
      <div className="skill-icons-row">
        {group.items.map((item, i) => {
          const icon = skillIcons[item]
          return (
            <div
              className="skill-icon-item"
              key={item}
              style={i % 2 === 0 ? { transform: 'translateY(-0.125rem)' } : undefined}
            >
              <span className="skill-icon-badge">
                {icon ? (
                  <img
                    src={icon.src}
                    alt=""
                    className={icon.invert ? 'skill-icon-invert' : ''}
                    loading="lazy"
                    // Some devicon paths change over time — fall back to
                    // initials instead of showing a broken image icon.
                    onError={(e) => {
                      const img = e.currentTarget
                      img.style.display = 'none'
                      img.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                ) : null}
                <span className={`skill-icon-initials ${icon ? 'hidden' : ''}`}>
                  {getInitials(item)}
                </span>
              </span>
              <span className="skill-icon-label">{item}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="skills" ref={ref}>
      <div className={className}>
        <SectionHeading title="Skills" />
        <div className="skills-wall">
          {skills.map((group, i) => (
            <SkillCategory group={group} index={i} key={group.category} />
          ))}
        </div>
      </div>
    </section>
  )
}
