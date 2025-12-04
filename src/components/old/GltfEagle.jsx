import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import SoaringBird from './SoaringBird.jsx'

export default function GltfEagle({ src = '/models/eagle.glb' }){
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = prefersReduced.matches
    const onPref = () => { reduced = prefersReduced.matches }
    prefersReduced.addEventListener?.('change', onPref)

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, canvas: canvasRef.current })
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

    const group = new THREE.Group()
    scene.add(group)

    let mixer = null
    let modelLoaded = false

    const loader = new GLTFLoader()
    loader.load(
      src,
      (gltf) => {
        const obj = gltf.scene || gltf.scenes?.[0]
        if (!obj){ setFailed(true); return }
        // Normalize: center and scale to fit viewport
        const box = new THREE.Box3().setFromObject(obj)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        obj.position.sub(center)
        const target = 3.2 // desired half-size
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = maxDim > 0 ? (target / maxDim) : 1
        obj.scale.setScalar(scale)
        group.add(obj)

        // Optional wireframe edges overlay for clarity
        const ACCENT = new THREE.Color('#22D1DC')
        const lineMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent:true, opacity:0.65, blending: THREE.AdditiveBlending })
        obj.traverse((child) => {
          if (child.isMesh && child.geometry){
            try{
              const edges = new THREE.EdgesGeometry(child.geometry)
              const lines = new THREE.LineSegments(edges, lineMat)
              lines.position.copy(child.position)
              lines.rotation.copy(child.rotation)
              lines.scale.copy(child.scale)
              child.add(lines)
            } catch {}
          }
        })

        // Play first animation if present (bird flap)
        if (gltf.animations && gltf.animations.length){
          mixer = new THREE.AnimationMixer(obj)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }
        modelLoaded = true
      },
      undefined,
      (err) => {
        console.warn('GLTF load failed', err)
        setFailed(true)
      }
    )

    function fit(){
      const w = canvasRef.current.clientWidth || 560
      const h = canvasRef.current.clientHeight || 400
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
        if (mixer){ mixer.update(dt) }
        // Subtle idle motion if model has no animation
        if (!mixer && modelLoaded){
          group.rotation.y += dt * 0.06
          group.position.y = Math.sin(now*0.002)*0.05
        }
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
  }, [src])

  if (failed) return <SoaringBird />
  return (
    <div ref={wrapRef} className="eagle-overlay">
      <canvas ref={canvasRef} className="eagle-canvas" />
    </div>
  )
}

