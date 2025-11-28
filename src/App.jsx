import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero'
import Expertise from './components/Expertise.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FlowFieldParticles from './components/FlowFieldParticles.jsx'

export default function App({ navigate }) {
  return (
    <div className="relative overflow-hidden isolate bg-bg text-text font-sans" id="top">
      {/* Background Particles */}
      <FlowFieldParticles fullscreen />

      {/* Navbar */}
      <Navbar navigate={navigate} />

      <main className="relative z-10" id="main">
        <Hero navigate={navigate} />
        <Expertise />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
