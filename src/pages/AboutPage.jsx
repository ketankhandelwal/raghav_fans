import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Stats from '../components/Stats'
import OurStory from '../components/OurStory'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const checks = [
  'ISI & BEE Certified Products',
  'Free Home Delivery',
  'Expert Installation Service',
  'Full Warranty Support',
  'EMI Options Available',
  '1000+ 5-Star Reviews',
]

const team = [
  { name: 'Raghav Sharma', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop&facepad=3', bio: 'Started RaghavFans with a belief that every home deserves quality appliances.' },
  { name: 'Priya Sharma', role: 'Operations Head', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&auto=format&fit=crop&facepad=3', bio: 'Ensures every customer interaction is smooth and every order is fulfilled on time.' },
  { name: 'Vikram Gupta', role: 'Service Manager', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop&facepad=3', bio: 'Leads our in-house service team with over 15 years of appliance repair experience.' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const storyRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ap-hero-content > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.5,
      })
      gsap.from('.ap-about-img', {
        scale: 1.06, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-about-grid', start: 'top 82%', once: true },
      })
      gsap.from('.ap-about-text > *', {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-about-text', start: 'top 82%', once: true },
      })
      gsap.from('.ap-team-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-team-grid', start: 'top 82%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="site-wrap">
      <Navbar noLoader />

      {/* Hero */}
      <section className="page-hero" ref={heroRef}>
        <div className="ph-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop)' }} />
        <div className="ph-overlay" />
        <div className="container">
          <div className="ap-hero-content">
            <p className="section-tag light">About RaghavFans</p>
            <h1>Two Decades of<br /><em>Trusted Service</em></h1>
            <p>Since 2003, we have been serving families across the city with premium electrical appliances, honest advice and unmatched after-sales support.</p>
          </div>
        </div>
      </section>

      {/* About grid */}
      <section className="ap-about">
        <div className="container">
          <div className="ap-about-grid">
            <div className="ap-about-imgs">
              <img
                className="ap-about-img ap-main"
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop"
                alt="RaghavFans Store"
              />
              <img
                className="ap-about-img ap-accent"
                src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80&auto=format&fit=crop"
                alt="Happy customers"
              />
              <div className="about-badge">
                <strong>20+</strong>
                <span>Years of Trust</span>
              </div>
            </div>

            <div className="ap-about-text">
              <p className="section-tag">Our Story</p>
              <h2>Your Trusted Home<br /><em>Comfort Partner</em></h2>
              <p>
                RaghavFans started with a simple belief — every home deserves quality.
                Since 2003, we have been serving families with premium electrical appliances,
                honest advice and unmatched after-sales support.
              </p>
              <p>
                We don't just sell products — we help you build a comfortable, energy-efficient
                home. Walk into our store and you'll find knowledgeable staff, transparent
                pricing and a hand-curated selection from India's top brands.
              </p>
              <div className="about-checks">
                {checks.map(item => (
                  <div key={item} className="check-row">
                    <span className="chk">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Team */}
      <section className="ap-team">
        <div className="container">
          <div className="ap-team-hdr">
            <p className="section-tag centered">The People Behind It</p>
            <h2 style={{ textAlign: 'center' }}>Meet Our<br /><em>Team</em></h2>
          </div>
          <div className="ap-team-grid">
            {team.map(m => (
              <div key={m.name} className="ap-team-card">
                <div className="apt-img">
                  <img src={m.img} alt={m.name} />
                </div>
                <div className="apt-info">
                  <h4>{m.name}</h4>
                  <span className="apt-role">{m.role}</span>
                  <p>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story timeline */}
      <OurStory />

      {/* CTA */}
      <CTABanner />

      <Footer />
    </div>
  )
}
