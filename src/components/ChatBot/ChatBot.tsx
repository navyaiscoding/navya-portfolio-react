import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile } from '../../data'
import './ChatBot.css'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  "What's your tech stack?",
  'Tell me about your experience',
  'Are you available to start?',
  'What did you build for SheBuilds?',
]

const MAX_INPUT = 500

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = async (text: string) => {
    const content = text.trim().slice(0, MAX_INPUT)
    if (!content || loading) return

    const next: ChatMessage[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setError(null)
    setLoading(true)

    try {
      // The API is stateless, so send the (short) conversation each time.
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) }),
      })
      const data: { reply?: string; error?: string } = await res.json().catch(() => ({}))
      if (!res.ok || !data.reply) {
        throw new Error(data.error ?? 'Something went wrong.')
      }
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(
        err instanceof Error && err.message !== 'Something went wrong.' && !err.message.includes('fetch')
          ? err.message
          : `I couldn't answer just now. You can email Navya at ${profile.email}.`,
      )
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void send(input)
  }

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Ask about Navya">
          <div className="chat-header">
            <div>
              <p className="chat-title">Ask about Navya</p>
              <p className="chat-subtitle">AI assistant · answers from her CV</p>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="chat-messages" ref={listRef} aria-live="polite">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <p>Hi! Ask me about Navya's experience, skills, projects or availability.</p>
                <div className="chat-chips">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" className="chat-chip" onClick={() => void send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="chat-msg assistant chat-typing">Thinking…</div>}
            {error && <div className="chat-error">{error}</div>}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_INPUT}
              placeholder="Ask a question…"
              aria-label="Your question"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send question">
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`chat-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Ask about Navya'}
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        </svg>
      </button>
    </>
  )
}
