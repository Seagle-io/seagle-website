import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function LowPolyEagle(){
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = prefersReduced.matches
    const onPref = () => { reduced = prefersReduced.matches }
    prefersReduced.addEventListener?.('change', onPref)

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, canvas: canvasRef.current || undefined })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 8)

    // Lights
    const ambient = new THREE.AmbientLight(0x22d1dc, 0.35)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0x6be6f2, 0.75)
    dir.position.set(5, 6, 8)
    scene.add(dir)

    // Materials
    const ACCENT = new THREE.Color('#22D1DC')
    const meshMat = new THREE.MeshStandardMaterial({ color: ACCENT, transparent:true, opacity:0.18, metalness:0.15, roughness:0.85 })
    const lineMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent:true, opacity:0.85, blending: THREE.AdditiveBlending })

    const eagle = new THREE.Group()
    scene.add(eagle)

    // Body (simple cone + sphere)
    const bodyGeom = new THREE.ConeGeometry(0.4, 1.8, 6)
    const body = new THREE.Mesh(bodyGeom, meshMat)
    body.rotation.x = Math.PI/2
    body.position.set(0, -0.1, 0)
    eagle.add(body)
    const headGeom = new THREE.SphereGeometry(0.22, 12, 12)
    const head = new THREE.Mesh(headGeom, meshMat)
    head.position.set(0, 0.7, 0.1)
    eagle.add(head)

    // Beak (tetra)
    const beak = new THREE.Mesh(new THREE.TetrahedronGeometry(0.12, 0), meshMat)
    beak.position.set(0.16, 0.72, 0.25)
    beak.rotation.set(0.2, 0.8, 0)
    eagle.add(beak)

    // Wings
    function makeWing(sign = 1){
      const span = 3.6
      const chord = 1.2
      const segX = 14, segY = 4
      const plane = new THREE.PlaneGeometry(span, chord, segX, segY)
      const pos = plane.attributes.position
      for (let i=0; i<pos.count; i++){
        const x = pos.getX(i)
        const y = pos.getY(i)
        const u = (x / (span/2))*sign // -1..1 mapped, mirrored by sign
        const v = y / (chord/2) // -1..1
        // Wing curvature + slight dihedral and taper
        const z = Math.pow(1 - Math.abs(u), 1.5) * 0.6 + (Math.sin(u*2.4) * 0.12)
        const xx = x * 0.9 * (1 - 0.18*Math.abs(u))
        const yy = y * (1 - 0.25*Math.abs(u)) + 0.1
        pos.setXYZ(i, xx, yy, z)
      }
      plane.computeVertexNormals()
      const wing = new THREE.Mesh(plane, meshMat)
      wing.position.set(0, 0.4, 0)
      wing.rotation.set(0.15, sign>0 ? -0.25 : 0.25, 0)
      // Edges overlay
      const edges = new THREE.EdgesGeometry(plane)
      const lines = new THREE.LineSegments(edges, lineMat)
      wing.add(lines)
      // Pivot group for flapping
      const pivot = new THREE.Group()
      pivot.add(wing)
      wing.position.x = sign>0 ? 0.45 : -0.45
      return pivot
    }

    const left = makeWing(-1)
    const right = makeWing(1)
    eagle.add(left)
    eagle.add(right)

    // Subtle idle rotation
    eagle.rotation.set(0.08, -0.2, 0)

    function fit(){
      const el = canvasRef.current
      const w = (el?.clientWidth || 600)
      const h = (el?.clientHeight || 260)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    fit()

    let t0 = performance.now()
    let running = true
    const loop = () => {
      if (!running){ return }
      const t = performance.now()
      const dt = (t - t0) / 1000
      t0 = t
      if (!reduced){
        const flap = Math.sin(t * 0.004) * 0.6 + 0.6
        left.rotation.z = 1.2 + flap
        right.rotation.z = -1.2 - flap
        eagle.rotation.y += dt * 0.08
        eagle.position.y = Math.sin(t*0.002) * 0.08
      }
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onResize = () => fit()
    window.addEventListener('resize', onResize)
    const onVis = () => {
      if (document.visibilityState === 'hidden'){ running = false }
      else { running = true; t0 = performance.now(); rafRef.current = requestAnimationFrame(loop) }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      prefersReduced.removeEventListener?.('change', onPref)
      renderer.dispose()
      scene.traverse(obj => { if (obj.geometry) obj.geometry.dispose(); if (obj.material) obj.material.dispose?.() })
    }
  }, [])

  return (
    <div ref={wrapRef} className="eagle-overlay">
      <canvas ref={canvasRef} className="eagle-canvas" />
    </div>
  )
}
