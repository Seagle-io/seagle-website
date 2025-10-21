import React from 'react'
import { useI18n } from '../i18n.jsx'
import NeuralTree from './NeuralTree.jsx'

export default function Hero() {
  const { t } = useI18n()
  return (
    <section id="hero" className="hero" aria-label="Présentation">
      <NeuralTree />
      <div className="hero-inner">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
        <div className="hero-cta">
          <a className="btn primary" href="#demo">{t('hero.try')}</a>
          <a className="btn ghost" href="#product">{t('hero.discover')}</a>
        </div>
      </div>
    </section>
  )
}
