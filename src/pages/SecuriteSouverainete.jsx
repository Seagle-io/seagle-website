import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import BackgroundWave from '../components/BackgroundWave.jsx'
import FlowFieldParticles from '../components/FlowFieldParticles.jsx'
import ReassuranceRibbon from '../components/ReassuranceRibbon.jsx'
import { useI18n } from '../i18n.jsx'

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
    <div className="relative overflow-hidden isolate" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar navigate={navigate} currentPage="security" />
      <BackgroundWave />
      <main>
        <section className="relative z-10 pt-[120px] px-5 pb-[60px] text-center" aria-labelledby="security-heading">
          <div className="max-w-[760px] mx-auto flex flex-col gap-[18px]">
            <p className="m-0 text-sm tracking-[0.14em] uppercase text-accent-2">{t('security.tagline')}</p>
            <h1 id="security-heading" className="m-0 text-[clamp(32px,5vw,56px)]">{t('security.heading')}</h1>
            <p className="text-muted m-0 mb-[18px]">{t('security.intro')}</p>
          </div>
        </section>

        <section className="relative z-10 pt-[60px] px-5 pb-10">
          <div className="max-w-[960px] mx-auto grid gap-6">
            {sections.map((section) => (
              <article id={section.id} key={section.id} className="rounded-[22px] p-[26px] bg-surface border border-border shadow-[0_18px_40px_rgba(5,14,26,0.28)]">
                <h2 className="m-0 mb-3 text-[22px]">{t(section.titleKey)}</h2>
                <p className="m-0 text-muted text-[15px] leading-[1.7]">{t(section.bodyKey)}</p>
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
