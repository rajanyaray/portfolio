import { useState, useRef, useEffect } from "react";
import "./Achievements.css";
import SectionHeading from "../SectionHeading/SectionHeading";

// ── Import local certificates from assets ────────────────────────────────────
import cert1 from "../../assets/cert1.jpg";
import cert2 from "../../assets/cert2.jpg";
import cert3 from "../../assets/cert3.png";
import cert4 from "../../assets/cert4.png";

// ── Award data with custom colors, gradients, and short descriptions ─────────
const AWARDS = [
  {
    id: 1,
    title: "Winner - SIH 2025",
    org: "Smart India Hackathon — Winner under Ministry of Power. Built an AI-driven grid optimization system.",
    icon: "🏆",
    color: "#ff6b6b",
    border: "#ff6b6b",
    glow: "rgba(255,107,107,0.45)",
    bg: "#321111",
  },
  {
    id: 2,
    title: "Runner-Up",
    org: "Cognizant Technoverse 2026 — Developed a scalable Web3 healthcare dApp on Ethereum.",
    icon: "🥈",
    color: "#4d96ff",
    border: "#4d96ff",
    glow: "rgba(77,150,255,0.45)",
    bg: "#111d32",
  },
  {
    id: 3,
    title: "4th Place - SBH 2025",
    org: "Smart Bengal Hackathon — Engineered an offline emergency communication mesh network.",
    icon: "🏅",
    color: "#ffd93d",
    border: "#ffd93d",
    glow: "rgba(255,217,61,0.45)",
    bg: "#322b11",
  },
  {
    id: 4,
    title: "Finalist - SCMIM 2025",
    org: "Springer International Conference — MCKV Institute collab with Yuan Ze University & EIT-Australia.",
    icon: "📄",
    color: "#c77dff",
    border: "#c77dff",
    glow: "rgba(199,125,255,0.45)",
    bg: "#251132",
  },
  {
    id: 5,
    title: "Finalist - IISc Bangalore",
    org: "Artpark Codeforge Hackathon — IISc Bangalore. Designed high-performance drone routing algorithms.",
    icon: "🚀",
    color: "#34d399",
    border: "#34d399",
    glow: "rgba(52,211,153,0.45)",
    bg: "#113216",
  },
  {
    id: 6,
    title: "Internal Round Winner",
    org: "Smart India Hackathon 2024 — Championed the internal collegiate round with a crop monitoring system.",
    icon: "⭐",
    color: "#ff9f43",
    border: "#ff9f43",
    glow: "rgba(255,159,67,0.45)",
    bg: "#322011",
  },
];

// ── Certificate data ─────────────────────────────────────────────────────────
const CERTS = [
  {
    id: "c1",
    image: cert1,
    title: "Google Cloud Certificate",
  },
  {
    id: "c2",
    image: cert2,
    title: "AWS Solutions Architect",
  },
  {
    id: "c3",
    image: cert3,
    title: "Full Stack Development",
  },
  {
    id: "c4",
    image: cert4,
    title: "AI & Machine Learning",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Award Carousel
// ─────────────────────────────────────────────────────────────────────────────
function AwardsCarousel() {
  const [active, setActive] = useState(0);
  const [spacing, setSpacing] = useState(280);
  const total = AWARDS.length;

  useEffect(() => {
    const handleResize = () => {
      setSpacing(window.innerWidth < 600 ? 120 : window.innerWidth < 900 ? 190 : 280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <div className="carousel-wrap">
      <div className="carousel-stage">
        {AWARDS.map((award, i) => {
          const offset = ((i - active + total) % total);
          const slot = offset <= 3 ? offset : offset - total;
          const absSlot = Math.abs(slot);
          const zIndex = 10 - absSlot;
          const translateX = slot * spacing;
          const scale = absSlot === 0 ? 1 : absSlot === 1 ? 0.82 : 0.65;
          const opacity = absSlot <= 2 ? 1 - absSlot * 0.25 : 0;
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
                {/* HUD sci-fi corner brackets inside card front */}
                <span className="ac-corner ac-tl" />
                <span className="ac-corner ac-tr" />
                <span className="ac-corner ac-bl" />
                <span className="ac-corner ac-br" />

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
        onClick={() => setHovered(!hovered)}
      >
        {/* floating cards */}
        {CERTS.map((cert, i) => (
          <div
            key={cert.id}
            className="cert-card"
            style={{ "--ci": i }}
            onClick={(e) => {
              if (hovered) {
                e.stopPropagation();
                setLightbox(i);
              }
            }}
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

        {/* Folder Label */}
        <div className="folder-label">
          <span className="folder-count">{CERTS.length} Certificates</span>
          <span className="folder-hint">Hover or tap to open folder</span>
        </div>
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
//  Main Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Achievements() {
  const canvasRef = useRef(null);
  const confettiRef = useRef([]);
  const animationIdRef = useRef(null);

  // Resize canvas covering achievements section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth || window.innerWidth;
        canvas.height = parent.offsetHeight || window.innerHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  const triggerConfetti = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let angleMin = 0;
    let angleMax = Math.PI * 2;

    if (x < rect.width / 2 && y < rect.height / 2) {
      angleMin = 0;
      angleMax = Math.PI / 2;
    } else if (x > rect.width / 2 && y < rect.height / 2) {
      angleMin = Math.PI / 2;
      angleMax = Math.PI;
    } else if (x < rect.width / 2 && y > rect.height / 2) {
      angleMin = -Math.PI / 2;
      angleMax = 0;
    } else if (x > rect.width / 2 && y > rect.height / 2) {
      angleMin = -Math.PI;
      angleMax = -Math.PI / 2;
    }

    const colors = ["#a78bfa", "#38bdf8", "#34d399", "#f472b6", "#fbbf24", "#ea580c"];
    
    for (let i = 0; i < 95; i++) {
      const angle = angleMin + Math.random() * (angleMax - angleMin);
      const speed = 5 + Math.random() * 9;
      confettiRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 4 + 3,
        height: Math.random() * 7 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1.0,
        gravity: 0.16,
        friction: 0.98,
        wobble: Math.random() * 2 * Math.PI,
        wobbleSpeed: Math.random() * 0.1 + 0.05
      });
    }

    if (!animationIdRef.current) {
      animateConfetti();
    }
  };

  const animateConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particles = confettiRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;
      p.opacity -= 0.007;

      if (p.opacity <= 0 || p.y > canvas.height) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      const wobbleX = Math.sin(p.wobble);
      ctx.fillRect(-p.radius * wobbleX, -p.height / 2, p.radius * 2 * wobbleX, p.height);
      ctx.restore();
    }

    if (particles.length > 0) {
      animationIdRef.current = requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationIdRef.current = null;
    }
  };

  return (
    <section className="achievements-section" id="achievements">
      {/* Decorative background orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* Confetti Overlay Canvas */}
      <canvas ref={canvasRef} className="achievements-confetti-canvas" />

      {/* 4 Corner Celebration Floating Buttons */}
      <button className="celebration-btn cb-tl" onClick={triggerConfetti} aria-label="Celebrate">🎉</button>
      <button className="celebration-btn cb-tr" onClick={triggerConfetti} aria-label="Celebrate">🥳</button>
      <button className="celebration-btn cb-bl" onClick={triggerConfetti} aria-label="Celebrate">🏆</button>
      <button className="celebration-btn cb-br" onClick={triggerConfetti} aria-label="Celebrate">✨</button>

      {/* Heading */}
      <SectionHeading title="ACHIEVEMENTS" tagline="AWARDS & CERTS" />

      {/* TOP HALF: Awards Carousel */}
      <div className="awards-container-top">
        <p className="sub-label">🏅 Awards &amp; Recognition</p>
        <AwardsCarousel />
      </div>

      {/* BOTTOM HALF: Certificates Folder */}
      <div className="certs-container-bottom">
        <p className="sub-label">📁 Certificates</p>
        <CertFolder />
      </div>
    </section>
  );
}