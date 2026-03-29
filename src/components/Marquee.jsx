export default function Marquee() {
  const items = [
    'Ceiling Fans', 'Room Heaters', 'Electric Iron', 'Mixer Grinder',
    'Water Heater', 'Pedestal Fans', 'Energy Saving', 'ISI Certified',
    'Ceiling Fans', 'Room Heaters', 'Electric Iron', 'Mixer Grinder',
    'Water Heater', 'Pedestal Fans', 'Energy Saving', 'ISI Certified',
  ]

  return (
    <div className="marquee-section">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="m-dot" />
            </span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden>
          {items.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="m-dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
