import React from 'react'

export default function BackgroundWave() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute left-0 w-full h-full opacity-40 top-[40%] animate-wave-float" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path className="fill-[var(--surface-soft)]" d="M0,160L48,154.7C96,149,192,139,288,138.7C384,139,480,149,576,165.3C672,181,768,203,864,208C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
      <svg className="absolute left-0 w-full h-full opacity-25 top-[55%] animate-wave-float-reverse" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path className="fill-[var(--surface-soft)]" d="M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,170.7C840,192,960,224,1080,208C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(circle_at_50%_10%,rgba(24,184,196,0.35),transparent_60%)] blur-[60px] opacity-60" />
    </div>
  )
}
