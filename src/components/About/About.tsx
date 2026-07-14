import { profile } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './About.css'

export default function About() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="about" ref={ref}>
      <div className={className}>
        <SectionHeading title="About" />
        <div className="about-text">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
