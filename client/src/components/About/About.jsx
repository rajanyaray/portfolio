import { useState, useEffect, useRef } from "react";
import "./About.css";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Live Clock ─────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = time.getHours();
  const mins = String(time.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = String(hours % 12 || 12).padStart(2, "0");
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dayName = days[time.getDay()];
  const dateStr = `${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}`;

  const greeting =
    hours >= 5 && hours < 12 ? "Good Morning 🌅" :
    hours >= 12 && hours < 17 ? "Good Afternoon ☀️" :
    hours >= 17 && hours < 21 ? "Good Evening 🌆" :
    "Good Night 🌙";

  const showMoon = hours >= 21 || hours < 5;

  const SunSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 22H16" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 19H19" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 16H22" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z" stroke="#a78bfa" strokeWidth="1.44"/>
      <path d="M12 2V3" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round"/>
      <path d="M22 12L21 12" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round"/>
      <path d="M3 12L2 12" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round"/>
      <path d="M19.0708 4.92969L18.678 5.32252" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round"/>
      <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round"/>
    </svg>
  );

  const MoonSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#a78bfa" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="card-time-cloud">
      <div className="card-time-cloud-front"></div>
      <div className="card-time-cloud-back">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#a78bfa" d="M39.1,-11.5C46.9,11.5,47,38.1,34.9,46.6C22.8,55.1,-1.6,45.4,-16.5,32.3C-31.3,19.2,-36.8,2.8,-32.4,-15.3C-28.1,-33.4,-14.1,-53,0.8,-53.3C15.6,-53.5,31.2,-34.4,39.1,-11.5Z" transform="translate(100 100)"/>
        </svg>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#a78bfa" d="M39.1,-11.5C46.9,11.5,47,38.1,34.9,46.6C22.8,55.1,-1.6,45.4,-16.5,32.3C-31.3,19.2,-36.8,2.8,-32.4,-15.3C-28.1,-33.4,-14.1,-53,0.8,-53.3C15.6,-53.5,31.2,-34.4,39.1,-11.5Z" transform="translate(100 100)"/>
        </svg>
      </div>
      <p className="card-time-cloud-day">{dayName}</p>
      <p className="card-time-cloud-day-number">{dateStr}</p>
      <p className="card-time-cloud-hour">{displayHours}:{mins} {ampm}</p>
      <p className="card-time-greeting">{greeting}</p>
      <p className="card-time-location">📍 Kolkata, India</p>
      <div className="card-time-cloud-icon">
        {showMoon ? <MoonSVG /> : <SunSVG />}
      </div>
    </div>
  );
}

// ── Stat Ring ──────────────────────────────────────────────────────────────
function StatRing({ icon, value, suffix, label, color, animate }) {
  const count = useCounter(value, 1600, animate);
  return (
    <div className="stat-ring-wrap">
      <div className="stat-ring" style={{ "--ring-color": color }}>
        <svg className="stat-svg" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" className="stat-track" />
          <circle
            cx="40" cy="40" r="34"
            className="stat-progress"
            style={{
              stroke: color,
              strokeDashoffset: animate ? 0 : 213,
              transition: "stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)",
            }}
          />
        </svg>
        <div className="stat-inner">
          <span className="stat-icon">{icon}</span>
          <span className="stat-num">{count}{suffix}</span>
        </div>
      </div>
      <span className="stat-label" style={{ color }}>{label}</span>
    </div>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────────
const timelineData = [
  { year: "2008", icon: "🎒", title: "Started School", color: "#a78bfa" },
  { year: "2023", icon: "🎓", title: "Started College", color: "#38bdf8" },
  { year: "May 2025", icon: "🏆", title: "SBH — 4th Place", color: "#34d399" },
  { year: "Dec 2025", icon: "🥇", title: "SIH Winner", color: "#fbbf24" },
  { year: "2026", icon: "🚀", title: "Technoverse Runner-up", color: "#f472b6" },
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function About() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [hoveredName, setHoveredName] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const traits = [
    { icon: "💡", label: "Problem Solver" },
    { icon: "⚡", label: "Quick Learner" },
    { icon: "🤝", label: "Team Player" },
    { icon: "🧠", label: "Curious Mind" },
    { icon: "📈", label: "Always Growing" },
  ];

  const techStack = ["HTML", "CSS", "JavaScript", "Python", "Flask", "MySQL", "React", "VS Code"];

  return (
    <section className="about-section" id="about">
      {/* ── Heading ─────────────────────────────────────────────────────── */}
      <div className="about-heading-wrap">
        <h2 className="about-heading">
          <span className="about-heading-word">WHO</span>{" "}
          <span className="about-heading-highlight">I AM</span>
        </h2>
        <div className="heading-line">
          <span className="heading-line-dot" />
        </div>
        <p className="about-subheading">Get to know the engineer behind the code.</p>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <div className="about-grid">
        {/* LEFT — About Card */}
        <div className="about-left">
          <div className="about-card">
            {/* trackers for 3D tilt */}
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`abt-tracker abt-tr-${i + 1}`} />
            ))}
            <div className="about-card-inner" id="abt-card">
              <div className="card-glare-overlay" />
              <div className="cyber-lines-overlay">
                <span /><span /><span /><span />
              </div>
              <div className="corner-els">
                <span /><span /><span /><span />
              </div>
              <div className="scan-overlay" />
                <div className="about-card-body">
                  {/* Photo */}
                  <div className="photo-col">
                    <div className="photo-frame-wrap">
                      <div className="photo-orbit orbit-1" />
                      <div className="photo-orbit orbit-2" />
                      <div className="photo-orbit orbit-3" />
                      <div className="photo-glow" />
                      <div className="photo-circle">
                        <div className="photo-placeholder">
                          <span className="photo-initials">R</span>
                        </div>
                      </div>
                      <div className="photo-dot dot-a" />
                      <div className="photo-dot dot-b" />
                      <div className="photo-dot dot-c" />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="bio-col">
                    <p className="bio-text">
                      This is{" "}
                      <span
                        className={`bio-name ${hoveredName ? "bio-name-hovered" : ""}`}
                        onMouseEnter={() => setHoveredName(true)}
                        onMouseLeave={() => setHoveredName(false)}
                      >
                        Rajanya
                        <span className="name-sparkle">✦</span>
                      </span>
                      ,
                    </p>
                    <p className="bio-para">
                      a tech-savvy, detail-oriented engineering student studying{" "}
                      <strong>Computer Science & Engineering (CSE IoT)</strong> at
                      Techno Main Salt Lake, Kolkata.
                    </p>
                    <p className="bio-para">
                      I love turning ideas into real-world solutions and exploring
                      the intersection of technology and human impact.
                    </p>
                    <div className="bio-divider" />

                    {/* More About Me label + trait buttons */}
                    <p className="more-about-label">MORE ABOUT ME</p>
                    <div className="trait-buttons">
                      {traits.map((t) => (
                        <button key={t.label} className="trait-btn">
                          <span className="trait-icon">{t.icon}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Stat Rings */}
                    <div className="stats-row" ref={statsRef}>
                      <StatRing icon="🏆" value={5} suffix="+" label="Hackathons" color="#a78bfa" animate={statsVisible} />
                      <StatRing icon="💼" value={8} suffix="+" label="Projects" color="#38bdf8" animate={statsVisible} />
                      <StatRing icon="⚙️" value={10} suffix="+" label="Skills" color="#34d399" animate={statsVisible} />
                    </div>
                  </div>

                  {/* Available badge — bottom left of card */}
                  <div className="available-badge">
                    <span className="avail-pulse" />
                    Available for Internships
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Clock + Current Project */}
        <div className="about-right">
          <LiveClock />

          {/* Currently Working On */}
          <div className="project-card">
            <div className="project-card-back">
              <div className="project-rotate-ring" />
              <div className="project-back-content">
                <div className="project-icon-box">
                  <span className="project-icon-inner">{"</>"}</span>
                </div>
                <strong>Hover to Explore</strong>
              </div>
            </div>
            <div className="project-card-front">
              <div className="project-header">
                <span className="project-header-label">CURRENTLY WORKING ON</span>
                <span className="project-active-dot"><span />Actively in development</span>
              </div>
              <div className="project-body">
                <div className="project-icon-sm">{"</>"}</div>
                <div>
                  <p className="project-title">Online Library Management System</p>
                  <p className="project-desc">
                    A web-based app to manage books, members, issue/return records
                    and admin operations efficiently.
                  </p>
                </div>
              </div>
              <div className="project-stack">
                {techStack.map((t) => (
                  <span key={t} className="stack-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <div className="timeline-section">
        <div className="timeline-header">
          <span className="timeline-label">MY JOURNEY SO FAR</span>
          <div className="timeline-header-line" />
        </div>
        <div className="timeline-track">
          <div className="timeline-line">
            <div className="timeline-line-glow" />
          </div>
          {timelineData.map((item, i) => (
            <div key={i} className="timeline-item" style={{ "--item-color": item.color }}>
              <div className="timeline-node">
                <div className="timeline-node-ring ring-outer" />
                <div className="timeline-node-ring ring-inner" />
                <span className="timeline-node-icon">{item.icon}</span>
              </div>
              <div className="timeline-card">
                <div className="timeline-card-glow" />
                <span className="timeline-year">{item.year}</span>
                <p className="timeline-title">{item.title}</p>
              </div>
            </div>
          ))}
          <div className="timeline-arrow">→</div>
        </div>
      </div>
    </section>
  );
}