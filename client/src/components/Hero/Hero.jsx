import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
// PROFILE
import profile from "../../assets/profile.png";

// INNER
import reactIcon from "../../assets/icons/react.png";
import nodeIcon from "../../assets/icons/node.png";

// MIDDLE
import mongoIcon from "../../assets/icons/mongodb.png";
import expressIcon from "../../assets/icons/express.png";
import javaIcon from "../../assets/icons/java.png";

// OUTER
import cIcon from "../../assets/icons/c.png";
import cppIcon from "../../assets/icons/cpp.png";
import goIcon from "../../assets/icons/go.png";
import pythonIcon from "../../assets/icons/python.png";


// ── Decrypt-on-hover hook ──────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
function useDecrypt(original) {
  const [display, setDisplay] = useState(original);
  const rafRef = useRef(null);

  const startDecrypt = () => {
    let iteration = 0;
    const total = original.length * 3;
    const step = () => {
      setDisplay(
        original
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < Math.floor(iteration / 3)) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration <= total) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setDisplay(original);
  };

  return { display, startDecrypt, reset };
}

// ── Morph text component ───────────────────────────────────────────────────
const PHRASES = [
  "A Full Stack Developer",
  "A Tech Enthusiast",
  "A Curious Mind",
  "A Lifelong Learner",
];

function MorphText() {
  const [index, setIndex] = useState(0);
  const [morphing, setMorphing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMorphing(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setMorphing(false);
      }, 500);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`morph-text ${morphing ? "morphing" : ""}`}>
      {PHRASES[index]}
    </span>
  );
}

// ── Shimmering text component ──────────────────────────────────────────────
function ShimmerText({ children }) {
  return <span className="shimmer-text">{children}</span>;
}

// ── Gloss text component ───────────────────────────────────────────────────
function GlossText({ children, className }) {
  return <span className={`gloss-text ${className || ""}`}>{children}</span>;
}

// ── Expanding Portfolio word ───────────────────────────────────────────────
function ExpandingWord({ children }) {
  return <span className="expanding-word">{children}</span>;
}

// ── Orbit System ──────────────────────────────────────────────────────────
const ORBITS = [
  {
    rx: 100, ry: 85,          // inner ellipse radii
    speed: 16,
    color: "#a78bfa",
    glow: "#7c3aed",
    dashArray: "6 5",
    icons: [
      { src: javaIcon,   label: "Java" },
      { src: pythonIcon, label: "Python" },
    ],
  },
  {
    rx: 170, ry: 145,         // middle ellipse
    speed: 26,
    color: "#38bdf8",
    glow: "#0ea5e9",
    dashArray: "8 6",
    icons: [
      { src: reactIcon, label: "React" },
      { src: nodeIcon,  label: "Node"  },
      { src: mongoIcon, label: "MongoDB" },
    ],
  },
  {
    rx: 245, ry: 210,         // outer ellipse
    speed: 38,
    color: "#fb7185",
    glow: "#e11d48",
    dashArray: "10 7",
    icons: [
      { src: cIcon,      label: "C"       },
      { src: cppIcon,    label: "C++"     },
      { src: expressIcon,label: "Express" },
    ],
  },
];
 
// Parametric point on an ellipse (angle in degrees)
function ellipsePoint(rx, ry, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: rx * Math.cos(rad), y: ry * Math.sin(rad) };
}
 
function OrbitIcon({ src, label, rx, ry, startAngle, speed, color, orbitIdx }) {
  const [angle, setAngle] = useState(startAngle);
  const rafRef = useRef(null);
  const lastRef = useRef(null);
 
  useEffect(() => {
    const step = (ts) => {
      if (lastRef.current === null) lastRef.current = ts;
      const delta = ts - lastRef.current;
      lastRef.current = ts;
      // degrees per ms → full 360° in `speed` seconds
      setAngle((a) => (a + (360 / (speed * 1000)) * delta) % 360);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);
 
  const pt = ellipsePoint(rx, ry, angle);
 
  return (
    <div
      className="orbit-icon"
      style={{
        "--orbit-color": color,
        position: "absolute",
        left: `calc(50% + ${pt.x}px - 22px)`,
        top:  `calc(50% + ${pt.y}px - 22px)`,
      }}
    >
      <img src={src} alt={label} draggable="false" />
      <span className="orbit-tooltip">{label}</span>
    </div>
  );
}
 
function OrbitSystem() {
  const [hovered, setHovered] = useState(null);
 
  // SVG canvas size — same as container
  const W = 540, H = 500;
  const cx = W / 2, cy = H / 2;
 
  return (
    <div className="orbit-system">
      {/* ── SVG rings ── */}
      <svg
        className="orbit-svg"
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {ORBITS.map((o, i) => (
            <filter key={i} id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={hovered === i ? "5" : "2"} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>
 
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx={o.rx} ry={o.ry}
            fill="none"
            stroke={o.color}
            strokeWidth={hovered === i ? 2 : 1.2}
            strokeDasharray={o.dashArray}
            opacity={hovered === i ? 0.95 : 0.38}
            filter={`url(#glow${i})`}
            style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
          />
        ))}
      </svg>
 
      {/* ── Hover zones (invisible, stacked largest→smallest) ── */}
      {[...ORBITS].reverse().map((o, ri) => {
        const i = ORBITS.length - 1 - ri;
        return (
          <div
            key={i}
            className="orbit-hover-zone"
            style={{ width: o.rx * 2, height: o.ry * 2 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}
 
      {/* ── Animated icons ── */}
      {ORBITS.map((o, oi) =>
        o.icons.map((icon, ii) => (
          <OrbitIcon
            key={`${oi}-${ii}`}
            src={icon.src}
            label={icon.label}
            rx={o.rx}
            ry={o.ry}
            startAngle={(360 / o.icons.length) * ii}
            speed={o.speed}
            color={o.color}
            orbitIdx={oi}
          />
        ))
      )}
 
      {/* ── Standing profile photo ── */}
      <div className="profile-stand">
        <div className="profile-stand__glow" />
        <img src={profile} alt="Rajanya Ray" className="profile-stand__img" />
        <div className="profile-stand__ground" />
      </div>
    </div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────
export default function Hero() {
  const { display: nameDisplay, startDecrypt, reset } = useDecrypt("RAJANYA RAY");

  // Floating particles (subtle, non-obtrusive)
  const [sparks] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${20 + Math.random() * 70}%`,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
    }))
  );

  return (
    <section className="hero" id="hero">
      {/* Ambient background layers */}
      <div className="hero__bg-layer hero__bg-mesh" />
      <div className="hero__bg-layer hero__bg-radial hero__bg-radial--left" />
      <div className="hero__bg-layer hero__bg-radial hero__bg-radial--right" />
      <div className="hero__bg-layer hero__bg-grid" />
      <div className="hero__bg-layer hero__bg-galaxy" />

      {/* Floating energy sparks */}
      {sparks.map((s) => (
        <div
          key={s.id}
          className="hero__spark"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Scan line overlay */}
      <div className="hero__scanlines" />

      <div className="hero__inner">
        {/* ── LEFT: Text content ── */}
        <div className="hero__left">

          {/* Line 1: HELLO!!! */}
          <h1 className="hero__hello">
            {"HELLO!!!".split("").map((ch, i) => (
              <span key={i} className="hero__hello-char" style={{ animationDelay: `${i * 0.06}s` }}>
                {ch}
              </span>
            ))}
          </h1>

          {/* Line 2: Welcome to my Portfolio */}
          <p className="hero__welcome">
            <GlossText className="gloss-welcome">Welcome to my</GlossText>{" "}
            <ExpandingWord>Portfolio</ExpandingWord>
          </p>

          {/* Line 3: I am Rajanya Ray */}
          <p className="hero__iam">
            <ShimmerText>I am</ShimmerText>
            <span
              className="hero__name"
              onMouseEnter={startDecrypt}
              onMouseLeave={reset}
            >
              {nameDisplay}
            </span>
          </p>

          {/* Line 4: Morph phrases */}
          <div className="hero__morph-row">
            <span className="hero__morph-prefix">✦</span>
            <MorphText />
            <span className="hero__morph-suffix">✦</span>
          </div>

          {/* Divider */}
          <div className="hero__divider">
            <span className="hero__divider-line" />
            <span className="hero__divider-dot" />
            <span className="hero__divider-line" />
          </div>

        {/* BUTTONS */}
        <div className="hero-buttons">
 
          {/* Resume — uiverse Tsiangana */}
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="botao">
            <svg className="mysvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="#f1f1f1" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" />
            </svg>
            <span className="texto">Resume</span>
          </a>
 
          {/* GitHub — uiverse charlie_4212 */}
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="gh-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="gh-icon">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.96.1-.76.4-1.26.72-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.5.12-3.1 0 0 .98-.32 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.64 1.6.24 2.8.12 3.1.75.8 1.2 1.82 1.2 3.08 0 4.44-2.7 5.4-5.28 5.68.4.34.76 1.02.76 2.06v3.05c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
            </svg>
            <span className="gh-label">GitHub</span>
          </a>
 
        </div>


        </div>

        {/* ── RIGHT: Orbit system ── */}
        <div className="hero__right">
          <OrbitSystem />
        </div>
      </div>

      {/* Bottom shadow fade */}
      <div className="hero__bottom-shadow" />
    </section>
  );
}