import { useEffect } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import ProductTabs from '../components/ProductTabs'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

export default function ProductsPage() {
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
      <section className="page-hero page-hero--products">
        <div className="ph-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop)' }} />
        <div className="ph-overlay" />
        <div className="container">
          <div className="ap-hero-content">
            <p className="section-tag light">Our Catalogue</p>
            <h1>500+ Products<br /><em>All Under One Roof</em></h1>
            <p>ISI-certified. Warranty-backed. Priced honestly. Browse our complete range of home electrical appliances.</p>
          </div>
        </div>
      </section>

      {/* Tabbed product catalogue */}
      <ProductTabs />

      {/* CTA */}
      <CTABanner />

      <Footer />
    </div>
  )
}
