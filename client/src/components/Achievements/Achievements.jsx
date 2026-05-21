// achievements.jsx
// ─── Achievements Section — full-featured, effects-filled ───────────────────
// Requirements: React 18+, no extra deps (uses vanilla canvas for confetti)
// Assets expected in /src/assets/:
//   award1.png … award5.png, cert1.png … cert3.png
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useState, useCallback } from "react";
import "./Achievements.css";

// ── Award data ────────────────────────────────────────────────────────────────
const AWARDS = [
  {
    img: "/assets/award1.png",
    badge: "🏆",
    title: "SIH 2025 Winner",
    desc: "Smart India Hackathon — National Champion",
    color: "#ffb700",
  },
  {
    img: "/assets/award2.png",
    badge: "🥈",
    title: "SBH 2025 — 4th Position",
    desc: "Smart Bengal Hackathon — Top 5 Finalist",
    color: "#00f5ff",
  },
  {
    img: "/assets/award3.png",
    badge: "🎓",
    title: "MCKV Conference Finalist",
    desc: "Research paper finalist at MCKV Institute",
    color: "#b8ff3a",
  },
  {
    img: "/assets/award4.png",
    badge: "🤖",
    title: "GEN AI 2025 Finalist",
    desc: "Generative AI National Competition Finalist",
    color: "#b14aff",
  },
  {
    img: "/assets/award5.png",
    badge: "🚀",
    title: "Artpark Codeforge Finalist",
    desc: "IISc Bangalore — Artpark Codeforge Hackathon",
    color: "#ff2d78",
  },
];

// ── Certificate data ──────────────────────────────────────────────────────────
const CERTS = [
  { img: "/assets/cert1.png", icon: "📜", title: "Web Development", desc: "Full-Stack Certification" },
  { img: "/assets/cert2.png", icon: "🧠", title: "Machine Learning", desc: "ML Fundamentals + Projects" },
  { img: "/assets/cert3.png", icon: "☁️", title: "Cloud Computing", desc: "AWS Solutions Architect" },
];

// ── Leadership data ───────────────────────────────────────────────────────────
const LEADERSHIP = [
  { icon: "👑", title: "Tech Club Head", sub: "Led 200+ student developer community", color: "#ff2d78" },
  { icon: "🎙️", title: "Event Organiser", sub: "Orchestrated 3 inter-college hackathons", color: "#ffb700" },
  { icon: "🌱", title: "Open-Source Mentor", sub: "Guided 15 contributors in GSSoC'25", color: "#b8ff3a" },
];

// (Confetti burst removed)

// ── Side pulse orbs ───────────────────────────────────────────────────────────
const SideOrbs = ({ side }) => (
  <div className={`side-orb ${side}`}>
    <div className="side-orb-dot" />
    <div className="side-orb-dot" />
    <div className="side-orb-dot" />
    <div className="side-orb-dot" />
    <div className="side-orb-dot" />
  </div>
);

// ── Heading with pressure effect ─────────────────────────────────────────────
const PressureHeading = () => {
  const text = "ACHIEVEMENTS";
  return (
    <div className="ach-heading-wrap">
      <h1 className="ach-heading" aria-label={text}>
        {text.split("").map((ch, i) => (
          <span key={i} className="ach-heading-letter" style={{ animationDelay: `${i * 0.04}s` }}>
            {ch}
          </span>
        ))}
      </h1>
      <div className="ach-heading-bar" />
    </div>
  );
};

// ── Tagline ───────────────────────────────────────────────────────────────────
const Tagline = () => (
  <p className="ach-tagline">
    <span className="ach-tagline-text" data-text="Milestones that shaped the journey">
      Milestones that shaped the journey
    </span>
  </p>
);

// ── Award Carousel ────────────────────────────────────────────────────────────
const AwardCarousel = () => {
  const [center, setCenter] = useState(0);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  const advance = useCallback((dir = 1) => {
    setCenter((prev) => (prev + dir + AWARDS.length) % AWARDS.length);
  }, []);

  // auto-rotate
  const startAuto = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) advance(1);
    }, 3200);
  }, [advance]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, [startAuto]);

  const handleArrow = (dir) => {
    pausedRef.current = true;
    advance(dir);
    clearTimeout(timerRef._pauseTimeout);
    timerRef._pauseTimeout = setTimeout(() => {
      pausedRef.current = false;
    }, 5000);
  };

  // compute position index (-2..2) relative to center
  const getPos = (idx) => {
    let p = idx - center;
    const half = Math.floor(AWARDS.length / 2);
    if (p > half) p -= AWARDS.length;
    if (p < -half) p += AWARDS.length;
    return p;
  };

  return (
    <div className="ach-carousel-wrap">
      <span className="carousel-label">◈ Awards &amp; Recognition ◈</span>
      <div className="carousel-stage">
        {AWARDS.map((award, idx) => {
          const pos = getPos(idx);
          if (Math.abs(pos) > 2) return null;
          return (
            <div
              key={idx}
              className="award-card"
              data-pos={pos}
              onClick={() => {
                pausedRef.current = true;
                setCenter(idx);
                setTimeout(() => { pausedRef.current = false; }, 5000);
              }}
              style={{ "--accent": award.color }}
            >
              <img src={award.img} alt={award.title} draggable={false} />
              <div className="award-card-overlay">
                <div className="award-badge" style={{ borderColor: award.color, boxShadow: `0 0 14px ${award.color}` }}>
                  {award.badge}
                </div>
                <div className="award-title" style={{ color: award.color, textShadow: `0 0 10px ${award.color}` }}>
                  {award.title}
                </div>
                <div className="award-desc">{award.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-arrows">
        <button
          className="carousel-arrow"
          onClick={() => handleArrow(-1)}
          aria-label="Previous"
        >
          ←
        </button>
        {/* dots */}
        {AWARDS.map((_, i) => (
          <span
            key={i}
            onClick={() => { pausedRef.current = true; setCenter(i); setTimeout(() => { pausedRef.current = false; }, 5000); }}
            style={{
              width: i === center ? 18 : 7,
              height: 7,
              borderRadius: 4,
              background: i === center ? "var(--cyan)" : "rgba(255,255,255,0.2)",
              display: "inline-block",
              transition: "width 0.3s ease, background 0.3s ease",
              cursor: "pointer",
              boxShadow: i === center ? "0 0 8px var(--cyan)" : "none",
            }}
          />
        ))}
        <button
          className="carousel-arrow"
          onClick={() => handleArrow(1)}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  );
};

// ── Certificates ──────────────────────────────────────────────────────────────
const Certificates = () => (
  <div>
    <div className="sub-label cyan-label">Certificates</div>
    <div className="cert-grid">
      {CERTS.map((cert, i) => (
        <div className="cert-card" key={i}>
          <div className="cert-card-inner">
            <div className="cert-face cert-front">
              <img src={cert.img} alt={cert.title} draggable={false} />
            </div>
            <div className="cert-face cert-back">
              <div className="cert-back-icon">{cert.icon}</div>
              <div className="cert-back-title">{cert.title}</div>
              <div className="cert-back-desc">{cert.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Leadership ────────────────────────────────────────────────────────────────
const Leadership = () => (
  <div>
    <div className="sub-label pink-label">Leadership</div>
    <div className="leadership-cards">
      {LEADERSHIP.map((item, i) => (
        <div className="leader-card" key={i}>
          <div className="leader-icon">{item.icon}</div>
          <div className="leader-body">
            <div className="leader-title">{item.title}</div>
            <div className="leader-sub">{item.sub}</div>
          </div>
          <div className="leader-arrow">›</div>
        </div>
      ))}
    </div>
  </div>
);


// (Confetti corner buttons removed)

// (Cursor glow tracker removed)

// ── Main component ────────────────────────────────────────────────────────────
const Achievements = () => {
  return (
    <>
      <section className="achievements" id="achievements">
        {/* edge scanlines come from CSS ::before / ::after */}

        {/* side orb columns */}
        <SideOrbs side="left" />
        <SideOrbs side="right" />

        {/* (Confetti corners removed) */}

        <div className="ach-inner">
          <PressureHeading />
          <Tagline />

          <div className="ach-grid">
            {/* Row 1 — Awards Carousel */}
            <AwardCarousel />

            {/* Row 2 — Certificates + Leadership */}
            <div className="ach-bottom">
              <Certificates />
              <Leadership />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Achievements;