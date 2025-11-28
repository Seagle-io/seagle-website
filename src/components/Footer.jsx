import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-strong)', padding: '40px 20px' }}>
      <div className="footer-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div className="brand" style={{ fontSize: '20px', letterSpacing: '0.1em' }}>SEAGLE</div>
        <nav className="links" aria-label="Liens légaux" style={{ display: 'flex', gap: '20px', fontSize: '14px', color: 'var(--muted)' }}>
          <a href="#">{t('footer.legal')}</a>
          <a href="#">{t('footer.privacy')}</a>
          <a href="mailto:contact@seagle.io">contact@seagle.io</a>
        </nav>
        <div className="copy" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
          &copy; {new Date().getFullYear()} SEAGLE. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
