import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import BackgroundWave from '../components/BackgroundWave.jsx'
import FlowFieldParticles from '../components/FlowFieldParticles.jsx'
import ReassuranceRibbon from '../components/ReassuranceRibbon.jsx'
import { useI18n } from '../i18n.jsx'

const sections = [
  {
    id: 'conviction',
    titleKey: 'engagement.sections.conviction.title',
    bodyKey: 'engagement.sections.conviction.body',
  },
  {
    id: 'commitment',
    titleKey: 'engagement.sections.commitment.title',
    bodyKey: 'engagement.sections.commitment.body',
  },
  {
    id: 'pasteur',
    titleKey: 'engagement.sections.pasteur.title',
    bodyKey: 'engagement.sections.pasteur.body',
  },
]

export default function CharteEngagement({ navigate }) {
  const { t } = useI18n()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = t('engagement.meta.title')
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        meta.setAttribute('content', t('engagement.meta.description'))
      } else {
        const newMeta = document.createElement('meta')
        newMeta.setAttribute('name', 'description')
        newMeta.setAttribute('content', t('engagement.meta.description'))
        document.head.appendChild(newMeta)
      }
    }
  }, [t])

  return (
    <div className="app engagement-page" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar navigate={navigate} currentPage="engagement" />
      <BackgroundWave />
      <main>
        <section className="engagement-hero" aria-labelledby="engagement-heading">
          <div className="engagement-hero-inner">
            <h1 id="engagement-heading">{t('engagement.heading')}</h1>
            <p className="lead">{t('engagement.intro')}</p>
          </div>
        </section>

        <section className="engagement-grid">
          <div className="engagement-grid-inner">
            {sections.map((section) => (
              <article key={section.id} id={section.id} className="engagement-card">
                <h2>{t(section.titleKey)}</h2>
                <p>
                  {t(section.bodyKey)}
                  {section.id === 'pasteur' ? (
                    <>
                      {' '}
                      <a href="https://www.pasteur.fr" target="_blank" rel="noreferrer">
                        Institut Pasteur
                      </a>
                      .
                    </>
                  ) : null}
                </p>
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
