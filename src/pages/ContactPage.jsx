import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ap-hero-content > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.5,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="site-wrap">
      <Navbar noLoader />

      {/* Hero */}
      <section className="page-hero page-hero--contact">
        <div className="ph-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop)' }} />
        <div className="ph-overlay" />
        <div className="container">
          <div className="ap-hero-content">
            <p className="section-tag light">Get In Touch</p>
            <h1>We're Here to<br /><em>Help You</em></h1>
            <p>Drop by our store, call us or send a message. Our team is ready to help you find the perfect product for your home and budget.</p>
          </div>
        </div>
      </section>

      {/* Contact details + form */}
      <Contact />

      {/* FAQ */}
      <FAQ />

      <Footer />
    </div>
  )
}
