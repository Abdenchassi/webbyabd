'use client';
import { useState, useRef, useEffect } from 'react';

/* ── Feature contract (cost hidden from user, sent to admin only) ── */
const CONTRACT_DATA = [
  { category: 'Core Website Infrastructure', cost: 150, items: [
    { id: 'c1', label: 'Mobile-first responsive design' },
    { id: 'c2', label: 'Custom branding (colors, fonts, logo placement)' },
    { id: 'c3', label: 'SEO-friendly page structure & meta tags' },
    { id: 'c4', label: 'SSL certificate & automatic daily backups' },
    { id: 'c5', label: 'Progressive Web App (installable on phone)' },
    { id: 'c6', label: 'Fast hosting & CDN setup' },
    { id: 'c7', label: 'Google Analytics / visitor tracking' },
    { id: 'c8', label: 'Contact form with email notifications' },
    { id: 'c9', label: 'Social media links & share buttons' },
    { id: 'c10', label: 'Multi-language support (Arabic / English / French)' },
  ]},
  { category: 'Online Shop / E-Commerce', cost: 100, items: [
    { id: 'e1', label: 'Product catalog with categories & filters' },
    { id: 'e2', label: 'Shopping cart & multi-step checkout' },
    { id: 'e3', label: 'Inventory management & stock tracking' },
    { id: 'e4', label: 'Discount codes & promotional banners' },
    { id: 'e5', label: 'Product image gallery with zoom' },
    { id: 'e6', label: 'Size / color / variant selection' },
    { id: 'e7', label: 'Order tracking & status updates' },
    { id: 'e8', label: 'Customer accounts & order history' },
    { id: 'e9', label: 'Wishlist & favorites' },
  ]},
  { category: 'Booking & Reservations', cost: 50, items: [
    { id: 'b1', label: 'Online booking / reservation form' },
    { id: 'b2', label: 'Date, time & duration picker' },
    { id: 'b3', label: 'Calendar sync (Apple / Google Calendar)' },
    { id: 'b4', label: 'Automatic confirmation & reminder emails' },
    { id: 'b5', label: 'Service / package selection' },
    { id: 'b6', label: 'Staff / provider assignment' },
    { id: 'b7', label: 'Cancellation & rescheduling system' },
    { id: 'b8', label: 'WhatsApp notification integration' },
  ]},
  { category: 'Restaurant & Food', cost: 50, items: [
    { id: 'r1', label: 'Digital menu with categories & images' },
    { id: 'r2', label: 'Online ordering (dine-in / pickup / delivery)' },
    { id: 'r3', label: 'Special offers & daily specials section' },
    { id: 'r4', label: 'Table reservation system' },
    { id: 'r5', label: 'Dietary labels & allergen information' },
    { id: 'r6', label: 'QR code menu for in-restaurant use' },
    { id: 'r7', label: 'Delivery zone & fee configuration' },
  ]},
  { category: 'Admin Dashboard', cost: 50, items: [
    { id: 'a1', label: 'Admin panel (manage everything from phone)' },
    { id: 'a2', label: 'View & manage all orders / bookings' },
    { id: 'a3', label: 'Revenue & analytics dashboard' },
    { id: 'a4', label: 'Customer database & contact list' },
    { id: 'a5', label: 'Content editor (update text, images, menu)' },
    { id: 'a6', label: 'Export data (CSV / PDF reports)' },
    { id: 'a7', label: 'Role-based access (owner / staff)' },
  ]},
  { category: 'Payments & Billing', cost: 50, items: [
    { id: 'p1', label: 'Whish / OMT payment integration' },
    { id: 'p2', label: 'Credit / debit card processing' },
    { id: 'p3', label: 'Invoice & receipt generation (PDF)' },
    { id: 'p4', label: 'Deposit & partial payment support' },
    { id: 'p5', label: 'Subscription / recurring billing' },
    { id: 'p6', label: 'Multi-currency display (USD / LBP)' },
  ]},
];

/* ── Portfolio ── */
const PORTFOLIO = [
  {
    name: 'Lens.lb',
    type: 'Photography Marketplace',
    desc: 'A full platform connecting photographers with clients across Lebanon — portfolio browsing, city/event filtering, booking with Whish & OMT deposits.',
    url: 'https://lebnslb.onrender.com',
    screenshot: '/screenshots/lenslb.svg',
    tags: ['Marketplace', 'Booking', 'Payments', 'Multi-language'],
  },
  {
    name: 'Noonphotoo',
    type: 'Photography Booking',
    desc: 'Session reservation system for a photography studio — indoor/outdoor selection, packages, video add-ons, WhatsApp integration.',
    url: 'https://noonphotoo.onrender.com',
    screenshot: '/screenshots/noonphotoo.svg',
    tags: ['Booking', 'Studio', 'Mobile-First'],
  },
  {
    name: 'Half the Way',
    type: 'Baby E-Commerce Store',
    desc: 'Online shop for baby clothing — product catalog with categories, cart, shipping flow, and a full admin panel for inventory management.',
    url: 'https://halftheway.onrender.com',
    screenshot: '/screenshots/halftheway.svg',
    tags: ['E-Commerce', 'Cart', 'Admin Panel'],
  },
  {
    name: 'Event by Tofik',
    type: 'Event Planning Platform',
    desc: 'Reservation system for a wedding & event creator — multi-service selection, budget slider, guest count, instant confirmation.',
    url: 'https://eventbytofik.onrender.com',
    screenshot: '/screenshots/eventbytofik.svg',
    tags: ['Events', 'Reservation', 'Multi-service'],
  },
];

/* ── Services ── */
const servData = [
  { title: 'Lightning-Fast Websites', desc: 'Mobile-first, SEO-optimized sites that load instantly and look stunning on every screen size.' },
  { title: 'E-Commerce Stores', desc: 'Full online shops with inventory, cart, payments, and order management — ready to sell from day one.' },
  { title: 'Installable Web Apps', desc: 'Progressive Web Apps your customers can add to their home screen — no app store required.' },
  { title: 'Admin Dashboards', desc: 'Manage your entire business from your phone — orders, bookings, analytics, content updates.' },
  { title: 'Booking Systems', desc: 'Let clients book appointments, reserve tables, or schedule sessions with automatic reminders.' },
  { title: 'Payment Integration', desc: 'Accept Whish, OMT, or card payments. Generate invoices and receipts automatically.' },
];

/* ── Icons ── */
const CatIcon = ({ type }) => {
  const p = { width:20, height:20, fill:'none', stroke:'#1A56DB', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round' };
  const icons = [
    <svg key={0} {...p} viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    <svg key={1} {...p} viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
    <svg key={2} {...p} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    <svg key={3} {...p} viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>,
    <svg key={4} {...p} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="4" rx="1"/><rect x="14" y="10" width="7" height="11" rx="1"/><rect x="3" y="13" width="7" height="8" rx="1"/></svg>,
    <svg key={5} {...p} viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>,
  ];
  return icons[type] || null;
};

const ServIcon = ({ type }) => {
  const p = { width:24, height:24, fill:'none', stroke:'#1A56DB', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round' };
  const icons = [
    <svg key={0} {...p} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    <svg key={1} {...p} viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>,
    <svg key={2} {...p} viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
    <svg key={3} {...p} viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>,
    <svg key={4} {...p} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    <svg key={5} {...p} viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  ];
  return icons[type] || null;
};

const ExtIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

/* ── Main ── */
export default function Home() {
  const [sel, setSel] = useState({});
  const [showBuilder, setShowBuilder] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', business: '', contact: '', notes: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const builderRef = useRef(null);
  const fileRef = useRef(null);

  // Countdown timer — 3 days from first load
  useEffect(() => {
    const TARGET = new Date();
    TARGET.setDate(TARGET.getDate() + 3);
    TARGET.setHours(0, 0, 0, 0);
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) return setCountdown({ h: 0, m: 0, s: 0 });
      setCountdown({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggle = (ci, fi) => {
    setSel(p => {
      const cat = p[ci] || {};
      return { ...p, [ci]: { ...cat, [fi]: !cat[fi] } };
    });
  };

  // Compute estimate (for submission only — not shown to user)
  let estimate = 0;
  Object.keys(sel).forEach(i => {
    if (Object.values(sel[i]).some(v => v)) estimate += CONTRACT_DATA[i].cost;
  });
  const totalSel = Object.values(sel).reduce((s, c) => s + Object.values(c).filter(Boolean).length, 0);

  const handleSubmit = async () => {
    if (!form.name || !form.contact || totalSel === 0) return;
    setSubmitting(true);

    const featuresList = [];
    CONTRACT_DATA.forEach((cat, i) => {
      cat.items.forEach(item => {
        if (sel[i] && sel[i][item.id]) featuresList.push(item.label);
      });
    });

    const files = fileRef.current?.files;
    let fileNames = '';
    if (files && files.length > 0) fileNames = Array.from(files).map(f => f.name).join(', ');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: form.name.trim(),
          client_business: form.business.trim(),
          email_phone: form.contact.trim(),
          notes: form.notes.trim(),
          features: featuresList,
          estimateMin: estimate,
          estimateMax: estimate + 100,
          attached_files: fileNames,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else alert('Error: ' + data.error);
    } catch { alert('Network error. Please try again.'); }
    setSubmitting(false);
  };

  const scrollToBuilder = () => {
    setShowBuilder(true);
    setMenuOpen(false);
    setTimeout(() => builderRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  if (submitted) {
    return (
      <>
        <style>{cssText}</style>
        <div className="success-wrap">
          <div className="success-card">
            <div className="success-check">
              <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M8 16l6 6L26 10"/></svg>
            </div>
            <h2 className="success-title">Request Submitted!</h2>
            <p className="success-text">Thank you, {form.name}. We'll review your project requirements and reach out within 24 hours to discuss scope and pricing.</p>
            <button className="btn-primary full-w" onClick={() => { setSubmitted(false); setSel({}); setForm({ name: '', business: '', contact: '', notes: '' }); setShowBuilder(false); }}>Start New Project</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{cssText}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">
            <img src="/logo_web.png" alt="WebbyAbd" className="logo-img" />
          </div>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#work" className="nav-link" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</a>
            <button className="nav-cta" onClick={scrollToBuilder}>Start a Project</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg"><div className="grid-overlay" /><div className="glow-orb orb1" /><div className="glow-orb orb2" /></div>
        <div className="hero-content">
          <div className="badge anim-up" style={{ animationDelay: '0.2s' }}>
            <span className="badge-dot" /> Accepting New Projects
          </div>
          <h1 className="hero-title anim-up" style={{ animationDelay: '0.4s' }}>
            Websites that <span className="hero-grad">convert visitors</span> into customers
          </h1>
          <p className="hero-sub anim-up" style={{ animationDelay: '0.6s' }}>
            Mobile-first web platforms designed for Lebanese businesses. From restaurants to e-commerce — built to perform, priced to scale.
          </p>
          <div className="hero-ctas anim-up" style={{ animationDelay: '0.8s' }}>
            <button className="btn-primary" onClick={scrollToBuilder}>Build Your Project</button>
            <a href="#work" className="btn-ghost">See Our Work</a>
          </div>
          {/* Value props instead of fake stats */}
          <div className="value-row anim-up" style={{ animationDelay: '1s' }}>
            <div className="value-item">
              <svg width="20" height="20" fill="none" stroke="#1A56DB" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
              <span>Mobile-First Always</span>
            </div>
            <div className="value-sep" />
            <div className="value-item">
              <svg width="20" height="20" fill="none" stroke="#1A56DB" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Based in Lebanon</span>
            </div>
            <div className="value-sep" />
            <div className="value-item">
              <svg width="20" height="20" fill="none" stroke="#1A56DB" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>Delivered in Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="work" className="section">
        <div className="section-inner">
          <div className="section-label">Our Work</div>
          <h2 className="section-title">Real projects. Real clients. Live now.</h2>
          <div className="port-grid">
            {PORTFOLIO.map((p, i) => (
              <a key={i} className="port-card" href={p.url} target="_blank" rel="noopener noreferrer">
                <div className="port-screenshot-wrap">
                  <img src={p.screenshot} alt={`${p.name} preview`} className="port-screenshot" />
                  <div className="port-overlay">
                    <span className="port-visit">Visit Live Site <ExtIcon /></span>
                  </div>
                </div>
                <div className="port-info">
                  <div className="port-info-top">
                    <div>
                      <h3 className="port-name">{p.name}</h3>
                      <p className="port-type">{p.type}</p>
                    </div>
                    <span className="port-arrow"><ExtIcon /></span>
                  </div>
                  <p className="port-desc">{p.desc}</p>
                  <div className="port-tags">
                    {p.tags.map((t, ti) => <span key={ti} className="port-tag">{t}</span>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section section-alt">
        <div className="section-inner">
          <div className="section-label">What We Build</div>
          <h2 className="section-title">Everything your business needs online</h2>
          <div className="serv-grid">
            {servData.map((sv, i) => (
              <div key={i} className="serv-card">
                <div className="serv-icon-wrap"><ServIcon type={i} /></div>
                <h3 className="serv-title">{sv.title}</h3>
                <p className="serv-desc">{sv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN CTA ── */}
      {!showBuilder && (
        <section className="countdown-section">
          <div className="countdown-bg">
            <div className="countdown-orb countdown-orb1" />
            <div className="countdown-orb countdown-orb2" />
          </div>
          <div className="countdown-inner">
            <div className="countdown-badge">
              <span className="countdown-badge-dot" />
              Early Access Opening Soon
            </div>
            <h2 className="countdown-title">Limited spots — launching soon</h2>
            <p className="countdown-sub">Be among the first businesses to get a custom-built platform. Reserve your spot before the timer runs out.</p>

            {countdown && (
              <div className="countdown-timer">
                <div className="countdown-unit">
                  <div className="countdown-digit-box">
                    <span className="countdown-digit" key={`h-${countdown.h}`}>{String(countdown.h).padStart(2, '0')}</span>
                  </div>
                  <span className="countdown-label">Hours</span>
                </div>
                <span className="countdown-colon">:</span>
                <div className="countdown-unit">
                  <div className="countdown-digit-box">
                    <span className="countdown-digit" key={`m-${countdown.m}`}>{String(countdown.m).padStart(2, '0')}</span>
                  </div>
                  <span className="countdown-label">Minutes</span>
                </div>
                <span className="countdown-colon">:</span>
                <div className="countdown-unit">
                  <div className="countdown-digit-box">
                    <span className="countdown-digit" key={`s-${countdown.s}`}>{String(countdown.s).padStart(2, '0')}</span>
                  </div>
                  <span className="countdown-label">Seconds</span>
                </div>
              </div>
            )}

            <div className="countdown-ctas">
              <button className="btn-primary countdown-btn-main" onClick={scrollToBuilder}>
                Get Started Now
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <a href="#work" className="btn-ghost countdown-btn-sec">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                See Our Work
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── BUILDER ── */}
      {showBuilder && (
        <section ref={builderRef} className="builder-section">
          <div className="section-inner">
            <div className="section-label">Project Builder</div>
            <h2 className="section-title">Tell us what you need</h2>
            <p className="builder-sub">Select every feature that applies. We'll review your selection and get back with a tailored proposal and quote.</p>

            {/* Details */}
            <div className="builder-card">
              <h3 className="builder-card-title">Your Details</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Your Name *</label>
                  <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label className="input-label">Business Name</label>
                  <input className="input" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} placeholder="Dar el Sama" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Email or WhatsApp *</label>
                <input className="input" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} placeholder="contact@example.com or +961 70 XXX XXX" />
              </div>
              <div className="input-group">
                <label className="input-label">Upload Logo / Moodboard (Optional)</label>
                <input type="file" ref={fileRef} multiple accept="image/*,.pdf" className="input file-input" />
              </div>
              <div className="input-group">
                <label className="input-label">Additional Notes</label>
                <textarea className="input textarea" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Design style, target audience, deadline, reference sites..." />
              </div>
            </div>

            {/* Feature categories — NO price shown */}
            {CONTRACT_DATA.map((cat, ci) => (
              <div key={ci} className="builder-card">
                <h3 className="builder-card-title">
                  <CatIcon type={ci} />
                  <span className="cat-name">{cat.category}</span>
                </h3>
                <div className="feat-grid">
                  {cat.items.map(item => {
                    const isOn = sel[ci]?.[item.id];
                    return (
                      <div key={item.id} className={`feat-card ${isOn ? 'sel' : ''}`} onClick={() => toggle(ci, item.id)}>
                        <div className={`feat-check ${isOn ? 'checked' : ''}`}>
                          {isOn && <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-6"/></svg>}
                        </div>
                        <span className="feat-label">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky footer — shows count only, no price */}
          <div className="sticky-footer">
            <div className="sticky-inner">
              <div className="sticky-info">
                <div className="sticky-count">{totalSel}</div>
                <div className="sticky-text">features selected</div>
              </div>
              <button className="btn-primary sticky-btn" disabled={submitting || totalSel === 0 || !form.name || !form.contact} onClick={handleSubmit}>
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="logo" style={{ justifyContent: 'center' }}>
            <img src="/logo_web.png" alt="WebbyAbd" className="logo-img" />
          </div>
          <p className="footer-tagline">Mobile-first web platforms for Lebanese businesses.</p>
          <div className="footer-copy">&copy; {new Date().getFullYear()} WebbyAbd. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CSS — mobile-first, scales up at 640px and 1024px
   ═══════════════════════════════════════════════════════════════ */
const cssText = `
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
.anim-up{opacity:0;animation:fadeUp .7s ease forwards}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:999;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);border-bottom:1px solid #E2E8F0}
.nav-inner{max-width:1100px;margin:0 auto;padding:.75rem 1rem;display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:8px}
.logo-img{height:36px;width:auto;object-fit:contain}
.nav-links{display:none;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#fff;border-bottom:1px solid #E2E8F0;padding:1rem;gap:.5rem;box-shadow:0 8px 24px rgba(0,0,0,.08)}
.nav-links.open{display:flex}
.nav-link{color:#64748B;text-decoration:none;font-size:.95rem;font-weight:500;padding:.75rem 1rem;border-radius:8px;transition:background .2s,color .2s}
.nav-link:hover{background:#F1F5F9;color:#1A56DB}
.nav-cta{background:#1A56DB;color:#fff;border:none;padding:.75rem 1.5rem;border-radius:8px;font-weight:600;font-size:.95rem;cursor:pointer;font-family:'DM Sans';text-align:center;min-height:48px}
.hamburger{display:flex;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;min-width:44px;min-height:44px;align-items:center;justify-content:center}
.ham-line{display:block;width:22px;height:2px;background:#334155;border-radius:2px;transition:all .3s ease}
.ham-line.open:nth-child(1){transform:translateY(7px) rotate(45deg)}
.ham-line.open:nth-child(2){opacity:0}
.ham-line.open:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

/* HERO */
.hero{position:relative;padding:6.5rem 1.25rem 3.5rem;overflow:hidden;background:#fff}
.hero-bg{position:absolute;inset:0;z-index:0}
.grid-overlay{position:absolute;inset:0;background-image:linear-gradient(#E2E8F011 1px,transparent 1px),linear-gradient(90deg,#E2E8F011 1px,transparent 1px);background-size:50px 50px}
.glow-orb{position:absolute;border-radius:50%}
.orb1{top:5%;left:5%;width:250px;height:250px;background:radial-gradient(circle,#1A56DB0A,transparent 70%);animation:float 8s ease-in-out infinite}
.orb2{bottom:5%;right:5%;width:200px;height:200px;background:radial-gradient(circle,#E0E7FF44,transparent 70%);animation:float 10s ease-in-out infinite 2s}
.hero-content{position:relative;z-index:1;max-width:800px;margin:0 auto;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#E0E7FF;border-radius:100px;padding:.4rem 1rem;font-size:.8rem;color:#1A56DB;font-weight:600;margin-bottom:1.5rem}
.badge-dot{width:8px;height:8px;border-radius:50%;background:#22C55E;animation:pulse 2s infinite}
.hero-title{font-family:'Outfit',sans-serif;font-size:2rem;font-weight:800;line-height:1.15;letter-spacing:-.03em;color:#0F172A;margin-bottom:1.25rem}
.hero-grad{background:linear-gradient(135deg,#1A56DB,#3B82F6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{font-size:1rem;color:#64748B;line-height:1.7;margin:0 auto 2rem;max-width:500px}
.hero-ctas{display:flex;flex-direction:column;gap:12px;align-items:center}

/* Value props */
.value-row{display:flex;justify-content:center;align-items:center;gap:16px;margin-top:2.5rem;flex-wrap:wrap}
.value-item{display:flex;align-items:center;gap:8px;font-size:.85rem;font-weight:600;color:#334155}
.value-sep{width:1px;height:20px;background:#E2E8F0}

/* Buttons */
.btn-primary{background:#1A56DB;color:#fff;border:none;padding:.85rem 2rem;border-radius:8px;font-weight:600;font-size:1rem;cursor:pointer;font-family:'DM Sans';box-shadow:0 4px 14px rgba(26,86,219,.25);transition:all .25s ease;min-height:48px;width:100%}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(26,86,219,.3)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-ghost{color:#64748B;text-decoration:none;padding:.85rem 2rem;border-radius:8px;font-weight:500;font-size:1rem;border:1px solid #E2E8F0;display:inline-block;text-align:center;width:100%;min-height:48px;transition:background .2s}
.btn-ghost:hover{background:#F1F5F9}
.btn-primary-white{background:#fff;color:#1A56DB;border:none;padding:.85rem 2rem;border-radius:8px;font-weight:600;font-size:1rem;cursor:pointer;font-family:'DM Sans';box-shadow:0 4px 14px rgba(0,0,0,.15);transition:all .25s ease;min-height:48px}
.btn-primary-white:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.2)}
.full-w{width:100%}

/* SECTIONS */
.section{padding:4rem 1.25rem}
.section-alt{background:#F1F5F9}
.section-inner{max-width:1100px;margin:0 auto}
.section-label{font-size:.75rem;font-weight:600;color:#1A56DB;text-transform:uppercase;letter-spacing:.1em;text-align:center;margin-bottom:10px}
.section-title{font-family:'Outfit';font-size:1.6rem;font-weight:700;text-align:center;margin-bottom:2rem;letter-spacing:-.02em;color:#0F172A}

/* PORTFOLIO */
.port-grid{display:grid;grid-template-columns:1fr;gap:24px}
.port-card{display:block;text-decoration:none;color:inherit;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;box-shadow:0 2px 8px rgba(0,0,0,.04);transition:all .35s ease}
.port-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.1);border-color:#CBD5E1}

.port-screenshot-wrap{position:relative;overflow:hidden;background:#F1F5F9;aspect-ratio:16/10}
.port-screenshot{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease}
.port-card:hover .port-screenshot{transform:scale(1.03)}
.port-overlay{position:absolute;inset:0;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s ease}
.port-card:hover .port-overlay{opacity:1}
.port-visit{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0F172A;padding:.6rem 1.2rem;border-radius:8px;font-weight:600;font-size:.85rem}

.port-info{padding:18px 20px 22px}
.port-info-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
.port-name{font-family:'Outfit';font-size:1.1rem;font-weight:700;color:#0F172A;margin-bottom:2px}
.port-type{color:#1A56DB;font-size:.8rem;font-weight:600}
.port-arrow{color:#94A3B8;transition:color .2s,transform .2s;display:flex;padding:4px}
.port-card:hover .port-arrow{color:#1A56DB;transform:translate(2px,-2px)}
.port-desc{color:#64748B;font-size:.88rem;line-height:1.55;margin-bottom:14px}
.port-tags{display:flex;flex-wrap:wrap;gap:6px}
.port-tag{font-size:.72rem;font-weight:600;color:#1A56DB;background:#E0E7FF;padding:3px 10px;border-radius:100px}

/* SERVICES */
.serv-grid{display:grid;grid-template-columns:1fr;gap:14px}
.serv-card{background:#fff;border-radius:14px;padding:22px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:all .3s ease}
.serv-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(26,86,219,.08)}
.serv-icon-wrap{width:44px;height:44px;border-radius:10px;background:#E0E7FF;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.serv-title{font-family:'Outfit';font-size:1.05rem;font-weight:700;margin-bottom:8px;color:#0F172A}
.serv-desc{color:#64748B;font-size:.9rem;line-height:1.6}

/* CTA COUNTDOWN */
.countdown-section{position:relative;padding:4rem 1.25rem;overflow:hidden;background:#0F172A;display:flex;align-items:center;justify-content:center;min-height:70vh}
.countdown-bg{position:absolute;inset:0;pointer-events:none}
.countdown-orb{position:absolute;border-radius:50%;filter:blur(80px)}
.countdown-orb1{width:300px;height:300px;background:rgba(26,86,219,.15);top:-10%;left:-5%}
.countdown-orb2{width:250px;height:250px;background:rgba(59,130,246,.1);bottom:-5%;right:-5%}
.countdown-inner{position:relative;max-width:680px;margin:0 auto;text-align:center;z-index:1;background:rgba(30,41,59,.6);border:1px solid rgba(226,232,240,.08);border-radius:24px;padding:2.5rem 1.5rem;backdrop-filter:blur(16px);box-shadow:0 20px 60px rgba(0,0,0,.3)}
.countdown-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(26,86,219,.15);border:1px solid rgba(26,86,219,.25);border-radius:100px;padding:.35rem .9rem;font-size:.75rem;color:#93C5FD;font-weight:600;margin-bottom:1.25rem;letter-spacing:.02em}
.countdown-badge-dot{width:7px;height:7px;border-radius:50%;background:#22C55E;animation:pulse 2s infinite}
.countdown-title{font-family:'Outfit',sans-serif;font-size:1.6rem;font-weight:700;color:#F8FAFC;letter-spacing:-.02em;margin-bottom:.75rem;line-height:1.2}
.countdown-sub{color:#94A3B8;font-size:.92rem;line-height:1.65;max-width:480px;margin:0 auto 2rem}

.countdown-timer{display:flex;align-items:flex-start;justify-content:center;gap:8px;margin-bottom:2.5rem}
.countdown-unit{display:flex;flex-direction:column;align-items:center;gap:6px}
.countdown-digit-box{background:rgba(30,41,59,.8);border:1px solid rgba(226,232,240,.1);border-radius:14px;padding:12px 14px;min-width:68px;position:relative;overflow:hidden}
.countdown-digit-box::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,.03),transparent);pointer-events:none}
.countdown-digit{font-family:'Outfit',sans-serif;font-size:2.2rem;font-weight:600;color:#F8FAFC;letter-spacing:-.02em;display:block;line-height:1.1}
.countdown-label{font-size:.6rem;font-weight:600;text-transform:uppercase;letter-spacing:.15em;color:#64748B}
.countdown-colon{font-family:'Outfit',sans-serif;font-size:1.8rem;font-weight:300;color:rgba(148,163,184,.4);padding-top:12px;animation:pulse 2s infinite}

.countdown-ctas{display:flex;flex-direction:column;gap:12px;align-items:center}
.countdown-btn-main{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#1A56DB;color:#fff;border:none;padding:.85rem 2rem;border-radius:10px;font-weight:600;font-size:.95rem;cursor:pointer;font-family:'DM Sans',sans-serif;box-shadow:0 4px 20px rgba(26,86,219,.35);transition:all .25s ease;min-height:48px;width:100%}
.countdown-btn-main:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(26,86,219,.4);background:#2563EB}
.countdown-btn-sec{color:#94A3B8;border-color:rgba(226,232,240,.12);display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:48px;background:transparent;font-size:.95rem}
.countdown-btn-sec:hover{background:rgba(241,245,249,.05);color:#CBD5E1}

/* CTA */
.cta-banner{padding:3.5rem 1.25rem;background:#1A56DB;text-align:center}
.cta-inner{max-width:600px;margin:0 auto}
.cta-title{font-family:'Outfit';font-size:1.6rem;font-weight:700;margin-bottom:14px;color:#fff}
.cta-sub{color:#BFDBFE;font-size:.95rem;margin-bottom:28px;line-height:1.6}

/* BUILDER */
.builder-section{padding:4rem 1.25rem 9rem;background:#F8FAFC}
.builder-sub{color:#64748B;text-align:center;max-width:520px;margin:0 auto 2rem;font-size:.95rem;line-height:1.6}
.builder-card{background:#fff;border-radius:14px;padding:20px;border:1px solid #E2E8F0;margin-bottom:16px;max-width:900px;margin-left:auto;margin-right:auto;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.builder-card-title{font-family:'Outfit';font-size:1.05rem;font-weight:700;margin-bottom:16px;color:#0F172A;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cat-name{flex:1;min-width:0}
.form-grid{display:grid;grid-template-columns:1fr;gap:0}
.input-group{margin-bottom:14px}
.input-label{display:block;font-size:.82rem;font-weight:600;color:#64748B;margin-bottom:5px}
.input{width:100%;padding:.75rem .9rem;background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:8px;color:#0F172A;font-size:.95rem;font-family:'DM Sans';min-height:48px;transition:border-color .2s,box-shadow .2s}
.input:focus{outline:none;border-color:#1A56DB;box-shadow:0 0 0 3px #E0E7FF}
.textarea{min-height:100px;resize:vertical}
.file-input{cursor:pointer;border-style:dashed;background:#F8FAFC;color:#64748B}

.feat-grid{display:grid;grid-template-columns:1fr;gap:8px}
.feat-card{display:flex;align-items:center;gap:12px;padding:14px;border-radius:10px;cursor:pointer;background:#F8FAFC;border:1.5px solid #E2E8F0;transition:all .2s ease;min-height:48px;-webkit-user-select:none;user-select:none}
.feat-card:hover{border-color:#1A56DB;background:#E0E7FF}
.feat-card.sel{border-color:#1A56DB;background:#E0E7FF;box-shadow:0 0 0 1px #1A56DB}
.feat-check{width:22px;height:22px;border-radius:6px;border:2px solid #CBD5E1;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
.feat-check.checked{background:#1A56DB;border-color:#1A56DB}
.feat-label{font-size:.9rem;color:#334155;font-weight:500}

/* STICKY */
.sticky-footer{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.94);backdrop-filter:blur(16px);border-top:1px solid #E2E8F0;z-index:100;padding:.85rem 1.25rem;box-shadow:0 -4px 12px rgba(0,0,0,.04)}
.sticky-inner{max-width:900px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:1rem}
.sticky-info{display:flex;align-items:center;gap:10px}
.sticky-count{font-size:1.5rem;font-weight:800;font-family:'Outfit';color:#1A56DB;background:#E0E7FF;width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center}
.sticky-text{font-size:.85rem;color:#64748B;font-weight:500}
.sticky-btn{width:auto!important;white-space:nowrap;padding:.75rem 1.5rem;font-size:.9rem}

/* FOOTER */
.footer{padding:2.5rem 1.25rem;border-top:1px solid #E2E8F0;background:#fff}
.footer-content{max-width:1100px;margin:0 auto;text-align:center}
.footer-tagline{color:#64748B;margin-top:8px;font-size:.85rem}
.footer-copy{color:#94A3B8;margin-top:20px;font-size:.8rem;border-top:1px solid #E2E8F0;padding-top:20px}

/* SUCCESS */
.success-wrap{position:fixed;inset:0;background:rgba(248,250,252,.96);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px}
.success-card{background:#fff;border-radius:20px;padding:2.5rem 1.5rem;max-width:420px;width:100%;text-align:center;border:1px solid #E2E8F0;box-shadow:0 20px 60px rgba(0,0,0,.08)}
.success-check{width:60px;height:60px;border-radius:50%;background:#1A56DB;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem}
.success-title{font-family:'Outfit';font-size:1.5rem;font-weight:700;margin-bottom:10px;color:#0F172A}
.success-text{color:#64748B;font-size:.95rem;line-height:1.6;margin-bottom:24px}

/* ═══ TABLET 640px+ ═══ */
@media(min-width:640px){
  .hero{padding:8rem 1.5rem 5rem}
  .hero-title{font-size:2.6rem}
  .hero-ctas{flex-direction:row}
  .btn-primary,.btn-ghost{width:auto}
  .countdown-ctas{flex-direction:row;justify-content:center}
  .countdown-btn-main,.countdown-btn-sec{width:auto}
  .countdown-digit{font-size:2.8rem}
  .countdown-digit-box{min-width:85px;padding:14px 18px}
  .countdown-inner{padding:3rem 2.5rem}
  .countdown-title{font-size:2rem}
  .value-row{gap:24px;margin-top:3rem}
  .port-grid{grid-template-columns:repeat(2,1fr)}
  .serv-grid{grid-template-columns:repeat(2,1fr);gap:18px}
  .form-grid{grid-template-columns:1fr 1fr;gap:14px}
  .feat-grid{grid-template-columns:repeat(2,1fr);gap:10px}
  .builder-card{padding:26px}
  .builder-card-title{font-size:1.15rem}
  .section{padding:5rem 1.5rem}
  .section-title{font-size:2rem}
}

/* ═══ DESKTOP 1024px+ ═══ */
@media(min-width:1024px){
  .nav-links{display:flex!important;flex-direction:row;position:static;background:none;border:none;padding:0;gap:28px;box-shadow:none}
  .nav-link{padding:.4rem 0}
  .nav-cta{min-height:auto;padding:.55rem 1.3rem}
  .hamburger{display:none}
  .nav-inner{padding:.85rem 1.5rem}
  .logo-img{height:42px}
  .hero{padding:10rem 2rem 6rem}
  .hero-title{font-size:3.6rem}
  .hero-sub{font-size:1.1rem}
  .value-row{gap:32px;margin-top:3.5rem}
  .value-item{font-size:.9rem}
  .section{padding:6rem 2rem}
  .section-title{font-size:2.4rem;margin-bottom:3rem}
  .port-grid{grid-template-columns:repeat(2,1fr);gap:28px}
  .serv-grid{grid-template-columns:repeat(3,1fr);gap:20px}
  .serv-card{padding:28px}
  .cta-banner{padding:5rem 2rem}
  .cta-title{font-size:2rem}
  .countdown-section{padding:6rem 2rem;min-height:60vh}
  .countdown-inner{padding:4rem 3.5rem;border-radius:28px}
  .countdown-title{font-size:2.6rem}
  .countdown-sub{font-size:1rem}
  .countdown-digit{font-size:3.4rem}
  .countdown-digit-box{min-width:100px;padding:18px 22px;border-radius:16px}
  .countdown-label{font-size:.68rem}
  .countdown-timer{gap:14px;margin-bottom:3rem}
  .countdown-colon{font-size:2.4rem}
  .countdown-btn-main{padding:1rem 2.5rem;font-size:1rem;border-radius:12px}
  .builder-section{padding:6rem 2rem 10rem}
  .builder-card{padding:28px;margin-bottom:20px}
  .builder-card-title{font-size:1.2rem}
  .form-grid{gap:16px}
  .feat-grid{grid-template-columns:repeat(3,1fr)}
  .sticky-btn{padding:.85rem 2rem!important;font-size:1rem!important}
  .success-card{padding:3.5rem}
  .success-title{font-size:1.8rem}
}
`;
