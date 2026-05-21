import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Achievements from "./components/Achievements/Achievements";
import Contact from "./components/Contact/contact"; // ✅ added

import "./styles/global.css";
import "./styles/background.css";

function App() {
  const [showTop, setShowTop] = useState(false);

  // Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* 🔝 NAVBAR (fixed throughout) */}
      <Navbar />

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

      {/* ⬆️ SCROLL TO TOP */}
      {showTop && (
        <div className="scroll-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </>
  );
}

export default App;