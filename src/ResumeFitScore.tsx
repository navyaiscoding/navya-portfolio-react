import { useState, type FormEvent } from 'react'

interface FitResult {
  fitScore: number
  rationale: string
  strengths: string[]
  gaps: string[]
  revisions: number
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ResumeFitScore() {
  const [jobDescription, setJobDescription] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<FitResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!jobDescription.trim() || status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/fit-score', {
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
    <div className="fit">
      <p className="fit-intro">
        A live LangGraph agent, not a single prompt. Paste a real job description and it scores my resume's fit
        out of 100 like an honest recruiter would — with a self-critique step that checks its own score against
        my actual resume data before returning it, catching anything it can't back up.
      </p>
      <form className="fit-form" onSubmit={handleSubmit}>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste a job description here…"
          rows={8}
          maxLength={6000}
          required
        />
        <button className="btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Scoring…' : 'Score My Fit'}
        </button>
      </form>

      {status === 'loading' && (
        <p className="fit-status mono muted">Scoring → self-checking the score against the resume… (~10–20s)</p>
      )}
      {status === 'error' && <p className="fit-status fit-error mono">{error}</p>}

      {status === 'success' && result && (
        <div className="fit-results">
          <div className="fit-score">
            <span className="fit-score-value mono accent">{result.fitScore}</span>
            <span className="mono muted small">/ 100 fit score</span>
          </div>

          <p className="fit-rationale">{result.rationale}</p>

          <div className="fit-keywords">
            <div>
              <h4 className="mono">Strengths</h4>
              <ul className="pill-list">
                {result.strengths.length === 0 && <li className="mono muted small">None found</li>}
                {result.strengths.map((k) => (
                  <li className="pill" key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mono">Gaps</h4>
              <ul className="pill-list">
                {result.gaps.length === 0 && <li className="mono muted small">None — strong match</li>}
                {result.gaps.map((k) => (
                  <li className="pill pill-outline" key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
