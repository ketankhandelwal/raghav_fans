import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import Stats from './components/Stats'
import About from './components/About'
import Products from './components/Products'
import ProductTabs from './components/ProductTabs'
import OurStory from './components/OurStory'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductsPage from './pages/ProductsPage'

gsap.registerPlugin(ScrollTrigger)

function HomePage({ showTop, onScrollTop }) {
  return (
    <div className="site-wrap">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Stats />
      <About />
      <Products />
      <ProductTabs />
      <OurStory />
      <Testimonials />
      <CTABanner />
      <FAQ />
      <Contact />
      <Footer />
      <button
        className={`scroll-top-btn ${showTop ? 'show' : ''}`}
        onClick={onScrollTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [showTop, setShowTop] = useState(false)
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)

  // Page Loader
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to('.loader', {
        opacity: 0, duration: 0.6, ease: 'power2.inOut',
        onComplete: () => {
          setLoading(false)
          // Refresh once after mount, and again after all assets load
          setTimeout(() => ScrollTrigger.refresh(), 300)
          setTimeout(() => ScrollTrigger.refresh(), 800)
        },
      })
    }, 2000)

    // Also refresh when all page assets (images, canvas) are done loading
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // Custom Cursor
  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      gsap.to(dot, { x: mx, y: my, duration: 0.08 })
    }

    const animate = () => {
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      gsap.set(ring, { x: rx, y: ry })
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    const interactives = document.querySelectorAll('a, button, .feature-card, .prod-item, .test-card, .pt-card')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(ring, { scale: 1.8, opacity: 0.8, duration: 0.3 })
        gsap.to(dot, { scale: 0, duration: 0.3 })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 })
        gsap.to(dot, { scale: 1, duration: 0.3 })
      })
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [loading])

  // Scroll to top button
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <BrowserRouter>
      {/* Loader — only shown on first load */}
      {loading && (
        <div className="loader">
          <div className="loader-logo">Raghav<em>Fans</em></div>
          <div className="loader-bar-track">
            <div className="loader-bar" />
          </div>
        </div>
      )}

      {/* Custom Cursor */}
      <div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{ position: 'fixed', top: 0, left: 0, width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)' }}
      />
      <div
        ref={cursorRingRef}
        className="cursor-ring"
        style={{ position: 'fixed', top: 0, left: 0, width: 40, height: 40, border: '1.5px solid var(--accent)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)', opacity: 0.5 }}
      />

      {!loading && (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                showTop={showTop}
                onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}
