import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useI18n()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = 'primary-nav'

  // Close on Escape and trap focus while menu open
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
          e.preventDefault(); focusables[focusables.length-1].focus()
        } else if (!e.shiftKey && (idx === focusables.length-1)){
          e.preventDefault(); focusables[0].focus()
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
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="Seagle AI - Accueil">
          <span className="brand-logo" aria-hidden="true" />
          <strong>SEAGLE</strong>
        </a>
        <button ref={buttonRef} className="burger" aria-label="Menu" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(v => !v)}>
          <span />
          <span />
          <span />
        </button>
        <div id={menuId} ref={menuRef} className={`links ${open ? 'open' : ''}`} role="menu" onClick={() => setOpen(false)}>
          <a href="#contact">{t('navbar.demo')}</a>
          <a href="#about">{t('navbar.about')}</a>
          <a href="#contact">{t('navbar.contact')}</a>
          <button className="lang-switch" onClick={(e)=>{ e.stopPropagation(); setLang(lang==='fr'?'en':'fr') }}>{t('navbar.lang')}</button>
          <a href="#contact" className="cta-small">{t('navbar.try')}</a>
        </div>
      </div>
    </nav>
  )
}
