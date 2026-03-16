import React, { useEffect, useMemo, useState } from 'react';

const routes = {
  home: 'home',
  catalogue: 'catalogue',
  marketplace: 'marketplace',
  about: 'about',
  faq: 'faq',
  login: 'login',
  register: 'register',
  dashboard: 'dashboard'
};

const seedData = [
  { id: 1, name: 'NERICA L-19', crop: 'Rice', region: 'Northern', district: 'Bombali', stock: 120, status: 'Available', maturity: 'Early', supplier: 'Makeni Seed Hub', price: 'Le 480/kg' },
  { id: 2, name: 'ROK 34', crop: 'Rice', region: 'Eastern', district: 'Kenema', stock: 88, status: 'Low Stock', maturity: 'Medium', supplier: 'Kenema Growers Union', price: 'Le 455/kg' },
  { id: 3, name: 'SL Maize Hybrid 7', crop: 'Maize', region: 'Southern', district: 'Bo', stock: 210, status: 'Available', maturity: 'Early', supplier: 'Bo Agro Centre', price: 'Le 390/kg' },
  { id: 4, name: 'Orange Sweet Cassava', crop: 'Cassava', region: 'Western', district: 'Port Loko', stock: 64, status: 'Available', maturity: 'Late', supplier: 'Port Loko Roots Cooperative', price: 'Le 160/cutting' },
  { id: 5, name: 'Groundnut Sella', crop: 'Groundnut', region: 'Northern', district: 'Tonkolili', stock: 42, status: 'Low Stock', maturity: 'Medium', supplier: 'Tonkolili Farm Network', price: 'Le 520/kg' },
  { id: 6, name: 'NERICA F3', crop: 'Rice', region: 'Southern', district: 'Moyamba', stock: 150, status: 'Available', maturity: 'Medium', supplier: 'Moyamba Seed Service', price: 'Le 470/kg' }
];

const notifications = [
  'New rice seed consignment received in Bombali.',
  'Inspection slot opened for three pending registrations.',
  'Marketplace demand for maize seed increased by 12% this week.'
];

const regionStats = [
  { name: 'Northern', coverage: 82, activeSuppliers: 14, lastUpdate: '5 mins ago' },
  { name: 'Eastern', coverage: 69, activeSuppliers: 9, lastUpdate: '12 mins ago' },
  { name: 'Southern', coverage: 76, activeSuppliers: 11, lastUpdate: '8 mins ago' },
  { name: 'Western', coverage: 58, activeSuppliers: 6, lastUpdate: '16 mins ago' }
];

const faqItems = [
  {
    question: 'Who can register on the Sierra Leone Seed Tracker?',
    answer:
      'Farmers, seed distributors, researchers, agro-dealers, and government quality assurance officers can register and manage seed-related activities on the platform.'
  },
  {
    question: 'How does the marketplace work?',
    answer:
      'The marketplace lists available certified seeds from accredited suppliers. Users can filter by crop, location, and stock status, then connect directly with suppliers.'
  },
  {
    question: 'Does the dashboard update in real time?',
    answer:
      'The dashboard is designed to reflect live operational changes such as new stock arrivals, regional supply updates, and recent registrations.'
  },
  {
    question: 'Can this platform support government reporting?',
    answer:
      'Yes. Reports and analytics can help agencies monitor stock levels, regional distribution, and seasonal demand trends for planning and oversight.'
  }
];

function useHashRoute() {
  const getRoute = () => {
    const raw = window.location.hash.replace('#/', '').replace('#', '');
    return routes[raw] ? raw : routes.home;
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onChange);
    if (!window.location.hash) {
      window.location.hash = '#/home';
    }
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = (nextRoute) => {
    window.location.hash = `#/${nextRoute}`;
  };

  return { route, navigate };
}

function StatCard({ value, label, detail }) {
  return (
    <article className="stat-card reveal">
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{detail}</small>
    </article>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen((current) => !current)}>
        <span>{question}</span>
        <span className="faq-symbol">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-answer-wrap" style={{ maxHeight: open ? '180px' : '0px' }}>
        <p className="faq-answer">{answer}</p>
      </div>
    </article>
  );
}

function Header({ navigate, route }) {
  const links = [
    ['home', 'Home'],
    ['catalogue', 'Catalogue'],
    ['marketplace', 'Marketplace'],
    ['about', 'About'],
    ['faq', 'FAQ']
  ];

  return (
    <header className="topbar">
      <button className="brand brand-button" onClick={() => navigate(routes.home)}>
        <span className="brand-mark">🌱</span>
        <span>
          Sierra Leone Seed Tracker
          </span>
      </button>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map(([key, label]) => (
          <button
            key={key}
            onClick={() => navigate(key)}
            className={`nav-link-button ${route === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        <button className="btn btn-ghost" onClick={() => navigate(routes.login)}>
          Log In
        </button>
        <button className="btn btn-primary" onClick={() => navigate(routes.register)}>
          Get Started
        </button>
      </div>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-glow" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <span className="pill">Seed Intelligence for Sierra Leone</span>
            <h1>
              Track, register, and distribute <span>quality seeds</span> with confidence.
            </h1>
            <p>
              A modern seed management platform for farmers, distributors, and government agencies.
              Monitor stock, manage accreditation, view regional distribution, and discover new seed arrivals.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate(routes.register)}>
                Start Registration
              </button>
              <button className="btn btn-secondary" onClick={() => navigate(routes.about)}>
                Learn More
              </button>
            </div>
            <div className="notification-ticker" role="status" aria-live="polite">
              {notifications.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-panel reveal delay-1">
            <div className="panel-header">
              <h3>Live Seed Tracking Dashboard</h3>
              <span className="status-dot">Live</span>
            </div>
            <div className="mini-grid">
              <StatCard value="1,284" label="Certified seed bags" detail="Across all listed suppliers" />
              <StatCard value="41" label="Active registrations" detail="Pending and verified this month" />
              <StatCard value="16" label="Distribution zones" detail="Tracked by region and district" />
              <StatCard value="93%" label="Fulfilment rate" detail="Marketplace demand served" />
            </div>
          </div>
        </div>
      </section>

      <section className="section soft-panel-section">
        <div className="container">
          <div className="section-heading reveal">
            <span className="section-tag">Core platform features</span>
            <h2>Everything needed to manage the seed ecosystem</h2>
            <p>
              Built to support registration, compliance, distribution, and decision-making with a clean and mobile-friendly experience.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card reveal">
              <div className="icon-badge">📊</div>
              <h3>Real-time dashboard</h3>
              <p>View seed stock, recent updates, and regional activity in one glance.</p>
              <button className="text-link" onClick={() => navigate(routes.dashboard)}>Open dashboard →</button>
            </article>
            <article className="feature-card reveal delay-1">
              <div className="icon-badge">📝</div>
              <h3>Registration workflow</h3>
              <p>Farmers and distributors can submit forms and manage accreditation requirements.</p>
              <button className="text-link" onClick={() => navigate(routes.register)}>Register now →</button>
            </article>
            <article className="feature-card reveal delay-2">
              <div className="icon-badge">🗺️</div>
              <h3>Distribution map</h3>
              <p>Track how seed inventory moves across Northern, Eastern, Southern, and Western regions.</p>
              <button className="text-link" onClick={() => navigate(routes.dashboard)}>View map →</button>
            </article>
            <article className="feature-card reveal delay-3">
              <div className="icon-badge">🔎</div>
              <h3>Search and filters</h3>
              <p>Quickly find seeds by crop type, stock status, supplier, or location.</p>
              <button className="text-link" onClick={() => navigate(routes.catalogue)}>Browse catalogue →</button>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function CataloguePage({ navigate }) {
  const [search, setSearch] = useState('');
  const [cropFilter, setCropFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const filteredSeeds = useMemo(() => {
    return seedData.filter((seed) => {
      const matchesSearch = `${seed.name} ${seed.supplier} ${seed.district}`.toLowerCase().includes(search.toLowerCase());
      const matchesCrop = cropFilter === 'All' || seed.crop === cropFilter;
      const matchesRegion = regionFilter === 'All' || seed.region === regionFilter;
      return matchesSearch && matchesCrop && matchesRegion;
    });
  }, [search, cropFilter, regionFilter]);

  const crops = ['All', ...new Set(seedData.map((seed) => seed.crop))];
  const regions = ['All', ...new Set(seedData.map((seed) => seed.region))];

  return (
    <section className="section page-section">
      <div className="container">
        <div className="section-heading reveal">
          <span className="section-tag">Catalogue</span>
          <h2>Find released and available seed varieties</h2>
          <p>Use the filters below to discover stock by crop, supplier, and region.</p>
        </div>

        <div className="filter-bar reveal delay-1">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by seed, supplier, or district"
          />
          <select value={cropFilter} onChange={(event) => setCropFilter(event.target.value)}>
            {crops.map((crop) => <option key={crop}>{crop}</option>)}
          </select>
          <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
            {regions.map((region) => <option key={region}>{region}</option>)}
          </select>
          <button className="btn btn-primary" onClick={() => navigate(routes.marketplace)}>Go to Marketplace</button>
        </div>

        <div className="catalogue-grid">
          {filteredSeeds.map((seed) => (
            <article className="seed-card reveal" key={seed.id}>
              <div className="seed-card-top">
                <div>
                  <span className="seed-label">{seed.crop}</span>
                  <h3>{seed.name}</h3>
                </div>
                <span className={`status-pill ${seed.status === 'Available' ? 'ok' : 'warn'}`}>{seed.status}</span>
              </div>
              <p>{seed.supplier}</p>
              <ul className="seed-meta">
                <li><strong>Region:</strong> {seed.region}</li>
                <li><strong>District:</strong> {seed.district}</li>
                <li><strong>Maturity:</strong> {seed.maturity}</li>
                <li><strong>Stock:</strong> {seed.stock}</li>
                <li><strong>Price:</strong> {seed.price}</li>
              </ul>
              <div className="card-actions">
                <button className="btn btn-secondary small-btn" onClick={() => navigate(routes.marketplace)}>Buy / Request</button>
                <button className="btn btn-ghost small-btn" onClick={() => navigate(routes.dashboard)}>Track Region</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketplacePage() {
  const topListings = seedData.slice(0, 4);
  return (
    <section className="section page-section">
      <div className="container">
        <div className="section-heading reveal">
          <span className="section-tag">Marketplace</span>
          <h2>Connect with accredited suppliers</h2>
          <p>Compare offers, stock levels, and regions before making seed requests.</p>
        </div>

        <div className="market-grid">
          {topListings.map((seed, index) => (
            <article className={`market-card reveal delay-${index % 4}`} key={seed.id}>
              <div className="market-header">
                <h3>{seed.name}</h3>
                <span>{seed.price}</span>
              </div>
              <p>{seed.supplier}</p>
              <div className="market-tags">
                <span>{seed.crop}</span>
                <span>{seed.region}</span>
                <span>{seed.status}</span>
              </div>
              <button className="btn btn-primary">Request Supply</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage({ navigate }) {
  return (
    <section className="section page-section">
      <div className="container about-layout">
        <div className="about-copy reveal">
          <span className="section-tag">About the platform</span>
          <h2>Designed for farmers, distributors, and public sector teams</h2>
          <p>
            The Sierra Leone Seed Tracker is a modern web application inspired by regional seed management systems and tailored for Sierra Leone’s agricultural ecosystem.
          </p>
          <p>
            It combines registration tools, a live dashboard, search and filter capabilities, an interactive regional map, and practical analytics into one accessible interface.
          </p>
          <div className="bullet-panel">
            <div><strong>Responsive:</strong> works across mobile, tablet, and desktop.</div>
            <div><strong>Accessible:</strong> readable text, clear contrast, and intuitive navigation.</div>
            <div><strong>Expandable:</strong> clean React structure ready for future APIs and data sources.</div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate(routes.register)}>Start using the platform</button>
        </div>
        <div className="about-card reveal delay-1">
          <h3>Included modules</h3>
          <ul className="check-list">
            <li>Seed registration forms</li>
            <li>Dashboard with real-time style updates</li>
            <li>Regional seed distribution map</li>
            <li>Reports and demand analytics</li>
            <li>Marketplace and supplier discovery</li>
            <li>Animated interactions and notifications</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FAQPage() {
  return (
    <section className="section page-section">
      <div className="container narrow">
        <div className="section-heading centered-block reveal">
          <span className="section-tag">FAQ</span>
          <h2>Frequently asked questions</h2>
          <p>Helpful answers for first-time users, agencies, and seed suppliers.</p>
        </div>
        <div className="faq-grid full-width">
          {faqItems.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LoginPage({ navigate }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section page-section">
      <div className="container auth-shell">
        <div className="auth-card reveal">
          <span className="section-tag">Login</span>
          <h2>Welcome back</h2>
          <p>Sign in to access the dashboard, registration records, and regional seed data.</p>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              Email Address
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="name@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Enter your password"
                required
              />
            </label>
            <button className="btn btn-primary" type="submit">Log In</button>
          </form>
          {submitted && <div className="form-success">Demo login captured. Connect this form to your backend later.</div>}
          <button className="text-link align-left" onClick={() => navigate(routes.register)}>Need an account? Register →</button>
        </div>
      </div>
    </section>
  );
}

function RegisterPage({ navigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    organisation: '',
    role: 'Farmer',
    region: 'Northern',
    crop: 'Rice'
  });

  return (
    <section className="section page-section">
      <div className="container auth-shell wide">
        <div className="auth-card reveal">
          <span className="section-tag">Registration</span>
          <h2>Seed registration form</h2>
          <p>Submit farmer or distributor information to begin accreditation and tracking.</p>
          <form
            className="form-grid two"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              Full Name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            </label>
            <label>
              Organisation
              <input value={form.organisation} onChange={(event) => setForm({ ...form, organisation: event.target.value })} required />
            </label>
            <label>
              Role
              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
                <option>Farmer</option>
                <option>Distributor</option>
                <option>Government Officer</option>
                <option>Researcher</option>
              </select>
            </label>
            <label>
              Region
              <select value={form.region} onChange={(event) => setForm({ ...form, region: event.target.value })}>
                <option>Northern</option>
                <option>Eastern</option>
                <option>Southern</option>
                <option>Western</option>
              </select>
            </label>
            <label>
              Primary Crop
              <select value={form.crop} onChange={(event) => setForm({ ...form, crop: event.target.value })}>
                <option>Rice</option>
                <option>Maize</option>
                <option>Cassava</option>
                <option>Groundnut</option>
              </select>
            </label>
            <label>
              Phone Number
              <input placeholder="+232..." />
            </label>
            <label className="full-span">
              Notes
              <textarea rows="4" placeholder="Share seed quantity, documentation status, or inspection needs" />
            </label>
            <button className="btn btn-primary" type="submit">Submit Registration</button>
          </form>
          {submitted && (
            <div className="form-success">
              Registration captured successfully. This demo is ready for backend integration.
            </div>
          )}
          <button className="text-link align-left" onClick={() => navigate(routes.dashboard)}>View dashboard preview →</button>
        </div>
      </div>
    </section>
  );
}

function DashboardPage({ navigate }) {
  const [selectedRegion, setSelectedRegion] = useState(regionStats[0]);
  const bars = [72, 84, 61, 93, 77];

  return (
    <section className="section page-section">
      <div className="container">
        <div className="section-heading reveal">
          <span className="section-tag">Dashboard</span>
          <h2>Seed tracking overview and regional distribution</h2>
          <p>Review current inventory trends, notifications, and a simplified interactive map of Sierra Leone.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-panel reveal">
            <div className="panel-header">
              <h3>Live region map</h3>
              <span className="muted-copy">Click a region to inspect activity</span>
            </div>
            <div className="map-card">
              <div className="map-grid" role="list">
                {regionStats.map((region) => (
                  <button
                    key={region.name}
                    className={`region-tile ${selectedRegion.name === region.name ? 'selected' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <strong>{region.name}</strong>
                    <span>{region.coverage}% coverage</span>
                  </button>
                ))}
              </div>
              <div className="map-detail">
                <h4>{selectedRegion.name} Region</h4>
                <p>Active suppliers: {selectedRegion.activeSuppliers}</p>
                <p>Distribution coverage: {selectedRegion.coverage}%</p>
                <p>Latest update: {selectedRegion.lastUpdate}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-panel reveal delay-1">
            <div className="panel-header">
              <h3>Notifications</h3>
              <span className="muted-copy">Recent platform activity</span>
            </div>
            <div className="notification-list">
              {notifications.map((item) => (
                <div className="notification-item" key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel reveal delay-2">
            <div className="panel-header">
              <h3>Demand analytics</h3>
              <span className="muted-copy">Weekly demand trend</span>
            </div>
            <div className="chart-bars" aria-label="Demand chart">
              {bars.map((bar, index) => (
                <div className="chart-col" key={bar + index}>
                  <div className="chart-bar" style={{ height: `${bar}%` }} />
                  <span>W{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel reveal delay-3">
            <div className="panel-header">
              <h3>Quick actions</h3>
              <span className="muted-copy">Move faster across the app</span>
            </div>
            <div className="quick-actions">
              <button className="btn btn-primary" onClick={() => navigate(routes.register)}>New Registration</button>
              <button className="btn btn-secondary" onClick={() => navigate(routes.catalogue)}>Browse Seeds</button>
              <button className="btn btn-ghost" onClick={() => navigate(routes.marketplace)}>Open Marketplace</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Sierra Leone Seed Tracker</h3>
          <p>
            A responsive seed intelligence platform built for transparency, accessibility, and future growth.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            <button onClick={() => navigate(routes.dashboard)}>Dashboard</button>
            <button onClick={() => navigate(routes.catalogue)}>Catalogue</button>
            <button onClick={() => navigate(routes.marketplace)}>Marketplace</button>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: info@seedtracker.sl</p>
          <p>Phone: +232 76 000 000</p>
          <p>Location: Sierra Leone</p>
        </div>
      </div>
      <div className="copyright">© 2026 Sierra Leone Seed Tracker. All rights reserved.</div>
    </footer>
  );
}

export default function App() {
  const { route, navigate } = useHashRoute();

  let page = <HomePage navigate={navigate} />;
  if (route === routes.catalogue) page = <CataloguePage navigate={navigate} />;
  if (route === routes.marketplace) page = <MarketplacePage navigate={navigate} />;
  if (route === routes.about) page = <AboutPage navigate={navigate} />;
  if (route === routes.faq) page = <FAQPage />;
  if (route === routes.login) page = <LoginPage navigate={navigate} />;
  if (route === routes.register) page = <RegisterPage navigate={navigate} />;
  if (route === routes.dashboard) page = <DashboardPage navigate={navigate} />;

  return (
    <div className="page-shell">
      <Header navigate={navigate} route={route} />
      <main>{page}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
