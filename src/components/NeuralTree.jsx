import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Procedural neural tree overlay: branching links + glowing nodes
export default function NeuralTree({ density = 'high' }){
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

    // Build branching structure with explicit node/edge indices
    // Density presets tuned for moins de branches + croissance visible
    const PRESETS = {
      low:   { depth: 4, baseChildren: 1, extraProb: 0.15, baseLen: 1.4, spread: 0.5, maxLinks: 300,  growSpeed: 180 },
      medium:{ depth: 5, baseChildren: 1, extraProb: 0.25, baseLen: 1.6, spread: 0.6, maxLinks: 600,  growSpeed: 220 },
      high:  { depth: 6, baseChildren: 2, extraProb: 0.30, baseLen: 1.7, spread: 0.7, maxLinks: 900,  growSpeed: 260 },
      ultra: { depth: 7, baseChildren: 2, extraProb: 0.40, baseLen: 1.8, spread: 0.8, maxLinks: 1200, growSpeed: 320 },
    }
    const CFG = PRESETS[density] || PRESETS.high

    const links = [] // edges: {a: startIndex, b: endIndex, len}
    const nodes = [] // node positions
    function grow(originIndex, dir, len, spread, depth){
      if (depth <= 0 || len < 0.12 || links.length >= CFG.maxLinks) return
      const jitter = new THREE.Vector3(
        (Math.random()-0.5) * spread,
        (Math.random()-0.2) * spread,
        (Math.random()-0.5) * spread
      )
      const origin = nodes[originIndex]
      const end = origin.clone().add(dir.clone().multiplyScalar(len)).add(jitter)
      const endIndex = nodes.push(end.clone()) - 1
      links.push({ a: originIndex, b: endIndex, len: origin.distanceTo(end) })
      // Children
      let children = CFG.baseChildren
      if (Math.random() < CFG.extraProb) children += 1
      for (let i=0;i<children;i++){
        const axis = new THREE.Vector3(Math.random(),Math.random(),Math.random()).normalize()
        const angle = (0.35 + Math.random()*0.6) * (Math.random() < 0.5 ? 1 : -1)
        const ndir = dir.clone().applyAxisAngle(axis, angle).normalize()
        grow(endIndex, ndir, len* (0.72 + Math.random()*0.14), spread*0.76, depth-1)
      }
    }

    const root = new THREE.Vector3(-0.6, -0.8, 0)
    const rootIndex = nodes.push(root.clone()) - 1
    const upward = new THREE.Vector3(0.4, 1.4, 0.2).normalize()
    grow(rootIndex, upward, CFG.baseLen, CFG.spread, CFG.depth)

    // Geometry for links (lines)
    const pos = new Float32Array(links.length * 2 * 3)
    // init with zero-length segments (both endpoints at start) for growth tween
    links.forEach((e, i) => {
      const a = nodes[e.a]
      pos[i*6+0] = a.x; pos[i*6+1] = a.y; pos[i*6+2] = a.z
      pos[i*6+3] = a.x; pos[i*6+4] = a.y; pos[i*6+5] = a.z
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

    // Determine a main growth path (spine): greedily follow longest child
    const childrenByNode = Array(nodes.length).fill(0).map(()=>[])
    links.forEach((e, idx)=>{ childrenByNode[e.a].push({ idx, len: e.len, next: e.b }) })
    const growthOrder = []
    let cur = rootIndex
    while (childrenByNode[cur] && childrenByNode[cur].length){
      const next = childrenByNode[cur].reduce((a,b)=> a.len>=b.len ? a : b)
      growthOrder.push(next.idx)
      cur = next.next
    }
    for (let i=0;i<links.length;i++) if (!growthOrder.includes(i)) growthOrder.push(i)

    function fit(){
      const w = canvas.clientWidth || 560
      const h = canvas.clientHeight || 400
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    fit()

    // Growth animation state
    const totalSegments = links.length
    let grownSegments = 0 // side-branch reveal counter
    let activeIndex = 0 // current edge in growthOrder
    let segT = 0 // progress inside current edge
    const appear = new Float32Array(count).fill(0) // per-node appear progress (0..1)
    // start with nothing visible
    lineGeo.setDrawRange(0, 0)
    pointsGeo.setDrawRange(0, 0)

    // Glowing head following growth tip
    const headMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent:true, opacity:0.9 })
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), headMat)
    scene.add(head)

    let last = performance.now()
    let running = true
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - last)/1000
      last = now
      if (!reduced){
        if (activeIndex < growthOrder.length){
          const edgeIdx = growthOrder[activeIndex]
          const e = links[edgeIdx]
          const a = nodes[e.a]
          const b = nodes[e.b]
          // advance within this edge
          const speed = CFG.growSpeed / 420
          segT = Math.min(1, segT + speed)
          const cx = a.x + (b.x - a.x) * segT
          const cy = a.y + (b.y - a.y) * segT
          const cz = a.z + (b.z - a.z) * segT
          const p = lineGeo.attributes.position
          // keep start at a, move end from a->b
          p.setXYZ(edgeIdx*2+1, cx, cy, cz)
          p.needsUpdate = true
          lineGeo.setDrawRange(0, activeIndex*2 + 2)
          head.position.set(cx, cy, cz)
          appear[e.b] += (1 - appear[e.b]) * Math.min(1, dt * 6)

          if (segT >= 1){
            // snap to b and move to next edge
            p.setXYZ(edgeIdx*2+1, b.x, b.y, b.z)
            p.needsUpdate = true
            activeIndex += 1
            segT = 0
          }
        } else {
          // reveal remaining side branches gradually
          grownSegments = Math.min(totalSegments, grownSegments + CFG.growSpeed * dt * 0.6)
          const visSegs = Math.floor(grownSegments)
          lineGeo.setDrawRange(0, Math.max(lineGeo.drawRange.count, visSegs * 2))
          const visNodes = Math.min(count, visSegs + 1)
          pointsGeo.setDrawRange(0, visNodes)
        }

        // Update node scales with pulse
        for (let i=0;i<count;i++){
          const phase = phases[i]
          const pulse = 0.85 + Math.sin(now*0.003 + phase) * 0.15
          const s = pulse * appear[i]
          dummy.position.copy(nodes[i])
          dummy.scale.setScalar(s)
          dummy.updateMatrix()
          inst.setMatrixAt(i, dummy.matrix)
        }
        inst.instanceMatrix.needsUpdate = true

        // Slow idle rotation
        group.rotation.y += dt * 0.06
      } else {
        // Reduced motion: show all instantly
        lineGeo.setDrawRange(0, totalSegments * 2)
        pointsGeo.setDrawRange(0, count)
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
