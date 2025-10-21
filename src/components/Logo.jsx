import React from 'react'

export default function Logo({ size = 22 }){
  return (
    <span className="logo" aria-hidden="true" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D1DC"/>
            <stop offset="100%" stopColor="#6BE6F2"/>
          </linearGradient>
        </defs>
        <path d="M12 2l7.5 4.33v10.34L12 21 4.5 16.67V6.33L12 2z" stroke="url(#g1)" strokeWidth="1.5" fill="none"/>
        <path d="M8.5 12.2L12 7l3.5 5.2-3.5 2.3-3.5-2.3z" fill="#22D1DC" opacity="0.9"/>
      </svg>
      <strong>SIGLE</strong><span style={{ color:'var(--accent)' }}>AI</span>
    </span>
  )
}

