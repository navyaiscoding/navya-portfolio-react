import { profile } from '../../data'
import { useSiteStats } from '../../hooks'
import './Footer.css'

export default function Footer() {
  const { views, likes, liked, available, toggleLike } = useSiteStats()
  return (
    <footer className="footer muted small">
      {available && (
        <div className="footer-stats">
          <span className="footer-stat" title="Unique visitors">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {views.toLocaleString()} {views === 1 ? 'visitor' : 'visitors'}
          </span>
          <button
            className={`footer-like ${liked ? 'liked' : ''}`}
            onClick={toggleLike}
            aria-pressed={liked}
            aria-label={liked ? 'Remove your like' : 'Like this portfolio'}
          >
            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9Z" />
            </svg>
            {likes.toLocaleString()}
          </button>
        </div>
      )}
      Designed &amp; built by {profile.name} · {new Date().getFullYear()}
    </footer>
  )
}
