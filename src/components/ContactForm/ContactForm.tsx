import { useState, type FormEvent } from 'react'
import { profile } from '../../data'
import './ContactForm.css'
import { contactFormEndpoint } from '../../constants/coreCompetencies'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const usingFormspree = contactFormEndpoint.trim().length > 0

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('submitting')

    if (!usingFormspree) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('success')
      return
    }

    try {
      const res = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form-status success">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <p>
          {usingFormspree
            ? "Thanks — your message is on its way. I'll get back to you soon."
            : 'Opening your email client with the message pre-filled — send it whenever you\'re ready.'}
        </p>
        <button className="btn btn-ghost" onClick={() => setStatus('idle')}>Send another</button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <label className="mono small" htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>
      <div className="contact-form-row">
        <label className="mono small" htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
        />
      </div>
      <div className="contact-form-row">
        <label className="mono small" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about the role..."
          rows={4}
          required
        />
      </div>
      {status === 'error' && (
        <p className="contact-form-error mono small">
          Something went wrong sending that — try again, or email me directly at {profile.email}.
        </p>
      )}
      <button className="btn" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
