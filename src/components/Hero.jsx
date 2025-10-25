import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Hero() {
  const { t } = useI18n()
  return (
    <section id="hero" className="hero" aria-label="Accueil">
      <div className="hero-inner">
        <div className="hero-top">
          <span className="hero-logo">SEAGLE</span>
          <span className="hero-slogan">{t('hero.tagline')}</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-type">{t('hero.title')}</span>
        </h1>
        <p className="lead">{t('hero.subtitle')}</p>
        <div className="hero-cta">
          <a className="btn primary pulse" href="#demo">{t('hero.cta')}</a>
          <a className="btn ghost" href="#sofia">{t('hero.secondary')}</a>
        </div>
      </div>
    </section>
  )
}
