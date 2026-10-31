import { useState } from 'react'
import { certifications, type CertificationEntry } from '../../data'
import { useReveal } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Certifications.css'

interface CertCardProps {
  cert: CertificationEntry
  index: number
}

const iconProps = {
  viewBox: '0 0 24 24',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function CertCard({ cert, index }: CertCardProps) {
  const { ref, className } = useReveal<HTMLDivElement>()
  const [flipped, setFlipped] = useState(false)
  // If the logo CDN is unreachable, fall back to the generic ribbon icon.
  const [iconFailed, setIconFailed] = useState(false)
  const showLogo = cert.iconUrl && !iconFailed
  const canFlip = Boolean(cert.credentialUrl)

  return (
    <div
      className={`cert-wrap ${className}`}
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className={`cert-card ${flipped ? 'flipped' : ''}`}>
        <div className="cert-face cert-front">
          <div className="cert-badge" aria-hidden="true">
            {showLogo ? (
              <img className="cert-logo" src={cert.iconUrl} alt="" loading="lazy" onError={() => setIconFailed(true)} />
            ) : (
              <svg {...iconProps}>
                <circle cx="12" cy="9" r="6" />
                <path d="m8.5 14.5-1.5 7 5-2.5 5 2.5-1.5-7" />
              </svg>
            )}
          </div>
          <h3>{cert.name}</h3>
          <p className="cert-issuer">{cert.issuer}</p>
          <p className="cert-issued">Issued {cert.issued}</p>
          {canFlip && (
            <button type="button" className="cert-flip-btn" onClick={() => setFlipped(true)}>
              <svg {...iconProps} aria-hidden="true">
                <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Flip to verify
            </button>
          )}
        </div>

        {canFlip && (
          <div className="cert-face cert-back">
            <div className="cert-badge" aria-hidden="true">
              <svg {...iconProps}>
                <path d="M12 3 4 6v6c0 4.4 3.4 8 8 9 4.6-1 8-4.6 8-9V6l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3>Verify credential</h3>
            <p className="cert-issuer">
              Confirm this certificate directly with {cert.issuer.split('·')[0].trim()}.
            </p>
            <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Open credential
            </a>
            <button type="button" className="cert-flip-btn" onClick={() => setFlipped(false)}>
              <svg {...iconProps} aria-hidden="true">
                <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Flip back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Certifications() {
  const { ref, className } = useReveal()
  return (
    <section className="section" id="certifications" ref={ref}>
      <div className={className}>
        <SectionHeading title="Certifications" />
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <CertCard cert={cert} index={i} key={cert.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
