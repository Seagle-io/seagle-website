import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function OrigamiEagle(){
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
    camera.position.set(0, 0.2, 8)

    // Lights
    const ambient = new THREE.AmbientLight(0x22d1dc, 0.35)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0x6be6f2, 0.9)
    dir.position.set(5, 6, 8)
    scene.add(dir)

    const ACCENT = new THREE.Color('#22D1DC')
    const meshMat = new THREE.MeshStandardMaterial({ color: ACCENT, transparent:true, opacity:0.12, metalness:0.25, roughness:0.8, side:THREE.DoubleSide })
    const lineMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent:true, opacity:0.9, blending: THREE.AdditiveBlending })

    const eagle = new THREE.Group()
    scene.add(eagle)

    // Body (prism) + head + beak
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.5), meshMat)
    body.rotation.x = Math.PI/10
    body.position.set(0, 0, 0)
    eagle.add(body)
    body.add(new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry), lineMat))

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), meshMat)
    head.position.set(0.1, 0.95, 0.1)
    eagle.add(head)
    head.add(new THREE.LineSegments(new THREE.EdgesGeometry(head.geometry), lineMat))

    const beak = new THREE.Mesh(new THREE.TetrahedronGeometry(0.14, 0), meshMat)
    beak.position.set(0.32, 0.98, 0.28)
    beak.rotation.set(0.2, 0.7, 0)
    eagle.add(beak)
    beak.add(new THREE.LineSegments(new THREE.EdgesGeometry(beak.geometry), lineMat))

    // Tail (triangles)
    const tailGeom = new THREE.PlaneGeometry(0.9, 0.6, 1, 1)
    const tail = new THREE.Mesh(tailGeom, meshMat)
    tail.position.set(0, -0.95, -0.05)
    tail.rotation.set(-0.4, 0, 0)
    eagle.add(tail)
    tail.add(new THREE.LineSegments(new THREE.EdgesGeometry(tailGeom), lineMat))

    function makeWing(sign=1){
      const span = 3.8
      const chord = 1.1
      const segX = 12, segY = 4
      const geom = new THREE.PlaneGeometry(span, chord, segX, segY)
      const pos = geom.attributes.position
      for (let i=0;i<pos.count;i++){
        const x = pos.getX(i)
        const y = pos.getY(i)
        const u = (x/(span/2))*sign // -1..1 mirrored
        const v = y/(chord/2)
        // Origami-style stepped folds along span
        const folds = Math.floor((Math.abs(u)+0.02)*6)
        const foldAmp = 0.18*(1-Math.abs(u))
        const z = ((folds%2) ? -foldAmp : foldAmp) + Math.sin(u*2.2)*0.08
        // Taper and slight dihedral
        const xx = x * (1 - 0.22*Math.abs(u))
        const yy = y * (1 - 0.28*Math.abs(u)) + 0.08 + (Math.abs(u)*0.12)
        pos.setXYZ(i, xx, yy, z)
      }
      geom.computeVertexNormals()
      const wingMesh = new THREE.Mesh(geom, meshMat)
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), lineMat)
      wingMesh.add(edges)
      wingMesh.position.set(sign>0?0.48:-0.48, 0.5, 0)
      wingMesh.rotation.set(0.15, sign>0?-0.35:0.35, 0)
      const pivot = new THREE.Group()
      pivot.add(wingMesh)
      return pivot
    }

    const left = makeWing(-1)
    const right = makeWing(1)
    eagle.add(left)
    eagle.add(right)

    // Composition transforms
    eagle.rotation.set(0.0, -0.25, 0)
    eagle.position.set(0.0, 0.1, 0)

    function fit(){
      const w = canvas.clientWidth || 520
      const h = canvas.clientHeight || 380
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
        const flap = Math.sin(now * 0.004) * 0.7 + 0.7
        left.rotation.z = 1.05 + flap
        right.rotation.z = -1.05 - flap
        eagle.rotation.y += dt * 0.07
        eagle.position.y = Math.sin(now*0.002) * 0.07
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
      scene.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material) o.material.dispose?.() })
    }
  }, [])

  return (
    <div ref={wrapRef} className="eagle-overlay">
      <canvas ref={canvasRef} className="eagle-canvas" />
    </div>
  )
}

