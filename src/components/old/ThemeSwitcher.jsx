import React, { useEffect, useState } from 'react'
import { useI18n } from '../../i18n.jsx'

const STORAGE_KEY = 'seagle-theme'
const LIGHT = 'light'
const DARK = 'dark'

function getPreferredTheme() {
  if (typeof window === 'undefined') return DARK
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === LIGHT || stored === DARK) return stored
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return LIGHT
  return DARK
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
}

export default function ThemeSwitcher({ minimal = false, onToggle }) {
  const { t } = useI18n()
  const [theme, setTheme] = useState(() => getPreferredTheme())

  useEffect(() => {
    applyTheme(theme)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-color-scheme: light)')
    function onChange(e) {
      setTheme(e.matches ? LIGHT : DARK)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  function toggleTheme(e) {
    e.stopPropagation()
    onToggle?.(e)
    setTheme(prev => (prev === DARK ? LIGHT : DARK))
  }

  return (
    <button
      type="button"
      className={`theme-switch ${minimal ? 'minimal' : ''}`}
      aria-label={theme === DARK ? t('theme.toLight') : t('theme.toDark')}
      onClick={toggleTheme}
    >
      <span className="switch-thumb" />
      {!minimal && (
        <span className="switch-label">
          {theme === DARK ? t('theme.lightLabel') : t('theme.darkLabel')}
        </span>
      )}
    </button>
  )
}
