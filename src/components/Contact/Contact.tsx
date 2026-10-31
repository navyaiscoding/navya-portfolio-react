import { profile } from '../../data'
import { useReveal } from '../../hooks'
import './Contact.css'

// Opens the visitor's email app with a drafted CV request addressed to me.
const cvRequestHref = `mailto:${profile.email}?subject=${encodeURIComponent(
  `CV request — ${profile.name}`,
)}&body=${encodeURIComponent(
  `Hi ${profile.name.split(' ')[0]},\n\nI came across your portfolio and would like to request your CV.\n\nMy name:\nCompany / role:\n\nThanks!`,
)}`

export default function Contact() {
  const { ref, className } = useReveal()
  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className={className}>
        <p className="accent">What's Next?</p>
        <h2>Get In Touch</h2>
        <p className="contact-intro">
          Currently based in Stockholm with full EU work authorization and available immediately.
          Open to Frontend / Full-Stack roles — reach out and let's talk.
        </p>
        <a className="btn contact-cv" href={cvRequestHref}>
          Request my CV
        </a>
        <div className="contact-links">
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
