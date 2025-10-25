import React, { useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nProvider } from './i18n.jsx'
import Products from './pages/Products.jsx'
import SecuriteSouverainete from './pages/SecuriteSouverainete.jsx'
import './styles.css'

const root = createRoot(document.getElementById('root'))

function Root() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to) => {
    if (to === path) return
    window.history.pushState({}, '', to)
    setPath(to)
  }, [path])

  const CurrentPage = (() => {
    if (path.startsWith('/produits')) return Products
    if (path.startsWith('/securite-souverainete')) return SecuriteSouverainete
    return App
  })()

  return (
    <React.StrictMode>
      <I18nProvider>
        <CurrentPage navigate={navigate} />
      </I18nProvider>
    </React.StrictMode>
  )
}

root.render(<Root />)
