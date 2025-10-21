import React, { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let points = []
    const MAX_SPEED = 0.4
    let LINK_DIST = 160

    function resize(all = false) {
      // Full page height to avoid visible seams between sections
      width = window.innerWidth
      height = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      )
      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      LINK_DIST = Math.min(200, Math.max(120, width / 9))
      if (all) {
        const COUNT = Math.min(180, Math.floor(width / 10))
        points = Array.from({ length: COUNT }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * MAX_SPEED,
          vy: (Math.random() - 0.5) * MAX_SPEED,
          r: 1 + Math.random() * 1.5,
        }))
      }
    }

    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = mediaReduced.matches
    function onMedia(){ reduced = mediaReduced.matches }
    mediaReduced.addEventListener?.('change', onMedia)

    resize(true)

    let running = true
    function frame() {
      if (!running || reduced) { rafRef.current = requestAnimationFrame(frame); return }
      ctx.clearRect(0, 0, width, height)

      // Soft radial glow behind content (turquoise tint)
      const g = ctx.createRadialGradient(width * 0.2, height * -0.1, 0, width * 0.2, height * -0.1, width)
      g.addColorStop(0, 'rgba(34,209,220,0.12)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      // Update points and draw
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      // Links
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        // nodes
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34,209,220,0.55)'
        ctx.fill()

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          const dist = Math.sqrt(d2)
          if (dist < LINK_DIST) {
            const a = 1 - dist / LINK_DIST
            ctx.strokeStyle = `rgba(107,230,242,${0.25 * a})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    let resizeTimeout = 0
    const onResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => resize(true), 100)
    }
    let scrollTicking = false
    const onScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      requestAnimationFrame(() => { resize(false); scrollTicking = false })
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll)

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') running = false
      else { running = true; rafRef.current = requestAnimationFrame(frame) }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      mediaReduced.removeEventListener?.('change', onMedia)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="animated-bg"
    />
  )
}
