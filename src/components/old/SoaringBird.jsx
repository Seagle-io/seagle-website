import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SoaringBird(){
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

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, canvas })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0.2, 8)

    // Lights
    scene.add(new THREE.AmbientLight(0x22d1dc, 0.35))
    const dir = new THREE.DirectionalLight(0x6be6f2, 0.9)
    dir.position.set(5, 6, 8)
    scene.add(dir)

    const ACCENT = new THREE.Color('#22D1DC')
    const meshMat = new THREE.MeshStandardMaterial({ color: ACCENT, transparent:true, opacity:0.12, metalness:0.25, roughness:0.82, side:THREE.DoubleSide })
    const lineMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent:true, opacity:0.9, blending: THREE.AdditiveBlending })

    const bird = new THREE.Group()
    scene.add(bird)

    // Body (capsule-like using cylinder + hemispheres)
    const body = new THREE.Group()
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.6, 6, 1, true), meshMat)
    cyl.rotation.z = Math.PI/2
    body.add(cyl)
    const sph1 = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 10), meshMat)
    sph1.position.x = -0.8
    body.add(sph1)
    const sph2 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 10), meshMat)
    sph2.position.x = 0.8
    body.add(sph2)
    body.position.set(0, 0.1, 0)
    bird.add(body)
    ;[cyl, sph1, sph2].forEach(m => m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), lineMat)))

    // Head + beak
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.26, 0), meshMat)
    head.position.set(1.1, 0.25, 0.05)
    bird.add(head)
    head.add(new THREE.LineSegments(new THREE.EdgesGeometry(head.geometry), lineMat))
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 6), meshMat)
    beak.rotation.set(0.1, 0, Math.PI/2)
    beak.position.set(1.34, 0.28, 0.12)
    bird.add(beak)
    beak.add(new THREE.LineSegments(new THREE.EdgesGeometry(beak.geometry), lineMat))

    // Tail
    const tail = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7, 1, 1), meshMat)
    tail.position.set(-1.1, -0.1, -0.05)
    tail.rotation.set(-0.5, 0.2, 0)
    bird.add(tail)
    tail.add(new THREE.LineSegments(new THREE.EdgesGeometry(tail.geometry), lineMat))

    function cubicBezier(p0, p1, p2, p3, t){
      const it = 1-t
      const x = it*it*it*p0.x + 3*it*it*t*p1.x + 3*it*t*t*p2.x + t*t*t*p3.x
      const y = it*it*it*p0.y + 3*it*it*t*p1.y + 3*it*t*t*p2.y + t*t*t*p3.y
      const z = it*it*it*p0.z + 3*it*it*t*p1.z + 3*it*t*t*p2.z + t*t*t*p3.z
      return new THREE.Vector3(x,y,z)
    }
    function cubicTangent(p0,p1,p2,p3,t){
      const it = 1-t
      const x = 3*it*it*(p1.x-p0.x) + 6*it*t*(p2.x-p1.x) + 3*t*t*(p3.x-p2.x)
      const y = 3*it*it*(p1.y-p0.y) + 6*it*t*(p2.y-p1.y) + 3*t*t*(p3.y-p2.y)
      const z = 3*it*it*(p1.z-p0.z) + 6*it*t*(p2.z-p1.z) + 3*t*t*(p3.z-p2.z)
      return new THREE.Vector3(x,y,z).normalize()
    }

    function makeFeatherWing(sign=1){
      const group = new THREE.Group()
      const p0 = new THREE.Vector3(0.2*sign, 0.3, 0)
      const p1 = new THREE.Vector3(1.2*sign, 0.9, 0.1)
      const p2 = new THREE.Vector3(2.2*sign, 0.7, -0.1)
      const p3 = new THREE.Vector3(3.0*sign, 0.2, 0)
      const FEATHERS = 11
      for (let i=0;i<FEATHERS;i++){
        const t = i/(FEATHERS-1)
        const pos = cubicBezier(p0,p1,p2,p3,t)
        const tan = cubicTangent(p0,p1,p2,p3,t)
        const featherLen = 0.55*(1 - t*0.7)
        const featherWid = 0.10 + (1-t)*0.08
        const geom = new THREE.BoxGeometry(featherLen, featherWid, 0.04)
        const m = new THREE.Mesh(geom, meshMat)
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), lineMat)
        m.add(edges)
        m.position.copy(pos)
        // Orient along tangent; roll slightly to create dihedral
        const up = new THREE.Vector3(0,0,1)
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1,0,0), tan)
        m.quaternion.copy(quat)
        m.rotateX(sign>0? -0.15: 0.15)
        m.rotateZ(sign>0? -0.28: 0.28)
        group.add(m)
      }
      return group
    }

    const left = makeFeatherWing(-1)
    const right = makeFeatherWing(1)
    bird.add(left); bird.add(right)

    // Composition
    bird.rotation.set(0.05, -0.25, 0)
    bird.position.set(0.0, 0.05, 0)

    function fit(){
      const w = canvas.clientWidth || 560
      const h = canvas.clientHeight || 400
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    fit()

    let running = true
    let last = performance.now()
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - last)/1000
      last = now
      if (!reduced){
        const flap = Math.sin(now*0.004)*0.5 + 0.5
        left.rotation.z = 0.6 + flap
        right.rotation.z = -0.6 - flap
        bird.rotation.y += dt*0.06
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

