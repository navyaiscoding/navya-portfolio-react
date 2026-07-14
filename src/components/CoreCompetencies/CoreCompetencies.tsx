import { coreCompetencies } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './CoreCompetencies.css'

function CompetencyCard({ label, index }: { label: string; index: number }) {
  const { ref, className } = useReveal<HTMLDivElement>()
  return (
    <div
      className={`competency-card ${className}`}
      ref={ref}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <span>{label}</span>
    </div>
  )
}

export default function CoreCompetencies() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="competencies" ref={ref}>
      <div className={className}>
        <SectionHeading title="Core Competencies" />
        <div className="competencies-grid">
          {coreCompetencies.map((label, i) => (
            <CompetencyCard label={label} index={i} key={label} />
          ))}
        </div>
      </div>
    </section>
  )
}
