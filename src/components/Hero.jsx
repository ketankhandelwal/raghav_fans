import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)
  const leftRef = useRef(null)

  useEffect(() => {
    // ── GSAP text reveals ──────────────────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.0 })
      tl.from('.hero-badge', { opacity: 0, y: 20, duration: .7, ease: 'power3.out' })
        .from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' }, '-=.3')
        .from('.hero-sub', { opacity: 0, y: 30, duration: .8, ease: 'power3.out' }, '-=.6')
        .from('.hero-btns', { opacity: 0, y: 20, duration: .7, ease: 'power3.out' }, '-=.5')
        .from('.hero-proof', { opacity: 0, y: 20, duration: .6, ease: 'power3.out' }, '-=.4')
        .from('.hero-float.f1', { opacity: 0, x: -30, duration: .7, ease: 'back.out(1.4)' }, '-=.3')
        .from('.hero-float.f2', { opacity: 0, x: 30, duration: .7, ease: 'back.out(1.4)' }, '-=.5')
    }, heroRef)

    // ── THREE.JS Ceiling Fan ───────────────────────────────────────
    const canvas = canvasRef.current
    const wrapper = canvas.parentElement
    const W = wrapper.clientWidth
    const H = wrapper.clientHeight

    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.set(0, 2.8, 5.5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Lights
    const ambient = new THREE.AmbientLight(0xfff5e6, 0.7)
    scene.add(ambient)

    const sun = new THREE.DirectionalLight(0xffd4a0, 2.2)
    sun.position.set(4, 6, 5)
    sun.castShadow = true
    scene.add(sun)

    const fill = new THREE.PointLight(0x4488ff, 0.6, 15)
    fill.position.set(-4, 2, -3)
    scene.add(fill)

    const rim = new THREE.PointLight(0xff8844, 0.5, 12)
    rim.position.set(3, -2, -2)
    scene.add(rim)

    // Materials
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xC8A96E, metalness: 0.92, roughness: 0.08 })
    const hubMat = new THREE.MeshStandardMaterial({ color: 0xB87333, metalness: 0.88, roughness: 0.12 })
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xD4A96A, metalness: 0.08, roughness: 0.72 })
    const bladeMat2 = new THREE.MeshStandardMaterial({ color: 0xC49A5A, metalness: 0.08, roughness: 0.75 })
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x3A2A1A, metalness: 0.5, roughness: 0.4 })

    // Fan group (whole fan)
    const fanGroup = new THREE.Group()

    // Ceiling plate / canopy
    const canopy = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.42, 0.12, 32), hubMat)
    canopy.position.y = 1.5
    fanGroup.add(canopy)

    // Downrod
    const downrod = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.2, 16), metalMat)
    downrod.position.y = 0.9
    fanGroup.add(downrod)

    // Motor housing
    const motorTop = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.45, 0.22, 32), hubMat)
    motorTop.position.y = 0.22
    fanGroup.add(motorTop)

    const motorMain = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.32, 32), hubMat)
    fanGroup.add(motorMain)

    const motorBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.18, 32), darkMat)
    motorBottom.position.y = -0.22
    fanGroup.add(motorBottom)

    // Light bowl
    const lightBowl = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55),
      new THREE.MeshStandardMaterial({ color: 0xFFFAF0, metalness: 0, roughness: 0, transparent: true, opacity: 0.88, side: THREE.BackSide })
    )
    lightBowl.position.y = -0.36
    lightBowl.rotation.x = Math.PI
    fanGroup.add(lightBowl)

    // Bulb glow
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xFFFDE7, emissive: 0xFFEE88, emissiveIntensity: 1.5, transparent: true, opacity: 0.9 })
    )
    bulb.position.y = -0.34
    fanGroup.add(bulb)

    // Point light from bulb
    const bulbLight = new THREE.PointLight(0xFFE5A0, 2.5, 4)
    bulbLight.position.y = -0.38
    fanGroup.add(bulbLight)

    // Blade group (only blades rotate)
    const bladeGroup = new THREE.Group()
    const NUM_BLADES = 5

    for (let i = 0; i < NUM_BLADES; i++) {
      const blade = new THREE.Group()

      // Arm bracket
      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.055, 0.1),
        metalMat
      )
      arm.position.x = 0.62
      blade.add(arm)

      // Blade paddle
      const shape = new THREE.Shape()
      shape.moveTo(0, -0.23)
      shape.lineTo(2.1, -0.26)
      shape.quadraticCurveTo(2.2, 0, 2.1, 0.26)
      shape.lineTo(0, 0.23)
      shape.closePath()

      const extrudeSettings = { depth: 0.032, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 3 }
      const paddleGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings)

      const paddle = new THREE.Mesh(paddleGeo, i % 2 === 0 ? bladeMat : bladeMat2)
      paddle.position.set(0.85, -0.016, -0.23)
      paddle.rotation.x = 0.06
      blade.add(paddle)

      blade.rotation.y = (i / NUM_BLADES) * Math.PI * 2
      blade.position.y = -0.04
      bladeGroup.add(blade)
    }

    fanGroup.add(bladeGroup)
    scene.add(fanGroup)
    fanGroup.position.y = -0.5

    // Resize handler
    const onResize = () => {
      const W2 = wrapper.clientWidth
      const H2 = wrapper.clientHeight
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
      renderer.setSize(W2, H2)
    }
    window.addEventListener('resize', onResize)

    // Scroll-speed fan
    let scrollVel = 0
    let lastScrollY = window.scrollY
    let baseSpeed = 0.018
    let raf

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY
      scrollVel = delta * 0.012
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Animate
    const animate = () => {
      raf = requestAnimationFrame(animate)
      scrollVel *= 0.92
      bladeGroup.rotation.y += baseSpeed + Math.abs(scrollVel)
      // Gentle sway
      fanGroup.rotation.z = Math.sin(Date.now() * 0.0005) * 0.012
      renderer.render(scene, camera)
    }
    animate()

    // GSAP scroll: tilt camera on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: self => {
        camera.position.y = 2.8 - self.progress * 1.2
        camera.lookAt(0, self.progress * -0.5, 0)
      }
    })

    return () => {
      ctx.revert()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      renderer.dispose()
    }
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-grid">
          {/* LEFT */}
          <div ref={leftRef}>
            <div className="hero-badge">
              <span className="badge-pulse" />
              Est. 2003 · Trusted Since 20+ Years
            </div>

            <h1 className="hero-title">
              Power Your Home<br />
              with <em>Confidence</em>
            </h1>

            <p className="hero-sub">
              Premium ceiling fans, heaters & home appliances — handpicked for quality,
              style and lasting performance. Your comfort is our craft.
            </p>

            <div className="hero-btns">
              <a href="#products" className="btn btn-dark">
                Explore Products <span className="arrow-circle">→</span>
              </a>
              <a href="#our-story" className="btn btn-outline">Our Story</a>
            </div>

            <div className="hero-proof">
              <div className="proof-avatars">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop" alt="Customer" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop" alt="Customer" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop" alt="Customer" />
              </div>
              <div className="proof-text">
                <strong>10,000+ Happy Customers</strong>
                <span>⭐⭐⭐⭐⭐ Rated 4.9/5 across the city</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Three.js Fan */}
          <div className="hero-right">
            <div className="fan-stage">
              <canvas ref={canvasRef} />
              <div className="fan-scroll-hint">
                <span className="spin-icon">🌀</span> Scroll to spin
              </div>
            </div>

            <div className="hero-float f1">
              <div className="float-icon g">🏠</div>
              <div className="float-info">
                <strong>500+ Products</strong>
                <span>In stock ready to ship</span>
              </div>
            </div>

            <div className="hero-float f2">
              <div className="float-icon o">⚡</div>
              <div className="float-info">
                <strong>Energy Efficient</strong>
                <span>BEE Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-bar" />
        Scroll
      </div>
    </section>
  )
}
