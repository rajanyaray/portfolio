import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { User, Code, Folder, Trophy, Mail, Menu, X } from "lucide-react";
import "./Navbar.css";
import logoJpg from "../../assets/logo.jpg";
import useActiveSection from "../../hooks/useActiveSection";

const navItems = [
  {
    icon: <User />,
    label: "About",
    href: "#about",
    ids: ["about", "journey"],
    color: "#a78bfa",   /* soft violet */
  },
  {
    icon: <Code />,
    label: "Skills",
    href: "#skills",
    ids: ["skills"],
    color: "#818cf8",   /* indigo */
  },
  {
    icon: <Folder />,
    label: "Projects",
    href: "#projects",
    ids: ["projects"],
    color: "#c4b5fd",   /* lavender */
  },
  {
    icon: <Trophy />,
    label: "Achievements",
    href: "#achievements",
    ids: ["achievements"],
    color: "#6d28d9",   /* deep violet */
  },
  {
    icon: <Mail />,
    label: "Contact",
    href: "#contact",
    ids: ["contact"],
    color: "#e2b96f",   /* warm amber — single warm accent */
  },
];

// Animations
const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 1.7 },
};

// ── Cosmos particles canvas ──────────────────────────────────────────────────
function CosmosCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // 28 particles — decent, visible, not overwhelming
    const PARTICLE_COUNT = 28;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.5,          // radius 0.5–2.3
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.6 + 0.3,       // 0.3–0.9
      pulse: Math.random() * Math.PI * 2,     // phase offset for pulsing
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.pulse += 0.025;
        const glowAlpha = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

        // outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        grad.addColorStop(0, `rgba(96, 165, 250, ${glowAlpha})`);       // blue-400
        grad.addColorStop(0.4, `rgba(59, 130, 246, ${glowAlpha * 0.5})`);
        grad.addColorStop(1, `rgba(59, 130, 246, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 219, 254, ${glowAlpha})`;             // blue-200
        ctx.fill();

        // drift + wrap
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="navbar-cosmos" />;
}

// ─────────────────────────────────────────────────────────────────────────────

const Navbar = ({ isIntroActive }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const active = useActiveSection([
    "home",
    "about",
    "journey",
    "skills",
    "projects",
    "achievements",
    "contact",
  ]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById("hero");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Close drawer if user clicks on a link or viewport resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`navbar ${isOpen ? "mobile-expanded" : ""}`}>
      {/* Cosmos particles — clipped inside navbar */}
      <CosmosCanvas />

      {/* Logo */}
      <div
        className="logo"
        onClick={handleLogoClick}
        style={{
          opacity: isIntroActive ? 0 : 1,
          pointerEvents: isIntroActive ? "none" : "auto",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div className="logo-container">
          <div className="logo-glow" />
          <div className="logo-ring" />
          <img src={logoJpg} alt="logo" className="logo-img" />
        </div>
      </div>

      {/* NAV ITEMS */}
      <ul className="nav-links">
        {navItems.map((item, i) => {
          const isActive = item.ids.some((id) => active === id);

          return (
            <motion.li
              key={i}
              className={`nav-item ${isActive ? "active" : ""}`}
              initial="initial"
              whileHover="hover"
            >
              <div className="nav-3d">
                {/* Glow */}
                <motion.div
                  className="nav-glow"
                  style={{
                    background: `linear-gradient(180deg, ${item.color}33 0%, ${item.color}22 60%, transparent 100%)`,
                    borderRadius: "12px",
                  }}
                  variants={glowVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />

                {/* FRONT */}
                <motion.a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-face"
                  data-letters={item.label}
                  variants={itemVariants}
                >
                  {item.icon}
                  <span className="nav-label link--kukuri" data-letters={item.label}>
                    {item.label}
                  </span>
                </motion.a>

                {/* BACK */}
                <motion.a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-face back"
                  data-letters={item.label}
                  variants={backVariants}
                >
                  {item.icon}
                  <span className="nav-label link--kukuri" data-letters={item.label}>
                    {item.label}
                  </span>
                </motion.a>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Right controls: Theme Toggle + Mobile Toggle */}
      <div className="nav-controls">
        {/* Toggle */}
        <div className="toggle-wrapper">
          <label className="theme-switch">
            <input
              type="checkbox"
              className="theme-switch__checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            <div className="theme-switch__container">
              <div className="theme-switch__clouds"></div>

              <div className="theme-switch__stars-container">
                <svg viewBox="0 0 144 55" fill="none">
                  <path
                    d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div className="theme-switch__circle-container">
                <div className="theme-switch__sun-moon-container">
                  <div className="theme-switch__moon">
                    <div className="theme-switch__spot"></div>
                    <div className="theme-switch__spot"></div>
                    <div className="theme-switch__spot"></div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Mobile Hamburger menu toggle */}
        <button
          className={`mobile-menu-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {isOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-links">
            {navItems.map((item, i) => {
              const isActive = item.ids.some((id) => active === id);
              return (
                <li key={i} className={`mobile-nav-item ${isActive ? "active" : ""}`}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setIsOpen(false);
                    }}
                    className="mobile-nav-link"
                    style={{ "--item-color": item.color }}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;