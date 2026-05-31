import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Achievements from "./components/Achievements/Achievements";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/Footer";

import "./styles/global.css";
import "./styles/background.css";
import Cursor from "./components/Cursor/Cursor";
import IntroLoader from "./components/IntroLoader/IntroLoader";

export default function App() {
  const [showTop, setShowTop] = useState(false);
  const [introState, setIntroState] = useState("playing"); // "playing" | "shrinking" | "done"

  useEffect(() => {
    if (introState !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introState]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);

    // ── Intersection Observer for Scroll Reveal (Alternating Left/Right) ──
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        } else {
          entry.target.classList.remove("reveal-visible");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(
      ".about-section, .journey-section, .skills-section, #projects, .achievements-section, .contact-section"
    );

    sections.forEach((section, index) => {
      section.classList.add("scroll-reveal");
      if (index % 2 === 0) {
        section.classList.add("reveal-left"); // Left to Right
      } else {
        section.classList.add("reveal-right"); // Right to Left
      }
      observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Cursor />
      
      {introState !== "done" && (
        <IntroLoader
          state={introState}
          onVideoEnded={() => setIntroState("shrinking")}
          onShrinkDone={() => setIntroState("done")}
        />
      )}

      <div
        className="portfolio-main-content"
        style={{
          opacity: introState === "playing" ? 0 : 1,
          transition: "opacity 1.2s ease-in-out",
          pointerEvents: introState === "playing" ? "none" : "auto",
        }}
      >
        {/* 🔝 NAVBAR (fixed throughout) */}
        <Navbar isIntroActive={introState !== "done"} />

        {/* 🧠 HERO */}
        <Hero />

        {/* 👤 ABOUT (contains 2 sections internally) */}
        <About />

        {/* ⚡ SKILLS */}
        <Skills />

        {/* 🚀 PROJECTS */}
        <Projects />

        {/* 🏆 ACHIEVEMENTS */}
        <Achievements />

        {/* 📬 CONTACT (REAL COMPONENT NOW) */}
        <Contact />

        {/* 🏃 FOOTER */}
        <Footer />

      {/* ⬆️ SCROLL TO TOP */}
      <div
        className={`stt-wrap ${showTop ? "stt-visible" : ""}`}
        onClick={scrollToTop}
        role="button"
        aria-label="Scroll to top"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
      >
        {/* Outer pulse glow ring */}
        <div className="stt-glow" aria-hidden="true" />

        {/* Orbiting satellite ring */}
        <div className="stt-ring" aria-hidden="true" />

        {/* Main button */}
        <button className="stt-btn" tabIndex={-1} aria-hidden="true">
          {/* Exhaust particles */}
          <div className="stt-particles" aria-hidden="true">
            <span className="stt-p stt-p1" />
            <span className="stt-p stt-p2" />
            <span className="stt-p stt-p3" />
            <span className="stt-p stt-p4" />
            <span className="stt-p stt-p5" />
            <span className="stt-p stt-p6" />
          </div>

          {/* Rocket SVG */}
          <svg className="stt-rocket" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3C14 3 9 8 9 15H19C19 8 14 3 14 3Z"
              fill="url(#rg1)" stroke="rgba(167,139,250,.5)" strokeWidth=".7"/>
            <circle cx="14" cy="12" r="2.2"
              fill="rgba(167,139,250,.15)" stroke="#a78bfa" strokeWidth=".8"/>
            <circle cx="13.5" cy="11.5" r=".7" fill="rgba(255,255,255,.4)"/>
            <path d="M9 15L6 19L9 18Z" fill="#534AB7" stroke="rgba(124,106,247,.4)" strokeWidth=".5"/>
            <path d="M19 15L22 19L19 18Z" fill="#534AB7" stroke="rgba(124,106,247,.4)" strokeWidth=".5"/>
            <rect x="11.5" y="18" width="5" height="2.5" rx="1" fill="#3C3489"/>
            <defs>
              <linearGradient id="rg1" x1="14" y1="3" x2="14" y2="18" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a78bfa"/>
                <stop offset="100%" stopColor="#534AB7"/>
              </linearGradient>
            </defs>
          </svg>
        </button>

        {/* Tooltip */}
        <div className="stt-tip" aria-hidden="true">Back to top</div>
      </div>
      </div>
    </>
  );
}