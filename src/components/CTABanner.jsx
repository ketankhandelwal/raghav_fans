import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner() {
  const bannerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-banner', start: 'top 80%' }
      })
      // Parallax on background image
      gsap.to('.cta-bg', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: '.cta-banner', start: 'top bottom', end: 'bottom top', scrub: true }
      })
    }, bannerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="cta-wrap" ref={bannerRef}>
      <div className="cta-banner">
        <div className="cta-inner">
          <img
            className="cta-bg"
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80&auto=format&fit=crop"
            alt="Modern living room"
          />
          <div className="cta-overlay" />
          <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div className="cta-content">
              <p className="section-tag">Ready to Upgrade?</p>
              <h2>Power Up Your<br />Home <em>Today</em></h2>
              <p>
                Visit our store or call us — our experts will help you find the perfect
                appliance for your home, budget and energy needs.
              </p>
              <div className="cta-btns">
                <a href="#contact" className="btn btn-white">
                  Contact Us <span className="arrow-circle" style={{ background: 'rgba(27,58,45,.1)' }}>→</span>
                </a>
                <a href="tel:+911234567890" className="btn btn-ghost">
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
