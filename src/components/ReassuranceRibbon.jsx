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
    <section className="z-10 pt-8 px-4 pb-0" aria-label={t('reassurance.aria')}>
      <div className="max-w-[1160px] mx-auto">
        <ul className="list-none m-0 p-0 grid gap-3 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {items.map((item) => (
            <li key={item.key} className="relative">
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                className="flex items-center gap-3.5 px-[18px] py-4 rounded-[18px] no-underline text-text bg-[rgba(6,18,33,0.72)] border border-[rgba(24,184,196,0.22)] transition-all duration-300 shadow-[0_18px_36px_rgba(5,14,26,0.28)] min-h-[112px] hover:border-[rgba(24,184,196,0.45)] hover:-translate-y-[2px] hover:shadow-[0_22px_44px_rgba(5,14,26,0.32)] focus-visible:outline-none focus-visible:border-[rgba(24,184,196,0.45)] focus-visible:-translate-y-[2px] focus-visible:shadow-[0_22px_44px_rgba(5,14,26,0.32)] [html[data-theme=light]_&]:text-[#05202a] [html[data-theme=light]_&]:bg-[rgba(255,255,255,0.96)] [html[data-theme=light]_&]:border-[rgba(12,52,72,0.12)] [html[data-theme=light]_&]:shadow-[0_16px_34px_rgba(5,14,26,0.18)] [html[data-theme=light]_&]:hover:shadow-[0_24px_46px_rgba(5,14,26,0.22)]"
              >
                <span className="text-xl" aria-hidden="true">{item.icon}</span>
                <span className="flex flex-col gap-1">
                  <strong className="text-[15px] tracking-[0.04em] uppercase text-accent-2 [html[data-theme=light]_&]:text-accent">{t(`reassurance.${item.key}.title`)}</strong>
                  <span className="text-sm text-muted [html[data-theme=light]_&]:text-[rgba(5,32,42,0.72)]">{t(`reassurance.${item.key}.desc`)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
