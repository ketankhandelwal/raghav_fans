import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-main', {
        scale: 1.08, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-imgs', start: 'top 82%' }
      })
      gsap.from('.about-accent', {
        x: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: '.about-imgs', start: 'top 82%' }
      })
      gsap.from('.about-badge', {
        scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.5,
        scrollTrigger: { trigger: '.about-imgs', start: 'top 82%' }
      })
      gsap.from('.about-text > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Images */}
          <div className="about-imgs">
            <img
              className="about-main"
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop"
              alt="Raghav Fans store"
            />
            <img
              className="about-accent"
              src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80&auto=format&fit=crop"
              alt="Home with fan"
            />
            <div className="about-badge">
              <strong>20+</strong>
              <span>Years of Trust</span>
            </div>
          </div>

          {/* Text */}
          <div className="about-text">
            <p className="section-tag">About Us</p>
            <h2>Your Trusted Home<br /><em>Comfort Partner</em></h2>
            <p>
              RaghavFans started with a simple belief — every home deserves quality.
              Since 2003, we have been serving families across the city with premium
              electrical appliances, honest advice and unmatched after-sales support.
            </p>
            <p>
              We don't just sell products — we help you build a comfortable, energy-efficient
              home. Walk into our store and you'll find knowledgeable staff, transparent
              pricing and a hand-curated selection from India's top brands.
            </p>

            <div className="about-checks">
              {[
                'ISI & BEE Certified Products',
                'Free Home Delivery',
                'Expert Installation Service',
                'Full Warranty Support',
                'EMI Options Available',
                '1000+ 5-Star Reviews',
              ].map(item => (
                <div key={item} className="check-row">
                  <span className="chk">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-dark">
              Visit Our Store <span className="arrow-circle">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
