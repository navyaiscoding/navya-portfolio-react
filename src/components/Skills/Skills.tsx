import { skills, type SkillGroup } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Skills.css'

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
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <h3>{group.category}</h3>
      <div className="skill-level">
        <div className="skill-level-track">
          <div className="skill-level-fill" />
        </div>
      </div>
      <ul className="pill-list">
        {group.items.map((item) => (
          <li key={item} className="pill">{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
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
