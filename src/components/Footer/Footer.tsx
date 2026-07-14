import { profile } from '../../data'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer mono muted small">
      Designed &amp; built by {profile.name} · {new Date().getFullYear()}
    </footer>
  )
}
