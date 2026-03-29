import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    text: "I've been buying fans from RaghavFans for over 10 years. The quality is always top-notch and the staff really knows their products. Never been disappointed.",
    name: 'Anita Sharma',
    role: 'Homemaker, Delhi',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    text: 'Bought a geyser and a ceiling fan last winter. Both work perfectly. The installation team was punctual and professional. Will definitely recommend.',
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    text: 'The mixer I got from here is still running strong after 5 years. Great price, genuine product and no nonsense. This is how a shop should be run.',
    name: 'Priya Verma',
    role: 'Working Professional',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&facepad=2',
  },
  {
    text: 'Visited for a room heater and ended up replacing my old iron too. Very helpful guidance, no pressure selling. Their after-sales service is exceptional.',
    name: 'Vikram Singh',
    role: 'Teacher',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop&facepad=2',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const headerItems = section.querySelectorAll('.test-header > *')
    const cards = section.querySelectorAll('.test-card')
    const headerTrigger = section.querySelector('.test-header')
    const gridTrigger = section.querySelector('.test-grid')

    // Set initial hidden state explicitly
    gsap.set(headerItems, { y: 35, opacity: 0 })
    gsap.set(cards, { y: 50, opacity: 0 })

    const tl1 = gsap.to(headerItems, {
      y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: headerTrigger, start: 'top 88%', once: true },
    })

    const tl2 = gsap.to(cards, {
      y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: gridTrigger, start: 'top 88%', once: true },
    })

    return () => {
      tl1.scrollTrigger?.kill()
      tl2.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="test-header">
          <div>
            <p className="section-tag">Testimonials</p>
            <h2>Words from the<br /><em>Heart</em></h2>
          </div>
          <p>Every story shared here is a reflection of trust built over two decades of honest service.</p>
        </div>

        <div className="test-grid">
          {reviews.map((r) => (
            <div key={r.name} className="test-card">
              <span className="q-mark">"</span>
              <div className="stars">★★★★★</div>
              <p className="test-text">{r.text}</p>
              <div className="test-author">
                <img src={r.img} alt={r.name} />
                <div className="auth-info">
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
