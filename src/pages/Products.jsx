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
    <div className="app products-page" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar navigate={navigate} currentPage="products" />
      <BackgroundWave />
      <main>
        <section id="hero" className="hero products-hero" aria-label={t('products.hero.title')}>
          <div className="hero-inner">
            <div className="hero-layout">
              <div className="hero-copy">
                <div className="hero-top">
                  <span className="hero-logo">SOFIA</span>
                  <span className="hero-slogan">{t('products.hero.tagline')}</span>
                </div>
                <h1 className="hero-title">{t('products.hero.title')}</h1>
                <p className="lead">{t('products.hero.lead')}</p>
                <div className="hero-cta">
                  <a className="btn primary pulse" href="#demo">{t('products.hero.cta')}</a>
                  <button
                    type="button"
                    className="btn outline"
                    onClick={() => navigate?.('/')}
                  >
                    {t('products.hero.back')}
                  </button>
                </div>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <FlowFieldParticles />
                <div className="hero-orbit">
                  <div className="hero-orbit-ring" />
                  <div className="hero-orbit-glow" />
                  <div className="hero-orbit-card primary">
                    <strong>{t('catalog.core.title')}</strong>
                    <p>{t('catalog.core.desc')}</p>
                  </div>
                  <div className="hero-orbit-card secondary">
                    <strong>{t('catalog.insights.title')}</strong>
                    <p>{t('catalog.insights.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section products-suite">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('products.suite.label')}</span>
              <h2>{t('products.suite.title')}</h2>
              <p className="lead">{t('products.suite.lead')}</p>
            </div>
            <div className="products-suite-grid">
              {suite.map(item => (
                <article key={item.key} className="products-suite-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" className="section products-packs">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('products.packs.label')}</span>
              <h2>{t('products.packs.title')}</h2>
              <p className="lead">{t('products.packs.lead')}</p>
            </div>
            <div className="products-pack-grid">
              {packs.map(pack => (
                <article key={pack.key} className="products-pack-card">
                  <header>
                    <h3>{pack.title}</h3>
                    <p>{pack.lead}</p>
                  </header>
                  <ul>
                    {pack.features?.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="section products-flow">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('products.flow.label')}</span>
              <h2>{t('products.flow.title')}</h2>
            </div>
            <div className="products-flow-grid">
              {flow?.map((step, idx) => (
                <div key={idx} className="products-flow-step">
                  <span className="step-index">{String(idx + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section products-cta" id="cta">
          <div className="section-inner">
            <div className="cta-panel">
              <div className="cta-copy">
                <span className="section-label">{t('products.packs.label')}</span>
                <h2>{t('products.cta.title')}</h2>
                <p className="lead">{t('products.cta.lead')}</p>
                <div className="cta-actions">
                  <a className="btn primary pulse" href="mailto:contact@seagle.io">{t('products.cta.button')}</a>
                  <button
                    type="button"
                    className="btn outline"
                    onClick={() => navigate?.('/')}
                  >
                    {t('products.hero.back')}
                  </button>
                </div>
              </div>
              <div className="cta-form">
                <h3>{t('cta.form.title')}</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-inner">
            <p className="contact-note">{t('products.contact.note')}</p>
          </div>
        </section>
      </main>
      <ReassuranceRibbon />
      <Footer />
    </div>
  )
}
