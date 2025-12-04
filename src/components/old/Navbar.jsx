import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'

export default function Navbar({ navigate, currentPage = 'home' }) {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useI18n()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = 'primary-nav'

  const anchorLinks = [
    { key: 'hero', hash: 'hero', label: t('navbar.hero') },
    { key: 'features', hash: 'features', label: t('navbar.features') },
    { key: 'contact', hash: 'contact', label: t('navbar.contact') },
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

  function handleAnchorClick(e, hash){
    e.preventDefault()
    setOpen(false)
    const target = document.getElementById(hash)
    if (target){
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      return
    }
    navigate?.('/')
    setTimeout(() => {
      const homeTarget = document.getElementById(hash)
      homeTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }
  function handleBrandClick(e){
    if (currentPage === 'home') return
    e.preventDefault()
    setOpen(false)
    navigate?.('/')
  }

  function goToProducts(e){
    e.preventDefault()
    setOpen(false)
    navigate?.('/produits')
  }

  return (
    <nav className="navbar" aria-label="Navigation principale">
      <div className="nav-inner">
        <a href="/" className="brand" aria-label="Seagle - Accueil" onClick={handleBrandClick}>
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
        >
          {anchorLinks.map(link => (
            <a
              key={link.key}
              href={currentPage === 'home' ? `#${link.hash}` : `/#${link.hash}`}
              onClick={(e) => handleAnchorClick(e, link.hash)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/produits"
            onClick={goToProducts}
            aria-current={currentPage === 'products' ? 'page' : undefined}
          >
            {t('navbar.products')}
          </a>
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
          <a href="#demo" className="cta-small" onClick={(e) => handleAnchorClick(e, 'demo')}>
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </nav>
  )
}
