import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="made">{t('footer.made')}</div>
        <div className="links">
          <a href="mailto:contact@seagle.io">contact@seagle.io</a>
          <span aria-hidden="true">/</span>
          <a href="#top">{t('footer.back')}</a>
        </div>
        <div className="copy">&copy; {new Date().getFullYear()} SEAGLE - {t('footer.copy')}</div>
      </div>
    </footer>
  )
}
