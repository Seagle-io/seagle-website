import React from 'react'

const LOGOS = [
  'Reuters', 'Alphabet', 'Meta', 'Okta', 'HP', 'Samsung', "Lowe's",
]

export default function LogosMarquee() {
  const items = [...LOGOS, ...LOGOS]
  return (
    <section className="trusted" aria-label="Ils nous font confiance">
      <div className="trusted-inner">
        <p className="trusted-title">Ils nous font confiance</p>
        <div className="marquee">
          <div className="marquee-track">
            {items.map((name, i) => (
              <div className="logo-item" key={i} aria-label={name}>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

