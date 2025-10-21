import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function OrigamiKnot(){
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = prefersReduced.matches
    const onPref = () => { reduced = prefersReduced.matches }
    prefersReduced.addEventListener?.('change', onPref)

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, canvas })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 6.5)

    // Lights
    scene.add(new THREE.AmbientLight(0x22d1dc, 0.35))
    const dir = new THREE.DirectionalLight(0x6be6f2, 0.9)
    dir.position.set(5, 6, 8)
    scene.add(dir)

    // Geometry: torus knot with low-poly feel
    const geom = new THREE.TorusKnotGeometry(1.4, 0.42, 140, 10, 2, 3)
    // Slightly flatten to look more ribbon/origami
    geom.scale(1.1, 0.88, 1)

    const color = new THREE.Color('#22D1DC')
    const meshMat = new THREE.MeshStandardMaterial({ color, transparent:true, opacity:0.12, metalness:0.25, roughness:0.75, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geom, meshMat)
    mesh.scale.setScalar(0.88)
    scene.add(mesh)

    // Edge lines overlay
    const edges = new THREE.EdgesGeometry(geom)
    const lineMat = new THREE.LineBasicMaterial({ color, transparent:true, opacity:0.9, blending: THREE.AdditiveBlending })
    const lines = new THREE.LineSegments(edges, lineMat)
    lines.scale.setScalar(0.88)
    scene.add(lines)

    function fit(){
      const w = canvas.clientWidth || 480
      const h = canvas.clientHeight || 300
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    fit()

    let running = true
    let last = performance.now()
    const loop = () => {
      if (!running){ return }
      const now = performance.now()
      const dt = (now - last)/1000
      last = now
      if (!reduced){
        mesh.rotation.x += dt * 0.25
        mesh.rotation.y += dt * 0.18
        lines.rotation.copy(mesh.rotation)
      }
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onResize = () => fit()
    window.addEventListener('resize', onResize)
    const onVis = () => {
      if (document.visibilityState === 'hidden') running = false
      else { running = true; last = performance.now(); rafRef.current = requestAnimationFrame(loop) }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      prefersReduced.removeEventListener?.('change', onPref)
      renderer.dispose()
      geom.dispose()
      edges.dispose()
      meshMat.dispose()
      lineMat.dispose()
    }
  }, [])

  return (
    <div ref={wrapRef} className="eagle-overlay">
      <canvas ref={canvasRef} className="eagle-canvas" />
    </div>
  )
}
