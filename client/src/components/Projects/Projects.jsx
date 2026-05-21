import { useState, useEffect, useRef } from "react";
import "./Projects.css";

// MAIN CARD IMAGES
import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";
import p6 from "../../assets/p6.png";

// PORTFOLIO PANEL IMAGES
import p1_1 from "../../assets/p1_1.png";
import p1_2 from "../../assets/p1_2.png";
import p1_3 from "../../assets/p1_3.png";
import p1_4 from "../../assets/p1_4.png";
import p1_5 from "../../assets/p1_5.png";

const projects = [
  {
    title: "Portfolio",
    tagline: "Personal developer showcase",
    img: p1,
    ribbon: ["FULL STACK", "REACT", "PORTFOLIO", "UI/UX", "ANIMATIONS", "FRAMER MOTION", "RESPONSIVE", "CREATIVE"],
    desc: "A sleek and interactive portfolio website designed to showcase skills, projects, and experience with smooth animations and engaging UI.",
    features: ["Smooth page transitions", "Interactive project cards", "Dark/Light mode", "Responsive design", "Custom animations"],
    tech: ["React", "JavaScript", "Framer Motion", "Node"],
    involvement: "Full Stack Development",
    images: [p1_1, p1_2, p1_3, p1_4, p1_5],
  },
  {
    title: "ToDo List",
    tagline: "Task manager with clean UI",
    img: p2,
    ribbon: ["PRODUCTIVITY", "REACT", "CRUD", "LOCAL STORAGE", "CLEAN UI", "MINIMALIST", "FAST", "INTUITIVE"],
    desc: "A beautifully designed task manager app with real-time updates, priority sorting, and persistent local storage integration.",
    features: ["Drag & drop tasks", "Priority labels", "Due date reminders", "Local persistence", "Category filters"],
    tech: ["React", "CSS3", "LocalStorage", "Hooks"],
    involvement: "Frontend Development",
    images: [p1_1, p1_2, p1_3, p1_4, p1_5],
  },
  {
    title: "Krishi Dristi",
    tagline: "Smart agriculture assistant",
    img: p3,
    ribbon: ["AI/ML", "AGRICULTURE", "PYTHON", "COMPUTER VISION", "DEEP LEARNING", "CROP DETECTION", "IOT", "SMART FARMING"],
    desc: "An AI-powered agriculture assistant that leverages computer vision and machine learning to detect crop diseases and recommend treatments.",
    features: ["Disease detection", "Crop health analysis", "Treatment suggestions", "Weather integration", "Multilingual support"],
    tech: ["Python", "TensorFlow", "OpenCV", "Flask", "React"],
    involvement: "ML Engineering",
    images: [p1_1, p1_2, p1_3, p1_4, p1_5],
  },
  {
    title: "TruthScope",
    tagline: "Fake news detection system",
    img: p4,
    ribbon: ["NLP", "FAKE NEWS", "BERT", "PYTHON", "AI", "CLASSIFICATION", "DEEP LEARNING", "SOCIAL IMPACT"],
    desc: "A sophisticated fake news detection system using NLP and transformer models to classify news articles with high accuracy.",
    features: ["BERT classification", "Real-time analysis", "Source credibility", "Confidence scoring", "Browser extension"],
    tech: ["Python", "BERT", "Scikit-learn", "FastAPI", "React"],
    involvement: "NLP Engineering",
    images: [p1_1, p1_2, p1_3, p1_4, p1_5],
  },
  {
    title: "SevaSaarthi",
    tagline: "Community service platform",
    img: p5,
    ribbon: ["SOCIAL IMPACT", "FULL STACK", "COMMUNITY", "NODE.JS", "MONGODB", "MAPS API", "VOLUNTEER", "NGO"],
    desc: "A community service platform connecting volunteers with NGOs and social causes, featuring real-time tracking and impact metrics.",
    features: ["Volunteer matching", "Real-time tracking", "Impact dashboard", "Event management", "Certificate generation"],
    tech: ["React", "Node.js", "MongoDB", "Google Maps", "Socket.io"],
    involvement: "Full Stack Development",
    images: [p1_1, p1_2, p1_3, p1_4, p1_5],
  },
  {
    title: "Cipher Clash",
    tagline: "Cybersecurity-based game",
    img: p6,
    ribbon: ["GAME DEV", "CYBERSECURITY", "CTF", "JAVASCRIPT", "PUZZLES", "ENCRYPTION", "HACKING", "INTERACTIVE"],
    desc: "An immersive cybersecurity-themed game where players solve encryption puzzles and hacking challenges in a race against time.",
    features: ["Progressive difficulty", "Real crypto concepts", "Leaderboard system", "Time challenges", "Hint system"],
    tech: ["JavaScript", "Canvas API", "Node.js", "WebSockets", "CSS3"],
    involvement: "Game Development",
    images: [p1_1, p1_2, p1_3, p1_4, p1_5],
  },
];

// Animated Title Letter by letter
function AnimatedTitle({ text }) {
  return (
    <h1 className="panel-title">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="title-char"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

// Holographic Feature Card
function HolographicCard({ features }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -15;
    const rotY = ((x - cx) / cx) * 15;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    card.style.setProperty("--glow-x", `${glowX}%`);
    card.style.setProperty("--glow-y", `${glowY}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      className="holo-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="holo-shine" />
      <div className="holo-content">
        <p className="holo-label">✦ KEY FEATURES</p>
        <ul className="holo-list">
          {features.map((f, i) => (
            <li key={i}>
              <span className="holo-dot" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Ribbon
function Ribbon({ words }) {
  const doubled = [...words, ...words, ...words];
  return (
    <div className="ribbon-wrap">
      <div className="ribbon-track">
        {doubled.map((word, i) => (
          <span key={i} className="ribbon-word" style={{ "--i": i % words.length }}>
            {word}
            <span className="ribbon-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Shine Tech Chip
function TechChip({ label }) {
  return <span className="tech-chip">{label}</span>;
}

// Involvement Flip Card
function InvolvementCard({ text }) {
  return (
    <div className="inv-card">
      <div className="inv-inner">
        <div className="inv-front">
          <span>MY INVOLVEMENT</span>
          <div className="inv-corner tl" /><div className="inv-corner tr" />
          <div className="inv-corner bl" /><div className="inv-corner br" />
        </div>
        <div className="inv-back">
          <div className="inv-back-glow" />
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

// Carousel
function Carousel({ images }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % images.length), 3000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const prev = () => { setActive((p) => (p - 1 + images.length) % images.length); resetTimer(); };
  const next = () => { setActive((p) => (p + 1) % images.length); resetTimer(); };

  const onDragStart = (e) => { setDragging(true); setStartX(e.touches ? e.touches[0].clientX : e.clientX); };
  const onDragEnd = (e) => {
    if (!dragging) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    if (startX - endX > 50) next();
    else if (endX - startX > 50) prev();
    setDragging(false);
  };

  return (
    <div className="carousel-wrap">
      <div
        className="carousel-stage"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        {images.map((img, i) => {
          const offset = (i - active + images.length) % images.length;
          let cls = "carousel-slide";
          if (offset === 0) cls += " car-active";
          else if (offset === 1 || offset === images.length - 1) cls += " car-side";
          else cls += " car-hidden";
          const isLeft = offset === images.length - 1;
          return (
            <div
              key={i}
              className={cls}
              style={{ "--dir": isLeft ? -1 : 1 }}
              onClick={() => { if (offset !== 0) { offset < images.length / 2 ? next() : prev(); } }}
            >
              <img src={img} alt="" />
              <div className="car-glare" />
            </div>
          );
        })}
      </div>

      <div className="carousel-nav">
        <button className="car-btn" onClick={prev}>‹</button>
        <div className="car-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`car-dot ${i === active ? "active" : ""}`}
              onClick={() => { setActive(i); resetTimer(); }}
            />
          ))}
        </div>
        <button className="car-btn" onClick={next}>›</button>
      </div>

      <div className="carousel-counter">{active + 1} / {images.length}</div>
    </div>
  );
}

// Panel for each project
function ProjectPanel({ proj, onClose }) {
  return (
    <div className="project-overlay" onClick={onClose}>
      <div className="project-panel" onClick={(e) => e.stopPropagation()}>

        <Ribbon words={proj.ribbon} />

        <div className="panel-body">
          {/* LEFT */}
          <div className="panel-left">
            <Carousel images={proj.images} />
          </div>

          {/* RIGHT */}
          <div className="panel-right">
            <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>

            <AnimatedTitle text={proj.title} />
            <p className="panel-tagline">{proj.tagline}</p>
            <p className="panel-desc">{proj.desc}</p>

            <HolographicCard features={proj.features} />

            <h3 className="tech-heading">TECH STACK</h3>
            <div className="chips">
              {proj.tech.map((t, i) => (
                <TechChip key={i} label={t} />
              ))}
            </div>

            <InvolvementCard text={proj.involvement} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState(2);
  const [selected, setSelected] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (selected !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setExpanded((prev) => (prev + 1) % projects.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const getWidth = (index) => (index === expanded ? "26rem" : "5rem");

  return (
    <section id="projects" ref={sectionRef}>
      <div className="projects-header">
        <div className="header-label">✦ SELECTED WORK</div>
        <h1 className="header-title">
          {"PROJECTS".split("").map((c, i) => (
            <span key={i} className="h-char" style={{ "--i": i }}>{c}</span>
          ))}
        </h1>
        <p className="header-sub">Things I've built. Things I'm building.</p>
        <div className="header-line" />
      </div>

      <div className="expand-wrapper">
        <div className="expand-container">
          {projects.map((proj, i) => (
            <div
              key={i}
              className={`expand-card ${expanded === i ? "active" : ""}`}
              style={{ width: getWidth(i) }}
              onMouseEnter={() => { setIsPaused(true); setExpanded(i); }}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => setSelected(i)}
            >
              <img src={proj.img} alt={proj.title} />

              {/* Blur backdrop when active */}
              <div className="card-backdrop" />

              {/* White overlay */}
              <div className="card-layer" />

              {/* Gradient sweep */}
              <div className="card-sweep" />

              {/* Corner accents */}
              <div className="corner-tl" />
              <div className="corner-br" />

              {/* Text */}
              <div className="card-content">
                <div className="card-index">0{i + 1}</div>
                <h2 className="card-title">{proj.title}</h2>
                <p className="card-tagline">{proj.tagline}</p>
                <div className="card-cta">VIEW PROJECT →</div>
              </div>

              {/* Scanline */}
              <div className="card-scan" />
            </div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <ProjectPanel proj={projects[selected]} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}