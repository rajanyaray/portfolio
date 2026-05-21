import React, { useState, useEffect, useRef, useCallback } from 'react';
import './About.css';

/* ══════════════════════════════════════════════════════════════
   SECTION BADGE
══════════════════════════════════════════════════════════════ */
const SectionBadge = ({ number }) => (
  <div className="section-badge">
    <span className="badge-star">✦</span>
    SECTION {number}
    <span className="badge-star">✦</span>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   SPLIT ANIMATED HEADING
══════════════════════════════════════════════════════════════ */
const SplitHeading = ({ text }) => (
  <h2 className="split-heading" aria-label={text}>
    {text.split('').map((char, i) => (
      <span key={i} className="split-char" style={{ '--ci': i }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </h2>
);

/* ══════════════════════════════════════════════════════════════
   ROTATING TAGLINE
══════════════════════════════════════════════════════════════ */
const WORDS = ['Developer', 'Designer', 'Dreamer', 'Builder', 'Creator'];

const Tagline = () => {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(i => (i + 1) % WORDS.length); setVis(true); }, 360);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <p className="hero-tagline">
      Get to know me, my work, and what drives me as a{' '}
      <span className={`hero-word ${vis ? 'hw-in' : 'hw-out'}`}>{WORDS[idx]}</span>
    </p>
  );
};

/* ══════════════════════════════════════════════════════════════
   ABOUT CARD  (inspired by cowardly-eagle-56)
   — rotating conic-gradient border + glare shine
══════════════════════════════════════════════════════════════ */
const AboutCard = () => (
  <div className="container noselect">
    <div className="canvas">
      {[...Array(9)].map((_, i) => (
        <div key={i} className={`tracker tr-${i + 1}`} />
      ))}
      <div id="ab-card">
        <div className="card-content">
          <div className="card-glare" />
          <div className="cyber-lines">
            <span /><span /><span /><span />
          </div>
          <div className="corner-elements">
            <span /><span /><span /><span />
          </div>
          <div className="scan-line" />

          <div className="glowing-elements">
            <div className="glow-1" />
            <div className="glow-2" />
            <div className="glow-3" />
          </div>

          <div className="card-particles">
            <span /><span /><span /><span /><span /><span />
          </div>

          {/* ── ACTUAL CONTENT ── */}
          <div className="ac-inner">
            <div className="ac-badge">
              <span className="ac-badge-dot" />
              ABOUT ME
            </div>
            <h3 className="ac-name">
              I'm{' '}
              <span className="ac-name-grad">Rajanya Ray</span>
            </h3>
            <p className="ac-headline">
              A passionate developer who loves building intelligent,
              user-focused digital experiences.
            </p>
            <p className="ac-bio">
              Full Stack Developer &amp; AIML enthusiast from Kolkata, India.
              I blend creativity with code to build scalable web apps and
              explore the exciting world where AI meets real-world problems.
              I make code that ships. ⚡
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   PICTURE + SKILL BOXES  (inspired by tasty-frog-49)
══════════════════════════════════════════════════════════════ */
const SKILLS = [
  { icon: '⚡', label: 'Full Stack Dev',    sub: 'MERN · Next.js · Tailwind', col: '#06b6d4', pos: 'tl' },
  { icon: '🧠', label: 'AIML Explorer',    sub: 'Python · ML · AI Tools',   col: '#a855f7', pos: 'tr' },
  { icon: '🎨', label: 'Creative Designer', sub: 'UI/UX · Graphics · Art',  col: '#f59e0b', pos: 'bl' },
  { icon: '🔥', label: 'Problem Solver',   sub: 'DSA · System Design',      col: '#10b981', pos: 'br' },
];

const SkillBox = ({ icon, label, sub, col }) => (
  <div className="sb-card" style={{ '--sc': col }}>
    <div className="sb-border-glow" />
    <div className="sb-content">
      <span className="sb-icon">{icon}</span>
      <div>
        <div className="sb-label">{label}</div>
        <div className="sb-sub">{sub}</div>
      </div>
    </div>
  </div>
);

const PictureSector = () => {
  const ref = useRef(null);

  const onMove = useCallback(e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -12;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  }, []);

  return (
    <div className="ps-wrapper" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
         style={{ transition: 'transform 0.4s ease' }}>
      <div className="ps-grid">
        {/* Corner skill boxes */}
        {SKILLS.map(s => (
          <div key={s.pos} className={`ps-slot ps-slot-${s.pos}`}>
            <SkillBox {...s} />
          </div>
        ))}
        {/* Center picture */}
        <div className="ps-center">
          <div className="ps-halo" />
          <img src="/about.png" alt="Rajanya Ray" className="ps-img" />
          <div className="ps-ring ps-r1" />
          <div className="ps-ring ps-r2" />
          <div className="ps-ring ps-r3" />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   TIME / WEATHER CARD  (Novaxlo - brown-dolphin-19)
══════════════════════════════════════════════════════════════════ */
const TimeWeather = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');

  return (
    <div className="card-time-cloud">
      <div className="card-time-cloud-front" />
      <div className="card-time-cloud-back">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ed782a" d="M39.1,-11.5C46.9,11.5,47,38.1,34.9,46.6C22.8,55.1,-1.6,45.4,-16.5,32.3C-31.3,19.2,-36.8,2.8,-32.4,-15.3C-28.1,-33.4,-14.1,-53,0.8,-53.3C15.6,-53.5,31.2,-34.4,39.1,-11.5Z" transform="translate(100 100)" />
        </svg>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ed782a" d="M39.1,-11.5C46.9,11.5,47,38.1,34.9,46.6C22.8,55.1,-1.6,45.4,-16.5,32.3C-31.3,19.2,-36.8,2.8,-32.4,-15.3C-28.1,-33.4,-14.1,-53,0.8,-53.3C15.6,-53.5,31.2,-34.4,39.1,-11.5Z" transform="translate(100 100)" />
        </svg>
      </div>
      <p className="card-time-cloud-day">{day}</p>
      <p className="card-time-cloud-day-number">{date}</p>
      <p className="card-time-cloud-hour">{hh}:{mm}</p>
      <div className="card-time-cloud-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 22H16" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 19H19" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 16H22" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z" stroke="#ed782a" strokeWidth="1.44" />
          <path d="M12 2V3" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
          <path d="M22 12L21 12" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
          <path d="M3 12L2 12" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
          <path d="M19.0708 4.92969L18.678 5.32252" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
          <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#ed782a" strokeWidth="1.44" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   STATS CIRCLES  (inspired by helpless-moose-39)
══════════════════════════════════════════════════════════════ */
const STATS = [
  { n: 5,  suf: '+', label: 'Hackathons', col: '#7c3aed' },
  { n: 10, suf: '+', label: 'Skills',     col: '#06b6d4' },
  { n: 3,  suf: '+', label: 'Projects',   col: '#f59e0b' },
];

const RingCounter = ({ n, suf, label, col }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const C   = 2 * Math.PI * 34;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let i = 0;
      const tick = () => { i++; setVal(i); if (i < n) setTimeout(tick, 70 + i * 5); };
      tick();
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [n]);

  return (
    <div className="rc-item" ref={ref}>
      <div className="rc-circle" style={{ '--rc': col }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <circle
            cx="40" cy="40" r="34"
            fill="none" stroke={col} strokeWidth="5"
            strokeDasharray={`${(val / n) * C} ${C}`}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
            style={{ filter: `drop-shadow(0 0 6px ${col})`, transition: 'stroke-dasharray 0.05s' }}
          />
        </svg>
        <div className="rc-count">{val}{suf}</div>
      </div>
      <div className="rc-label">{label}</div>
    </div>
  );
};

const StatsPanel = () => (
  <div className="stats-panel">
    <div className="sp-title">✦ HIGHLIGHTS ✦</div>
    <div className="sp-row">
      {STATS.map(s => <RingCounter key={s.label} {...s} />)}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   CURRENTLY WORKING ON  (inspired by wicked-lionfish-83)
   — scan-line effect, reveal on hover
══════════════════════════════════════════════════════════════ */
const CurrentlyWorkingOn = () => {
  const [on, setOn] = useState(false);

  return (
    <div
      className={`cwo-card ${on ? 'cwo-on' : ''}`}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <div className="cwo-scan" />
      <div className="cwo-corner cwo-c1" />
      <div className="cwo-corner cwo-c2" />
      <div className="cwo-corner cwo-c3" />
      <div className="cwo-corner cwo-c4" />

      {/* Front face */}
      <div className="cwo-face cwo-face-f">
        <div className="cwo-gear">⚙️</div>
        <div className="cwo-label">Currently<br />Working On</div>
        <div className="cwo-arr">→</div>
      </div>

      {/* Back face */}
      <div className="cwo-face cwo-face-b">
        <div className="cwo-proj-ico">🔐</div>
        <div className="cwo-proj-name">CipherClash</div>
        <div className="cwo-proj-sub">A cryptography challenge platform</div>
        <div className="cwo-live">
          <span className="cwo-live-dot" />
          <span className="cwo-live-txt">Active</span>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   HORIZONTAL TIMELINE
══════════════════════════════════════════════════════════════ */
const TL_EVENTS = [
  { year: '2019',    title: 'School Days',      desc: 'Discovered love for problem-solving on paper',    icon: '🎒', col: '#f59e0b' },
  { year: '2021',    title: 'First Code',        desc: 'Learned C++ & entered the world of web dev',     icon: '</>',col: '#06b6d4' },
  { year: '2022–24', title: 'College Journey',   desc: 'B.Tech CS, Full Stack & AIML technologies',      icon: '🎓', col: '#7c3aed' },
  { year: '2023–24', title: 'Project Building',  desc: 'Burned, learned & grew as a developer',          icon: '🚀', col: '#10b981' },
  { year: '2025 ∞',  title: 'Future Goals',      desc: 'Impactful tech & AI-driven products',            icon: '🎯', col: '#ef4444' },
];

const Timeline = () => {
  const [active, setActive] = useState(null);
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFilled(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="tl-wrapper" ref={ref}>
      <div className="tl-track">
        {/* Connecting line */}
        <div className="tl-line">
          <div className="tl-fill" style={{ width: filled ? '100%' : '0%' }} />
          <div className="tl-glow-dot" style={{ left: filled ? 'calc(100% - 6px)' : '0' }} />
        </div>

        {TL_EVENTS.map((ev, i) => (
          <div
            key={ev.year}
            className={`tl-node ${active === i ? 'tl-active' : ''}`}
            style={{ '--ec': ev.col, '--ei': i }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Dot */}
            <div className="tl-dot">
              <span className="tl-dot-icon">{ev.icon}</span>
              <div className="tl-dot-pulse" />
              <div className="tl-dot-pulse tl-dp2" />
            </div>
            {/* Connector to card */}
            <div className="tl-stem" />
            {/* Info card */}
            <div className={`tl-card ${i % 2 === 0 ? 'tl-card-down' : 'tl-card-up'}`}>
              <div className="tlc-year">{ev.year}</div>
              <div className="tlc-title">{ev.title}</div>
              <div className="tlc-desc">{ev.desc}</div>
              <div className="tlc-arrow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   HOBBIES CARD  (inspired by cuddly-catfish-6)
══════════════════════════════════════════════════════════════ */
const HOBBIES = [
  { icon: '📸', title: 'Photography',   desc: 'Capturing light, moments & quiet beauty in everyday life', col: '#f59e0b' },
  { icon: '✏️', title: 'Art & Sketching', desc: 'Pencil sketches, digital art & bringing ideas to paper', col: '#a855f7' },
  { icon: '🖌️', title: 'Graphic Design', desc: 'Posters, visuals & UI designs that fuse art with code',  col: '#06b6d4' },
];

const HobbiesCard = () => {
  const [sel, setSel] = useState(0);

  return (
    <div className="hob-card">
      <div className="hob-stripe" />
      <div className="hob-head">
        <span className="hob-head-ico">🎭</span>
        <div>
          <div className="hob-head-title">OTHER HOBBIES</div>
          <div className="hob-head-sub">Beyond coding, I love creative arts</div>
        </div>
      </div>
      <div className="hob-tabs">
        {HOBBIES.map((h, i) => (
          <button
            key={h.title}
            className={`hob-tab ${sel === i ? 'hob-tab-on' : ''}`}
            style={{ '--hc': h.col }}
            onClick={() => setSel(i)}
          >
            <span className="ht-ico">{h.icon}</span>
            <span>{h.title}</span>
            {sel === i && <span className="ht-active-bar" />}
          </button>
        ))}
      </div>
      <div className="hob-panel" style={{ '--hc': HOBBIES[sel].col }}>
        <div className="hp-icon">{HOBBIES[sel].icon}</div>
        <div className="hp-title">{HOBBIES[sel].title}</div>
        <div className="hp-desc">{HOBBIES[sel].desc}</div>
        <div className="hp-tag-row">
          <span className="hp-tag" style={{ '--hc': HOBBIES[sel].col }}>Creative</span>
          <span className="hp-tag" style={{ '--hc': HOBBIES[sel].col }}>Passion</span>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SHOWCASE GALLERY  (inspired by tough-baboon-50)
══════════════════════════════════════════════════════════════ */
const SHOWCASE = [
  { title: 'Pencil Sketch',   cat: 'Artwork',         bg: 'linear-gradient(135deg,#f5f0ea,#d4c9be)', emoji: '✏️', accent: '#a78bfa' },
  { title: 'TechFlow UI',     cat: 'UI/UX Design',    bg: 'linear-gradient(135deg,#1a1a2e,#0f3460)', emoji: '💻', accent: '#06b6d4' },
  { title: 'Code. Create.',   cat: 'Graphic Poster',  bg: 'linear-gradient(135deg,#f953c6,#b91d73,#7c3aed)', emoji: '🎨', accent: '#f59e0b' },
];

const Showcase = () => (
  <div className="sh-card">
    <div className="sh-head">
      <span>🖼️</span>&nbsp; CREATIVE SHOWCASE
    </div>
    <div className="sh-grid">
      {SHOWCASE.map((item, i) => (
        <div key={item.title} className="sh-item" style={{ '--si': i, '--sa': item.accent }}>
          <div className="sh-thumb" style={{ background: item.bg }}>
            <span className="sh-emoji">{item.emoji}</span>
            <div className="sh-overlay">
              <span className="sh-view-btn">View →</span>
            </div>
          </div>
          <div className="sh-info">
            <div className="sh-title">{item.title}</div>
            <div className="sh-cat">{item.cat}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   GLASSMORPHISM QUOTE
══════════════════════════════════════════════════════════════ */
const GlassQuote = () => (
  <div className="gq-wrap">
    <div className="gq-box">
      {/* Ambient orbs */}
      <div className="gq-orb gq-orb-1" />
      <div className="gq-orb gq-orb-2" />
      <div className="gq-orb gq-orb-3" />
      {/* Floating sparks */}
      {[...Array(12)].map((_, i) => (
        <span key={i} className="gq-spark" style={{ '--gi': i }} />
      ))}
      <div className="gq-content">
        <div className="gq-deco">✦ &nbsp; ✦ &nbsp; ✦</div>
        <h3 className="gq-text">
          This is <span className="gq-c1">Who I Am</span> —<br />
          A <span className="gq-c2">Coder,</span> a <span className="gq-c3">Dreamer.</span>
        </h3>
        <p className="gq-sub">Turning ideas into impactful experiences, one commit at a time.</p>
        <div className="gq-deco">✦ &nbsp; ✦ &nbsp; ✦</div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════ */
const About = () => (
  <div className="about-root" id="about">

    {/* ─────────────── SECTION 1 ─────────────────────────── */}
    <section className="ab-section ab-s1">
      <div className="ab-inner">
        <div className="ab-badge-row">
          <SectionBadge number="1" />
        </div>
        <SplitHeading text="WHO AM I?" />
        <Tagline />

        <div className="s1-main-grid">
          <AboutCard />
          <PictureSector />
        </div>

        <div className="s1-bottom-row">
          <TimeWeather />
          <StatsPanel />
          <CurrentlyWorkingOn />
        </div>
      </div>
    </section>

    {/* ─────────────── SECTION 2 ─────────────────────────── */}
    <section className="ab-section ab-s2">
      <div className="ab-inner">
        <div className="ab-badge-row">
          <SectionBadge number="2" />
        </div>
        <div className="s2-head-block">
          <h2 className="s2-heading">
            MY JOURNEY <span className="s2-amp">&amp;</span> INTERESTS
          </h2>
          <p className="s2-sub">
            The path that shaped me and the creative outlets that fuel my passion.
          </p>
        </div>

        <Timeline />

        <div className="s2-bottom-grid">
          <HobbiesCard />
          <Showcase />
        </div>

        <GlassQuote />
      </div>
    </section>

  </div>
);

export default About;