export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: '1rem' }}>
              <span className="logo-bolt">⚡</span>
              Raghav<span className="accent">Fans</span>
            </div>
            <p>
              Your trusted home comfort partner since 2003. Quality electrical
              products, expert advice and after-sales support you can count on.
            </p>
            <div className="f-social">
              <a href="#" className="soc-btn" aria-label="Facebook">f</a>
              <a href="#" className="soc-btn" aria-label="Instagram">ig</a>
              <a href="#" className="soc-btn" aria-label="WhatsApp">w</a>
              <a href="#" className="soc-btn" aria-label="YouTube">yt</a>
            </div>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h5>Products</h5>
            <div className="f-links">
              {['Ceiling Fans', 'Room Heaters', 'Electric Irons', 'Mixer Grinders', 'Water Heaters', 'Pedestal Fans'].map(p => (
                <a key={p} href="#products">{p}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h5>Company</h5>
            <div className="f-links">
              {[
                ['About Us', '#about'],
                ['Our Story', '#our-story'],
                ['Contact', '#contact'],
                ['Store Location', '#contact'],
                ['Careers', '#'],
                ['Privacy Policy', '#'],
              ].map(([label, href]) => (
                <a key={label} href={href}>{label}</a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h5>Stay Updated</h5>
            <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.45)', marginBottom: '1rem', lineHeight: '1.6' }}>
              Get exclusive deals, new arrivals and seasonal offers directly to your inbox.
            </p>
            <div className="f-newsletter">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 RaghavFans. All rights reserved. Made with ❤️ in India.</p>
          <div className="ft-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
