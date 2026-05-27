import { useState, useEffect, useRef, useCallback } from "react";
import "./Skills.css";

const DIVISIONS = [
  {
    id: "prog",
    label: "Prog Lang",
    title: "Programming Languages",
    description: "Building the foundation of every system with versatile, powerful languages across paradigms.",
    level: "Proficient",
    color: "#ff6b6b",
    glow: "rgba(255,107,107,0.4)",
    skills: [
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    ],
  },
  {
    id: "core",
    label: "Core",
    title: "Core Concepts",
    description: "Deep understanding of computer science fundamentals driving clean, efficient solutions.",
    level: "Advanced",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.4)",
    skills: [
      { name: "Full Stack Dev", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Data Structures", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "OOP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "DBMS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Software Eng", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Operating Systems", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "IoT Fundamentals", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    title: "Frontend Development",
    description: "Building responsive, interactive and accessible user interfaces with modern technologies.",
    level: "Advanced",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.4)",
    skills: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend & Databases",
    description: "Architecting scalable server-side systems and robust database solutions for real-world apps.",
    level: "Proficient",
    color: "#34d399",
    glow: "rgba(52,211,153,0.4)",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    title: "Tools & Platforms",
    description: "Leveraging industry-standard tools and platforms to ship reliable, production-ready software.",
    level: "Proficient",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.4)",
    skills: [
      { name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Antigravity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Auth0", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/auth0/auth0-original.svg" },
    ],
  },
  {
    id: "exploring",
    label: "Exploring",
    title: "Currently Exploring",
    description: "Venturing into next-gen tech — blockchain ecosystems and AI-powered machine learning frontiers.",
    level: "Learning",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.4)",
    skills: [
      { name: "Blockchain", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Ethereum", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Solidity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Python ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "AI Integrations", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
];

const LEFT_BTNS = ["prog", "core", "frontend"];
const RIGHT_BTNS = ["backend", "tools", "exploring"];

const TRAIT_CARDS = [
  { icon: "⚡", title: "Always Learning", desc: "Exploring new technologies and frameworks" },
  { icon: "</>", title: "Problem Solver", desc: "Love breaking down complex problems" },
  { icon: "🚀", title: "Performance Focused", desc: "Building fast and optimized applications" },
  { icon: "🤝", title: "Team Player", desc: "Collaborating and sharing knowledge" },
];

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
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${color || "rgba(139,92,246,0.25)"}, transparent 70%)`,
          opacity: pos.opacity,
        }}
      />
      {children}
    </div>
  );
}

// Hook: returns JS-animated positions for elliptical orbit
function useEllipseOrbit(count, rx, ry, speed = 0.0004) {
  const [angles, setAngles] = useState(() =>
    Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2)
  );
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    lastRef.current = null;
    // Reset angles when count changes
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
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return angles.map((a) => ({
    x: Math.cos(a) * rx,
    y: Math.sin(a) * ry,
  }));
}

// Responsive orbit dimensions based on stage width
function useOrbitDimensions(stageRef) {
  const [dims, setDims] = useState({ rx: 280, ry: 170, stageW: 600, stageH: 420 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) {
        setDims({ rx: 160, ry: 100, stageW: 400, stageH: 290 });
      } else if (w <= 620) {
        setDims({ rx: 195, ry: 120, stageW: 450, stageH: 330 });
      } else if (w <= 820) {
        setDims({ rx: 230, ry: 140, stageW: 530, stageH: 380 });
      } else {
        setDims({ rx: 280, ry: 170, stageW: 600, stageH: 420 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

function OrbitingSkills({ skills, color, glow }) {
  const stageRef = useRef(null);
  const { rx, ry, stageW, stageH } = useOrbitDimensions(stageRef);
  const positions = useEllipseOrbit(skills.length, rx, ry);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div
      ref={stageRef}
      className="orbit-stage"
      style={{ width: stageW, height: stageH }}
    >
      {/* Single elliptical orbit ring — skills sit on this path */}
      <div
        className="orbit-ring"
        style={{
          "--ring-color": glow,
          "--ring-ry": `${ry}px`,
          width: rx * 2,
          height: ry * 2,
        }}
      />

      {/* Orbiting skill cards */}
      {skills.map((sk, i) => {
        const pos = positions[i] || { x: 0, y: 0 };
        const isHovered = hoveredIdx === i;
        return (
          <div
            key={sk.name}
            className="skill-orb"
            style={{
              "--orb-color": color,
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              zIndex: isHovered ? 20 : 3,
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className={`skill-orb-inner${isHovered ? " skill-orb-inner--hovered" : ""}`}>
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

export default function Skills() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animDir, setAnimDir] = useState("next");
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx, dir = "next") => {
    setPrev(active);
    setAnimDir(dir);
    setActive(idx);
  }, [active]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => {
        setPrev(a);
        setAnimDir("next");
        return (a + 1) % DIVISIONS.length;
      });
    }, 4000);
  }, []);

  useEffect(() => {
    if (!isPaused) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isPaused, startTimer]);

  const handleBtn = (id) => {
    const idx = DIVISIONS.findIndex((d) => d.id === id);
    const dir = idx > active ? "next" : "prev";
    goTo(idx, dir);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const div = DIVISIONS[active];

  return (
    <section className="skills-section" id="skills">
      {/* Animated BG blobs */}
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

      {/* Main Arena */}
      <div className="skills-arena">
        {/* Left side buttons */}
        <div className="side-btns side-left">
          {LEFT_BTNS.map((id) => {
            const d = DIVISIONS.find((x) => x.id === id);
            const isActive = active === DIVISIONS.findIndex((x) => x.id === id);
            return (
              <button
                key={id}
                className={`side-btn ${isActive ? "side-btn--active" : ""}`}
                style={{ "--btn-color": d.color, "--btn-glow": d.glow }}
                onClick={() => handleBtn(id)}
              >
                <span className="side-btn-ring" />
                <span className="side-btn-label">{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Orbit Stage — now handled by OrbitingSkills */}
        <div className="orbit-stage-wrapper">
          <OrbitingSkills
            key={div.id}
            skills={div.skills}
            color={div.color}
            glow={div.glow}
          />

          {/* Center Division Card — absolutely centered over the orbit stage */}
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
                    className={`div-dot ${i === active ? "div-dot--active" : ""}`}
                    onClick={() => goTo(i, i > active ? "next" : "prev")}
                  />
                ))}
              </div>
            </div>
            <div className="div-card-shimmer" />
          </div>

          {/* Hover hint */}
          <p className="orbit-hint">Hover any skill</p>
        </div>

        {/* Right side buttons */}
        <div className="side-btns side-right">
          {RIGHT_BTNS.map((id) => {
            const d = DIVISIONS.find((x) => x.id === id);
            const isActive = active === DIVISIONS.findIndex((x) => x.id === id);
            return (
              <button
                key={id}
                className={`side-btn ${isActive ? "side-btn--active" : ""}`}
                style={{ "--btn-color": d.color, "--btn-glow": d.glow }}
                onClick={() => handleBtn(id)}
              >
                <span className="side-btn-ring" />
                <span className="side-btn-label">{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Trait Cards */}
      <div className="trait-cards-row">
        {TRAIT_CARDS.map((t, i) => (
          <SpotlightCard key={i} color="rgba(139,92,246,0.3)" className="trait-card-spotlight">
            <div className="trait-card" style={{ animationDelay: `${i * 0.15}s` }}>
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
              <div className="trait-card-border-anim" />
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}