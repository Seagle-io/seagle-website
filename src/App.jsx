import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import BackgroundWave from './components/BackgroundWave.jsx'
import FlowFieldParticles from './components/FlowFieldParticles.jsx'
import ContactForm from './components/ContactForm.jsx'
import ThemeSwitcher from './components/ThemeSwitcher.jsx'
import { useI18n } from './i18n.jsx'

export default function App() {
  const { t } = useI18n()
  return (
    <div className="app" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar />
      <BackgroundWave />
      <main id="main">
        <Hero />

        <section id="sofia" className="sofia section">
          <div className="section-inner">
            <div className="sofia-copy">
              <span className="section-label">{t('sofia.label')}</span>
              <h2>{t('sofia.title')}</h2>
              <p className="lead">{t('sofia.lead')}</p>
              <ul className="sofia-points">
                <li>{t('sofia.point1')}</li>
                <li>{t('sofia.point2')}</li>
                <li>{t('sofia.point3')}</li>
              </ul>
              <a className="btn primary pulse" href="#demo">{t('cta.demo')}</a>
            </div>
            <div className="sofia-visual" aria-hidden="true">
              <div className="ui-shell">
                <header>
                  <div className="window-dots">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                  <div className="ui-title">{t('sofia.visual.title')}</div>
                </header>
                <div className="ui-body">
                  <div className="ui-panel">
                    <div className="ui-hint">
                      <span className="ui-pill">{t('sofia.visual.hint')}</span>
                      <p>{t('sofia.visual.desc')}</p>
                    </div>
                    <div className="ui-canvas">
                      <button className="ui-action">{t('sofia.visual.cta')}</button>
                      <div className="ui-target">
                        <span className="ring" />
                        <span className="ring" />
                        <span className="ring active" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('features.label')}</span>
              <h2>{t('features.title')}</h2>
              <p className="lead">{t('features.lead')}</p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>{t('features.f1.title')}</h3>
                <p>{t('features.f1.desc')}</p>
              </article>
              <article className="feature-card">
                <h3>{t('features.f2.title')}</h3>
                <p>{t('features.f2.desc')}</p>
              </article>
              <article className="feature-card">
                <h3>{t('features.f3.title')}</h3>
                <p>{t('features.f3.desc')}</p>
              </article>
              <article className="feature-card">
                <h3>{t('features.f4.title')}</h3>
                <p>{t('features.f4.desc')}</p>
              </article>
              <article className="feature-card">
                <h3>{t('features.f5.title')}</h3>
                <p>{t('features.f5.desc')}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="branding" className="branding section">
          <div className="section-inner">
            <div className="branding-copy">
              <span className="section-label">{t('branding.label')}</span>
              <h2>{t('branding.title')}</h2>
              <p className="lead">{t('branding.lead')}</p>
              <ul>
                <li>{t('branding.point1')}</li>
                <li>{t('branding.point2')}</li>
                <li>{t('branding.point3')}</li>
              </ul>
            </div>
            <div className="branding-visual" aria-hidden="true">
              <div className="theme-preview">
                <div className="preview-header">
                  <span>{t('branding.preview.default')}</span>
                  <ThemeSwitcher minimal />
                </div>
                <div className="preview-grid">
                  <div className="preview-card ocean">
                    <span className="preview-logo">S</span>
                    <p>{t('branding.preview.ocean')}</p>
                  </div>
                  <div className="preview-card sunrise">
                    <span className="preview-logo">S</span>
                    <p>{t('branding.preview.sunrise')}</p>
                  </div>
                  <div className="preview-card alpine">
                    <span className="preview-logo">S</span>
                    <p>{t('branding.preview.alpine')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="values section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('values.label')}</span>
              <h2>{t('values.title')}</h2>
              <p className="lead">{t('values.lead')}</p>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <h3>{t('values.v1.title')}</h3>
                <p>{t('values.v1.desc')}</p>
              </div>
              <div className="value-card">
                <h3>{t('values.v2.title')}</h3>
                <p>{t('values.v2.desc')}</p>
              </div>
              <div className="value-card">
                <h3>{t('values.v3.title')}</h3>
                <p>{t('values.v3.desc')}</p>
              </div>
              <div className="value-card">
                <h3>{t('values.v4.title')}</h3>
                <p>{t('values.v4.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="cta section">
          <div className="section-inner">
            <div className="cta-panel">
              <div className="cta-copy">
                <span className="section-label">{t('cta.label')}</span>
                <h2>{t('cta.title')}</h2>
                <p className="lead">{t('cta.lead')}</p>
                <div className="cta-actions">
                  <a className="btn primary pulse" href="#demo">{t('cta.demo')}</a>
                  <a className="btn outline" href="mailto:contact@seagle.io">{t('cta.contact')}</a>
                </div>
              </div>
              <div className="cta-form">
                <h3>{t('cta.form.title')}</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="section-inner">
            <p className="contact-note">{t('contact.note')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
