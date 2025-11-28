import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('bg-canvas');

if (canvas) {
    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = prefersReduced.matches;
    prefersReduced.addEventListener('change', () => { reduced = prefersReduced.matches; });

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0); // Transparent

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.6, 8);

    const group = new THREE.Group();
    scene.add(group);

    // Particle parameters
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;
    const BASE = 1280 * 720;
    const norm = Math.max(0.6, Math.min(2.5, (WIDTH * HEIGHT) / BASE));
    const COUNT = Math.floor(2800 * Math.sqrt(norm));
    const RADIUS = 3.6;
    const FREQ = 0.35;
    const FLOW = 1.6;
    const LERP = 0.08;

    // Geometry
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const speed = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        // Random point in sphere
        let x = (Math.random() * 2 - 1);
        let y = (Math.random() * 2 - 1);
        let z = (Math.random() * 2 - 1);
        const len = Math.sqrt(x * x + y * y + z * z) || 1;
        x = (x / len) * Math.cbrt(Math.random()) * RADIUS;
        y = (y / len) * Math.cbrt(Math.random()) * (RADIUS * 0.65);
        z = (z / len) * Math.cbrt(Math.random()) * RADIUS;

        positions[ix] = x;
        positions[ix + 1] = y;
        positions[ix + 2] = z;

        velocities[ix] = 0;
        velocities[ix + 1] = 0;
        velocities[ix + 2] = 0;

        speed[i] = 0.6 + Math.random() * 0.8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: new THREE.Color('#0f172a'), // Dark blue (Theme Primary)
        size: 0.06,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.4, // Slightly lower opacity for subtle effect with dark color
        blending: THREE.NormalBlending, // Normal blending for dark particles on light background
        depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    // Hash & Noise functions
    function hash(x, y, z) {
        let h = x * 374761393 + y * 668265263 + z * 2147483647;
        h = (h ^ (h >> 13)) >>> 0;
        return (h & 0xffffff) / 0xffffff;
    }

    function noise3(x, y, z) {
        const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
        const xf = x - xi, yf = y - yi, zf = z - zi;
        let n = 0;
        for (let dx = 0; dx <= 1; dx++) {
            for (let dy = 0; dy <= 1; dy++) {
                for (let dz = 0; dz <= 1; dz++) {
                    const w = ((dx ? xf : 1 - xf) * (dy ? yf : 1 - yf) * (dz ? zf : 1 - zf));
                    n += hash(xi + dx, yi + dy, zi + dz) * w;
                }
            }
        }
        return n;
    }

    function flow(x, y, z, t) {
        const nx = noise3(x * FREQ + 13 + t, y * FREQ, z * FREQ) - 0.5;
        const ny = noise3(x * FREQ, y * FREQ + 37 + t * 0.8, z * FREQ) - 0.5;
        const nz = noise3(x * FREQ, y * FREQ, z * FREQ + 71 - t * 0.6) - 0.5;

        const vx = nx * 1.3 + -z * 0.06;
        const vy = ny * 0.8 + (0.02);
        const vz = nz * 1.3 + x * 0.06;

        const len = Math.hypot(vx, vy, vz) || 1;
        return [vx / len, vy / len, vz / len];
    }

    function resize() {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT, false);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    let last = performance.now();

    function loop() {
        requestAnimationFrame(loop);

        const now = performance.now();
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;

        // If reduced motion is enabled, skip the animation logic and just render static or very slow
        if (reduced) {
            renderer.render(scene, camera);
            return;
        }

        const t = now / 1000;

        for (let i = 0; i < COUNT; i++) {
            const ix = i * 3;
            let x = positions[ix], y = positions[ix + 1], z = positions[ix + 2];

            const dir = flow(x, y, z, t);

            velocities[ix] += (dir[0] * speed[i] - velocities[ix]) * LERP;
            velocities[ix + 1] += (dir[1] * speed[i] - velocities[ix + 1]) * LERP;
            velocities[ix + 2] += (dir[2] * speed[i] - velocities[ix + 2]) * LERP;

            x += velocities[ix] * FLOW * dt;
            y += velocities[ix + 1] * FLOW * dt;
            z += velocities[ix + 2] * FLOW * dt;

            // Soft wrap bounds
            const r = Math.hypot(x, z);
            if (r > RADIUS) {
                const ang = Math.atan2(z, x) + Math.PI;
                const rr = RADIUS * 0.98;
                x = Math.cos(ang) * rr;
                z = Math.sin(ang) * rr;
            }
            if (y > RADIUS * 0.7) y = -RADIUS * 0.7;
            if (y < -RADIUS * 0.7) y = RADIUS * 0.7;

            positions[ix] = x;
            positions[ix + 1] = y;
            positions[ix + 2] = z;
        }

        geometry.attributes.position.needsUpdate = true;
        group.rotation.y += dt * 0.12;

        renderer.render(scene, camera);
    }

    loop();
}
