'use client';

import { useState } from 'react';

type Tab = 'save' | 'invest' | 'learn';

const groups = [
  {
    name: 'Family Ajo',
    amount: '₦20,000',
    members: '8 / 10',
    round: '4 of 10',
    date: 'Dec 1',
    color: 'coral',
    position: '4th',
  },
  {
    name: 'Sunday Circle',
    amount: '₦10,000',
    members: '6 / 8',
    round: '2 of 8',
    date: 'Dec 8',
    color: 'teal',
    position: '6th',
  },
];

const holdings = [
  {
    company: 'Apple',
    ticker: 'AAPL',
    value: '$428.40',
    change: '+18.4%',
    units: '1.58 shares',
    color: '#1c63d5',
    mark: 'A',
  },
  {
    company: 'NVIDIA',
    ticker: 'NVDA',
    value: '$312.10',
    change: '+12.7%',
    units: '1.73 shares',
    color: '#78b82a',
    mark: 'N',
  },
  {
    company: 'Tesla',
    ticker: 'TSLA',
    value: '$184.70',
    change: '-2.1%',
    units: '0.53 shares',
    color: '#e84343',
    mark: 'T',
  },
];

const lessons = [
  { title: 'The 50/30/20 Rule', description: 'Learn how to divide income between needs, wants and savings.', category: 'Saving and budgeting', source: 'NerdWallet', href: 'https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator?utm_source=chatgpt.com', time: '6 min read', level: 'Beginner', tone: 'lesson-coral' },
  { title: 'SEC Nigeria Investor Education', description: 'Explore investment basics, strategies, market risks and investor protection.', category: 'Saving and budgeting', source: 'SEC Nigeria', href: 'https://www.sec.gov.ng/our-mandate/development/investor-education/?utm_source=chatgpt.com', time: '8 min read', level: 'Beginner', tone: 'lesson-green' },
  { title: 'How to Start Investing', description: "A beginner's guide to getting started and building an investment habit.", category: 'Introduction to investing', source: 'Vanguard', href: 'https://investor.vanguard.com/investor-resources-education/article/how-to-start-investing?utm_source=chatgpt.com', time: '7 min read', level: 'Beginner', tone: 'lesson-blue' },
  { title: 'Introduction to Investing', description: 'Learn the basics of investing, returns and compound growth.', category: 'Introduction to investing', source: 'Investor.gov', href: 'https://www.investor.gov/introduction-investing?utm_source=chatgpt.com', time: '6 min read', level: 'Beginner', tone: 'lesson-green' },
  { title: 'Investing Basics: What Are Stocks?', description: 'Understand what stocks are and what it means to own part of a company.', category: 'Understanding stocks', source: 'Charles Schwab', href: 'https://www.schwab.com/learn/story/stock-investing-basics?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-coral' },
  { title: 'Stocks: Frequently Asked Questions', description: 'Learn about shares, ownership, dividends and how stocks can generate returns.', category: 'Understanding stocks', source: 'Investor.gov', href: 'https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-blue' },
  { title: 'Asset Allocation and Diversification', description: 'Understand how to balance investments based on your goals and risk tolerance.', category: 'Investment fundamentals', source: 'Investor.gov', href: 'https://www.investor.gov/introduction-investing/getting-started/asset-allocation?utm_source=chatgpt.com', time: '8 min read', level: 'Intermediate', tone: 'lesson-green' },
  { title: 'What Is Dollar-Cost Averaging?', description: 'Learn about investing consistently instead of trying to predict market movements.', category: 'Investment fundamentals', source: 'Charles Schwab', href: 'https://www.schwab.com/learn/story/what-is-dollar-cost-averaging?utm_source=chatgpt.com', time: '6 min read', level: 'Intermediate', tone: 'lesson-blue' },
  { title: 'What Is Compound Interest?', description: 'Understand how your returns can generate additional returns over time.', category: 'Growing wealth', source: 'Fidelity', href: 'https://www.fidelity.com/learning-center/trading-investing/compound-interest?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-coral' },
  { title: 'What Is a Dividend?', description: 'Learn why some companies distribute part of their earnings to shareholders.', category: 'Growing wealth', source: 'Fidelity', href: 'https://www.fidelity.com/learning-center/smart-money/what-is-a-dividend?utm_source=chatgpt.com', time: '5 min read', level: 'Beginner', tone: 'lesson-green' },
  { title: 'Known Investment Scams', description: 'Learn to recognise Ponzi schemes, fake platforms and unregistered operators.', category: 'Investor protection', source: 'SEC Nigeria', href: 'https://sec.gov.ng/for-investors/known-investment-scams/?utm_source=chatgpt.com', time: '7 min read', level: 'Essential', tone: 'lesson-coral' },
  { title: 'How to Avoid Investment Scams', description: 'Identify common fraud tactics, unrealistic promises and pressure-selling techniques.', category: 'Investor protection', source: 'Investor.gov', href: 'https://www.investor.gov/protect-your-investments/fraud/protect-your-money?utm_source=chatgpt.com', time: '6 min read', level: 'Essential', tone: 'lesson-blue' },
];

export default function Home() {
  const [isApp, setIsApp] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [tab, setTab] = useState<Tab>('save');
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [allocation, setAllocation] = useState(30);
  const [selectedStock, setSelectedStock] = useState('Apple');
  const [completedLesson, setCompletedLesson] = useState(false);
  const [notice, setNotice] = useState('');

  const enterApp = () => {
    setShowAuth(false);
    setIsApp(true);
  };
  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2800);
  };

  if (!isApp)
    return (
      <Landing
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        authMode={authMode}
        setAuthMode={setAuthMode}
        enterApp={enterApp}
      />
    );

  return (
    <main className="app-shell">
      <aside className="side-nav">
        <button className="brand side-brand" aria-label="Ajova" onClick={() => setIsApp(false)} />
        <div className="side-label">YOUR MONEY</div>
        <button className={`side-link ${tab === 'save' ? 'active' : ''}`} onClick={() => setTab('save')}>
          <span>◒</span> Save
        </button>
        <button className={`side-link ${tab === 'invest' ? 'active' : ''}`} onClick={() => setTab('invest')}>
          <span>↗</span> Invest
        </button>
        <button className={`side-link ${tab === 'learn' ? 'active' : ''}`} onClick={() => setTab('learn')}>
          <span>✦</span> Learn
        </button>
        <div className="side-bottom">
          <button className="side-link">
            <span>?</span> Help center
          </button>
          <button className="profile-mini" onClick={() => flash('Profile settings are coming next.')}>
            <span className="avatar">AM</span>
            <span>
              <b>Amaka Mensah</b>
              <small>Personal account</small>
            </span>
            <i>•••</i>
          </button>
        </div>
      </aside>
      <div className="app-content">
        <header className="app-header">
          <div className="mobile-brand brand" aria-label="Ajova" />
          <div className="breadcrumb">
            {tab === 'save' ? 'Savings' : tab === 'invest' ? 'Investments' : 'Learn'}
            <span> / </span>
            <b>{tab === 'save' ? 'Overview' : tab === 'invest' ? 'My portfolio' : 'For you'}</b>
          </div>
          <div className="header-actions">
            <button className="icon-button" onClick={() => flash('You’re all caught up.')} aria-label="Notifications">
              ♧<span className="notification-dot" />
            </button>
            <button className="avatar header-avatar" onClick={() => flash('Profile settings are coming next.')}>
              AM
            </button>
          </div>
        </header>
        {tab === 'save' && <SaveView onNotice={flash} />}
        {tab === 'invest' && (
          <InvestView
            allocation={allocation}
            setAllocation={setAllocation}
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
            onNotice={flash}
          />
        )}
        {tab === 'learn' && (
          <LearnView
            completed={completedLesson}
            onComplete={() => {
              setCompletedLesson(true);
              flash('Lesson marked complete.');
            }}
          />
        )}
      </div>
      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}

function Landing({
  showAuth,
  setShowAuth,
  authMode,
  setAuthMode,
  enterApp,
}: {
  showAuth: boolean;
  setShowAuth: (value: boolean) => void;
  authMode: 'signup' | 'login';
  setAuthMode: (mode: 'signup' | 'login') => void;
  enterApp: () => void;
}) {
  return (
    <main className="landing-page">
      <nav className="landing-nav content-width">
        <button className="brand" aria-label="Ajova" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <div className="landing-links">
          <a href="#how">How it works</a>
          <a href="#learn">Learn</a>
        </div>
        <div className="nav-actions">
          <button
            className="text-button"
            onClick={() => {
              setAuthMode('login');
              setShowAuth(true);
            }}
          >
            Sign in
          </button>
          <button
            className="small-button"
            onClick={() => {
              setAuthMode('signup');
              setShowAuth(true);
            }}
          >
            Get started <span>↗</span>
          </button>
        </div>
      </nav>
      <section className="hero content-width">
        <div className="hero-copy reveal">
          <p className="eyebrow">A softer way to build wealth</p>
          <h1>
            Save together.
            <br />
            <em>Grow together.</em>
          </h1>
          <p className="hero-text">
            Join a savings circle, receive your payout, and turn a portion of it into investments in the global stock
            market.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setShowAuth(true)}>
              Get started <span>↗</span>
            </button>
            <a className="under-link" href="#how">
              See how it works <span>↓</span>
            </a>
          </div>
        </div>
        <div className="hero-art reveal-delay" aria-label="Savings payout and investment preview">
          <div className="sun-orbit orbit-one" />
          <div className="sun-orbit orbit-two" />
          <div className="payout-card">
            <div className="mini-label">
              NEXT PAYOUT <span>AVAILABLE</span>
            </div>
            <strong>₦100,000</strong>
            <div className="payout-meta">
              <span>Family Ajo</span>
              <span>Nov 30, 2026</span>
            </div>
          </div>
          <div className="growth-card">
            <div className="growth-top">
              <span className="tiny-avatar">AM</span>
              <span>AMAKA&apos;S PORTFOLIO</span>
              <b>+18.4%</b>
            </div>
            <strong>$925.20</strong>
            <svg viewBox="0 0 310 105" role="img" aria-label="Portfolio growth chart">
              <path d="M0 92 C35 86 43 58 76 70 C105 81 109 40 136 52 C163 64 176 25 201 37 C224 48 234 12 259 25 C280 36 290 8 310 4" />
            </svg>
            <div className="chart-labels">
              <span>JUL</span>
              <span>NOW</span>
            </div>
          </div>
          <div className="floating-note">
            <span>✦</span> Your money has momentum
          </div>
        </div>
      </section>
      <section className="trust-strip">
        <div className="content-width trust-inner">
          <span>Built for real life, real goals</span>
          <span>Save with your people</span>
          <span>Invest at your pace</span>
          <span>Learn without the jargon</span>
        </div>
      </section>
      <section className="steps-section content-width" id="how">
        <div className="section-intro">
          <p className="eyebrow">Simple by design</p>
          <h2>
            Your money, moving
            <br />
            <em>with intention.</em>
          </h2>
          <p>
            Ajova brings the community of traditional ajo and the possibility of the global market into one calm, clear
            place.
          </p>
        </div>
        <div className="step-grid">
          <article>
            <span className="step-number">01</span>
            <div className="step-icon coral-icon">♧</div>
            <h3>Start with your circle</h3>
            <p>
              Create or join a group with people you trust. Choose what feels comfortable and contribute on your
              schedule.
            </p>
          </article>
          <article>
            <span className="step-number">02</span>
            <div className="step-icon teal-icon">↗</div>
            <h3>Grow your pool</h3>
            <p>Keep up with contributions and watch your group move toward its next shared payout.</p>
          </article>
          <article>
            <span className="step-number">03</span>
            <div className="step-icon yellow-icon">✦</div>
            <h3>Make it go further</h3>
            <p>When your payout arrives, keep it in cash or put a portion to work in companies you know.</p>
          </article>
        </div>
      </section>
      <section className="landing-close" id="learn">
        <div className="content-width close-inner">
          <div>
            <p className="eyebrow">A little more confidence, every day</p>
            <h2>Learn as you grow.</h2>
            <p>Short, friendly lessons that make financial ideas feel useful, not intimidating.</p>
          </div>
          <button className="outline-light" onClick={() => setShowAuth(true)}>
            Explore Ajova <span>↗</span>
          </button>
        </div>
      </section>
      <footer className="landing-footer content-width">
        <div className="brand footer-brand" aria-label="Ajova" />
        <span>Save together. Grow together.</span>
        <span>© 2026 Ajova</span>
      </footer>
      {showAuth && (
        <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setShowAuth(false)} onEnter={enterApp} />
      )}
    </main>
  );
}

function AuthModal({
  mode,
  setMode,
  onClose,
  onEnter,
}: {
  mode: 'signup' | 'login';
  setMode: (mode: 'signup' | 'login') => void;
  onClose: () => void;
  onEnter: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="auth-mark" aria-label="Ajova" />
        <p className="eyebrow">Welcome to Ajova</p>
        <h2>{mode === 'signup' ? 'Let&apos;s grow your money.' : 'Welcome back, Amaka.'}</h2>
        <p className="modal-copy">
          {mode === 'signup'
            ? 'Create your account and take the first step with your circle.'
            : 'Sign in to pick up where you left off.'}
        </p>
        <label>
          Email address
          <input type="email" placeholder="you@example.com" />
        </label>
        {mode === 'signup' && (
          <label>
            Full name
            <input type="text" placeholder="Amaka Mensah" />
          </label>
        )}
        <label>
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="primary-button full-button" onClick={onEnter}>
          {mode === 'signup' ? 'Create my account' : 'Sign in'} <span>↗</span>
        </button>
        <p className="auth-switch">
          {mode === 'signup' ? 'Already have an account?' : 'New to Ajova?'}{' '}
          <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
            {mode === 'signup' ? 'Sign in' : 'Create an account'}
          </button>
        </p>
        <small className="demo-note">Demo mode · no real account required</small>
      </section>
    </div>
  );
}

function SaveView({ onNotice }: { onNotice: (message: string) => void }) {
  return (
    <div className="view-wrap">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Thursday, November 20, 2026</p>
          <h1>
            Good morning, Amaka <span>✦</span>
          </h1>
          <p>Here&apos;s the shape of your money today.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Group creation flow opened.')}>
          ＋ Create a group
        </button>
      </div>
      <div className="stat-grid">
        <div className="stat-card stat-dark">
          <span>Total saved</span>
          <strong>₦380,000</strong>
          <small>
            ↑ 12.5% <em>this month</em>
          </small>
          <div className="mini-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="stat-card">
          <span>Payouts received</span>
          <strong>₦240,000</strong>
          <small className="muted">Across 2 groups</small>
          <div className="stat-spark">↗</div>
        </div>
        <div className="stat-card">
          <span>Next contribution</span>
          <strong>₦30,000</strong>
          <small className="muted">Due in 11 days</small>
          <div className="due-badge">DEC 1</div>
        </div>
      </div>
      <div className="section-row">
        <div>
          <p className="eyebrow">Your circles</p>
          <h2>Keep the rhythm going.</h2>
        </div>
        <button className="under-link" onClick={() => onNotice('Showing all savings groups.')}>
          View all <span>→</span>
        </button>
      </div>
      <div className="group-grid">
        {groups.map((group) => (
          <article className={`group-card ${group.color}`} key={group.name}>
            <div className="card-top">
              <div className="group-avatar">{group.name.charAt(0)}</div>
              <span className="status">
                <i /> Active
              </span>
              <button className="more-button" onClick={() => onNotice(`${group.name} options opened.`)}>
                •••
              </button>
            </div>
            <h3>{group.name}</h3>
            <p className="group-amount">
              {group.amount} <span>/ month</span>
            </p>
            <div className="group-details">
              <span>
                <b>{group.members}</b> members
              </span>
              <span>
                <b>{group.position}</b> payout position
              </span>
            </div>
            <div className="progress-line">
              <i style={{ width: group.name === 'Family Ajo' ? '40%' : '25%' }} />
            </div>
            <div className="group-footer">
              <span>Round {group.round}</span>
              <span>Next: {group.date}</span>
            </div>
            <button
              className="card-click"
              onClick={() => onNotice(`${group.name} details opened.`)}
              aria-label={`Open ${group.name}`}
            />
          </article>
        ))}
      </div>
      <div className="dashboard-lower">
        <div className="activity-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h2>Your money in motion</h2>
            </div>
            <button className="under-link" onClick={() => onNotice('Showing transaction history.')}>
              See history →
            </button>
          </div>
          <div className="activity-item">
            <span className="activity-icon cash">₦</span>
            <span>
              <b>Contribution made</b>
              <small>Family Ajo · Today</small>
            </span>
            <strong>- ₦20,000</strong>
          </div>
          <div className="activity-item">
            <span className="activity-icon invest">✦</span>
            <span>
              <b>Payout invested</b>
              <small>Apple · Nov 01</small>
            </span>
            <strong className="positive">+ ₦30,000</strong>
          </div>
          <div className="activity-item">
            <span className="activity-icon cash">₦</span>
            <span>
              <b>Payout received</b>
              <small>Sunday Circle · Oct 08</small>
            </span>
            <strong className="positive">+ ₦80,000</strong>
          </div>
        </div>
        <div className="tip-panel">
          <span className="tip-spark">✦</span>
          <p className="eyebrow">A small nudge</p>
          <h3>Consistency is your superpower.</h3>
          <p>One contribution at a time, you&apos;re building a future that feels more like yours.</p>
          <button className="under-link" onClick={() => onNotice('Opening your learning path.')}>
            Explore a lesson →
          </button>
        </div>
      </div>
    </div>
  );
}

function InvestView({
  allocation,
  setAllocation,
  selectedStock,
  setSelectedStock,
  onNotice,
}: {
  allocation: number;
  setAllocation: (value: number) => void;
  selectedStock: string;
  setSelectedStock: (value: string) => void;
  onNotice: (message: string) => void;
}) {
  const investment = Math.round((100000 * allocation) / 100);
  return (
    <div className="view-wrap">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Your long-term view</p>
          <h1>
            Make your money <em>curious.</em>
          </h1>
          <p>A little ownership in the things shaping the world.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Payout allocation flow opened.')}>
          Invest a payout <span>↗</span>
        </button>
      </div>
      <div className="portfolio-hero">
        <div>
          <p className="eyebrow">Total portfolio value</p>
          <strong>$925.20</strong>
          <span className="portfolio-gain">+$143.80 · +18.4% all time</span>
        </div>
        <svg viewBox="0 0 530 160" role="img" aria-label="Portfolio performance">
          <path
            className="chart-fill"
            d="M0 139 C50 128 66 101 104 111 C146 122 163 75 211 90 C255 106 273 44 311 60 C351 76 370 39 402 50 C444 63 462 20 530 4 L530 160 L0 160 Z"
          />
          <path
            className="portfolio-line"
            d="M0 139 C50 128 66 101 104 111 C146 122 163 75 211 90 C255 106 273 44 311 60 C351 76 370 39 402 50 C444 63 462 20 530 4"
          />
        </svg>
        <div className="range-tabs">
          <button>1W</button>
          <button className="active">1M</button>
          <button>3M</button>
          <button>ALL</button>
        </div>
      </div>
      <div className="section-row holdings-heading">
        <div>
          <p className="eyebrow">Your holdings</p>
          <h2>Small pieces of big ideas.</h2>
        </div>
        <button className="under-link" onClick={() => onNotice('Showing all holdings.')}>
          View all →
        </button>
      </div>
      <div className="holdings-list">
        {holdings.map((holding) => (
          <button
            className="holding-row"
            key={holding.company}
            onClick={() => onNotice(`${holding.company} details opened.`)}
          >
            <span className="company-mark" style={{ backgroundColor: holding.color }}>
              {holding.mark}
            </span>
            <span className="holding-name">
              <b>{holding.company}</b>
              <small>
                {holding.ticker} · {holding.units}
              </small>
            </span>
            <span className="holding-value">
              <b>{holding.value}</b>
              <small className={holding.change.startsWith('+') ? 'positive' : 'negative'}>{holding.change}</small>
            </span>
            <span className="row-arrow">→</span>
          </button>
        ))}
      </div>
      <div className="allocation-panel">
        <div>
          <p className="eyebrow">Next payout · Family Ajo</p>
          <h2>Give your payout a direction.</h2>
          <p>Choose how much of your ₦100,000 payout you&apos;d like to invest. You can always choose cash.</p>
          <div className="allocation-figures">
            <span>
              Cash withdrawal <b>₦{(100000 - investment).toLocaleString()}</b>
            </span>
            <span>
              Investment <b>₦{investment.toLocaleString()}</b>
            </span>
          </div>
        </div>
        <div className="allocation-control">
          <div className="allocation-value">
            <strong>{allocation}%</strong>
            <span>invested</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={allocation}
            onChange={(event) => setAllocation(Number(event.target.value))}
          />
          <div className="range-labels">
            <span>0% cash</span>
            <span>100% invested</span>
          </div>
          <div className="preset-row">
            {[0, 25, 50, 75, 100].map((value) => (
              <button className={allocation === value ? 'active' : ''} key={value} onClick={() => setAllocation(value)}>
                {value}%
              </button>
            ))}
          </div>
          <button
            className="primary-button full-button"
            onClick={() => onNotice(`${selectedStock} investment review opened for ₦${investment.toLocaleString()}.`)}
          >
            Continue with {selectedStock} <span>↗</span>
          </button>
        </div>
      </div>
      <div className="stock-picker">
        <div>
          <p className="eyebrow">Curated for you</p>
          <h2>Companies you can own.</h2>
        </div>
        <div className="stock-options">
          {holdings.map((holding) => (
            <button
              className={`stock-option ${selectedStock === holding.company ? 'selected' : ''}`}
              onClick={() => setSelectedStock(holding.company)}
              key={holding.company}
            >
              <span className="company-mark" style={{ backgroundColor: holding.color }}>
                {holding.mark}
              </span>
              <b>{holding.company}</b>
              <small>{holding.ticker}</small>
              <strong>{holding.company === 'Apple' ? '$270' : holding.company === 'NVIDIA' ? '$180' : '$350'}</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LearnView({ completed, onComplete }: { completed: boolean; onComplete: () => void }) {
  return (
    <div className="view-wrap learn-view">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Your learning space</p>
          <h1>
            Make money make <em>sense.</em>
          </h1>
          <p>Build your financial knowledge, one lesson at a time.</p>
        </div>
        <div className="learning-progress">
          <span>YOUR PROGRESS</span>
          <strong>{completed ? '1' : '0'} / 12 lessons</strong>
          <div>
            <i style={{ width: completed ? '8%' : '2%' }} />
          </div>
        </div>
      </div>
      <div className="featured-lesson">
        <div className="feature-art">
          <span>✦</span>
          <div className="art-line line-a" />
          <div className="art-line line-b" />
          <div className="art-note">THE BASICS</div>
        </div>
        <div className="featured-copy">
          <p className="eyebrow">Featured lesson · {lessons[4].time}</p>
          <h2>
            What are
            <br />
            stocks?
          </h2>
          <p>{lessons[4].description} Start here, no jargon necessary.</p>
          <a className="primary-button" href={lessons[4].href} target="_blank" rel="noreferrer" onClick={onComplete}>
            {completed ? 'Completed ✓' : 'Start learning'} <span>↗</span>
          </a>
        </div>
      </div>
      <div className="section-row">
        <div>
          <p className="eyebrow">Browse by topic</p>
          <h2>Find your next aha moment.</h2>
        </div>
        <button className="under-link">View all →</button>
      </div>
      <div className="topic-row">
        <button className="topic active">
          All lessons <span>12</span>
        </button>
        <button className="topic">Personal finance</button>
        <button className="topic">Saving</button>
        <button className="topic">Investing basics</button>
        <button className="topic">Risk & diversification</button>
      </div>
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <article className="lesson-card" key={lesson.title}>
            <div className={`lesson-art ${lesson.tone}`}>
              <span>{lesson.category === 'Investor protection' ? '!' : lesson.category === 'Growing wealth' ? '✦' : '◉'}</span>
            </div>
            <p className="lesson-category">{lesson.category}</p>
            <h3>{lesson.title}</h3>
            <p className="lesson-description">{lesson.description}</p>
            <div className="lesson-meta">
              <span>{lesson.time}</span>
              <span>{lesson.level}</span>
              <span>{lesson.source}</span>
            </div>
            <a className="lesson-link" href={lesson.href} target="_blank" rel="noreferrer" onClick={onComplete}>
              Read on {lesson.source} →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
