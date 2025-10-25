import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import FlowFieldParticles from './components/FlowFieldParticles.jsx'
import LogosMarquee from './components/LogosMarquee.jsx'
import ContactForm from './components/ContactForm.jsx'
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
            <div className="product-header">
              <span className="product-pill">{t('product.pill')}</span>
              <h2>{t('product.title')}</h2>
              <p className="lead">{t('product.lead')}</p>
            </div>

            <div className="product-grid">
              <article className="product-showcase">
                <h3>{t('product.overview.title')}</h3>
                <p>{t('product.overview.desc')}</p>
                <ul className="product-steps">
                  <li>
                    <span className="step-index">1</span>
                    <div>
                      <h4>{t('product.flow1.title')}</h4>
                      <p>{t('product.flow1.desc')}</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-index">2</span>
                    <div>
                      <h4>{t('product.flow2.title')}</h4>
                      <p>{t('product.flow2.desc')}</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-index">3</span>
                    <div>
                      <h4>{t('product.flow3.title')}</h4>
                      <p>{t('product.flow3.desc')}</p>
                    </div>
                  </li>
                </ul>
              </article>

              <aside className="product-aside">
                <div className="product-metrics">
                  <div className="metric accent">
                    <span className="metric-value">{t('product.metric1.value')}</span>
                    <span className="metric-label">{t('product.metric1.label')}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{t('product.metric2.value')}</span>
                    <span className="metric-label">{t('product.metric2.label')}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{t('product.metric3.value')}</span>
                    <span className="metric-label">{t('product.metric3.label')}</span>
                  </div>
                </div>
                <div className="product-side-card highlight">
                  <h3>{t('product.b1.title')}</h3>
                  <p>{t('product.b1.desc')}</p>
                </div>
                <div className="product-side-split">
                  <div className="product-side-card">
                    <h3>{t('product.b2.title')}</h3>
                    <p>{t('product.b2.desc')}</p>
                  </div>
                  <div className="product-side-card">
                    <h3>{t('product.b3.title')}</h3>
                    <p>{t('product.b3.desc')}</p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="product-features">
              <div className="feature-card">
                <h3>{t('product.f1.title')}</h3>
                <p>{t('product.f1.desc')}</p>
              </div>
              <div className="feature-card">
                <h3>{t('product.f2.title')}</h3>
                <p>{t('product.f2.desc')}</p>
              </div>
              <div className="feature-card">
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
            <div className="panel">
              <h2>{t('navbar.contact')}</h2>
              <ContactForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
