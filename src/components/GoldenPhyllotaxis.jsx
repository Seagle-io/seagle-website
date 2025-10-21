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
    let maxPoints = 420
    const points = [] // {x,y,r,alpha}

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
      // reset for a clean layout on resize
      n = 0
      points.length = 0
      ctx.clearRect(0,0,width,height)
    }
    fit()

    function step(addCount){
      // compute spacing constant so that the last point reaches near maxR
      const targetN = Math.min(maxPoints, n + addCount + 100)
      const c = maxR / Math.sqrt(targetN)
      for (let i = 0; i < addCount; i++){
        const k = n + i
        const r = c * Math.sqrt(k)
        const a = k * GOLDEN_ANGLE
        const x = width/2 + r * Math.cos(a)
        const y = height/2 + r * Math.sin(a)
        // clamp: skip points outside the frame padding
        const margin = 6
        if (x < margin || x > width - margin || y < margin || y > height - margin) continue
        const size = 1.4 + (1.8 * (1 - r/maxR))
        const alpha = 0.45 + 0.45 * (1 - r/maxR)
        points.push({ x, y, r: size, alpha })
      }
      n += addCount
      while (points.length > maxPoints) points.shift()
      if (n >= maxPoints){
        n = 0
        points.length = 0
        ctx.clearRect(0,0,width,height)
      }
    }

    function drawFrame(){
      // no background color; fully transparent canvas each frame
      ctx.clearRect(0,0,width,height)

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < points.length; i++){
        const p = points[i]
        ctx.beginPath()
        ctx.fillStyle = `rgba(34, 209, 220, ${p.alpha})`
        ctx.shadowColor = ACCENT
        ctx.shadowBlur = 14
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fill()
      }
      ctx.restore()
    }

    let running = true
    let last = performance.now()
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - last)/1000
      last = now
      if (!reduced){
        // add points at a speed proportional to size
        const add = Math.max(1, Math.floor(40 * dt))
        step(add)
        drawFrame()
      } else if (n === 0) {
        // static render
        step(300)
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
