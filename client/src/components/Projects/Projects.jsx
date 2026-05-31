import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Projects.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import { motion } from "framer-motion";

// PORTFOLIO PANEL IMAGES
import pw1 from "../../assets/pw1.jpeg";
import pw2 from "../../assets/pw2.jpeg";
import pw3 from "../../assets/pw3.jpeg";
import pw4 from "../../assets/pw4.jpeg";
import pw5 from "../../assets/pw5.jpeg";

// CAROUSEL PICTURES
import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";

const projects = [
  {
    title: "KrishiDrishti",
    tagline: "Real time tracking of utilization of machines for Crop Residue Management machines",
    img: p1,
    panelImg: pw1,
    ribbon: ["FULL STACK", "REACT", "PORTFOLIO", "UI/UX", "ANIMATIONS", "FRAMER MOTION", "RESPONSIVE", "CREATIVE"],
    desc: "KrishiDrishti is scalable AI and IoT platform for crop residue management. Integrates machine learning and real-time data pipelines to track agricultural machinery, boosting operational efficiency by 70%.",
    features: [
      "Real-Time Machine Tracking – Live location and status monitoring (Active, Idle, Maintenance).",
      "Machine Management System – Complete CRUD operations for agricultural machinery.",
      "Smart Utilization Analytics – Dashboard with KPI metrics, runtime analysis, and usage insights.",
      "Automated Alert Management – Instant notifications for idle machines and low utilization.",
      "CHC Management Portal – Centralized portal with multiple modules for CHC operations.",
      "Transparency & Insight Reports – Public transparency portal with auto-generated reports for decision-makers."
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Python", "TensorFlow", "Scikit-Learn", "OpenCV", "FastAPI", "Node.js", "MongoDB", "PostgreSQL", "ESP32", "MQTT", "AWS", "Docker"],
    url: "https://krishidrishti.vercel.app/",
  },
  {
    title: "TrialGo",
    tagline: "End-to-end clinical trial automation platform powered by AI",
    img: p2,
    panelImg: pw2,
    ribbon: ["PRODUCTIVITY", "REACT", "CRUD", "LOCAL STORAGE", "CLEAN UI", "MINIMALIST", "FAST", "INTUITIVE"],
    desc: "TrialGo is an AI-powered platform that streamlines the clinical trial ecosystem by connecting patients, researchers, and sponsors, making trial discovery, participation, and management faster and more accessible.",
    features: [
      "AI-Powered Patient Discovery – Finds eligible participants based on medical profiles.",
      "15+ Specialized AI Agents – Automate sourcing, screening, matching, and trial coordination.",
      "Intelligent Trial Matching – Connects patients with the most relevant clinical trials.",
      "Automated Candidate Recruitment – Scans global registries and healthcare platforms to identify candidates.",
      "Real-Time Monitoring & Retention – Tracks engagement and predicts participant dropouts.",
      "Unified Clinical Trial Platform – Manages discovery, recruitment, consent, and retention in one ecosystem."
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "Amazon RDS", "AWS S3", "Redis", "Celery", "LangChain", "Hugging Face", "WebSockets", "JWT", "FHIR R4", "Twilio", "SendGrid", "Scrapy", "Docker"],
    url: "N/A right now",
  },
  {
    title: "StegoChain",
    tagline: "Blockchain-backed steganographic communication system.",
    img: p3,
    panelImg: pw3,
    ribbon: ["AI/ML", "AGRICULTURE", "PYTHON", "COMPUTER VISION", "DEEP LEARNING", "CROP DETECTION", "IOT", "SMART FARMING"],
    desc: "StegoChain is a blockchain-powered secure communication platform that hides encrypted messages inside images and audio using advanced steganography techniques.",
    features: [
      "Steganographic Message Hiding – Securely hides encrypted messages inside images and audio files.",
      "AES-256-GCM Encryption – Military-grade encryption ensures confidentiality and data integrity.",
      "Ethereum Blockchain Integration – Stores communication records on-chain for tamper-proof verification.",
      "IPFS Decentralized Storage – Distributes encrypted files across a decentralized storage network.",
      "ECC-Based Cryptography – Uses Elliptic Curve Cryptography for secure key generation and exchange.",
      "AI-Powered Threat Monitoring – Graph Neural Networks analyze patterns to detect suspicious activities and enhance security."
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "OpenCV", "Cryptography", "AES Encryption", "Steganography", "Solidity", "Ethereum", "Sepolia", "MetaMask", "Ethers.js", "MongoDB", "IPFS", "Web3"],
    url: "https://stegochain.vercel.app/",
  },
  {
    title: "TruthScope",
    tagline: "AI-powered Chrome extension for real-time fact-checking and misinformation detection",
    img: p4,
    panelImg: pw4,
    ribbon: ["NLP", "FAKE NEWS", "BERT", "PYTHON", "AI", "CLASSIFICATION", "DEEP LEARNING", "SOCIAL IMPACT"],
    desc: "TruthScope is an AI-powered browser extension that detects fake news, misinformation, and media bias in real time using credibility scoring and fact-checking analysis.",
    features: [
      "AI-Powered Fake News Detection – Identifies misleading and false information in real time.",
      "Deepfake & Media Verification – Detects manipulated images and videos using AI analysis.",
      "Real-Time Fact Checking – Instantly verifies online content through the browser extension.",
      "Source Credibility Analysis – Evaluates and scores the trustworthiness of news sources.",
      "Media Bias Detection – Identifies political or ideological bias within articles.",
      "Multi-Language Support – Performs fact-checking and verification across different languages."
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Tavily API", "Hugging Face", "Chrome Extension", "Google OAuth", "JavaScript", "REST API"],
    url: "https://truthscopee.vercel.app/",
  },
  {
    title: "BharatTrack",
    tagline: "Smart railway track inspection and analytics platform",
    img: p5,
    panelImg: pw5,
    ribbon: ["SOCIAL IMPACT", "FULL STACK", "COMMUNITY", "NODE.JS", "MONGODB", "MAPS API", "VOLUNTEER", "NGO"],
    desc: "BharatTrack is an AI-powered indigenous railway track monitoring system that analyzes track geometry, rail wear, and dynamic stability in real time at speeds up to 200 km/h.",
    features: [
      "Real-Time Track Monitoring – Continuously analyzes track geometry, rail wear, and stability.",
      "High-Speed Inspection – Operates accurately at speeds up to 200 km/h.",
      "AI-Powered Defect Detection – Uses computer vision and machine learning to identify track anomalies.",
      "Modular Sensor Architecture – Plug-and-play subsystems for easy upgrades and maintenance.",
      "Synchronized Video Analytics – Combines sensor data with onboard video for comprehensive inspection.",
      "Predictive Maintenance Dashboard – Generates actionable insights to prevent failures and improve safety."
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Python", "OpenCV", "NumPy", "Pandas", "ESP32", "Arduino UNO", "VL53L0X", "MPU6050", "GPS Module", "MQTT", "Socket.io", "MongoDB", "PostgreSQL"],
    url: "https://bharattrack.vercel.app/",
  }
];

// ── Floating Paths Background (Dynamic Framer Motion) ───────────────────────
function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="fp-svg-layer">
      <svg
        className="fp-svg"
        style={{ opacity: 0.48 }}
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.15 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.85 }}
            animate={{
              pathLength: 1,
              opacity: [0.45, 0.85, 0.45],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Animated Title Letter by letter (UNCHANGED) ─────────────────────────────
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

// ── Holographic Feature Card (UNCHANGED) ────────────────────────────────────
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

// ── Ribbon (UNCHANGED) ───────────────────────────────────────────────────────
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

// ── Tech Chip — from techstack.txt (rose/ripple style) ─────────────────────
function TechChip({ label }) {
  return (
    <button className="tech-chip-new">
      {label}
    </button>
  );
}



// ── Panel image with hover effects ──────────────────────────────────────────
function PanelImage({ src, alt }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`panel-img-wrap${hovered ? " panel-img-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={src} alt={alt} className="panel-img" />
      <div className="panel-img-glow" />
      <div className="panel-img-scanlines" />
      <div className="panel-img-corners">
        <span className="pic-corner pic-tl" />
        <span className="pic-corner pic-tr" />
        <span className="pic-corner pic-bl" />
        <span className="pic-corner pic-br" />
      </div>
      <div className="panel-img-overlay-text">EXPLORE ↗</div>
    </div>
  );
}

// ── Website button (from website.txt) ───────────────────────────────────────
function WebsiteButton({ url }) {
  if (!url || url === "N/A right now") return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="ws-group"
      style={{ textDecoration: "none" }}
    >
      <div className="ws-tooltip">
        <div className="ws-tooltip-inner">
          <svg fill="none" viewBox="0 0 24 24" height="20px" width="20px" className="ws-globe">
            <circle strokeLinejoin="round" r="9" cy="12" cx="12" stroke="currentColor" strokeWidth="1.5"/>
            <path strokeLinejoin="round" d="M12 3C12 3 8.5 6 8.5 12C8.5 18 12 21 12 21" stroke="currentColor" strokeWidth="1.5"/>
            <path strokeLinejoin="round" d="M12 3C12 3 15.5 6 15.5 12C15.5 18 12 21 12 21" stroke="currentColor" strokeWidth="1.5"/>
            <path strokeLinejoin="round" d="M3 12H21" stroke="currentColor" strokeWidth="1.5"/>
            <path strokeLinejoin="round" d="M19.5 7.5H4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path strokeLinejoin="round" d="M19.5 16.5H4.5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>View Live</span>
        </div>
        <div className="ws-tooltip-arrow" />
      </div>

      <div className="ws-pill">
        <svg fill="none" viewBox="0 0 24 24" height="20px" width="20px" className="ws-icon">
          <path
            strokeLinejoin="round" strokeLinecap="round"
            d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
            fill="currentColor"
          />
        </svg>
        <span className="ws-label">View Live Website</span>
      </div>
    </a>
  );
}

// ── ProjectPanel — RESTORED premium effects inside the skeleton window ──
function ProjectPanel({ proj, onClose }) {
  return (
    <div className="project-overlay" onClick={onClose}>
      <div className="project-panel" onClick={(e) => e.stopPropagation()}>

        {/* TOP: rust-colored header strip with animated Ribbon marquee */}
        <div className="panel-header-bar">
          <Ribbon words={proj.ribbon} />
          <button
            className="uiverse-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <p className="close-txt">×</p>
            <span className="bg-span span-top"></span>
            <span className="bg-span span-left"></span>
            <span className="bg-span span-right"></span>
            <span className="bg-span span-bottom"></span>
          </button>
        </div>

        <div className="panel-body">
          {/* LEFT — project image with effects + tech stack below */}
          <div className="panel-left">
            <PanelImage src={proj.panelImg} alt={proj.title} />

            <div className="panel-tech-section">
              <h3 className="tech-heading-label">TECH STACK:</h3>
              <div className="chips">
                {proj.tech.map((t, i) => (
                  <TechChip key={i} label={t} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — title, desc, holographic features */}
          <div className="panel-right">
            <AnimatedTitle text={proj.title} />
            <p className="panel-tagline-new">{proj.tagline}</p>
            {proj.desc.startsWith(proj.title) ? (
              <p className="panel-desc-new">
                <span className="desc-project-name">{proj.title}</span>
                {proj.desc.substring(proj.title.length)}
              </p>
            ) : (
              <p className="panel-desc-new">{proj.desc}</p>
            )}

            <HolographicCard features={proj.features} />
          </div>
        </div>

        {/* BOTTOM: Center premium sliding Website Button */}
        <div className="panel-bottom-action">
          <WebsiteButton url={proj.url} />
        </div>
      </div>
    </div>
  );
}

// ── Main export (UNCHANGED section skeleton + floating paths added) ──────────
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

  // Auto-cycling accordion slides (pauses on hover, resumes on leave)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setExpanded((prev) => (prev + 1) % projects.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const getWidth = (index) => (index === expanded ? "26rem" : "5rem");

  return (
    <section id="projects" ref={sectionRef} style={{ position: "relative", overflow: "hidden" }}>
      {/* Dynamic Framer Motion Floating Paths */}
      <div className="fp-wrap">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <SectionHeading title="Projects" tagline="Best of My Builds" />

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

      {selected !== null &&
        createPortal(
          <ProjectPanel proj={projects[selected]} onClose={() => setSelected(null)} />,
          document.body
        )}
    </section>
  );
}
