import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export default function Navbar({ noLoader }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Prevent flash: set hidden state before first paint, then animate in
  useLayoutEffect(() => {
    gsap.set(navRef.current, { y: -70, autoAlpha: 0 })
  }, [])

  useEffect(() => {
    gsap.to(navRef.current, {
      y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out',
      delay: noLoader ? 0.3 : 0.4,
    })
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [noLoader])

  const scrollTo = (id) => {
    setMobileOpen(false)
    if (isHome) {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/' + id
    }
  }

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="nav-logo">
              <span className="logo-bolt">⚡</span>
              Raghav<span className="accent">Fans</span>
            </Link>

            <div className="nav-links">
              <a href={isHome ? '#home' : '/#home'}>Home</a>
              <Link to="/products">Products</Link>
              <Link to="/about">About Us</Link>
              <a href={isHome ? '#our-story' : '/#our-story'}>Our Story</a>
              <Link to="/contact">Contact</Link>
            </div>

            <Link to="/contact" className="nav-cta">Get Quote</Link>

            <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        <a href={isHome ? '#home' : '/#home'} onClick={() => setMobileOpen(false)}>Home</a>
        <Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link>
        <Link to="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
        <a href={isHome ? '#our-story' : '/#our-story'} onClick={() => setMobileOpen(false)}>Our Story</a>
        <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
      </div>
    </>
  )
}
