import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const brands = ['Havells', 'Orient', 'Bajaj', 'Crompton', 'Usha', 'V-Guard', 'Kenstar', 'Hindware']

export default function BrandsStrip() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const names = ref.current.querySelectorAll('.brand-name')
    gsap.set(names, { opacity: 0, y: 20 })
    const t = gsap.to(names, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
    })
    return () => t.scrollTrigger?.kill()
  }, [])

  return (
    <div className="brands-strip" ref={ref}>
      <div className="container">
        <div className="brands-strip-inner">
          <span className="brands-label">Trusted Brands</span>
          <div className="brands-logos">
            {brands.map(b => (
              <span key={b} className="brand-name">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
