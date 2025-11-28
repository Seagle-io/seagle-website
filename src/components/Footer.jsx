import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative z-10 py-10 px-5 text-muted text-center border-t border-border bg-surface-strong">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-5 text-[13px]">
        <div className="text-xl tracking-[0.1em] font-extrabold">SEAGLE</div>
        <nav className="flex gap-5 text-sm text-muted justify-center" aria-label="Liens légaux">
          <a href="#" className="hover:text-text transition-colors">{t('footer.legal')}</a>
          <a href="#" className="hover:text-text transition-colors">{t('footer.privacy')}</a>
          <a href="mailto:contact@seagle.fr" className="hover:text-text transition-colors">contact@seagle.fr</a>
        </nav>
        <div className="text-xs text-[rgba(255,255,255,0.4)]">
          &copy; {new Date().getFullYear()} SEAGLE. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
