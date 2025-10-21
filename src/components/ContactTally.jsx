import React, { useEffect } from 'react'

export default function ContactTally({ formId, title = 'Contact' }){
  // Lazy-load Tally embed script once
  useEffect(() => {
    const src = 'https://tally.so/widgets/embed.js'
    if (![...document.scripts].some(s => s.src === src)) {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  if (!formId) {
    return (
      <div className="panel">
        <h2>{title}</h2>
        <p className="hint">Intégration Tally prête. Renseignez l’identifiant du formulaire pour afficher l’embed.</p>
      </div>
    )
  }

  const src = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
  return (
    <div className="panel">
      <h2>{title}</h2>
      <div className="tally-embed">
        <iframe
          data-tally-src={src}
          title="Tally Contact Form"
          width="100%"
          height="440"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          loading="lazy"
        />
      </div>
    </div>
  )
}

