import React from 'react'
import { useI18n } from '../../i18n.jsx'
import FlowFieldParticles from '../FlowFieldParticles.jsx'

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
              <a className="btn primary pulse" href="#demo">{t('hero.cta')}</a>
              <button
                type="button"
                className="btn outline"
                onClick={() => navigate?.('/produits')}
              >
                {t('hero.secondary')}
              </button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <FlowFieldParticles />
            <div className="hero-orbit">
              <div className="hero-orbit-ring" />
              <div className="hero-orbit-glow" />
              <div className="hero-orbit-card primary">
                <strong>{t('hero.card1.title')}</strong>
                <p>{t('hero.card1.desc')}</p>
              </div>
              <div className="hero-orbit-card secondary">
                <strong>{t('hero.card2.title')}</strong>
                <p>{t('hero.card2.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
