import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'
import ThemeSwitcher from './ThemeSwitcher.jsx'

export default function Navbar({ navigate, currentPage = 'home' }) {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useI18n()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = 'primary-nav'

  useEffect(() => {
    if (!open) return
    const firstFocusable = menuRef.current?.querySelector('a,button')
    firstFocusable?.focus()

    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      } else if (e.key === 'Tab') {
        const focusables = Array.from(menuRef.current?.querySelectorAll('a,button') || [])
        if (focusables.length === 0) return
        const idx = focusables.indexOf(document.activeElement)
        if (e.shiftKey && (idx <= 0)) {
          e.preventDefault()
          focusables[focusables.length - 1].focus()
        } else if (!e.shiftKey && (idx === focusables.length - 1)) {
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

  function handleAnchorClick(e, hash) {
    e.preventDefault()
    setOpen(false)
    const target = document.getElementById(hash)
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      return
    }
    navigate?.('/')
    setTimeout(() => {
      const homeTarget = document.getElementById(hash)
      homeTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }
  function handleBrandClick(e) {
    if (currentPage === 'home') return
    e.preventDefault()
    setOpen(false)
    navigate?.('/')
  }

  function goToProducts(e) {
    e.preventDefault()
    setOpen(false)
    navigate?.('/produits')
  }

  return (
    <nav className="sticky top-0 z-20 backdrop-blur-[12px] bg-[linear-gradient(90deg,rgba(10,30,63,0.72),rgba(10,30,63,0.35))] border-b border-border [html[data-theme=light]_&]:bg-[linear-gradient(90deg,rgba(255,255,255,0.94),rgba(236,244,255,0.8))] [html[data-theme=light]_&]:border-[rgba(12,52,72,0.08)] [html[data-theme=light]_&]:shadow-[0_6px_20px_rgba(12,32,52,0.08)]" aria-label="Navigation principale">
      <div className="max-w-[1200px] mx-auto px-6 py-3.5 flex items-center justify-between gap-[18px]">
        <a href="/" className="inline-flex items-center gap-2.5 font-extrabold tracking-[0.08em] no-underline" aria-label="Seagle - Accueil" onClick={handleBrandClick}>
          <span className="w-10 h-10 bg-[url('/models/favicon.png')] bg-contain bg-center bg-no-repeat" aria-hidden="true" />
          <strong>SEAGLE</strong>
        </a>
        <button
          ref={buttonRef}
          className="hidden max-[900px]:block w-[42px] h-[42px] rounded-xl border border-[rgba(255,255,255,0.1)] bg-transparent cursor-pointer"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(v => !v)}
        >
          <span className="block h-0.5 my-[7px] mx-auto w-[22px] bg-text transition-transform duration-300" />
          <span className="block h-0.5 my-[7px] mx-auto w-[22px] bg-text transition-transform duration-300" />
          <span className="block h-0.5 my-[7px] mx-auto w-[22px] bg-text transition-transform duration-300" />
        </button>
        <div
          id={menuId}
          ref={menuRef}
          className={`flex items-center gap-[18px] max-[900px]:absolute max-[900px]:top-[72px] max-[900px]:right-6 max-[900px]:left-6 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:p-5 max-[900px]:rounded-[20px] max-[900px]:bg-surface-strong max-[900px]:border max-[900px]:border-border max-[900px]:shadow-shadow ${open ? 'max-[900px]:flex' : 'max-[900px]:hidden'}`}
          role="menu"
        >
          <a href="#expertise" className="px-3 py-2 text-sm font-medium text-text hover:text-accent transition-colors" onClick={(e) => handleAnchorClick(e, 'expertise')}>
            {t('navbar.expertise')}
          </a>
          <a href="#about" className="px-3 py-2 text-sm font-medium text-text hover:text-accent transition-colors" onClick={(e) => handleAnchorClick(e, 'about')}>
            {t('navbar.about')}
          </a>
          <a href="#contact" className="px-3 py-2 text-sm font-medium text-text hover:text-accent transition-colors" onClick={(e) => handleAnchorClick(e, 'contact')}>
            {t('navbar.contact')}
          </a>
          <button
            type="button"
            className="px-3 py-2 text-sm font-medium text-text hover:text-accent transition-colors uppercase"
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          >
            {t('navbar.lang')}
          </button>
        </div>
      </div>
    </nav>
  )
}
