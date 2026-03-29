import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CF = 'https://raghav-fans.s3.ap-southeast-1.amazonaws.com/ceiling_fans/CEILING+FANS/'
const HT = 'https://raghav-fans.s3.ap-southeast-1.amazonaws.com/HEATER/'
const HA = 'https://raghav-fans.s3.ap-southeast-1.amazonaws.com/HOME+APPLIANCES/'
const PF = 'https://raghav-fans.s3.ap-southeast-1.amazonaws.com/PEDESTAL+FANS/'

const tabs = [
  { id: 'ceiling-fans',    label: 'Ceiling Fans',    icon: '🌀' },
  { id: 'heaters',         label: 'Heaters',         icon: '🔥' },
  { id: 'home-appliances', label: 'Home Appliances', icon: '🏠' },
  { id: 'pedestal-fans',   label: 'Pedestal Fans',   icon: '💨' },
]

const catalog = {
  /* ── 48 CEILING FANS ─────────────────────────────────────────── */
  'ceiling-fans': [
    { img: CF+'AERO+IV.png',                    name: 'Aero IV',                   tagline: 'Aerodynamic blade design for superior room air circulation',        tag: 'Best Seller'   },
    { img: CF+'ALTO+3B+BROWN.jpg',              name: 'Alto 3B Brown',             tagline: 'Classic 3-blade warm-brown finish for timeless interiors',          tag: 'Classic'       },
    { img: CF+'ALTO+4B+BROWN.jpg',              name: 'Alto 4B Brown',             tagline: 'Enhanced 4-blade design for maximum airflow delivery',              tag: 'Popular'       },
    { img: CF+'BLOOM+BR.png',                   name: 'Bloom BR',                  tagline: 'Bloom-inspired blades with smooth, silent motor performance',       tag: 'New Arrival'   },
    { img: CF+'Bloom+Pearl+Ivory.jpg',          name: 'Bloom Pearl Ivory',         tagline: 'Pearlescent ivory finish with nature-inspired blade curves',        tag: 'Trending'      },
    { img: CF+'BRISK+SMOKE+BROWN.png',          name: 'Brisk Smoke Brown',         tagline: 'Brisk powerful airflow in a sophisticated smoke brown finish',      tag: 'Premium'       },
    { img: CF+'BUGATTI+BLUE.png',               name: 'Bugatti Blue',              tagline: 'Italian-inspired style with a powerful whisper-quiet motor',        tag: 'Top Rated'     },
    { img: CF+'BUGATTI+BROWN.png',              name: 'Bugatti Brown',             tagline: 'Timeless earthy tones with high-performance silent motor',          tag: 'Classic'       },
    { img: CF+'BUGATTI+IV..png',                name: 'Bugatti Ivory',             tagline: 'Premium ivory finish with iconic Bugatti blade design',             tag: "Editor's Pick" },
    { img: CF+'Cruise+Air+Ivory.jpg',           name: 'Cruise Air Ivory',          tagline: 'Smooth cruising airflow in a clean, elegant ivory finish',         tag: 'Popular'       },
    { img: CF+'CRUISE+AIR+SB.png',              name: 'Cruise Air SB',             tagline: 'Smoke brown Cruise Air for stylish, steady ventilation',            tag: 'Best Seller'   },
    { img: CF+'Cruise+Air+White.jpg',           name: 'Cruise Air White',          tagline: 'Crisp white finish with effortless cruising airflow comfort',      tag: 'New Arrival'   },
    { img: CF+'Dzire+Brown.jpg',                name: 'Dzire Brown',               tagline: 'Smooth, silent performance in a rich chocolate brown finish',       tag: 'Top Rated'     },
    { img: CF+'Dzire+Smoke+Brown.jpg',          name: 'Dzire Smoke Brown',         tagline: 'Luxurious smoke-brown with silent energy-efficient motor',          tag: 'Premium'       },
    { img: CF+'FESTIVE+BLUE.png',               name: 'Festive Blue',              tagline: 'Cool blue aesthetics to match your contemporary interior',          tag: 'New Arrival'   },
    { img: CF+'FESTIVE+GOLDEN.png',             name: 'Festive Golden',            tagline: 'Celebrate every season with golden elegance overhead',              tag: 'Trending'      },
    { img: CF+'FESTIVE+MAUVE.png',              name: 'Festive Mauve',             tagline: 'A bold mauve statement piece for the modern home',                 tag: 'Style Pick'    },
    { img: CF+'FESTIVE+WHITE.png',              name: 'Festive White',             tagline: 'Crisp white festive fan for bright and cheerful interiors',        tag: 'Popular'       },
    { img: CF+'FLORA+24.png',                   name: 'Flora 24',                  tagline: '24-inch compact Flora fan for smaller spaces and cozy rooms',      tag: 'Compact'       },
    { img: CF+'FLORA+600MM+S.B.jpg',            name: 'Flora 600MM SB',            tagline: '600mm Flora in smoke brown for medium and large rooms',            tag: 'Best Seller'   },
    { img: CF+'Flora+Ivory+Gold.jpg',           name: 'Flora Ivory Gold',          tagline: 'Elegant ivory-gold blend with nature-inspired blade design',       tag: 'Premium'       },
    { img: CF+'FLORA+SB.png',                   name: 'Flora SB',                  tagline: 'Nature-inspired curves with energy-efficient smooth airflow',       tag: 'Top Rated'     },
    { img: CF+'FORTUNE+COPPER.png',             name: 'Fortune Copper',            tagline: 'Rich copper finish that elevates your living space décor',          tag: "Editor's Pick" },
    { img: CF+'FORTUNE+GOLDEN.png',             name: 'Fortune Golden',            tagline: 'Golden finish that brings warmth and grandeur to any room',         tag: 'Premium'       },
    { img: CF+'FORTUNE+IVORY.png',              name: 'Fortune Ivory',             tagline: 'Pristine ivory finish for a clean and timeless home look',         tag: 'Classic'       },
    { img: CF+'FRESH+AIR.png',                  name: 'Fresh Air',                 tagline: 'Fresh, clean airflow engineered for modern Indian homes',           tag: 'Popular'       },
    { img: CF+'lumina.jpg',                     name: 'Lumina',                    tagline: 'Designer silhouette with a built-in warm LED light glow',          tag: 'New Arrival'   },
    { img: CF+'Magic+Blue.jpg',                 name: 'Magic Blue',                tagline: 'Enchanting blue hue with effortless breezy cooling comfort',       tag: 'Trending'      },
    { img: CF+'Magic+Smoke+Brown.jpg',          name: 'Magic Smoke Brown',         tagline: 'Magical smoke brown finish with whisper-quiet motor',               tag: 'Popular'       },
    { img: CF+'Orbit+Rose+Gold+Ivory.jpg',      name: 'Orbit Rose Gold Ivory',     tagline: 'Orbital rose-gold ivory design crafted for premium interiors',     tag: 'Premium'       },
    { img: CF+'PACER+BROWN.jpg',                name: 'Pacer Brown',               tagline: 'Paces the airflow perfectly in a rugged warm brown finish',        tag: 'Best Seller'   },
    { img: CF+'PEARL+IV.png',                   name: 'Pearl Ivory',               tagline: 'Lustrous pearl ivory coating with smooth silent operation',         tag: 'Classic'       },
    { img: CF+'PILOT+BLUE.png',                 name: 'Pilot Blue',                tagline: 'Bold pilot-blue finish with powerful directional airflow',          tag: 'Popular'       },
    { img: CF+'PILOT+SB.png',                   name: 'Pilot SB',                  tagline: 'Smoke-brown Pilot fan for stylish, directed ventilation',           tag: 'Trending'      },
    { img: CF+'POLO+BROWN.jpg',                 name: 'Polo Brown',                tagline: 'Classic polo brown — traditional style, modern performance',        tag: 'Best Seller'   },
    { img: CF+'POLO+PISTA+GREEN.png',           name: 'Polo Pista Green',          tagline: 'Fresh color, fresh air — where style meets performance',           tag: 'Summer Pick'   },
    { img: CF+'POLO+PURPLE.png',                name: 'Polo Purple',               tagline: 'Bold purple polo fan for spaces that love making statements',      tag: 'Style Pick'    },
    { img: CF+'RACER+BROWN.jpg',                name: 'Racer Brown',               tagline: 'Racing-inspired aerodynamic design with maximum speed airflow',    tag: 'High Power'    },
    { img: CF+'RIGO+SMOKE+PROWN.jpg',           name: 'Rigo Smoke Brown',          tagline: "Rigo's signature smoke brown for sophisticated, silent cooling",   tag: 'Top Rated'     },
    { img: CF+'ROVER+BLUE.png',                 name: 'Rover Blue',                tagline: 'Extra-wide blades for powerful full-room air distribution',        tag: 'Popular'       },
    { img: CF+'ROVER+GREY.png',                 name: 'Rover Grey',                tagline: 'Sleek grey Rover fan for minimalist modern interiors',              tag: 'New Arrival'   },
    { img: CF+'ROVER+IVORY.jpg',                name: 'Rover Ivory',               tagline: 'Elegant ivory Rover with wide-sweep air distribution',              tag: 'Classic'       },
    { img: CF+'Tejas+Deluxe+Smoke+Brown.jpg',   name: 'Tejas Deluxe Smoke Brown',  tagline: 'Tejas Deluxe performance in a smoldering smoke brown finish',      tag: 'Premium'       },
    { img: CF+'Tejas+Deluxe+White.jpg',         name: 'Tejas Deluxe White',        tagline: 'Bright Tejas Deluxe in pristine white for clean interiors',        tag: 'Top Rated'     },
    { img: CF+'Tejas+Flash+Smoke+Brown.jpg',    name: 'Tejas Flash Smoke Brown',   tagline: 'Flash series Tejas with rapid-speed smoke-brown performance',      tag: "Editor's Pick" },
    { img: CF+'TJS+DLX+SB.png',                 name: 'TJS DLX SB',                tagline: 'Tejas Deluxe SB — the pinnacle of style meets silent power',       tag: 'Best Seller'   },
    { img: CF+'Tornado+Brown.jpg',              name: 'Tornado Brown',             tagline: 'Powerful tornado airflow wrapped in rugged brown elegance',         tag: 'High Power'    },
    { img: CF+'VENTI.png',                      name: 'Venti',                     tagline: 'Slim, modern silhouette built for maximum airflow efficiency',      tag: 'Compact'       },
  ],

  /* ── 16 HEATERS ─────────────────────────────────────────────── */
  'heaters': [
    { img: HT+'001.png',              name: 'Classic Bar Heater',   tagline: 'Multi-bar radiant heater for instant all-season room warmth',          tag: 'Value Pick'    },
    { img: HT+'002.png',              name: 'Compact Quartz',       tagline: 'Compact quartz heater with adjustable heat settings',                  tag: 'Popular'       },
    { img: HT+'003.png',              name: 'Infrared Bar',         tagline: 'Stylish infrared bar heater with quick-heat technology',               tag: 'New Arrival'   },
    { img: HT+'004.png',              name: 'Portable Quartz',      tagline: 'Portable quartz heater for instant warm-up in any room',              tag: 'Compact'       },
    { img: HT+'005.png',              name: 'Eco Heater',           tagline: 'Energy-efficient heater built for continuous daily use',               tag: 'Eco Pick'      },
    { img: HT+'11.png',               name: 'Power Heater 11',      tagline: 'High-element heater delivering powerful warmth for large spaces',     tag: 'High Power'    },
    { img: HT+'AURIC.png',            name: 'Auric',                tagline: 'Premium halogen radiance with a warm, ambient golden glow',            tag: 'Premium'       },
    { img: HT+'DROID.png',            name: 'Droid',                tagline: 'Smart heat distribution wrapped in a sleek modern design',            tag: 'Best Seller'   },
    { img: HT+'HALCYON.png',          name: 'Halcyon',              tagline: 'Serene, even warmth engineered for a perfect night of rest',          tag: 'Top Rated'     },
    { img: HT+'immersion+cu..png',    name: 'Immersion Copper',     tagline: 'Copper-grade immersion rod for the fastest water heating',            tag: 'Classic'       },
    { img: HT+'immersion+ss.png',     name: 'Immersion SS',         tagline: 'Stainless steel immersion rod built to last a lifetime',              tag: 'Durable'       },
    { img: HT+'PLUTO.png',            name: 'Pluto',                tagline: 'Compact powerhouse that heats rooms within seconds',                  tag: 'Popular'       },
    { img: HT+'SUMO+FLAME.png',       name: 'Sumo Flame',           tagline: 'Fierce infrared heat for large rooms and biting cold nights',         tag: 'High Power'    },
    { img: HT+'SUMO+STRONG+PLUS.png', name: 'Sumo Strong Plus',     tagline: 'Enhanced output with advanced multi-layer safety protection',         tag: 'New Arrival'   },
    { img: HT+'SUMO+STRONG.png',      name: 'Sumo Strong',          tagline: 'Built tough for years of dependable, reliable winter warmth',         tag: 'Durable'       },
    { img: HT+'SUN+HEATER.png',       name: 'Sun Heater',           tagline: 'Radiant warmth that mirrors the comfort of a sunny morning',          tag: "Editor's Pick" },
  ],

  /* ── 16 HOME APPLIANCES ─────────────────────────────────────── */
  'home-appliances': [
    { img: HA+'AMAZE+MG.png',            name: 'Amaze MG',          tagline: 'Heavy-duty mixer grinder built for every Indian kitchen need',        tag: 'Best Seller'   },
    { img: HA+'AMAZER+GAS.png',          name: 'Amazer Gas',        tagline: 'Efficient gas appliance for fast, dependable everyday cooking',       tag: 'Popular'       },
    { img: HA+'BIGSOLE.png',             name: 'Big Sole',          tagline: 'Wide soleplate iron for faster, effortless crease-free ironing',      tag: 'Top Rated'     },
    { img: HA+'BLENDY.png',              name: 'Blendy',            tagline: 'Quick compact blender for fresh juices and healthy smoothies',        tag: 'Trending'      },
    { img: HA+'BOLT.png',                name: 'Bolt',              tagline: 'Lightning-fast steam iron with precision temperature control',        tag: 'New Arrival'   },
    { img: HA+'ELECTRIC+KETTLE.png',     name: 'Electric Kettle',   tagline: '1.5L rapid-boil kettle with automatic shutoff safety feature',       tag: 'Popular'       },
    { img: HA+'I-10.png',                name: 'I-10',              tagline: 'Feather-light iron with a smooth non-stick ceramic soleplate',       tag: "Editor's Pick" },
    { img: HA+'INFRARED.jpeg',           name: 'Infrared',          tagline: 'Infrared appliance for instant, targeted and efficient warming',      tag: 'Compact'       },
    { img: HA+'instant+geyser.png',      name: 'Instant Geyser',    tagline: 'Hot water in seconds — ISI certified and energy efficient',           tag: 'Premium'       },
    { img: HA+'madhana.png',             name: 'Madhana',           tagline: 'Traditional churner for fresh homemade butter and buttermilk',       tag: 'Classic'       },
    { img: HA+'madhani.jpeg',            name: 'Madhani',           tagline: 'Classic churner for authentic homemade dairy preparations',          tag: 'Value Pick'    },
    { img: HA+'madhani.png',             name: 'Madhani Pro',       tagline: 'Premium churner built for effortless daily dairy processing',        tag: 'Popular'       },
    { img: HA+'MAGIC+2.png',             name: 'Magic 2',           tagline: 'Powerful food processor for smarter, faster everyday meal prep',     tag: 'Trending'      },
    { img: HA+'MAGIC+3.png',             name: 'Magic 3',           tagline: 'Multi-jar grinding powerhouse with built-in overload protection',    tag: 'High Power'    },
    { img: HA+'VIVO.png',                name: 'Vivo',              tagline: 'Multi-function OTG oven for baking, grilling and toasting',          tag: 'New Arrival'   },
    { img: HA+'WARMER+GAS+GEYSER.png',   name: 'Warmer Gas Geyser', tagline: 'Instant gas geyser for high-demand hot water in large families',    tag: 'Family Pick'   },
  ],

  /* ── 12 PEDESTAL FANS ───────────────────────────────────────── */
  'pedestal-fans': [
    { img: PF+'AMPHAN.png',      name: 'Amphan',       tagline: 'Cyclone-class airflow engineered for large rooms and open halls',          tag: 'Best Seller'   },
    { img: PF+'ASANI.png',       name: 'Asani',        tagline: 'Effortless cooling with ultra-silent high-speed rotation',                 tag: 'Top Rated'     },
    { img: PF+'CYCLONE.png',     name: 'Cyclone',      tagline: '360° powerful oscillation covering every corner of your room',            tag: 'Popular'       },
    { img: PF+'DORA.png',        name: 'Dora',         tagline: 'Compact and whisper-quiet — your perfect bedroom companion',              tag: "Editor's Pick" },
    { img: PF+'FARMER.png',      name: 'Farmer',       tagline: 'Built for tough conditions with all-day reliable strong cooling',         tag: 'Durable'       },
    { img: PF+'PLUTO.png',       name: 'Pluto',        tagline: 'Sleek modern pedestal with smooth 3-speed quiet operation',               tag: 'Value Pick'    },
    { img: PF+'SPEEDIO.png',     name: 'Speedio',      tagline: 'Rapid-speed blades for instant full-force cooling relief',                tag: 'New Arrival'   },
    { img: PF+'SWIFT.png',       name: 'Swift',        tagline: 'Lightweight and portable for effortless cooling anywhere, anytime',      tag: 'Compact'       },
    { img: PF+'THUNDER.png',     name: 'Thunder',      tagline: 'Maximum airflow, minimum noise — unstoppable storm-like performance',     tag: 'Premium'       },
    { img: PF+'TSUNAMI.png',     name: 'Tsunami',      tagline: 'Massive wave of cool air reaching every corner of your space',           tag: 'Trending'      },
    { img: PF+'Untitled-1.png',  name: 'Stand Fan',    tagline: 'Powerful stand fan engineered for continuous, dependable airflow',       tag: 'Popular'       },
    { img: PF+'YAAS.png',        name: 'Yaas',         tagline: 'Youthful bold design packed with powerful airflow performance',          tag: 'Style Pick'    },
  ],
}

const tagColors = {
  'Best Seller':   { bg: '#E85D04', color: '#fff' },
  'Premium':       { bg: '#1B3A2D', color: '#fff' },
  'New Arrival':   { bg: '#7C3AED', color: '#fff' },
  "Editor's Pick": { bg: '#B87333', color: '#fff' },
  'Top Rated':     { bg: '#059669', color: '#fff' },
  'Popular':       { bg: '#2563EB', color: '#fff' },
  'Trending':      { bg: '#DB2777', color: '#fff' },
  'Summer Pick':   { bg: '#D97706', color: '#fff' },
  'Classic':       { bg: '#64748B', color: '#fff' },
  'High Power':    { bg: '#DC2626', color: '#fff' },
  'Durable':       { bg: '#374151', color: '#fff' },
  'Value Pick':    { bg: '#16A34A', color: '#fff' },
  'Compact':       { bg: '#6366F1', color: '#fff' },
  'Style Pick':    { bg: '#EC4899', color: '#fff' },
  'Family Pick':   { bg: '#0891B2', color: '#fff' },
  'Eco Pick':      { bg: '#15803D', color: '#fff' },
}

const PAGE_SIZE = 12

/* ── Product Detail Modal ──────────────────────────────────────────── */
function ProductModal({ product, categoryLabel, onClose, onQuote }) {
  const overlayRef = useRef(null)
  const modalRef   = useRef(null)

  // Animate in
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo(modalRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 }
    )
    return () => { document.body.style.overflow = '' }
  }, [])

  const close = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose })
    gsap.to(modalRef.current, { y: 24, opacity: 0, scale: 0.97, duration: 0.22, ease: 'power2.in' })
  }, [onClose])

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  const badge = tagColors[product.tag] ?? { bg: '#1B3A2D', color: '#fff' }

  return (
    <div className="pm-overlay" ref={overlayRef} onClick={(e) => e.target === overlayRef.current && close()}>
      <div className="pm-modal" ref={modalRef} role="dialog" aria-modal="true">

        {/* Close */}
        <button className="pm-close" onClick={close} aria-label="Close">✕</button>

        {/* Left — image */}
        <div className="pm-left">
          <div className="pm-img-wrap">
            <img src={product.img} alt={product.name} />
          </div>
        </div>

        {/* Right — details */}
        <div className="pm-right">
          <p className="pm-breadcrumb">{categoryLabel} <span>/</span> {product.name}</p>

          <span className="pm-badge" style={{ background: badge.bg, color: badge.color }}>
            {product.tag}
          </span>

          <h2 className="pm-name">{product.name}</h2>

          {/* Stars */}
          <div className="pm-stars">
            {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
            <span className="pm-star-score">5.0</span>
            <span className="pm-verified">Verified Quality</span>
          </div>

          <p className="pm-tagline">{product.tagline}</p>

          <div className="pm-divider" />

          {/* Trust chips */}
          <div className="pm-chips">
            {['ISI Certified', 'Full Warranty', 'Free Delivery', 'Expert Installation'].map(c => (
              <span key={c} className="pm-chip">✓ {c}</span>
            ))}
          </div>

          <div className="pm-divider" />

          {/* CTAs */}
          <div className="pm-ctas">
            <button className="pm-btn-primary" onClick={() => { close(); onQuote() }}>
              Get Quote for This Product
              <span className="pm-btn-arr">→</span>
            </button>
            <a
              className="pm-btn-wa"
              href={`https://wa.me/911234567890?text=Hi%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span> WhatsApp Us
            </a>
          </div>

          <p className="pm-note">
            Visit our store or call us — our team will help you choose the right variant.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ProductTabs() {
  const [activeTab,    setActiveTab]    = useState('ceiling-fans')
  const [page,         setPage]         = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [selected,     setSelected]     = useState(null)
  const navigate       = useNavigate()
  const sectionRef     = useRef(null)
  const gridRef        = useRef(null)
  const indicatorRef   = useRef(null)
  const tabsContainer  = useRef(null)
  const tabEls         = useRef([])

  const moveIndicator = (idx) => {
    const tab = tabEls.current[idx]
    const cont = tabsContainer.current
    const ind  = indicatorRef.current
    if (!tab || !cont || !ind) return
    const cR = cont.getBoundingClientRect()
    const tR = tab.getBoundingClientRect()
    gsap.to(ind, { x: tR.left - cR.left, width: tR.width, duration: 0.42, ease: 'power2.inOut' })
  }

  useLayoutEffect(() => {
    const tab = tabEls.current[0]
    const cont = tabsContainer.current
    const ind  = indicatorRef.current
    if (!tab || !cont || !ind) return
    const cR = cont.getBoundingClientRect()
    const tR = tab.getBoundingClientRect()
    gsap.set(ind, { x: tR.left - cR.left, width: tR.width })
  }, [])

  // Animate cards in on tab / page change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.pt-card')
    if (!cards?.length) return
    gsap.fromTo(cards,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power3.out' }
    )
  }, [activeTab, page])

  // Section scroll-in
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const hdr  = section.querySelector('.pt-header')
    const tw   = section.querySelector('.pt-tabs-wrap')
    if (hdr) gsap.set(Array.from(hdr.children), { y: 30, opacity: 0 })
    if (tw)  gsap.set(tw, { y: 20, opacity: 0 })
    const t1 = hdr ? gsap.to(Array.from(hdr.children), {
      y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: hdr, start: 'top 88%', once: true },
    }) : null
    const t2 = tw ? gsap.to(tw, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: tw, start: 'top 90%', once: true },
    }) : null
    return () => { t1?.scrollTrigger?.kill(); t2?.scrollTrigger?.kill() }
  }, [])

  const handleTab = (tabId, idx) => {
    if (tabId === activeTab || transitioning) return
    setTransitioning(true)
    moveIndicator(idx)
    const cards = gridRef.current?.querySelectorAll('.pt-card') ?? []
    gsap.to(cards, {
      y: -14, opacity: 0, duration: 0.22, stagger: 0.04, ease: 'power2.in',
      onComplete: () => { setActiveTab(tabId); setPage(0); setTransitioning(false) },
    })
  }

  const handlePage = (p) => {
    if (p === page) return
    const cards = gridRef.current?.querySelectorAll('.pt-card') ?? []
    gsap.to(cards, {
      y: -10, opacity: 0, duration: 0.18, ease: 'power2.in',
      onComplete: () => setPage(p),
    })
  }

  const allProducts     = catalog[activeTab]
  const totalPages      = Math.ceil(allProducts.length / PAGE_SIZE)
  const visibleProducts = allProducts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const goToQuote = () => {
    const el = document.querySelector('#contact')
    el ? el.scrollIntoView({ behavior: 'smooth' }) : navigate('/contact')
  }

  return (
    <section className="product-tabs" ref={sectionRef} id="product-tabs">
      <div className="container">

        {/* Header */}
        <div className="pt-header">
          <div>
            <p className="section-tag">Product Catalogue</p>
            <h2>Explore Our<br /><em>Complete Range</em></h2>
          </div>
          <p>
            Handpicked from India's top brands.<br />
            ISI-certified, warranty-backed, priced honestly.
          </p>
        </div>

        {/* Tab bar */}
        <div className="pt-tabs-wrap">
          <div className="pt-tabs" ref={tabsContainer} role="tablist">
            <div className="pt-indicator" ref={indicatorRef} />
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                ref={el => { tabEls.current[idx] = el }}
                className={`pt-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTab(tab.id, idx)}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <span className="pt-tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product count */}
        <div className="pt-count">
          Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, allProducts.length)} of <strong>{allProducts.length}</strong> products
        </div>

        {/* Grid */}
        <div className="pt-grid" ref={gridRef}>
          {visibleProducts.map((p, i) => {
            const badge = tagColors[p.tag] ?? { bg: '#1B3A2D', color: '#fff' }
            return (
              <div
                key={`${activeTab}-${page}-${i}`}
                className="pt-card"
                onClick={() => setSelected(p)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelected(p)}
                style={{ cursor: 'pointer' }}
              >
                <div className="pt-card-img">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <span className="pt-badge" style={{ background: badge.bg, color: badge.color }}>
                    {p.tag}
                  </span>
                  <div className="pt-card-zoom">🔍 View Details</div>
                </div>
                <div className="pt-card-body">
                  <h4 className="pt-name">{p.name}</h4>
                  <p className="pt-tagline">{p.tagline}</p>
                  <div className="pt-stars-row">
                    {[1,2,3,4,5].map(s => <span key={s} className="pt-star">★</span>)}
                    <span className="pt-star-label">5.0</span>
                  </div>
                  <button
                    className="pt-cta"
                    onClick={e => { e.stopPropagation(); goToQuote() }}
                  >
                    Get Quote <span className="pt-arr">→</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pt-pagination">
            <button
              className="pt-pg-btn"
              disabled={page === 0}
              onClick={() => handlePage(page - 1)}
            >← Prev</button>

            <div className="pt-dots">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`pt-dot ${i === page ? 'active' : ''}`}
                  onClick={() => handlePage(i)}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="pt-pg-btn"
              disabled={page === totalPages - 1}
              onClick={() => handlePage(page + 1)}
            >Next →</button>
          </div>
        )}

      </div>

      {/* Product detail modal */}
      {selected && (
        <ProductModal
          product={selected}
          categoryLabel={tabs.find(t => t.id === activeTab)?.label ?? ''}
          onClose={() => setSelected(null)}
          onQuote={goToQuote}
        />
      )}
    </section>
  )
}
