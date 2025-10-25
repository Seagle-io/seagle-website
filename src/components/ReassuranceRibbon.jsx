import React from 'react'
import { useI18n } from '../i18n.jsx'

const items = [
  { key: 'french', icon: '🇫🇷', href: '/securite-souverainete#solution-francaise', event: 'footer_reassurance_french' },
  { key: 'data', icon: '🏢', href: '/securite-souverainete#donnees-france', event: 'footer_reassurance_data_fr' },
  { key: 'quantum', icon: '🔐', href: '/securite-souverainete#quantum-proof', event: 'footer_reassurance_quantum' },
]

export default function ReassuranceRibbon() {
  const { t } = useI18n()

  function track(eventId) {
    if (typeof window === 'undefined') return
    const payload = { event: eventId, timestamp: Date.now() }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload)
    } else {
      window.dataLayer = [payload]
    }
  }

  function focusAnchor(hash) {
    if (!hash) return
    const id = hash.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      target.addEventListener('blur', () => {
        if (target.getAttribute('tabindex') === '-1') {
          target.removeAttribute('tabindex')
        }
      }, { once: true })
    }
  }

  function handleClick(e, item) {
    track(item.event)
    if (typeof window === 'undefined') return
    const url = new URL(item.href, window.location.origin)
    if (window.location.pathname === url.pathname) {
      e.preventDefault()
      focusAnchor(url.hash)
    } else {
      e.preventDefault()
      window.history.pushState({}, '', url.pathname + url.hash)
      window.dispatchEvent(new PopStateEvent('popstate'))
      requestAnimationFrame(() => focusAnchor(url.hash))
    }
  }

  return (
    <section className="reassurance" aria-label={t('reassurance.aria')}>
      <div className="reassurance-inner">
        <ul className="reassurance-list">
          {items.map((item) => (
            <li key={item.key} className="reassurance-item">
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                className="reassurance-link"
              >
                <span className="reassurance-icon" aria-hidden="true">{item.icon}</span>
                <span className="reassurance-text">
                  <strong>{t(`reassurance.${item.key}.title`)}</strong>
                  <span>{t(`reassurance.${item.key}.desc`)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
