import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Mandelbulb fractal (raymarch) overlay using a ShaderMaterial
export default function FractalMandelbulb(){
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

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, canvas })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const geometry = new THREE.PlaneGeometry(2, 2)

    // Accent palette (turquoise/navy)
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      uAccent: { value: new THREE.Color('#22D1DC') },
      uBg: { value: new THREE.Color('#0B1B2B') },
      uQuality: { value: 1 },
    }

    const fragmentShader = `
      precision highp float;
      uniform float iTime;
      uniform vec3 iResolution;
      uniform vec3 uAccent;
      uniform vec3 uBg;
      uniform float uQuality;

      // Hash / noise helpers
      float hash11(float p){ p = fract(p*0.1031); p *= p + 33.33; p *= p + p; return fract(p); }

      // Mandelbulb distance estimator (power 8)
      float deMandelbulb(vec3 p){
        vec3 z = p;
        float dr = 1.0;
        float r = 0.0;
        const float power = 8.0;
        for (int i = 0; i < 12; i++){
          r = length(z);
          if (r > 2.1) break;
          // convert to polar
          float theta = acos(z.z / r);
          float phi = atan(z.y, z.x);
          dr = pow(r, power - 1.0) * power * dr + 1.0;
          float zr = pow(r, power);
          theta *= power;
          phi *= power;
          // scale and rotate the point
          z = zr * vec3(sin(theta)*cos(phi), sin(theta)*sin(phi), cos(theta));
          z += p;
        }
        return 0.5 * log(r) * r / dr;
      }

      vec3 estimateNormal(vec3 p){
        float e = 0.0015;
        vec2 h = vec2(1.0, -1.0) * e;
        return normalize(h.xyy*deMandelbulb(p + h.xyy) +
                         h.yyx*deMandelbulb(p + h.yyx) +
                         h.yxy*deMandelbulb(p + h.yxy) +
                         h.xxx*deMandelbulb(p + h.xxx));
      }

      vec3 palette(float t){
        // Smooth palette around accent → teal/white
        vec3 a = vec3(0.10, 0.18, 0.26);
        vec3 b = uAccent;
        vec3 c = vec3(0.9);
        return mix(mix(a, b, smoothstep(0.0, 0.6, t)), c, smoothstep(0.7, 1.0, t));
      }

      void main(){
        vec2 uv = (gl_FragCoord.xy / iResolution.xy) * 2.0 - 1.0;
        uv.x *= iResolution.x / iResolution.y;

        // Camera
        float t = iTime * (0.4 * uQuality);
        float rad = 3.0;
        vec3 ro = vec3(rad * cos(t*0.3), 1.2 + sin(t*0.2)*0.3, rad * sin(t*0.3));
        vec3 ta = vec3(0.0, 0.0, 0.0);
        vec3 ww = normalize(ta - ro);
        vec3 uu = normalize(cross(vec3(0.0,1.0,0.0), ww));
        vec3 vv = cross(ww, uu);
        float fov = 1.1;
        vec3 rd = normalize(uu*uv.x + vv*uv.y + ww*fov);

        // Raymarch
        float total = 0.0;
        float d;
        float ao = 1.0;
        int steps;
        for (int i=0; i<120; i++){
          vec3 p = ro + rd * total;
          d = deMandelbulb(p);
          total += d;
          steps = i;
          if (d < 0.001 || total > 20.0) break;
        }

        vec3 col = uBg;
        if (total < 20.0){
          vec3 p = ro + rd * total;
          vec3 n = estimateNormal(p);
          // simple lighting
          vec3 ldir = normalize(vec3(0.6, 0.9, 0.3));
          float diff = clamp(dot(n, ldir), 0.0, 1.0);
          float spec = pow(clamp(dot(reflect(-ldir, n), -rd), 0.0, 1.0), 32.0);
          float fog = exp(-0.08*total);
          float it = float(steps) / 120.0;
          vec3 base = palette(it);
          col = mix(uBg, base * (0.4 + 0.7*diff) + spec*0.25, fog);
        }

        // vignette
        float v = smoothstep(1.2, 0.2, length(uv));
        col *= v;
        gl_FragColor = vec4(col, 0.95);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader,
      vertexShader: `
        precision highp float;
        void main(){
          gl_Position = vec4(position, 1.0);
        }
      `,
      transparent: true,
    })

    const quad = new THREE.Mesh(geometry, material)
    scene.add(quad)

    function fit(){
      const w = canvas.clientWidth || 560
      const h = canvas.clientHeight || 400
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      uniforms.iResolution.value.set(w*dpr, h*dpr, 1)
      uniforms.uQuality.value = (dpr > 1.2 ? 0.9 : 1.0)
    }
    fit()

    let t0 = performance.now()
    let running = true
    const loop = () => {
      if (!running) return
      const now = performance.now()
      const dt = (now - t0) / 1000
      t0 = now
      if (!reduced){
        uniforms.iTime.value += dt
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
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={wrapRef} className="eagle-overlay">
      <canvas ref={canvasRef} className="eagle-canvas" />
    </div>
  )
}

