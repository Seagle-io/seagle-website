import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import BackgroundWave from '../components/BackgroundWave.jsx'
import FlowFieldParticles from '../components/FlowFieldParticles.jsx'
import ContactForm from '../components/ContactForm.jsx'
import ReassuranceRibbon from '../components/ReassuranceRibbon.jsx'
import { useI18n } from '../i18n.jsx'

export default function Products({ navigate }) {
  const { t } = useI18n()

  const suite = [
    { key: 'experience', title: t('products.suite.cards.experience.title'), desc: t('products.suite.cards.experience.desc') },
    { key: 'automation', title: t('products.suite.cards.automation.title'), desc: t('products.suite.cards.automation.desc') },
    { key: 'operations', title: t('products.suite.cards.operations.title'), desc: t('products.suite.cards.operations.desc') },
  ]

  const packs = [
    {
      key: 'essential',
      title: t('products.packs.essential.title'),
      lead: t('products.packs.essential.lead'),
      features: t('products.packs.essential.features'),
    },
    {
      key: 'scale',
      title: t('products.packs.scale.title'),
      lead: t('products.packs.scale.lead'),
      features: t('products.packs.scale.features'),
    },
    {
      key: 'enterprise',
      title: t('products.packs.enterprise.title'),
      lead: t('products.packs.enterprise.lead'),
      features: t('products.packs.enterprise.features'),
    },
  ]

  const flow = t('products.flow.steps')

  return (
    <div className="relative overflow-hidden isolate" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar navigate={navigate} currentPage="products" />
      <BackgroundWave />
      <main>
        <section id="hero" className="relative pt-[140px] px-5 pb-[100px] z-10" aria-label={t('products.hero.title')}>
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 items-center">
              <div className="flex flex-col gap-[22px]">
                <div className="flex flex-col gap-1.5 uppercase tracking-[0.18em] text-[13px] text-accent-2">
                  <span className="font-extrabold text-[15px] tracking-[0.3em]">SOFIA</span>
                  <span className="px-3 py-1.5 rounded-full bg-[rgba(24,184,196,0.12)] border border-[rgba(24,184,196,0.45)] text-text w-fit">{t('products.hero.tagline')}</span>
                </div>
                <h1 className="m-0 text-[clamp(32px,6vw,60px)] leading-[1.1] font-bold">{t('products.hero.title')}</h1>
                <p className="text-muted m-0 mb-[18px]">{t('products.hero.lead')}</p>
                <div className="flex gap-3.5 flex-wrap">
                  <a className="no-underline px-[22px] py-[14px] rounded-[14px] font-semibold inline-flex items-center gap-2 border border-transparent transition-all duration-250 ease-out bg-[linear-gradient(130deg,var(--accent),var(--accent-2))] text-[#043640] shadow-[0_18px_36px_rgba(24,184,196,0.28)] hover:-translate-y-[2px] hover:brightness-105 relative after:content-[''] after:absolute after:-inset-2 after:rounded-[inherit] after:border after:border-[rgba(24,184,196,0.35)] after:opacity-0 after:animate-pulse-ring" href="#demo">{t('products.hero.cta')}</a>
                  <button
                    type="button"
                    className="no-underline px-[22px] py-[14px] rounded-[14px] font-semibold inline-flex items-center gap-2 border border-accent text-accent bg-transparent transition-all duration-250 ease-out hover:bg-[rgba(24,184,196,0.12)]"
                    onClick={() => navigate?.('/')}
                  >
                    {t('products.hero.back')}
                  </button>
                </div>
              </div>
              <div className="relative min-h-[320px] flex items-center justify-center" aria-hidden="true">
                <FlowFieldParticles />
                <div className="relative w-[min(420px,100%)] aspect-square rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(24,184,196,0.18),rgba(6,18,33,0.9))] border border-[rgba(24,184,196,0.2)] flex items-center justify-center overflow-hidden shadow-[0_30px_60px_rgba(5,14,26,0.55)]">
                  <div className="absolute inset-[16%] rounded-full border border-dashed border-[rgba(24,184,196,0.35)] animate-[spin_12s_linear_infinite]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,184,196,0.28),transparent_72%)] blur-[16px]" />
                  <div className="absolute w-[170px] rounded-[18px] p-[18px] bg-surface border border-[rgba(24,184,196,0.35)] shadow-[0_16px_32px_rgba(5,14,26,0.4)] top-[18%] right-[8%]">
                    <strong className="block text-[15px] mb-1.5">{t('catalog.core.title')}</strong>
                    <p className="m-0 text-[13px] text-muted">{t('catalog.core.desc')}</p>
                  </div>
                  <div className="absolute w-[170px] rounded-[18px] p-[18px] bg-surface border border-[rgba(24,184,196,0.35)] shadow-[0_16px_32px_rgba(5,14,26,0.4)] bottom-[14%] left-[8%]">
                    <strong className="block text-[15px] mb-1.5">{t('catalog.insights.title')}</strong>
                    <p className="m-0 text-[13px] text-muted">{t('catalog.insights.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative py-[100px] px-5 z-10">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[0.14em] uppercase text-accent-2">{t('products.suite.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('products.suite.title')}</h2>
              <p className="text-muted mb-[18px]">{t('products.suite.lead')}</p>
            </div>
            <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {suite.map(item => (
                <article key={item.key} className="bg-surface border border-border rounded-[20px] p-6 shadow-[0_16px_30px_rgba(5,14,26,0.25)]">
                  <h3 className="m-0 mb-2.5 text-lg font-bold">{item.title}</h3>
                  <p className="m-0 text-muted">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" className="relative py-[100px] px-5 z-10">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[0.14em] uppercase text-accent-2">{t('products.packs.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('products.packs.title')}</h2>
              <p className="text-muted mb-[18px]">{t('products.packs.lead')}</p>
            </div>
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
              {packs.map(pack => (
                <article key={pack.key} className="bg-surface-strong border border-border rounded-[24px] p-[26px] flex flex-col gap-[18px] shadow-[0_20px_42px_rgba(5,14,26,0.3)]">
                  <header>
                    <h3 className="m-0 mb-1.5 text-xl font-bold">{pack.title}</h3>
                    <p className="m-0 text-muted">{pack.lead}</p>
                  </header>
                  <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                    {pack.features?.map((feature, idx) => (
                      <li key={idx} className="relative pl-5 text-text before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[linear-gradient(135deg,var(--accent),var(--accent-2))]">{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="relative py-[100px] px-5 z-10">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[0.14em] uppercase text-accent-2">{t('products.flow.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('products.flow.title')}</h2>
            </div>
            <div className="grid gap-[18px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              {flow?.map((step, idx) => (
                <div key={idx} className="bg-surface border border-border rounded-[20px] p-5 flex gap-4 items-start shadow-[0_14px_28px_rgba(5,14,26,0.24)]">
                  <span className="w-9 h-9 rounded-xl bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] text-[#043640] font-bold flex items-center justify-center shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                  <p className="m-0 text-muted">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-[100px] px-5 z-10" id="cta">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-9 bg-surface-strong rounded-[28px] border border-border p-9 shadow-custom">
              <div className="flex flex-col gap-[18px]">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[0.14em] uppercase text-accent-2">{t('products.packs.label')}</span>
                <h2 className="m-0 text-[clamp(28px,4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('products.cta.title')}</h2>
                <p className="text-muted mb-[18px]">{t('products.cta.lead')}</p>
                <div className="flex gap-3 flex-wrap">
                  <a className="no-underline px-[22px] py-[14px] rounded-[14px] font-semibold inline-flex items-center gap-2 border border-transparent transition-all duration-250 ease-out bg-[linear-gradient(130deg,var(--accent),var(--accent-2))] text-[#043640] shadow-[0_18px_36px_rgba(24,184,196,0.28)] hover:-translate-y-[2px] hover:brightness-105 relative after:content-[''] after:absolute after:-inset-2 after:rounded-[inherit] after:border after:border-[rgba(24,184,196,0.35)] after:opacity-0 after:animate-pulse-ring" href="mailto:contact@seagle.io">{t('products.cta.button')}</a>
                  <button
                    type="button"
                    className="no-underline px-[22px] py-[14px] rounded-[14px] font-semibold inline-flex items-center gap-2 border border-accent text-accent bg-transparent transition-all duration-250 ease-out hover:bg-[rgba(24,184,196,0.12)]"
                    onClick={() => navigate?.('/')}
                  >
                    {t('products.hero.back')}
                  </button>
                </div>
              </div>
              <div className="bg-surface rounded-[20px] border border-border p-6 shadow-[0_12px_28px_rgba(5,14,26,0.25)]">
                <h3 className="m-0 mb-4 text-lg font-bold">{t('cta.form.title')}</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-[100px] px-5 z-10">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <p className="m-0 text-center text-muted text-[15px]">{t('products.contact.note')}</p>
          </div>
        </section>
      </main>
      <ReassuranceRibbon />
      <Footer />
    </div>
  )
}
