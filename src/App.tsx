import About from './components/About/About'
import Contact from './components/Contact/Contact'
import CoreCompetencies from './components/CoreCompetencies/CoreCompetencies'
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Nav from './components/Nav/Nav'
import Skills from './components/Skills/Skills'
import CodeBackground from './components/CodeBackground/CodeBackground'
import { useTheme } from './hooks'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <>
      <CodeBackground />
      <div className="app">
        <Nav theme={theme} toggleTheme={toggle} />
        <main>
          <Hero />
          <About />
          <CoreCompetencies />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
