import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'Do you offer installation services for fans and geysers?',
    a: 'Yes! We provide professional installation for all ceiling fans, water heaters and other appliances. Installation is free for select products and carried out by trained technicians.',
  },
  {
    q: 'What brands do you carry?',
    a: 'We stock India\'s most trusted brands including Havells, Orient, Bajaj, Crompton, Usha, Kenstar, V-Guard and many more — all genuine, ISI certified products.',
  },
  {
    q: 'Do you offer EMI or financing options?',
    a: 'Yes, EMI options are available on purchases above ₹3,000 through leading banks and Bajaj Finserv. Zero-cost EMI is available on select products.',
  },
  {
    q: 'What is your return or exchange policy?',
    a: 'We offer a 7-day exchange policy for manufacturing defects. For warranty claims beyond that, we coordinate directly with the brand\'s service centre on your behalf.',
  },
  {
    q: 'Can I get a home delivery?',
    a: 'Absolutely! We offer same-day home delivery within the city for orders placed before 4 PM. Delivery is free on orders above ₹2,000.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-left > *', {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-left', start: 'top 82%' }
      })
      gsap.from('.faq-item', {
        x: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-list', start: 'top 80%' }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq-grid">
          <div className="faq-left">
            <p className="section-tag">FAQ</p>
            <h2>Questions?<br />We're Here<br /><em>to Help</em></h2>
            <p>
              Whether you're buying your first fan or upgrading your whole home — we
              know you might have questions. Here are the most common ones.
            </p>
            <a href="#contact" className="btn btn-dark" style={{ marginTop: '0.5rem' }}>
              Ask Us Anything →
            </a>
          </div>

          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-ans">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
