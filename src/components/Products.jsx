import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=85&auto=format&fit=crop',
    title: 'Ceiling Fans',
    sub: 'Silent · Decorative · Energy Saving',
    tag: 'Best Seller',
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&auto=format&fit=crop',
    title: 'Room Heaters',
    sub: 'Quartz · Convector · Oil Filled',
    tag: 'New Arrival',
  },
  {
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85&auto=format&fit=crop',
    title: 'Mixer Grinders',
    sub: '500W – 1000W · Multiple Jars',
    tag: 'Top Rated',
  },
  {
    img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=700&q=85&auto=format&fit=crop',
    title: 'Water Heaters',
    sub: 'Instant · Storage · Solar Ready',
    tag: 'Popular',
  },
  {
    img: 'https://images.unsplash.com/photo-1590418606746-018840f9edd6?w=600&q=85&auto=format&fit=crop',
    title: 'Pedestal Fans',
    sub: '3-Speed · Oscillating · Portable',
    tag: 'Summer Pick',
  },
]

export default function Products() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.products-top > *', {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.products-top', start: 'top 82%' }
      })
      gsap.from('.prod-item', {
        y: 50, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.prod-mosaic', start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="products" className="products" ref={sectionRef}>
      <div className="container">
        <div className="products-top">
          <div>
            <p className="section-tag">Our Products</p>
            <h2>Explore Our<br /><em>Full Collection</em></h2>
          </div>
          <a href="#contact" className="btn btn-outline">
            View All Products →
          </a>
        </div>

        <div className="prod-mosaic">
          {products.map((p) => (
            <div key={p.title} className="prod-item">
              <img src={p.img} alt={p.title} loading="lazy" />
              <span className="prod-chip">{p.tag}</span>
              <div className="prod-overlay">
                <h4>{p.title}</h4>
                <span>{p.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
