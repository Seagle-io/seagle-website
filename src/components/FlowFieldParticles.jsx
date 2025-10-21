import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// 3D Flow Field Particles — additive glowing points following a noise field
export default function FlowFieldParticles({ fullscreen = false }){
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = prefersReduced.matches
    const onPref = () => { reduced = prefersReduced.matches }
    prefersReduced.addEventListener?.('change', onPref)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0.6, 8)

    const group = new THREE.Group()
    scene.add(group)

    // Particle parameters
    let WIDTH = (fullscreen ? window.innerWidth : (canvas.clientWidth || 560))
    let HEIGHT = (fullscreen ? window.innerHeight : (canvas.clientHeight || 360))
    const BASE = 1280 * 720
    const norm = Math.max(0.6, Math.min(2.5, (WIDTH * HEIGHT) / BASE))
    const COUNT = Math.floor(2800 * Math.sqrt(norm))
    const RADIUS = 3.6
    const FREQ = 0.35
    const FLOW = 1.6
    const LERP = 0.08

    // Geometry
    const positions = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    const speed = new Float32Array(COUNT)
    for (let i=0;i<COUNT;i++){
      const ix = i*3
      // random in sphere
      let x = (Math.random()*2-1)
      let y = (Math.random()*2-1)
      let z = (Math.random()*2-1)
      const len = Math.sqrt(x*x+y*y+z*z) || 1
      x = (x/len) * Math.cbrt(Math.random()) * RADIUS
      y = (y/len) * Math.cbrt(Math.random()) * (RADIUS*0.65)
      z = (z/len) * Math.cbrt(Math.random()) * RADIUS
      positions[ix] = x; positions[ix+1] = y; positions[ix+2] = z
      velocities[ix] = 0; velocities[ix+1] = 0; velocities[ix+2] = 0
      speed[i] = 0.6 + Math.random()*0.8
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#22D1DC'),
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.58, // softer base; CSS adds additional blur+opacity
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const points = new THREE.Points(geometry, material)
    group.add(points)

    // Simple hash-based pseudo 3D noise
    function hash(x, y, z){
      let h = x*374761393 + y*668265263 + z*2147483647
      h = (h ^ (h >> 13)) >>> 0
      return (h & 0xffffff) / 0xffffff
    }
    function smoothstep(a,b,t){ t = Math.max(0, Math.min(1,(t-a)/(b-a))); return t*t*(3-2*t) }
    function noise3(x, y, z){
      const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
      const xf = x - xi, yf = y - yi, zf = z - zi
      let n=0
      for (let dx=0; dx<=1; dx++){
        for (let dy=0; dy<=1; dy++){
          for (let dz=0; dz<=1; dz++){
            const w = ((dx?xf:1-xf) * (dy?yf:1-yf) * (dz?zf:1-zf))
            n += hash(xi+dx, yi+dy, zi+dz) * w
          }
        }
      }
      return n
    }
    function flow(x, y, z, t){
      // Use three offset noises to form a direction
      const nx = noise3(x*FREQ + 13+t, y*FREQ, z*FREQ) - 0.5
      const ny = noise3(x*FREQ, y*FREQ + 37+t*0.8, z*FREQ) - 0.5
      const nz = noise3(x*FREQ, y*FREQ, z*FREQ + 71-t*0.6) - 0.5
      // Swirl around Y a little
      const vx = nx*1.3 + -z*0.06
      const vy = ny*0.8 + (0.02)
      const vz = nz*1.3 + x*0.06
      const len = Math.hypot(vx,vy,vz) || 1
      return [vx/len, vy/len, vz/len]
    }

    function fit(){
      WIDTH = fullscreen ? window.innerWidth : (canvas.clientWidth || 560)
      HEIGHT = fullscreen ? window.innerHeight : (canvas.clientHeight || 360)
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      renderer.setPixelRatio(dpr)
      renderer.setSize(WIDTH, HEIGHT, false)
      camera.aspect = WIDTH/HEIGHT
      camera.updateProjectionMatrix()
    }
    fit()

    let last = performance.now()
    let running = true
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = Math.min(0.05, (now - last)/1000)
      last = now

      if (!reduced){
        const t = now / 1000
        for (let i=0;i<COUNT;i++){
          const ix = i*3
          let x = positions[ix], y = positions[ix+1], z = positions[ix+2]
          const dir = flow(x, y, z, t)
          // velocity = lerp(velocity, dir * speed, LERP)
          velocities[ix]   += (dir[0]*speed[i] - velocities[ix]) * LERP
          velocities[ix+1] += (dir[1]*speed[i] - velocities[ix+1]) * LERP
          velocities[ix+2] += (dir[2]*speed[i] - velocities[ix+2]) * LERP
          x += velocities[ix] * FLOW * dt
          y += velocities[ix+1] * FLOW * dt
          z += velocities[ix+2] * FLOW * dt
          // keep in bounds with soft wrap
          const r = Math.hypot(x, z)
          if (r > RADIUS){
            const ang = Math.atan2(z, x) + Math.PI
            const rr = RADIUS * 0.98
            x = Math.cos(ang) * rr
            z = Math.sin(ang) * rr
          }
          if (y > RADIUS*0.7) y = -RADIUS*0.7
          if (y < -RADIUS*0.7) y = RADIUS*0.7
          positions[ix] = x; positions[ix+1] = y; positions[ix+2] = z
        }
        geometry.attributes.position.needsUpdate = true
        group.rotation.y += dt * 0.12
      }

      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onResize = () => fit()
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
      geometry.dispose(); material.dispose(); renderer.dispose()
    }
  }, [])

  return (
    <div ref={wrapRef} className={fullscreen ? 'flow-bg' : 'eagle-overlay'}>
      <canvas ref={canvasRef} className={fullscreen ? 'flow-canvas' : 'eagle-canvas'} />
    </div>
  )
}
