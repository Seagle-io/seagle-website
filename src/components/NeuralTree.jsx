import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Procedural neural tree overlay with continuous fractal growth (random, permanent)
export default function NeuralTree({ density = 'medium' }){
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
    scene.add(new THREE.AmbientLight(0x1a2a3f, 0.6))
    const rim = new THREE.DirectionalLight(0x22d1dc, 0.6)
    rim.position.set(3, 5, 8)
    scene.add(rim)

    const ACCENT = new THREE.Color('#22D1DC')

    // Presets for continuous growth
    const PRESETS = {
      low:    { edgesCap: 700, nodesCap: 800, growPerSec: 2.0, segSpeed: 1.0, lenMin: 0.18, lenMax: 0.45, spread: 0.55, radius: 3.2 },
      medium: { edgesCap: 1100,nodesCap: 1300,growPerSec: 3.0, segSpeed: 1.2, lenMin: 0.20, lenMax: 0.55, spread: 0.65, radius: 3.3 },
      high:   { edgesCap: 1500,nodesCap: 1700,growPerSec: 4.0, segSpeed: 1.4, lenMin: 0.22, lenMax: 0.60, spread: 0.72, radius: 3.5 },
      ultra:  { edgesCap: 2000,nodesCap: 2200,growPerSec: 5.0, segSpeed: 1.6, lenMin: 0.24, lenMax: 0.65, spread: 0.80, radius: 3.8 },
    }
    const CFG = PRESETS[density] || PRESETS.medium

    // Group wrapper for gentle rotation
    const group = new THREE.Group()
    scene.add(group)

    // Lines buffer (preallocated)
    const pos = new Float32Array(CFG.edgesCap * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent:true, opacity:0.65, blending: THREE.AdditiveBlending })
    const network = new THREE.LineSegments(lineGeo, lineMat)
    group.add(network)

    // Instanced nodes and soft points (bloom)
    const instGeo = new THREE.SphereGeometry(0.06, 10, 10)
    const instMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent:true, opacity:0.9 })
    const inst = new THREE.InstancedMesh(instGeo, instMat, CFG.nodesCap)
    const dummy = new THREE.Object3D()
    const appear = new Float32Array(CFG.nodesCap).fill(0)
    const phases = new Float32Array(CFG.nodesCap)
    for (let i=0;i<CFG.nodesCap;i++) phases[i] = Math.random()*Math.PI*2
    group.add(inst)

    const pPos = new Float32Array(CFG.nodesCap * 3)
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pts = new THREE.Points(pointsGeo, new THREE.PointsMaterial({ color: ACCENT, size: 6, sizeAttenuation: false, transparent:true, opacity:0.08 }))
    group.add(pts)

    // State: ring buffers
    let edgeWrite = 0, edgeDraw = 0
    let nodeWrite = 0, nodeDraw = 0
    const growing = [] // {slot, ax,ay,az, bx,by,bz, t}
    const tips = [] // candidate Vector3 origins

    // Seed with a root
    const root = new THREE.Vector3(-0.6, -0.8, 0)
    tips.push(root.clone())
    // write root node
    pPos[0] = root.x; pPos[1] = root.y; pPos[2] = root.z
    pointsGeo.attributes.position.needsUpdate = true
    nodeDraw = Math.min(nodeDraw+1, CFG.nodesCap)
    dummy.position.copy(root); dummy.scale.setScalar(0.001); dummy.updateMatrix(); inst.setMatrixAt(nodeWrite, dummy.matrix)
    inst.instanceMatrix.needsUpdate = true
    appear[nodeWrite] = 1
    nodeWrite = (nodeWrite + 1) % CFG.nodesCap

    // Helpers
    function randomDir(){
      const up = new THREE.Vector3(0.3, 0.9, 0.2).normalize()
      const axis = new THREE.Vector3(Math.random(),Math.random(),Math.random()).normalize()
      const angle = (Math.random()*2-1) * CFG.spread
      return up.clone().applyAxisAngle(axis, angle).normalize()
    }
    function clampToRadius(v){
      const r = CFG.radius
      if (v.length() > r){ v.setLength(r) }
      return v
    }
    function spawnEdge(){
      if (reduced) return
      const pick = tips.length ? tips[(tips.length-1 - Math.floor(Math.random()*Math.min(80, tips.length)))] : root
      const a = pick.clone()
      const dir = randomDir()
      const len = THREE.MathUtils.lerp(CFG.lenMin, CFG.lenMax, Math.random())
      const b = clampToRadius(a.clone().add(dir.multiplyScalar(len)))

      const slot = edgeWrite
      pos[slot*6+0] = a.x; pos[slot*6+1] = a.y; pos[slot*6+2] = a.z
      pos[slot*6+3] = a.x; pos[slot*6+4] = a.y; pos[slot*6+5] = a.z
      lineGeo.attributes.position.needsUpdate = true
      edgeWrite = (edgeWrite + 1) % CFG.edgesCap
      edgeDraw = Math.min(edgeDraw + 2, CFG.edgesCap * 2)
      lineGeo.setDrawRange(0, edgeDraw)
      growing.push({ slot, ax:a.x, ay:a.y, az:a.z, bx:b.x, by:b.y, bz:b.z, t:0 })

      // record node
      const nSlot = nodeWrite
      pPos[nSlot*3+0] = b.x; pPos[nSlot*3+1] = b.y; pPos[nSlot*3+2] = b.z
      pointsGeo.attributes.position.needsUpdate = true
      nodeWrite = (nodeWrite + 1) % CFG.nodesCap
      nodeDraw = Math.min(nodeDraw + 1, CFG.nodesCap)
      appear[nSlot] = 0
      dummy.position.set(b.x, b.y, b.z); dummy.scale.setScalar(0.001); dummy.updateMatrix(); inst.setMatrixAt(nSlot, dummy.matrix)
      inst.instanceMatrix.needsUpdate = true

      tips.push(b)
      if (tips.length > 200) tips.shift()
    }

    function fit(){
      const w = canvas.clientWidth || 560
      const h = canvas.clientHeight || 400
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    fit()

    let last = performance.now()
    let acc = 0
    let running = true
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - last)/1000
      last = now

      if (!reduced){
        // spawn edges
        acc += dt * CFG.growPerSec
        while (acc >= 1){ spawnEdge(); acc -= 1 }

        // advance growth
        for (let i=growing.length-1; i>=0; i--){
          const g = growing[i]
          g.t = Math.min(1, g.t + dt * CFG.segSpeed)
          const cx = g.ax + (g.bx - g.ax) * g.t
          const cy = g.ay + (g.by - g.ay) * g.t
          const cz = g.az + (g.bz - g.az) * g.t
          pos[g.slot*6+3] = cx; pos[g.slot*6+4] = cy; pos[g.slot*6+5] = cz
          if (g.t >= 1) growing.splice(i,1)
        }
        lineGeo.attributes.position.needsUpdate = true

        // nodes scaling + pulse
        for (let i=0;i<nodeDraw;i++){
          appear[i] += (1 - appear[i]) * Math.min(1, dt * 4)
          const pulse = 0.85 + Math.sin(now*0.003 + phases[i]) * 0.15
          const s = pulse * appear[i]
          dummy.position.set(pPos[i*3+0], pPos[i*3+1], pPos[i*3+2])
          dummy.scale.setScalar(s)
          dummy.updateMatrix()
          inst.setMatrixAt(i, dummy.matrix)
        }
        inst.instanceMatrix.needsUpdate = true

        group.rotation.y += dt * 0.05
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

