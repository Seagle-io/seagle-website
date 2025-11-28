import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Hero({ navigate }) {
  const { t } = useI18n()
  return (
    <section id="hero" className="hero" aria-label="Accueil">
      <div className="hero-inner">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-top">
              <span className="hero-logo">SEAGLE</span>
              <span className="hero-slogan">{t('hero.tagline')}</span>
            </div>
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p className="lead">{t('hero.subtitle')}</p>
            <div className="hero-cta">
              <a className="btn primary pulse" href="#contact">{t('hero.cta')}</a>
              <button
                type="button"
                className="btn outline"
                onClick={() => navigate?.('/contact')}
              >
                {t('hero.secondary')}
              </button>
            </div>
            <div className="reassurance-list" style={{ marginTop: '40px', gridTemplateColumns: 'repeat(3, auto)', gap: '20px', justifyContent: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: 'var(--accent-2)', fontSize: '18px' }}>+500</strong>
                <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase' }}>Clients</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: 'var(--accent-2)', fontSize: '18px' }}>3</strong>
                <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase' }}>Continents</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: 'var(--accent-2)', fontSize: '18px' }}>24/7</strong>
                <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase' }}>Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
