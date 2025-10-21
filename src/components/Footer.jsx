import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="made">{t('footer.made')}</div>
        <div className="links">
          <a href="mailto:contact@seagle.ai">contact@seagle.ai</a>
          <span>·</span>
          <a href="#top">{t('footer.back')}</a>
        </div>
        <div className="copy">© {new Date().getFullYear()} SEAGLE — Tous droits réservés</div>
      </div>
    </footer>
  )
}
