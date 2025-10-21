import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import FlowFieldParticles from './components/FlowFieldParticles.jsx'
import LogosMarquee from './components/LogosMarquee.jsx'
import ContactTally from './components/ContactTally.jsx'
import { useI18n } from './i18n.jsx'

export default function App() {
  const { t } = useI18n()
  return (
    <div className="app" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar />
      <main id="main">
        <Hero />
        <section id="product" className="product">
          <div className="product-inner">
            <h2>{t('product.title')}</h2>
            <p className="lead">{t('product.lead')}</p>
            <div className="features">
              <div className="card">
                <h3>{t('product.f1.title')}</h3>
                <p>{t('product.f1.desc')}</p>
              </div>
              <div className="card">
                <h3>{t('product.f2.title')}</h3>
                <p>{t('product.f2.desc')}</p>
              </div>
              <div className="card">
                <h3>{t('product.f3.title')}</h3>
                <p>{t('product.f3.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <LogosMarquee />

        <section id="about" className="about">
          <div className="about-inner">
            <h2>{t('about.title')}</h2>
            <p className="lead">{t('about.body')}</p>
          </div>
        </section>

        <section id="pricing" className="pricing">
          <div className="pricing-inner">
            <h2>{t('pricing.title')}</h2>
            <div className="plans">
              <div className="plan">
                <h3>{t('pricing.starter')}</h3>
                <p>{t('pricing.starter.desc')}</p>
                <div className="price">€0</div>
                <a className="btn ghost" href="#contact">{t('pricing.cta')}</a>
              </div>
              <div className="plan highlight">
                <h3>{t('pricing.pro')}</h3>
                <p>{t('pricing.pro.desc')}</p>
                <div className="price">€29</div>
                <a className="btn primary" href="#contact">{t('pricing.cta')}</a>
              </div>
              <div className="plan">
                <h3>{t('pricing.enterprise')}</h3>
                <p>{t('pricing.enterprise.desc')}</p>
                <div className="price">Contact</div>
                <a className="btn ghost" href="#contact">{t('pricing.cta')}</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="about-inner">
            <ContactTally title={t('navbar.contact')} formId={import.meta.env.VITE_TALLY_FORM_ID || ''} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
