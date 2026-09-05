import { profile } from '../../data'
import { useReveal } from '../../hooks'
import './Contact.css'

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
