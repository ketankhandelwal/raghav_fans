import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  {
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85&auto=format&fit=crop',
    label: 'Modern Living Rooms',
    sub: 'Where comfort meets elegance',
    tag: 'Inspiration',
  },
  {
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=85&auto=format&fit=crop',
    label: 'Smart Kitchens',
    sub: 'Powerful appliances, simple life',
    tag: 'Home Appliances',
  },
  {
    img: 'https://images.unsplash.com/photo-1560185127-6a8e7d5b7e8c?w=700&q=85&auto=format&fit=crop',
    label: 'Cool Bedrooms',
    sub: 'Sleep better, live better',
    tag: 'Ceiling Fans',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
    label: 'Premium Interiors',
    sub: 'Designed for the discerning home',
    tag: 'Lifestyle',
  },
  {
    img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&q=85&auto=format&fit=crop',
    label: 'Warm Winters',
    sub: 'Stay cozy with the right heater',
    tag: 'Room Heaters',
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&auto=format&fit=crop',
    label: 'Energy Efficiency',
    sub: 'BEE Star Rated · Save more',
    tag: 'Eco Friendly',
  },
]

export default function LifestyleGallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const headerItems = section.querySelectorAll('.lifestyle-header > *')
    const lsItems = section.querySelectorAll('.ls-item')

    gsap.set(headerItems, { y: 40, opacity: 0 })
    gsap.set(lsItems, { y: 50, opacity: 0, scale: 0.97 })

    const t1 = gsap.to(headerItems, {
      y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out',
      scrollTrigger: { trigger: section.querySelector('.lifestyle-header'), start: 'top 88%', once: true },
    })
    const t2 = gsap.to(lsItems, {
      y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: section.querySelector('.lifestyle-grid'), start: 'top 88%', once: true },
    })

    return () => { t1.scrollTrigger?.kill(); t2.scrollTrigger?.kill() }
  }, [])

  return (
    <section className="lifestyle" ref={sectionRef}>
      <div className="container">
        <div className="lifestyle-header">
          <p className="section-tag centered">Lifestyle</p>
          <h2>Built for Every<br /><em>Room in Your Home</em></h2>
          <p>
            See how our products transform living spaces — from kitchens to bedrooms,
            we bring comfort and style to every corner of your home.
          </p>
        </div>

        <div className="lifestyle-grid">
          {items.map((item) => (
            <div key={item.label} className="ls-item">
              <img src={item.img} alt={item.label} loading="lazy" />
              <span className="ls-tag">{item.tag}</span>
              <div className="ls-overlay">
                <div className="ls-label">{item.label}</div>
                <div className="ls-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
