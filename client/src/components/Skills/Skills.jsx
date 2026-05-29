import { useState, useEffect, useRef } from "react";
import "./Skills.css";
import SectionHeading from "../SectionHeading/SectionHeading";

/* ─────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────── */
const DIVISIONS = [
  {
    id: "prog",
    label: "Prog Lang",
    title: "Programming Languages",
    description: "Building the foundation of every system.",
    level: "Proficient",
    color: "#ff6b6b",
    glow: "rgba(255,107,107,0.5)",
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
    label: "Core CS",
    title: "Core Concepts",
    description: "Deep CS fundamentals for clean solutions.",
    level: "Advanced",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.5)",
    skills: [
      { name: "Full Stack Dev", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "DSA",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "OOP",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "DBMS",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Op. Systems",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "IoT",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    title: "Frontend Development",
    description: "Responsive, interactive UIs.",
    level: "Advanced",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.5)",
    skills: [
      { name: "HTML5",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Angular",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend & Databases",
    description: "Scalable server-side solutions.",
    level: "Proficient",
    color: "#34d399",
    glow: "rgba(52,211,153,0.5)",
    skills: [
      { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "REST APIs",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Flask",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    title: "Tools & Platforms",
    description: "Industry-standard dev tools.",
    level: "Proficient",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.5)",
    skills: [
      { name: "Git",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Figma",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Postman",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
  },
  {
    id: "exploring",
    label: "Exploring",
    title: "Currently Exploring",
    description: "Blockchain, AI & ML frontiers.",
    level: "Learning",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.5)",
    skills: [
      { name: "Blockchain",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Ethereum",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Solidity",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
      { name: "Python for ML",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TensorFlow",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "AI Integrations", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
];

/* ─────────────────────────────────────────────────
   TRAIT CARDS
───────────────────────────────────────────────── */
const TRAITS = [
  { icon: "⚡", title: "Always Learning",     desc: "Exploring new technologies",   accent: "#f59e0b" },
  { icon: "</>", title: "Problem Solver",     desc: "Breaking down complex problems", accent: "#6366f1" },
  { icon: "🚀", title: "Performance First",   desc: "Fast, optimised applications",  accent: "#10b981" },
  { icon: "🤝", title: "Team Player",         desc: "Collaborating & sharing knowledge", accent: "#ec4899" },
];

/* ─────────────────────────────────────────────────
   LOGO SLOT — smooth crossfade between skills
───────────────────────────────────────────────── */
function LogoSlot({ currentSkill, prevSkill, transitioning, color, index }) {
  return (
    <div
      className="logo-slot"
      style={{ "--slot-color": color, animationDelay: `${index * 0.06}s` }}
    >
      {/* corner accents */}
      <span className="ls-corner ls-tl" />
      <span className="ls-corner ls-tr" />
      <span className="ls-corner ls-bl" />
      <span className="ls-corner ls-br" />

      {/* Outgoing skill — fades out */}
      {prevSkill && (
        <div className={`ls-face ls-face--out${transitioning ? " is-out" : ""}`}>
          <img src={prevSkill.icon} alt={prevSkill.name} className="ls-icon" onError={e => { e.target.style.display = "none"; }} />
          <span className="ls-name">{prevSkill.name}</span>
        </div>
      )}

      {/* Incoming skill — fades in */}
      <div className={`ls-face ls-face--in${transitioning ? " is-in" : ""}`}>
        <img src={currentSkill.icon} alt={currentSkill.name} className="ls-icon" onError={e => { e.target.style.display = "none"; }} />
        <span className="ls-name">{currentSkill.name}</span>
      </div>

      {/* Slot glow overlay */}
      <div className="ls-glow" />
    </div>
  );
}

/* ─────────────────────────────────────────────────
   DOMAIN TAB BUTTON
───────────────────────────────────────────────── */
function DomainTab({ division, isActive, onClick, side }) {
  return (
    <button
      className={`domain-tab${isActive ? " domain-tab--active" : ""} domain-tab--${side}`}
      style={{ "--tab-color": division.color, "--tab-glow": division.glow }}
      onClick={onClick}
    >
      <span className="dt-indicator" />
      <span className="dt-label">{division.label}</span>
      <span className="dt-level">{division.level}</span>
      {isActive && <span className="dt-active-bar" />}
    </button>
  );
}

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
export default function Skills() {
  const [active, setActive]           = useState(0);
  const [displayed, setDisplayed]     = useState(0);  // what's currently shown
  const [transitioning, setTransitioning] = useState(false);
  const [prevSkills, setPrevSkills]   = useState(null);
  const timerRef = useRef(null);
  const isPausedRef = useRef(false);

  // Kick off the 6-second auto-cycle
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setActive(a => (a + 1) % DIVISIONS.length);
      }
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When active changes → crossfade
  useEffect(() => {
    if (active === displayed) return;

    // snapshot the outgoing skills
    setPrevSkills(DIVISIONS[displayed].skills);
    setTransitioning(true);

    const t = setTimeout(() => {
      setDisplayed(active);
      setTransitioning(false);
      setPrevSkills(null);
    }, 500); // matches CSS transition duration

    return () => clearTimeout(t);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabClick = (idx) => {
    isPausedRef.current = true;
    setActive(idx);
    setTimeout(() => { isPausedRef.current = false; }, 8000);
  };

  const div = DIVISIONS[displayed];
  const currentSkills = div.skills;

  // LEFT = indices 0,1,2   RIGHT = indices 3,4,5
  const leftDivs  = DIVISIONS.slice(0, 3);
  const rightDivs = DIVISIONS.slice(3, 6);

  return (
    <section className="skills-section" id="skills">
      {/* BG decorations */}
      <div className="sk-blob sk-blob1" />
      <div className="sk-blob sk-blob2" />
      <div className="sk-blob sk-blob3" />
      <div className="sk-grid-overlay" />

      {/* Heading */}
      <SectionHeading title="SKILLS" tagline="WHAT I USE" />

      {/* Main 3-column layout */}
      <div className="sk-body">

        {/* LEFT COLUMN — tabs 0,1,2 */}
        <div className="sk-tabs sk-tabs--left">
          {leftDivs.map((d, i) => (
            <DomainTab
              key={d.id}
              division={d}
              isActive={active === i}
              onClick={() => handleTabClick(i)}
              side="left"
            />
          ))}
        </div>

        {/* CENTRE COLUMN */}
        <div className="sk-center">
          {/* Info strip above the grid */}
          <div className="sk-info" style={{ "--div-color": div.color, "--div-glow": div.glow }}>
            <span className="sk-info-title">{div.title}</span>
            <span className="sk-info-sep">·</span>
            <span className="sk-info-desc">{div.description}</span>
            <span className="sk-info-pill">{div.level}</span>
          </div>

          {/* 6-slot logo grid */}
          <div
            className="sk-logo-grid"
            style={{ "--grid-color": div.color, "--grid-glow": div.glow }}
          >
            {/* Progress ring — tracks auto-cycle */}
            <div className="sk-progress-ring">
              <svg viewBox="0 0 36 36" className="sk-ring-svg">
                <circle cx="18" cy="18" r="15.9" className="sk-ring-bg" />
                <circle
                  cx="18" cy="18" r="15.9"
                  className="sk-ring-fill"
                  style={{ stroke: div.color }}
                />
              </svg>
              <span className="sk-ring-dot" style={{ background: div.color, boxShadow: `0 0 8px ${div.glow}` }} />
            </div>

            {/* 6 logo placeholders */}
            {Array.from({ length: 6 }, (_, i) => (
              <LogoSlot
                key={i}
                index={i}
                currentSkill={currentSkills[i]}
                prevSkill={prevSkills ? prevSkills[i] : null}
                transitioning={transitioning}
                color={div.color}
              />
            ))}

            {/* Dot indicators */}
            <div className="sk-dots">
              {DIVISIONS.map((_, i) => (
                <button
                  key={i}
                  className={`sk-dot${i === active ? " sk-dot--active" : ""}`}
                  style={i === active ? { background: div.color, boxShadow: `0 0 8px ${div.glow}` } : {}}
                  onClick={() => handleTabClick(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — tabs 3,4,5 */}
        <div className="sk-tabs sk-tabs--right">
          {rightDivs.map((d, i) => (
            <DomainTab
              key={d.id}
              division={d}
              isActive={active === i + 3}
              onClick={() => handleTabClick(i + 3)}
              side="right"
            />
          ))}
        </div>
      </div>

      {/* Bottom trait cards */}
      <div className="sk-traits">
        {TRAITS.map((t, i) => (
          <div
            key={i}
            className="sk-trait"
            style={{ "--ta": t.accent, animationDelay: `${i * 0.1}s` }}
          >
            <span className="sk-trait-icon">{t.icon}</span>
            <div className="sk-trait-text">
              <span className="sk-trait-title">{t.title}</span>
              <span className="sk-trait-desc">{t.desc}</span>
            </div>
            <div className="sk-trait-glow" />
          </div>
        ))}
      </div>
    </section>
  );
}