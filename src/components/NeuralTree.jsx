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
      low:    { edgesCap: 800,  nodesCap: 900,  segSpeed: 1.0,  lenMin: 0.28, lenMax: 0.70, spread: 0.70, radius: 4.6, maxDepth: 5, lenFactor: 0.72, branchAngle: 0.6, trunkBias: 0.9, sideProb: 0.35 },
      medium: { edgesCap: 1200, nodesCap: 1400, segSpeed: 1.15, lenMin: 0.32, lenMax: 0.85, spread: 0.75, radius: 5.0, maxDepth: 6, lenFactor: 0.74, branchAngle: 0.7, trunkBias: 0.9, sideProb: 0.45 },
      high:   { edgesCap: 1600, nodesCap: 1800, segSpeed: 1.3,  lenMin: 0.36, lenMax: 0.95, spread: 0.90, radius: 5.4, maxDepth: 7, lenFactor: 0.76, branchAngle: 0.8, trunkBias: 0.9, sideProb: 0.55 },
      ultra:  { edgesCap: 2200, nodesCap: 2400, segSpeed: 1.45, lenMin: 0.40, lenMax: 1.05, spread: 1.05, radius: 6.0, maxDepth: 8, lenFactor: 0.78, branchAngle: 0.9, trunkBias: 0.92, sideProb: 0.6 },
    }
    const CFG = PRESETS[density] || PRESETS.medium

    // Group wrapper for gentle rotation
    const group = new THREE.Group()
    // Slightly lower the whole composition within the canvas
    scene.add(group)
    group.position.y -= 0.18

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
    const nodeTimes = new Float32Array(CFG.nodesCap)
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
    const growing = [] // {slot, ax,ay,az, bx,by,bz, t, depth, dirx,diry,dirz, len}
    const slotGrowing = new Uint8Array(CFG.edgesCap) // 1 while growing
    const edgeStore = new Array(CFG.edgesCap) // {ax,ay,az,bx,by,bz,t0}
    

    // Seed with a root and initial trunk segment
    const root = new THREE.Vector3(-0.6, -0.8, 0)
    pPos[0] = root.x; pPos[1] = root.y; pPos[2] = root.z
    pointsGeo.attributes.position.needsUpdate = true
    nodeDraw = Math.min(nodeDraw+1, CFG.nodesCap)
    dummy.position.copy(root); dummy.scale.setScalar(0.001); dummy.updateMatrix(); inst.setMatrixAt(nodeWrite, dummy.matrix)
    inst.instanceMatrix.needsUpdate = true
    appear[nodeWrite] = 1
    nodeWrite = (nodeWrite + 1) % CFG.nodesCap

    // Helpers
    function randomDir(base){
      // Stronger upward bias; spread increases with height to mimic tree crown
      const up = new THREE.Vector3(0.12, 1.0, 0.06).normalize()
      const axis = new THREE.Vector3(Math.random(),Math.random(),Math.random()).normalize()
      const heightFactor = Math.min(1, ((base?.y ?? 0) + 1.2) / 2.2) // ~0 at bottom -> ~1 near top
      const localSpread = CFG.spread * (0.35 + 0.65 * heightFactor)
      const angle = (Math.random()*2-1) * localSpread
      return up.clone().applyAxisAngle(axis, angle).normalize()
    }
    function clampToRadius(v){
      const r = CFG.radius
      if (v.length() > r){ v.setLength(r) }
      return v
    }
    const EDGE_TTL = 12.0
    const EDGE_FADE = 4.0
    const NODE_TTL = 14.0
    const NODE_FADE = 5.0

    function enqueueSegment(aVec, dir, len, depth){
      if (edgeDraw >= CFG.edgesCap * 2) return null
      const a = clampToRadius(aVec.clone())
      const b = clampToRadius(a.clone().add(dir.clone().multiplyScalar(len)))
      const slot = edgeWrite
      pos[slot*6+0] = a.x; pos[slot*6+1] = a.y; pos[slot*6+2] = a.z
      pos[slot*6+3] = a.x; pos[slot*6+4] = a.y; pos[slot*6+5] = a.z
      lineGeo.attributes.position.needsUpdate = true
      edgeWrite = (edgeWrite + 1) % CFG.edgesCap
      edgeDraw = Math.min(edgeDraw + 2, CFG.edgesCap * 2)
      lineGeo.setDrawRange(0, edgeDraw)
      growing.push({ slot, ax:a.x, ay:a.y, az:a.z, bx:b.x, by:b.y, bz:b.z, t:0, depth, dirx:dir.x, diry:dir.y, dirz:dir.z, len })
      slotGrowing[slot] = 1
      edgeStore[slot] = { ax:a.x, ay:a.y, az:a.z, bx:b.x, by:b.y, bz:b.z, t0: performance.now()/1000 }

      // endpoint node
      const nSlot = nodeWrite
      pPos[nSlot*3+0] = b.x; pPos[nSlot*3+1] = b.y; pPos[nSlot*3+2] = b.z
      pointsGeo.attributes.position.needsUpdate = true
      nodeWrite = (nodeWrite + 1) % CFG.nodesCap
      nodeDraw = Math.min(nodeDraw + 1, CFG.nodesCap)
      appear[nSlot] = 0
      nodeTimes[nSlot] = performance.now()/1000
      dummy.position.set(b.x, b.y, b.z); dummy.scale.setScalar(0.001); dummy.updateMatrix(); inst.setMatrixAt(nSlot, dummy.matrix)
      inst.instanceMatrix.needsUpdate = true
      return { b, dir }
    }

    function spawnChildren(seg){
      if (seg.depth <= 0) return
      const a = new THREE.Vector3(seg.bx, seg.by, seg.bz)
      const dir = new THREE.Vector3(seg.dirx, seg.diry, seg.dirz)
      const nextLen = seg.len * CFG.lenFactor
      // trunk continuation
      if (Math.random() < CFG.trunkBias){
        const trunkDir = dir.clone().add(new THREE.Vector3(0, 0.25, 0)).normalize()
        enqueueSegment(a, trunkDir, nextLen, seg.depth - 1)
      }
      // limited side branches to keep tree-like look
      let sideCount = Math.random() < CFG.sideProb ? 2 : 1
      sideCount = Math.min(sideCount, 2)
      const axis1 = new THREE.Vector3(0,1,0).cross(dir).normalize().lengthSq() === 0 ? new THREE.Vector3(1,0,0) : new THREE.Vector3(0,1,0).cross(dir).normalize()
      const axis2 = dir.clone().cross(axis1).normalize()
      for (let i=0;i<sideCount;i++){
        const sign = i % 2 === 0 ? 1 : -1
        const rot = CFG.branchAngle * (0.85 + Math.random()*0.3) * sign
        const yaw = (Math.PI * (1 + Math.sqrt(5))) * (i+1)
        const sideDir = dir.clone()
          .applyAxisAngle(axis1, rot)
          .applyAxisAngle(axis2, Math.sin(yaw)*0.2)
          .normalize()
        enqueueSegment(a, sideDir, nextLen * (0.9 + Math.random()*0.2), seg.depth - 1)
      }
    }

    function fit(){
      const w = canvas.clientWidth || 560
      const h = canvas.clientHeight || 400
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    // Kick off initial trunk
    const initialDir = randomDir(root)
    enqueueSegment(root, initialDir, THREE.MathUtils.lerp(CFG.lenMin, CFG.lenMax, 0.8), CFG.maxDepth)
    fit()

    let last = performance.now()
    let running = true
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - last)/1000
      last = now

      if (!reduced){
        // advance growth
        for (let i=growing.length-1; i>=0; i--){
          const g = growing[i]
          g.t = Math.min(1, g.t + dt * CFG.segSpeed)
          const cx = g.ax + (g.bx - g.ax) * g.t
          const cy = g.ay + (g.by - g.ay) * g.t
          const cz = g.az + (g.bz - g.az) * g.t
          pos[g.slot*6+3] = cx; pos[g.slot*6+4] = cy; pos[g.slot*6+5] = cz
          if (g.t >= 1){ slotGrowing[g.slot] = 0; const finished = growing.splice(i,1)[0]; spawnChildren(finished) }
        }
        lineGeo.attributes.position.needsUpdate = true

        // Fade out oldest edges over time
        const nowSec = now/1000
        for (let s=0; s<CFG.edgesCap; s++){
          const st = edgeStore[s]
          if (!st || slotGrowing[s]) continue
          const age = nowSec - st.t0
          if (age > EDGE_TTL){
            const f = Math.min(1, (age - EDGE_TTL)/EDGE_FADE)
            // shrink end towards start
            pos[s*6+3] = st.bx + (st.ax - st.bx) * f
            pos[s*6+4] = st.by + (st.ay - st.by) * f
            pos[s*6+5] = st.bz + (st.az - st.bz) * f
          }
        }
        lineGeo.attributes.position.needsUpdate = true

        // nodes scaling + pulse
        for (let i=0;i<nodeDraw;i++){
          const age = (now/1000) - (nodeTimes[i] || 0)
          const target = age > NODE_TTL ? 0 : 1
          appear[i] += (target - appear[i]) * Math.min(1, dt * (target ? 4 : (1/NODE_FADE)*4))
          const pulse = 0.85 + Math.sin(now*0.003 + phases[i]) * 0.15
          const s = pulse * appear[i]
          dummy.position.set(pPos[i*3+0], pPos[i*3+1], pPos[i*3+2])
          dummy.scale.setScalar(s)
          dummy.updateMatrix()
          inst.setMatrixAt(i, dummy.matrix)
        }
        inst.instanceMatrix.needsUpdate = true

        group.rotation.y += dt * 0.04
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
