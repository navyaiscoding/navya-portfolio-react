import { profile, roles } from '../../data'
import { useTypewriter } from '../../hooks'
import HeroCodeMockup from './HeroCodeMockup'
import './Hero.css'

export default function Hero() {
  const typed = useTypewriter(roles)
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="mono accent">Hi, my name is</p>
          <h1>{profile.name}.</h1>
          <h2 className="hero-title">
            I'm a <span className="accent">{typed}</span>
            <span className="cursor">&nbsp;</span>
          </h2>
          <div className="hero-cta">
            <a className="btn" href="#experience">View Experience</a>
            <a className="btn btn-ghost" href="#contact">Get in Touch</a>
          </div>
        </div>
        <HeroCodeMockup />
      </div>
    </section>
  )
}
