import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Procedural neural tree overlay: branching links + glowing nodes
export default function NeuralTree(){
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

    // Subtle lights for ambient depth
    scene.add(new THREE.AmbientLight(0x1a2a3f, 0.6))
    const rim = new THREE.DirectionalLight(0x22d1dc, 0.5)
    rim.position.set(3, 5, 8)
    scene.add(rim)

    const ACCENT = new THREE.Color('#22D1DC')

    // Build branching structure
    const links = [] // [startVec3, endVec3]
    const nodes = [] // positions
    function grow(origin, dir, len, spread, depth){
      if (depth <= 0 || len < 0.15) return
      const jitter = new THREE.Vector3(
        (Math.random()-0.5) * spread,
        (Math.random()-0.2) * spread,
        (Math.random()-0.5) * spread
      )
      const end = origin.clone().add(dir.clone().multiplyScalar(len)).add(jitter)
      links.push([origin.clone(), end.clone()])
      nodes.push(end.clone())
      // Children
      const children = 2 + (depth>2 ? (Math.random()<0.35?1:0) : 0)
      for (let i=0;i<children;i++){
        const axis = new THREE.Vector3(Math.random(),Math.random(),Math.random()).normalize()
        const angle = (0.35 + Math.random()*0.6) * (Math.random() < 0.5 ? 1 : -1)
        const ndir = dir.clone().applyAxisAngle(axis, angle).normalize()
        grow(end, ndir, len* (0.72 + Math.random()*0.12), spread*0.72, depth-1)
      }
    }

    const root = new THREE.Vector3(-0.6, -0.8, 0)
    nodes.push(root.clone())
    const upward = new THREE.Vector3(0.4, 1.4, 0.2).normalize()
    grow(root, upward, 1.6, 0.6, 5)

    // Geometry for links (lines)
    const pos = new Float32Array(links.length * 2 * 3)
    links.forEach((pair, i) => {
      const a = pair[0], b = pair[1]
      pos[i*6+0] = a.x; pos[i*6+1] = a.y; pos[i*6+2] = a.z
      pos[i*6+3] = b.x; pos[i*6+4] = b.y; pos[i*6+5] = b.z
    })
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent:true, opacity:0.65, blending: THREE.AdditiveBlending })
    const network = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(network)

    // Instanced glowing nodes
    const count = nodes.length
    const instGeo = new THREE.SphereGeometry(0.06, 10, 10)
    const instMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent:true, opacity:0.9 })
    const inst = new THREE.InstancedMesh(instGeo, instMat, count)
    const dummy = new THREE.Object3D()
    const phases = new Float32Array(count)
    nodes.forEach((p, i) => {
      dummy.position.copy(p)
      const s = 0.7 + Math.random()*0.6
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      inst.setMatrixAt(i, dummy.matrix)
      phases[i] = Math.random()*Math.PI*2
    })
    scene.add(inst)

    // Soft bloom-ish sprites using Points
    const pointsGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(nodes.flatMap(v=>[v.x,v.y,v.z]), 3))
    const pts = new THREE.Points(pointsGeo, new THREE.PointsMaterial({ color: ACCENT, size: 6, sizeAttenuation: false, transparent:true, opacity:0.08 }))
    scene.add(pts)

    // Center structure
    const box = new THREE.Box3().setFromObject(network)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const scale = 3.6 / Math.max(size.x, size.y, size.z)
    const group = new THREE.Group()
    group.add(network)
    group.add(inst)
    group.add(pts)
    group.position.sub(center)
    group.scale.setScalar(scale)
    scene.add(group)

    function fit(){
      const w = canvas.clientWidth || 560
      const h = canvas.clientHeight || 400
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    fit()

    let last = performance.now()
    let running = true
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - last)/1000
      last = now
      if (!reduced){
        group.rotation.y += dt * 0.08
        // Pulse nodes
        for (let i=0;i<count;i++){
          const phase = phases[i]
          const pulse = 0.85 + Math.sin(now*0.003 + phase) * 0.15
          inst.getMatrixAt(i, dummy.matrix)
          dummy.position.setFromMatrixPosition(dummy.matrix)
          dummy.scale.setScalar(pulse)
          dummy.updateMatrix()
          inst.setMatrixAt(i, dummy.matrix)
        }
        inst.instanceMatrix.needsUpdate = true
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
      lineGeo.dispose(); instGeo.dispose(); pointsGeo.dispose()
      scene.traverse(o=>{ if(o.material) o.material.dispose?.() })
    }
  }, [])

  return (
    <div className="eagle-overlay">
      <canvas ref={canvasRef} className="eagle-canvas" />
    </div>
  )
}

