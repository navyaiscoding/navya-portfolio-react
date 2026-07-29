import { transitionDelayTime } from '../../constants/coreCompetencies';
import { coreCompetencies } from '../../data';
import { useCoreCompetencies, useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './CoreCompetencies.css'

function CompetencyCard({ label, index }: { label: string; index: number }) {
  const { ref, className } = useReveal<HTMLDivElement>()
  return (
    <div
      className={`competency-card ${className}`}
      ref={ref}
      style={{ transitionDelay: `${index * transitionDelayTime}ms` }}
    >
      <span>{label}</span>
    </div>
  )
}

export default function CoreCompetencies() {
  const { ref, className } = useReveal()
  const { competencies, loading, error } = useCoreCompetencies()
  if (error) console.error('Failed to load competencies from API:', error)

  // list as a fallback if the fetch fails or hasn't resolved yet.
  const items = competencies.length > 0 ? competencies : coreCompetencies

  return (
    <section className="section" id="competencies" ref={ref}>
      <div className={className}>
        <SectionHeading title="Core Competencies" />
        {loading ? (
          <div className="competencies-grid" aria-busy="true" aria-label="Loading competencies">
            {coreCompetencies.map((_, i) => (
              <div className="competency-card skeleton" key={i}>
                <span />
              </div>
            ))}
          </div>
        ) : (
          <div className="competencies-grid">
            {items.map((label, i) => (
              <CompetencyCard label={label} index={i} key={label} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
