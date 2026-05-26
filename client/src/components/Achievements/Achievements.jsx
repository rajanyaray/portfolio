import React, { useRef, useEffect, useState, useCallback, forwardRef } from "react";
import "./Achievements.css";

// ── Data ─────────────────────────────────────────────────────────────────────

const AWARDS = [
  { badge: "🏆", title: "SIH 2025 Winner", desc: "Smart India Hackathon — National Champion", color: "#ffb700", glow: "rgba(255,183,0,0.5)" },
  { badge: "🥈", title: "SBH 2025 — 4th Place", desc: "Smart Bengal Hackathon — Top 5 Finalist", color: "#00f5ff", glow: "rgba(0,245,255,0.5)" },
  { badge: "🎓", title: "MCKV Conference", desc: "Research Paper Finalist at MCKV Institute", color: "#b8ff3a", glow: "rgba(184,255,58,0.5)" },
  { badge: "🤖", title: "GEN AI 2025", desc: "Generative AI National Competition Finalist", color: "#b14aff", glow: "rgba(177,74,255,0.5)" },
  { badge: "🚀", title: "Artpark Codeforge", desc: "IISc Bangalore — Codeforge Hackathon Finalist", color: "#ff2d78", glow: "rgba(255,45,120,0.5)" },
];

const CERTS = [
  {
    id: "c1", title: "Web Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
  },
  {
    id: "c2", title: "Machine Learning",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=300&fit=crop",
  },
  {
    id: "c3", title: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
  },
];

const LEADERSHIP = [
  { icon: "👑", title: "Tech Club Head", sub: "Led 200+ student developer community", color: "#ff2d78" },
  { icon: "🎙️", title: "Event Organiser", sub: "Orchestrated 3 inter-college hackathons", color: "#ffb700" },
  { icon: "🌱", title: "Open-Source Mentor", sub: "Guided 15 contributors in GSSoC '25", color: "#b8ff3a" },
];

// ── Heading (uiverse codebykay101 inspired) ───────────────────────────────────

const AchHeading = () => {
  const letters = "ACHIEVEMENTS".split("");
  return (
    <div className="ach-heading-wrap">
      <div className="ach-heading-glow-ring" />
      <h1 className="ach-heading" aria-label="ACHIEVEMENTS">
        {letters.map((ch, i) => (
          <span
            key={i}
            className="ach-letter"
            style={{ "--i": i, "--total": letters.length }}
          >
            {ch}
          </span>
        ))}
      </h1>
      <p className="ach-tagline">
        <span className="ach-tagline-inner" data-text="Milestones That Shaped The Journey">
          Milestones That Shaped The Journey
        </span>
      </p>
      <div className="ach-available-badge">
        <span className="avail-dot" />
        Available for Internships &amp; Collaborations
      </div>
    </div>
  );
};

// ── Award Glass Cards (uiverse hover effect) ──────────────────────────────────

const AwardCards = () => {
  return (
    <div className="awards-section">
      <div className="awards-label">◈ Awards &amp; Recognition ◈</div>
      <div className="awards-glass-container">
        {AWARDS.map((award, i) => (
          <div
            key={i}
            className="glass-card"
            style={{ "--accent": award.color, "--glow": award.glow, "--delay": `${i * 0.1}s` }}
          >
            <div className="glass-card-inner">
              <div className="glass-badge">{award.badge}</div>
              <div className="glass-title">{award.title}</div>
              <div className="glass-desc">{award.desc}</div>
              <div className="glass-shine" />
              <div className="glass-border-glow" />
            </div>
            <div className="glass-reflection" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ── 3D Folder Certificates ───────────────────────────────────────────────────

const CertFolder = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hiddenId, setHiddenId] = useState(null);
  const cardRefs = useRef([]);

  const rotations = [-14, 0, 14];
  const translations = [-58, 0, 58];

  const openCard = (index) => {
    setSelectedIndex(index);
    setHiddenId(CERTS[index].id);
  };

  const closeCard = () => {
    setSelectedIndex(null);
    setTimeout(() => setHiddenId(null), 400);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeCard();
      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") setSelectedIndex((p) => (p + 1) % CERTS.length);
        if (e.key === "ArrowLeft") setSelectedIndex((p) => (p - 1 + CERTS.length) % CERTS.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <div className="cert-section">
      <div className="sub-label cyan-label">✦ Certificates</div>

      <div
        className={`folder-wrap ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow bg */}
        <div className="folder-glow-bg" style={{ opacity: isHovered ? 1 : 0 }} />

        <div className="folder-stage">
          {/* Back */}
          <div className="folder-back" style={{ transform: isHovered ? "rotateX(-18deg)" : "rotateX(0deg)" }} />
          {/* Tab */}
          <div className="folder-tab" style={{ transform: isHovered ? "rotateX(-28deg) translateY(-3px)" : "rotateX(0deg)" }} />

          {/* Cards */}
          <div className="folder-cards-area">
            {CERTS.map((cert, idx) => (
              <div
                key={cert.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="folder-proj-card"
                style={{
                  transform: isHovered
                    ? `translateY(-95px) translateX(${translations[idx]}px) rotate(${rotations[idx]}deg) scale(1)`
                    : "translateY(0) translateX(0) rotate(0deg) scale(0.4)",
                  opacity: hiddenId === cert.id ? 0 : isHovered ? 1 : 0,
                  transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 80}ms`,
                  zIndex: 20 - idx,
                }}
                onClick={() => openCard(idx)}
              >
                <img src={cert.image} alt={cert.title} />
                <div className="proj-card-label">{cert.title}</div>
              </div>
            ))}
          </div>

          {/* Front */}
          <div className="folder-front" style={{ transform: isHovered ? "rotateX(28deg) translateY(10px)" : "rotateX(0deg)" }} />
          {/* Shine */}
          <div className="folder-shine" style={{ transform: isHovered ? "rotateX(28deg) translateY(10px)" : "rotateX(0deg)" }} />
        </div>

        <div className="folder-title">Certificates</div>
        <div className="folder-sub" style={{ opacity: isHovered ? 0 : 0.7 }}>Hover to explore</div>
        <div className="folder-count" style={{ opacity: isHovered ? 1 : 0 }}>{CERTS.length} certs</div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="cert-lightbox" onClick={closeCard}>
          <div className="cert-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lb-close" onClick={closeCard}>✕</button>
            <img src={CERTS[selectedIndex].image} alt={CERTS[selectedIndex].title} />
            <div className="cert-lb-title">{CERTS[selectedIndex].title}</div>
            <div className="cert-lb-nav">
              <button onClick={() => setSelectedIndex((p) => (p - 1 + CERTS.length) % CERTS.length)}>‹</button>
              {CERTS.map((_, i) => (
                <span key={i} className={`cert-lb-dot ${i === selectedIndex ? "active" : ""}`} onClick={() => setSelectedIndex(i)} />
              ))}
              <button onClick={() => setSelectedIndex((p) => (p + 1) % CERTS.length)}>›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Leadership Cards (uiverse mayurd8862 inspired) ────────────────────────────

const LeadershipCards = () => {
  return (
    <div className="leadership-section">
      <div className="sub-label pink-label">✦ Leadership</div>
      <div className="leadership-stack">
        {LEADERSHIP.map((item, i) => (
          <div key={i} className="leader-card" style={{ "--accent": item.color }}>
            <div className="leader-card-before" />
            <div className="leader-card-after" />
            <div className="leader-icon-wrap">
              <span className="leader-icon">{item.icon}</span>
            </div>
            <div className="leader-body">
              <div className="leader-title">{item.title}</div>
              <div className="leader-sub">{item.sub}</div>
            </div>
            <div className="leader-arrow">›</div>
            <div className="leader-ripple" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Floating Orb Decoration ───────────────────────────────────────────────────

const FloatingOrbs = () => (
  <div className="orbs-container" aria-hidden="true">
    <div className="orb orb-1" />
    <div className="orb orb-2" />
    <div className="orb orb-3" />
    <div className="orb orb-4" />
  </div>
);

// ── Grid noise overlay ────────────────────────────────────────────────────────

const GridNoise = () => (
  <div className="grid-noise" aria-hidden="true">
    <div className="grid-lines" />
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────

const Achievements = () => {
  return (
    <section className="achievements-section" id="achievements">
      <GridNoise />
      <FloatingOrbs />

      {/* Scanning line */}
      <div className="scan-line" aria-hidden="true" />

      {/* Corner accents */}
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      <div className="ach-inner">
        {/* Heading */}
        <AchHeading />

        {/* Awards row */}
        <AwardCards />

        {/* Bottom row: Certificates + Leadership */}
        <div className="ach-bottom">
          <CertFolder />
          <LeadershipCards />
        </div>
      </div>
    </section>
  );
};

export default Achievements;