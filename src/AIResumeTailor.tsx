import { useState, type FormEvent } from 'react'

interface TailorResult {
  fitScore: number
  matched: string[]
  missingKeywords: string[]
  bullets: string[]
  revisions: number
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function AIResumeTailor() {
  const [jobDescription, setJobDescription] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<TailorResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!jobDescription.trim() || status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setResult(data)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <div className="tailor">
      <p className="tailor-intro">
        A live LangGraph agent, not a single prompt. Paste a real job description and it extracts the actual
        requirements, cross-checks them against my resume data, and drafts tailored bullets — with a built-in
        critique step that catches and rewrites any bullet referencing a skill I don't actually have.
      </p>
      <form className="tailor-form" onSubmit={handleSubmit}>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste a job description here…"
          rows={8}
          maxLength={6000}
          required
        />
        <button className="btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Running the agent…' : 'Analyze & Tailor'}
        </button>
      </form>

      {status === 'loading' && (
        <p className="tailor-status mono muted">Extracting requirements → matching → drafting → self-checking… (~15–30s)</p>
      )}
      {status === 'error' && <p className="tailor-status tailor-error mono">{error}</p>}

      {status === 'success' && result && (
        <div className="tailor-results">
          <div className="tailor-score">
            <span className="tailor-score-value mono accent">{result.fitScore}</span>
            <span className="mono muted small">/ 100 fit score</span>
          </div>

          <div className="tailor-keywords">
            <div>
              <h4 className="mono">Matched</h4>
              <ul className="pill-list">
                {result.matched.length === 0 && <li className="mono muted small">None found</li>}
                {result.matched.map((k) => (
                  <li className="pill" key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mono">Missing</h4>
              <ul className="pill-list">
                {result.missingKeywords.length === 0 && <li className="mono muted small">None — full match</li>}
                {result.missingKeywords.map((k) => (
                  <li className="pill pill-outline" key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tailor-bullets">
            <h4 className="mono">Tailored bullets</h4>
            <ul className="project-highlights">
              {result.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
