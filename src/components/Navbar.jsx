import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useI18n()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = 'primary-nav'

  const links = [
    { href: '#hero', label: t('navbar.hero') },
    { href: '#sofia', label: t('navbar.sofia') },
    { href: '#features', label: t('navbar.features') },
    { href: '#branding', label: t('navbar.branding') },
    { href: '#values', label: t('navbar.values') },
  ]

  useEffect(() => {
    if (!open) return
    const firstFocusable = menuRef.current?.querySelector('a,button')
    firstFocusable?.focus()

    function onKey(e){
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      } else if (e.key === 'Tab') {
        const focusables = Array.from(menuRef.current?.querySelectorAll('a,button') || [])
        if (focusables.length === 0) return
        const idx = focusables.indexOf(document.activeElement)
        if (e.shiftKey && (idx <= 0)){
          e.preventDefault()
          focusables[focusables.length-1].focus()
        } else if (!e.shiftKey && (idx === focusables.length-1)){
          e.preventDefault()
          focusables[0].focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [open])

  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="Seagle - Accueil">
          <span className="brand-logo" aria-hidden="true" />
          <strong>SEAGLE</strong>
        </a>
        <button
          ref={buttonRef}
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          id={menuId}
          ref={menuRef}
          className={`links ${open ? 'open' : ''}`}
          role="menu"
          onClick={() => setOpen(false)}
        >
          {links.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <a href="#demo">{t('navbar.demo')}</a>
          <a href="#contact">{t('navbar.contact')}</a>
          <ThemeSwitcher />
          <button
            className="lang-switch"
            onClick={(e) => {
              e.stopPropagation()
              setLang(lang === 'fr' ? 'en' : 'fr')
            }}
          >
            {t('navbar.lang')}
          </button>
          <a href="#demo" className="cta-small">{t('hero.cta')}</a>
        </div>
      </div>
    </nav>
  )
}
