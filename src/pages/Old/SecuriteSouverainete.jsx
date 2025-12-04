import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar.jsx'
import Footer from '../../components/Footer.jsx'
import BackgroundWave from '../../components/BackgroundWave.jsx'
import FlowFieldParticles from '../../components/FlowFieldParticles.jsx'
import ReassuranceRibbon from '../../components/ReassuranceRibbon.jsx'
import { useI18n } from '../../i18n.jsx'

const sections = [
  {
    id: 'solution-francaise',
    titleKey: 'security.sections.french.title',
    bodyKey: 'security.sections.french.body',
  },
  {
    id: 'donnees-france',
    titleKey: 'security.sections.data.title',
    bodyKey: 'security.sections.data.body',
  },
  {
    id: 'quantum-proof',
    titleKey: 'security.sections.quantum.title',
    bodyKey: 'security.sections.quantum.body',
  },
]

export default function SecuriteSouverainete({ navigate }) {
  const { t } = useI18n()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = t('security.meta.title')
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        meta.setAttribute('content', t('security.meta.description'))
      } else {
        const newMeta = document.createElement('meta')
        newMeta.setAttribute('name', 'description')
        newMeta.setAttribute('content', t('security.meta.description'))
        document.head.appendChild(newMeta)
      }
    }
  }, [t])

  return (
    <div className="app products-page" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar navigate={navigate} currentPage="security" />
      <BackgroundWave />
      <main>
        <section className="security-hero" aria-labelledby="security-heading">
          <div className="security-hero-inner">
            <p className="security-eyebrow">{t('security.tagline')}</p>
            <h1 id="security-heading">{t('security.heading')}</h1>
            <p className="lead">{t('security.intro')}</p>
          </div>
        </section>

        <section className="security-grid">
          <div className="security-grid-inner">
            {sections.map((section) => (
              <article id={section.id} key={section.id} className="security-card">
                <h2>{t(section.titleKey)}</h2>
                <p>{t(section.bodyKey)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <ReassuranceRibbon />
      <Footer />
    </div>
  )
}
