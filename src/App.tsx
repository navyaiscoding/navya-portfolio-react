import About from './components/About/About'
import CoreCompetencies from './components/CoreCompetencies/CoreCompetencies'
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Nav from './components/Nav/Nav'
import SectionDock from './components/SectionDock/SectionDock'
import Skills from './components/Skills/Skills'
import CodeBackground from './components/CodeBackground/CodeBackground'
import { useTheme } from './hooks'
import Contact from './components/Contact/Contact'
// import ContactForm from './ContactForm'

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
          {/* <ContactForm /> */}
          <Contact />
        </main>
        <Footer />
      </div>
      <SectionDock />
    </>
  )
}
