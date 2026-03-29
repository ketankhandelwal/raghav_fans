import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', product: '', message: '' })
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info > *', {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 85%', once: true },
      })
      gsap.from('.contact-form', {
        x: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! We\'ll get back to you shortly.')
    setForm({ name: '', email: '', phone: '', product: '', message: '' })
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <p className="section-tag">Contact Us</p>
            <h2>Let's Find the<br /><em>Right Fit for You</em></h2>
            <p>
              Drop by our store, give us a call or send a message below. Our team is
              ready to help you choose the best product for your home and budget.
            </p>

            <div className="c-details">
              <div className="c-detail">
                <div className="c-icon">📍</div>
                <div className="c-text">
                  <strong>Our Store</strong>
                  <span>12, Main Market Road, Sector 5,<br />New Delhi – 110001</span>
                </div>
              </div>
              <div className="c-detail">
                <div className="c-icon">📞</div>
                <div className="c-text">
                  <strong>Phone</strong>
                  <a href="tel:+911234567890">+91 12345 67890</a>
                </div>
              </div>
              <div className="c-detail">
                <div className="c-icon">✉️</div>
                <div className="c-text">
                  <strong>Email</strong>
                  <a href="mailto:hello@raghavfans.com">hello@raghavfans.com</a>
                </div>
              </div>
              <div className="c-detail">
                <div className="c-icon">🕐</div>
                <div className="c-text">
                  <strong>Store Hours</strong>
                  <span>Mon – Sat: 9:30 AM – 8:00 PM<br />Sunday: 10:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', marginBottom: '1.75rem', fontSize: '1.5rem' }}>
              Send Us a Message
            </h3>

            <div className="form-row">
              <div className="form-grp">
                <label>Name</label>
                <input
                  type="text" placeholder="Your full name" required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-grp">
                <label>Email</label>
                <input
                  type="email" placeholder="you@example.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-grp">
                <label>Phone</label>
                <input
                  type="tel" placeholder="+91 98765 43210"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="form-grp">
                <label>Product Interest</label>
                <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}>
                  <option value="">Select a category</option>
                  <option>Ceiling Fans</option>
                  <option>Room Heaters</option>
                  <option>Electric Iron</option>
                  <option>Mixer Grinder</option>
                  <option>Water Heater</option>
                  <option>Pedestal Fans</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="form-grp">
              <label>Message</label>
              <textarea
                placeholder="Tell us what you're looking for, your budget or any questions..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }}>
              Send Message <span className="arrow-circle">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
