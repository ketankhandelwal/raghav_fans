import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: '2003',
    title: 'The First Store Opens',
    desc: 'Raghav Sharma opened a modest 200 sq ft shop with a dream — to bring quality electrical products to every home in the city.',
  },
  {
    year: '2008',
    title: 'Expanding the Range',
    desc: 'Growing demand pushed us to expand beyond fans. We brought in heaters, irons and the first batch of mixer grinders.',
  },
  {
    year: '2012',
    title: 'First Service Centre',
    desc: "We set up an in-house service centre — because we believe the relationship doesn't end at the sale.",
  },
  {
    year: '2016',
    title: 'Crossing 5,000 Customers',
    desc: 'A milestone we\'re proud of. Word of mouth from happy customers had built the business more than any advertisement.',
  },
  {
    year: '2020',
    title: 'Online Presence & Delivery',
    desc: 'We launched home delivery and online enquiries to serve customers even during the pandemic — comfort shouldn\'t wait.',
  },
  {
    year: '2024',
    title: '10,000 Families & Growing',
    desc: 'Today RaghavFans is the city\'s most trusted electrical shop — and we\'re just getting started.',
  },
]

export default function OurStory() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story-hdr > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.story-hdr', start: 'top 82%' }
      })

      document.querySelectorAll('.tl-item').forEach((item, i) => {
        gsap.from(item, {
          y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' }
        })
      })

      // Animate the timeline line
      gsap.from('.timeline::before', {
        scaleY: 0, transformOrigin: 'top center', duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 25%', scrub: 1 }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="our-story" className="our-story" ref={sectionRef}>
      <div className="container">
        <div className="story-hdr">
          <p className="section-tag centered light">Our Journey</p>
          <h2>How RaghavFans<br /><em>Came to Be</em></h2>
          <p>A story of passion, perseverance and the people who kept us going.</p>
        </div>

        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={m.year} className="tl-item">
              {i % 2 === 0 ? (
                <>
                  <div className="tl-content">
                    <h4>{m.title}</h4>
                    <p>{m.desc}</p>
                  </div>
                  <div className="tl-center">
                    <div className="tl-dot" />
                    <div className="tl-year">{m.year}</div>
                  </div>
                  <div className="tl-empty" />
                </>
              ) : (
                <>
                  <div className="tl-empty" />
                  <div className="tl-center">
                    <div className="tl-dot" />
                    <div className="tl-year">{m.year}</div>
                  </div>
                  <div className="tl-content">
                    <h4>{m.title}</h4>
                    <p>{m.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
