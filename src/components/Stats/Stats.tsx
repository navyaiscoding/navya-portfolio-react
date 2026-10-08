import { useReveal, useSiteStats } from '../../hooks'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Stats.css'

export default function Stats() {
  const { ref, className } = useReveal()
  const { views, likes, liked, available, toggleLike } = useSiteStats()

  // If the stats API is unreachable, hide the section rather than show zeros.
  // Keep the <section> mounted (just display:none) so useReveal's observer is
  // attached from the first render; returning null here meant the observer
  // never saw the element and the section stayed invisible once data arrived.
  return (
    <section
      className="section"
      id="stats"
      ref={ref}
      style={available ? undefined : { display: 'none' }}
    >
      <div className={className}>
        <SectionHeading title="Insights and metrics" />
        <div className="stats-grid">
          <div className="stats-card stats-card-views">
            <div className="stats-icon stats-icon-views">
              <svg viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="stats-headline">{views.toLocaleString()} {views === 1 ? 'visitor' : 'visitors'}</p>
            <p className="stats-sub">since October 2026.</p>
          </div>

          <div className="stats-card stats-card-like">
            <button
              type="button"
              className={`stats-icon stats-icon-like ${liked ? 'liked' : ''}`}
              onClick={toggleLike}
              aria-pressed={liked}
              aria-label={liked ? 'Remove your like' : 'Like this portfolio'}
            >
              <svg viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9Z" />
              </svg>
            </button>
            <p className="stats-headline" aria-live="polite">{likes.toLocaleString()} {likes === 1 ? 'like' : 'likes'}</p>
            <p className="stats-sub">{liked ? 'Thank you for the love!' : "Don't be shy, show some love!"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
