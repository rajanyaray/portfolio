import { useState, useEffect, useRef, useCallback } from "react";
import "./Skills.css";

const DIVISIONS = [
  {
    id: "prog",
    label: "Prog Lang",
    title: "Programming Languages",
    description: "Building the foundation of every system with versatile, powerful languages.",
    level: "Proficient",
    color: "#ff6b6b",
    glow: "rgba(255,107,107,0.45)",
    skills: [
      { name: "C",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Go",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    ],
  },
  {
    id: "core",
    label: "Core",
    title: "Core Concepts",
    description: "Deep CS fundamentals driving clean, efficient and scalable solutions.",
    level: "Advanced",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.45)",
    skills: [
      { name: "Full Stack",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Data Struct",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "OOP",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "DBMS",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Software Eng",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "OS",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "IoT",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    title: "Frontend Development",
    description: "Responsive, interactive UIs with modern web technologies.",
    level: "Advanced",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.45)",
    skills: [
      { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Angular",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend & Databases",
    description: "Scalable server-side systems and robust database solutions.",
    level: "Proficient",
    color: "#34d399",
    glow: "rgba(52,211,153,0.45)",
    skills: [
      { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "REST APIs",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Flask",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    title: "Tools & Platforms",
    description: "Industry-standard tools to ship reliable, production-ready software.",
    level: "Proficient",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.45)",
    skills: [
      { name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "VS Code",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Canva",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
      { name: "Figma",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Postman",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Firebase",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Vercel",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Auth0",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/auth0/auth0-original.svg" },
    ],
  },
  {
    id: "exploring",
    label: "Exploring",
    title: "Currently Exploring",
    description: "Venturing into blockchain ecosystems and AI-powered frontiers.",
    level: "Learning",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.45)",
    skills: [
      { name: "Blockchain",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Ethereum",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Solidity",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Python ML",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TensorFlow",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "AI Integrations",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
];

// 4 trait cards with distinct accent colors
const TRAIT_CARDS = [
  { icon: "⚡", title: "Always Learning",    desc: "Exploring new technologies and frameworks",   accent: "#f59e0b" },
  { icon: "</>", title: "Problem Solver",    desc: "Love breaking down complex problems",          accent: "#6366f1" },
  { icon: "🚀", title: "Performance Focused",desc: "Building fast and optimized applications",     accent: "#10b981" },
  { icon: "🤝", title: "Team Player",        desc: "Collaborating and sharing knowledge",          accent: "#ec4899" },
];

// ── Responsive orbit dimensions ──────────────────────
function useOrbitDimensions() {
  const [dims, setDims] = useState({ rx: 310, ry: 155, outerRx: 410, outerRy: 210, stageW: 680, stageH: 460 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // skill orbit
      if (w <= 480) {
        setDims({ rx: 150, ry: 90,  outerRx: 220, outerRy: 140, stageW: 380, stageH: 320 });
      } else if (w <= 700) {
        setDims({ rx: 190, ry: 110, outerRx: 280, outerRy: 170, stageW: 460, stageH: 370 });
      } else if (w <= 1024) {
        setDims({ rx: 240, ry: 130, outerRx: 340, outerRy: 185, stageW: 560, stageH: 410 });
      } else {
        // scale to window height so nothing overflows
        const factor = Math.min(1, (h - 260) / 460);
        setDims({
          rx:      Math.round(310 * factor),
          ry:      Math.round(155 * factor),
          outerRx: Math.round(410 * factor),
          outerRy: Math.round(210 * factor),
          stageW:  Math.round(700 * factor),
          stageH:  Math.round(460 * factor),
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

// ── JS-animated ellipse angle hook ───────────────────
function useEllipseOrbit(count, rx, ry, speed = 0.00035) {
  const [angles, setAngles] = useState(() =>
    Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2)
  );
  const rafRef  = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    lastRef.current = null;
    setAngles(Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2));
  }, [count]);

  useEffect(() => {
    let running = true;
    const tick = (ts) => {
      if (!running) return;
      const dt = lastRef.current ? ts - lastRef.current : 0;
      lastRef.current = ts;
      setAngles((prev) => prev.map((a) => a + speed * dt));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [speed]);

  return angles.map((a) => ({ x: Math.cos(a) * rx, y: Math.sin(a) * ry, angle: a }));
}

// ── Static evenly-spaced positions on an ellipse ─────
function ellipsePoints(count, rx, ry, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 + offset;
    return { x: Math.cos(a) * rx, y: Math.sin(a) * ry };
  });
}

// ── OrbitingSkills — inner orbit, skill orbs ─────────
function OrbitingSkills({ skills, color, glow, rx, ry, stageW, stageH }) {
  const positions  = useEllipseOrbit(skills.length, rx, ry);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="orbit-stage" style={{ width: stageW, height: stageH }}>
      {/* Skill orbit ring */}
      <div
        className="orbit-ring orbit-ring--inner"
        style={{
          "--ring-color": glow,
          width:  rx * 2,
          height: ry * 2,
        }}
      />

      {/* Orbiting skill cards */}
      {skills.map((sk, i) => {
        const pos = positions[i] || { x: 0, y: 0 };
        const isHov = hovered === i;
        return (
          <div
            key={sk.name}
            className="skill-orb"
            style={{
              "--orb-color": color,
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              zIndex: isHov ? 20 : 3,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={`skill-orb-inner${isHov ? " skill-orb-inner--hovered" : ""}`}>
              <img
                src={sk.icon}
                alt={sk.name}
                className="skill-orb-icon"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="skill-orb-name">{sk.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Spotlight wrapper for trait cards ────────────────
function SpotlightCard({ children, color, className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleLeave = useCallback(() => setPos((p) => ({ ...p, opacity: 0 })), []);

  return (
    <div ref={ref} className={`spotlight-wrap ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div
        className="spotlight-layer"
        style={{
          background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
          opacity: pos.opacity,
        }}
      />
      {children}
    </div>
  );
}

// ── Main Skills component ─────────────────────────────
export default function Skills() {
  const [active, setActive]   = useState(0);
  const [animDir, setAnimDir] = useState("next");
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const { rx, ry, outerRx, outerRy, stageW, stageH } = useOrbitDimensions();

  // 6 nav buttons evenly on outer ellipse, starting at left side (π)
  const btnPositions = ellipsePoints(DIVISIONS.length, outerRx, outerRy, Math.PI);

  const goTo = useCallback((idx, dir = "next") => {
    setAnimDir(dir);
    setActive(idx);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => {
        setAnimDir("next");
        return (a + 1) % DIVISIONS.length;
      });
    }, 4000);
  }, []);

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isPaused, startTimer]);

  const handleBtn = (idx) => {
    const dir = idx > active ? "next" : "prev";
    goTo(idx, dir);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const div = DIVISIONS[active];

  return (
    <section className="skills-section" id="skills">
      {/* BG blobs */}
      <div className="skills-blob blob1" />
      <div className="skills-blob blob2" />
      <div className="skills-blob blob3" />

      {/* Heading */}
      <div className="skills-heading-wrap">
        <h2 className="skills-heading">
          {"SKILLS".split("").map((ch, i) => (
            <span key={i} className="skills-heading-char" style={{ animationDelay: `${i * 0.1}s` }}>{ch}</span>
          ))}
        </h2>
      </div>

      {/* Arena — one single stage containing EVERYTHING */}
      <div className="skills-arena">
        <div
          className="orbit-stage-wrapper"
          style={{ width: stageW, height: stageH }}
        >
          {/* ── Outer nav-button ring ── */}
          <div
            className="orbit-ring orbit-ring--outer"
            style={{
              "--ring-color": div.glow,
              width:  outerRx * 2,
              height: outerRy * 2,
            }}
          />

          {/* ── 6 nav buttons positioned on outer ring ── */}
          {DIVISIONS.map((d, idx) => {
            const pos     = btnPositions[idx];
            const isActive = idx === active;
            return (
              <button
                key={d.id}
                className={`side-btn${isActive ? " side-btn--active" : ""}`}
                style={{
                  "--btn-color": d.color,
                  "--btn-glow":  d.glow,
                  position: "absolute",
                  left: "50%",
                  top:  "50%",
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  zIndex: isActive ? 10 : 4,
                }}
                onClick={() => handleBtn(idx)}
              >
                <span className="side-btn-ring" />
                <span className="side-btn-label">{d.label}</span>
              </button>
            );
          })}

          {/* ── Inner skill orbs ── */}
          <OrbitingSkills
            key={div.id}
            skills={div.skills}
            color={div.color}
            glow={div.glow}
            rx={rx}
            ry={ry}
            stageW={stageW}
            stageH={stageH}
          />

          {/* ── Center card ── */}
          <div
            className={`division-card ${animDir === "next" ? "div-card--in-next" : "div-card--in-prev"}`}
            key={div.id + "-card"}
            style={{ "--div-color": div.color, "--div-glow": div.glow }}
          >
            <div className="division-card-inner">
              <div className="div-card-icon-wrap">
                <span className="div-card-code-icon">&lt;/&gt;</span>
                <div className="div-card-icon-glow" />
              </div>
              <h3 className="div-card-title">{div.title}</h3>
              <p className="div-card-desc">{div.description}</p>
              <div className="div-card-level">
                <span className="level-pill">{div.level}</span>
              </div>
              <div className="div-card-dots">
                {DIVISIONS.map((_, i) => (
                  <button
                    key={i}
                    className={`div-dot${i === active ? " div-dot--active" : ""}`}
                    onClick={() => goTo(i, i > active ? "next" : "prev")}
                  />
                ))}
              </div>
            </div>
            <div className="div-card-shimmer" />
          </div>

          {/* Hint */}
          <p className="orbit-hint">Hover any skill</p>
        </div>
      </div>

      {/* Bottom Trait Cards */}
      <div className="trait-cards-row">
        {TRAIT_CARDS.map((t, i) => (
          <SpotlightCard key={i} color={`${t.accent}44`} className="trait-card-spotlight">
            <div
              className="trait-card"
              style={{ "--trait-accent": t.accent, animationDelay: `${i * 0.12}s` }}
            >
              {/* expanding accent circle */}
              <div className="trait-card-circle" />
              {/* SVG blobs */}
              <div className="trait-card-blob-left" />
              <div className="trait-card-blob-right" />

              <div className="trait-card-top">
                <span className="trait-icon">{t.icon}</span>
                <div className="trait-card-lines">
                  <div className="trait-line trait-line--1" />
                  <div className="trait-line trait-line--2" />
                </div>
              </div>
              <h4 className="trait-title">{t.title}</h4>
              <p className="trait-desc">{t.desc}</p>
              <div className="trait-card-shimmer" />
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}