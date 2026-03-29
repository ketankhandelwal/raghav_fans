import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Happy Customers', num: 10000, suffix: '+', desc: 'Families across the city trust RaghavFans for their home comfort needs.' },
  { label: 'Years in Business', num: 20, suffix: '+', desc: 'Two decades of reliable service and deep expertise in electrical appliances.' },
  { label: 'Products in Stock', num: 500, suffix: '+', desc: 'Curated range from top brands like Havells, Orient, Bajaj & more.' },
]

export default function Stats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((s, i) => {
        const el = document.querySelectorAll('.stat-num')[i]
        if (!el) return
        gsap.from({ val: 0 }, {
          val: s.num,
          duration: 2,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: { trigger: '.stats-grid', start: 'top 80%', once: true },
          onUpdate() {
            const numEl = el.querySelector('.num-val')
            if (numEl) numEl.textContent = Math.round(this.targets()[0].val).toLocaleString()
          }
        })
      })

      gsap.from('.stat-card', {
        y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 82%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-lbl">{s.label}</div>
              <div className="stat-num">
                <span className="num-val">0</span>
                <span className="stat-sfx">{s.suffix}</span>
              </div>
              <p className="stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
