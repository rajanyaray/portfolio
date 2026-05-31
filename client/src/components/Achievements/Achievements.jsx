import { useState, useRef, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Achievements.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import ParticlesBackground from "./ParticlesBackground";

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
    color: "#a78bfa",
    border: "#a78bfa",
    glow: "rgba(167,139,250,0.45)",
    bg: "#160d2e",
    colorLight: "#6d28d9",
    borderLight: "#6d28d9",
    glowLight: "rgba(109, 40, 217, 0.18)",
    bgLight: "#f5f3ff",
  },
  {
    id: 2,
    title: "Runner-Up",
    org: "Cognizant Technoverse 2026 — Developed a scalable Web3 healthcare dApp on Ethereum.",
    icon: "🥈",
    color: "#818cf8",
    border: "#818cf8",
    glow: "rgba(129,140,248,0.45)",
    bg: "#111228",
    colorLight: "#4f46e5",
    borderLight: "#4f46e5",
    glowLight: "rgba(79, 70, 229, 0.18)",
    bgLight: "#eef2ff",
  },
  {
    id: 3,
    title: "4th Place - SBH 2025",
    org: "Smart Bengal Hackathon — Engineered an offline emergency communication mesh network.",
    icon: "🏅",
    color: "#94a3b8",
    border: "#94a3b8",
    glow: "rgba(148,163,184,0.45)",
    bg: "#131820",
    colorLight: "#475569",
    borderLight: "#475569",
    glowLight: "rgba(71, 85, 105, 0.15)",
    bgLight: "#f8fafc",
  },
  {
    id: 4,
    title: "Finalist - SCMIM 2025",
    org: "Springer International Conference — MCKV Institute collab with Yuan Ze University & EIT-Australia.",
    icon: "📄",
    color: "#c4b5fd",
    border: "#c4b5fd",
    glow: "rgba(196,181,253,0.45)",
    bg: "#1c1235",
    colorLight: "#7c3aed",
    borderLight: "#7c3aed",
    glowLight: "rgba(124, 58, 237, 0.18)",
    bgLight: "#f5f3ff",
  },
  {
    id: 5,
    title: "Finalist - IISc Bangalore",
    org: "Artpark Codeforge Hackathon — IISc Bangalore. Designed high-performance drone routing algorithms.",
    icon: "🚀",
    color: "#6d28d9",
    border: "#6d28d9",
    glow: "rgba(109,40,217,0.45)",
    bg: "#120d22",
    colorLight: "#6d28d9",
    borderLight: "#6d28d9",
    glowLight: "rgba(109, 40, 217, 0.18)",
    bgLight: "#f5f3ff",
  },
  {
    id: 6,
    title: "Internal Round Winner",
    org: "Smart India Hackathon 2024 — Championed the internal collegiate round with a crop monitoring system.",
    icon: "⭐",
    color: "#e2b96f",
    border: "#e2b96f",
    glow: "rgba(226,185,111,0.45)",
    bg: "#231a0e",
    colorLight: "#b45309",
    borderLight: "#b45309",
    glowLight: "rgba(180, 83, 9, 0.18)",
    bgLight: "#fffbeb",
  },
];

// ── Certificate data ─────────────────────────────────────────────────────────
const CERTS = [
  {
    id: "c1",
    image: cert1,
    title: "Machine Learning and Artificial Intelligence",
  },
  {
    id: "c2",
    image: cert2,
    title: "Spring Framework for Java",
  },
  {
    id: "c3",
    image: cert3,
    title: "Full Stack Web Development",
  },
  {
    id: "c4",
    image: cert4,
    title: "Cloud Computing",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Award Carousel
// ─────────────────────────────────────────────────────────────────────────────
function AwardsCarousel() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const [active, setActive] = useState(0);
  const [spacing, setSpacing] = useState(280);
  const total = AWARDS.length;

  const timerRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  // Autoplay cycle
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, 3000); // cycles every 3 seconds

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, total]);

  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 3000); // wait 3 seconds before resuming
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="carousel-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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

          const activeColor = isLight ? (award.colorLight || award.color) : award.color;
          const activeBorder = isLight ? (award.borderLight || award.border) : award.border;
          const activeGlow = isLight ? (award.glowLight || award.glow) : award.glow;
          const activeBgGrad = isLight 
            ? `linear-gradient(135deg, ${award.bgLight || "#ffffff"}, #ebe8ff)` 
            : `linear-gradient(135deg, ${award.bg}, #090514)`;

          return (
            <div
              key={award.id}
              className={`award-card-outer ${isCenter ? "center" : ""}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                "--card-color": activeColor,
                "--card-border": activeBorder,
                "--card-glow": activeGlow,
                "--card-bg-solid": activeBgGrad,
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

      {/* Lightbox rendered via Portal directly into document.body to secure absolute viewport centering */}
      {lightbox !== null && createPortal(
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
        </div>,
        document.body
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

    const colors = ["#a78bfa", "#818cf8", "#c4b5fd", "#6d28d9", "#4f46e5", "#94a3b8"];
    
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
      <ParticlesBackground height="100%" zIndex={0} />

      {/* Decorative background orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      {/* Confetti Overlay Canvas */}
      <canvas ref={canvasRef} className="achievements-confetti-canvas" />

      {/* 4 Corner Celebration Floating Buttons with custom visual hints */}
      <div className="celebration-btn-container cb-tl">
        <button className="celebration-btn" onClick={triggerConfetti} aria-label="Celebrate">🎉</button>
        <span className="celebration-hint hint-left">← Click to celebrate!</span>
      </div>
      
      <div className="celebration-btn-container cb-tr">
        <span className="celebration-hint hint-right">Click to celebrate! →</span>
        <button className="celebration-btn" onClick={triggerConfetti} aria-label="Celebrate">🥳</button>
      </div>

      <div className="celebration-btn-container cb-bl">
        <button className="celebration-btn" onClick={triggerConfetti} aria-label="Celebrate">🏆</button>
        <span className="celebration-hint hint-left">← Click to celebrate!</span>
      </div>

      <div className="celebration-btn-container cb-br">
        <span className="celebration-hint hint-right">Click to celebrate! →</span>
        <button className="celebration-btn" onClick={triggerConfetti} aria-label="Celebrate">✨</button>
      </div>

      {/* Heading */}
      <SectionHeading title="Achievements" tagline="Milestones & Wins" />

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