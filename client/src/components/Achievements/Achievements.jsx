import { useState, useRef, useEffect } from "react";
import "./Achievements.css";

// ── Award data ──────────────────────────────────────────────────────────────
const AWARDS = [
  {
    id: 1,
    title: "Best Developer Award",
    org: "TechFest 2024",
    icon: "🏆",
    color: "#ff6b6b",
    border: "#ff6b6b",
    glow: "rgba(255,107,107,0.45)",
    bg: "#321111",
  },
  {
    id: 2,
    title: "Hackathon Champion",
    org: "CodeSprint 2023",
    icon: "🥇",
    color: "#ffd93d",
    border: "#ffd93d",
    glow: "rgba(255,217,61,0.45)",
    bg: "#322b11",
  },
  {
    id: 3,
    title: "Open Source Contributor",
    org: "GitHub Stars",
    icon: "⭐",
    color: "#6bcb77",
    border: "#6bcb77",
    glow: "rgba(107,203,119,0.45)",
    bg: "#113216",
  },
  {
    id: 4,
    title: "UI/UX Excellence",
    org: "Design Awards 2024",
    icon: "🎨",
    color: "#4d96ff",
    border: "#4d96ff",
    glow: "rgba(77,150,255,0.45)",
    bg: "#111d32",
  },
  {
    id: 5,
    title: "Innovation Prize",
    org: "StartupHub 2023",
    icon: "🚀",
    color: "#c77dff",
    border: "#c77dff",
    glow: "rgba(199,125,255,0.45)",
    bg: "#251132",
  },
];

// ── Certificate data ─────────────────────────────────────────────────────────
const CERTS = [
  {
    id: "c1",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    title: "React Professional",
  },
  {
    id: "c2",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    title: "AWS Cloud Practitioner",
  },
  {
    id: "c3",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    title: "Full Stack Dev",
  },
];

// ── Leadership data ───────────────────────────────────────────────────────────
const LEADERSHIP = [
  {
    title: "Tech Lead",
    subtitle: "Led a team of 8 engineers, delivered 3 major product launches and mentored junior developers.",
    icon: "👨‍💻",
    front: "rgb(209,72,122)",
    back: "rgb(230,173,203)",
    reveal: "TECH LEAD",
  },
  {
    title: "Community Head",
    subtitle: "Organised 12+ workshops, grew campus coding community to 500+ members.",
    icon: "🌐",
    front: "rgb(72,130,209)",
    back: "rgb(173,203,230)",
    reveal: "COMMUNITY",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Award Carousel
// ─────────────────────────────────────────────────────────────────────────────
function AwardsCarousel() {
  const [active, setActive] = useState(0);
  const total = AWARDS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // positions: centre, right, far-right, far-left, left
  const positions = [0, 1, 2, -2, -1];

  return (
    <div className="carousel-wrap">
      <div className="carousel-stage">
        {AWARDS.map((award, i) => {
          const offset = ((i - active + total) % total);
          // map offset to slot: 0=center,1=right,2=far-right,3=far-left(=total-2),4=left(=total-1)
          const slot = offset <= 2 ? offset : offset - total;
          const absSlot = Math.abs(slot);
          const zIndex = 10 - absSlot;
          const translateX = slot * 270;
          const scale = absSlot === 0 ? 1 : absSlot === 1 ? 0.82 : 0.65;
          const opacity = absSlot <= 2 ? 1 - absSlot * 0.22 : 0;
          const rotateY = slot * -12;
          const isCenter = slot === 0;

          return (
            <div
              key={award.id}
              className={`award-card-outer ${isCenter ? "center" : ""}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                "--card-color": award.color,
                "--card-border": award.border,
                "--card-glow": award.glow,
                "--card-bg-solid": `linear-gradient(135deg, ${award.bg}, #090514)`,
              }}
              onClick={() => !isCenter && setActive(i)}
            >
              <div className="award-card-inner">
                <div className="award-card-front">
                  <span className="award-icon">{award.icon}</span>
                  <h3 className="award-title">{award.title}</h3>
                  <p className="award-org">{award.org}</p>
                  <div className="award-shine" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-dots">
        {AWARDS.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous">
        ‹
      </button>
      <button className="carousel-btn carousel-next" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  3D Folder – Certificates
// ─────────────────────────────────────────────────────────────────────────────
function CertFolder() {
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <div
        className={`folder-wrapper ${hovered ? "open" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* floating cards */}
        {CERTS.map((cert, i) => (
          <div
            key={cert.id}
            className="cert-card"
            style={{ "--ci": i }}
            onClick={() => hovered && setLightbox(i)}
          >
            <img src={cert.image} alt={cert.title} />
            <span>{cert.title}</span>
          </div>
        ))}

        {/* folder back */}
        <div className="folder-back" />
        {/* folder tab */}
        <div className="folder-tab" />
        {/* folder front */}
        <div className="folder-front" />
        {/* shine */}
        <div className="folder-shine" />
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="cert-lightbox" onClick={() => setLightbox(null)}>
          <div className="cert-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={CERTS[lightbox].image} alt={CERTS[lightbox].title} />
            <p>{CERTS[lightbox].title}</p>
            <div className="lb-nav">
              <button onClick={() => setLightbox((lightbox - 1 + CERTS.length) % CERTS.length)}>‹</button>
              <button onClick={() => setLightbox((lightbox + 1) % CERTS.length)}>›</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Leadership Cards
// ─────────────────────────────────────────────────────────────────────────────
function LeadershipCard({ data }) {
  return (
    <div
      className="lead-card"
      style={{ "--lc-front": data.front, "--lc-back": data.back }}
    >
      <span className="lead-icon">{data.icon}</span>
      <div className="lead-content">
        <h4>{data.title}</h4>
        <p>{data.subtitle}</p>
      </div>
      <div className="lead-hover-reveal">{data.reveal}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Achievements() {
  return (
    <section className="achievements-section" id="achievements">
      {/* Decorative orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* Heading */}
      <div className="ach-heading-wrap">
        <h2 className="ach-heading">
          <span className="ach-heading-text">Achievements</span>
          <span className="ach-heading-line" />
        </h2>
      </div>

      {/* Awards carousel */}
      <div className="awards-section">
        <p className="sub-label">🏅 Awards &amp; Recognition</p>
        <AwardsCarousel />
      </div>

      {/* Bottom row: folder + leadership */}
      <div className="bottom-row">
        <div className="certs-col">
          <p className="sub-label">📁 Certificates</p>
          <CertFolder />
        </div>
        <div className="lead-col">
          <p className="sub-label">👑 Leadership Roles</p>
          <div className="lead-cards-list">
            {LEADERSHIP.map((l, i) => (
              <LeadershipCard key={i} data={l} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}