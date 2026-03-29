import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '🌀',
    title: 'Ceiling Fans',
    desc: 'High-performance ceiling fans with silent motors, wide blade spans and elegant finishes for every room size.',
    link: 'View Range',
  },
  {
    icon: '🔥',
    title: 'Room Heaters',
    desc: 'Efficient quartz and convector heaters that warm your space fast while keeping energy bills low.',
    link: 'View Range',
  },
  {
    icon: '🧲',
    title: 'Electric Irons',
    desc: 'Lightweight steam irons with precision temperature control for perfectly pressed clothes every time.',
    link: 'View Range',
  },
  {
    icon: '🥣',
    title: 'Mixer Grinders',
    desc: 'Powerful 500W–1000W mixers for grinding, blending and juicing — built for Indian kitchens.',
    link: 'View Range',
  },
  {
    icon: '💧',
    title: 'Water Heaters',
    desc: 'Instant and storage geysers with advanced safety cutoff and anti-rust tanks for long life.',
    link: 'View Range',
  },
  {
    icon: '💨',
    title: 'Pedestal Fans',
    desc: 'Adjustable height pedestal fans with 3-speed settings and 360° oscillation for total coverage.',
    link: 'View Range',
  },
]

export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const headerItems = section.querySelectorAll('.features-header > *')
    const cards = section.querySelectorAll('.feature-card')
    const headerTrigger = section.querySelector('.features-header')
    const gridTrigger = section.querySelector('.features-grid')

    // Set initial hidden state explicitly
    gsap.set(headerItems, { y: 40, opacity: 0 })
    gsap.set(cards, { y: 60, opacity: 0 })

    // Animate TO visible state when scrolled to — using direct DOM refs as triggers
    const tl1 = gsap.to(headerItems, {
      y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: headerTrigger, start: 'top 88%', once: true },
    })

    const tl2 = gsap.to(cards, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: gridTrigger, start: 'top 88%', once: true },
    })

    return () => {
      tl1.scrollTrigger?.kill()
      tl2.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section className="features" ref={sectionRef}>
      <div className="container">
        <div className="features-header">
          <p className="section-tag centered">What We Offer</p>
          <h2>Everything Your Home<br /><em>Needs to Thrive</em></h2>
          <p style={{ marginTop: '1rem' }}>
            From whisper-quiet ceiling fans to powerful kitchen appliances — we stock only
            the best brands with full warranty and after-sales support.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feat-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
              <span className="feat-link">{f.link} →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
