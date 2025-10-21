import React, { useEffect, useRef } from 'react'

// 2D phyllotaxis animation (golden angle / nombre d'or)
export default function GoldenPhyllotaxis(){
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = prefersReduced.matches
    const onPref = () => { reduced = prefersReduced.matches }
    prefersReduced.addEventListener?.('change', onPref)

    let width = 0, height = 0, dpr = 1
    let maxR = 0
    let n = 0
    let dir = 1 // 1: forward, -1: backward (va-et-vient)
    let maxPoints = 420

    const ACCENT = '#22D1DC'
    const BG_ALPHA = 0.0
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)) // ~2.399963

    function fit(){
      dpr = Math.min(2, window.devicePixelRatio || 1)
      width = canvas.clientWidth || 560
      height = canvas.clientHeight || 360
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // radius with padding to avoid overflow on edges
      maxR = Math.min(width, height) * 0.46 - 8
      // keep n within bounds on resize
      n = Math.max(0, Math.min(n, maxPoints))
      ctx.clearRect(0,0,width,height)
    }
    fit()

    function drawFrame(){
      // Transparent background each frame
      ctx.clearRect(0,0,width,height)

      // Build a continuous spiral stroke using the golden angle
      const c = maxR / Math.sqrt(maxPoints)
      const margin = 6
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineWidth = 1.6
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowColor = ACCENT
      ctx.shadowBlur = 14
      ctx.strokeStyle = 'rgba(34, 209, 220, 0.85)'

      if (n > 1){
        ctx.beginPath()
        for (let k = 0; k < n; k++){
          const r = c * Math.sqrt(k)
          const rc = Math.min(r, maxR - margin)
          const a = k * GOLDEN_ANGLE
          const x = width/2 + rc * Math.cos(a)
          const y = height/2 + rc * Math.sin(a)
          if (k === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Draw a small head marker at the current tip
      if (n > 0){
        const r = c * Math.sqrt(n-1)
        const rc = Math.min(r, maxR - margin)
        const a = (n-1) * GOLDEN_ANGLE
        const x = width/2 + rc * Math.cos(a)
        const y = height/2 + rc * Math.sin(a)
        const size = 2.0 + (2.0 * (1 - rc/maxR))
        ctx.beginPath()
        ctx.fillStyle = 'rgba(34, 209, 220, 0.95)'
        ctx.arc(x, y, size, 0, Math.PI*2)
        ctx.fill()
      }
      ctx.restore()
    }

    let running = true
    let last = performance.now()
    const SPEED = 140 // points per second
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - last)/1000
      last = now
      if (!reduced){
        const delta = Math.max(1, Math.floor(SPEED * dt))
        n += dir * delta
        if (n >= maxPoints){ n = maxPoints; dir = -1 }
        if (n <= 0){ n = 0; dir = 1 }
        drawFrame()
      } else {
        n = Math.min(300, maxPoints)
        drawFrame()
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onResize = () => { fit() }
    window.addEventListener('resize', onResize)
    const onVis = () => {
      if (document.visibilityState === 'hidden') running = false
      else { running = true; rafRef.current = requestAnimationFrame(loop) }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      prefersReduced.removeEventListener?.('change', onPref)
    }
  }, [])

  return (
    <div className="eagle-overlay">
      <canvas ref={canvasRef} className="eagle-canvas" />
    </div>
  )
}
