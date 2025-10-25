import React from 'react'

export default function BackgroundWave() {
  return (
    <div className="background-wave" aria-hidden="true">
      <svg className="wave-layer layer-1" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,160L48,154.7C96,149,192,139,288,138.7C384,139,480,149,576,165.3C672,181,768,203,864,208C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
      <svg className="wave-layer layer-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,170.7C840,192,960,224,1080,208C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
      </svg>
      <div className="wave-glow" />
    </div>
  )
}
