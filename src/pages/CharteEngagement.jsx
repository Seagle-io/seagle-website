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
    <div className="relative overflow-hidden isolate" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar navigate={navigate} currentPage="engagement" />
      <BackgroundWave />
      <main>
        <section className="relative z-10 pt-[120px] px-5 pb-[60px] text-center" aria-labelledby="engagement-heading">
          <div className="max-w-[720px] mx-auto flex flex-col gap-[18px]">
            <h1 id="engagement-heading" className="m-0 text-[clamp(32px,5vw,56px)]">{t('engagement.heading')}</h1>
            <p className="text-muted m-0 mb-[18px]">{t('engagement.intro')}</p>
          </div>
        </section>

        <section className="relative z-10 pt-[60px] px-5 pb-20">
          <div className="max-w-[960px] mx-auto grid gap-6">
            {sections.map((section) => (
              <article key={section.id} id={section.id} className="rounded-[22px] p-[26px] bg-surface border border-border shadow-[0_18px_38px_rgba(5,14,26,0.28)]">
                <h2 className="m-0 mb-3 text-[22px]">{t(section.titleKey)}</h2>
                <p className="m-0 text-muted text-[15px] leading-[1.7]">
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
