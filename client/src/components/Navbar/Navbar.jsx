import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { User, Code, Folder, Trophy, Mail } from "lucide-react";
import "./Navbar.css";
import useActiveSection from "../../hooks/useActiveSection";

const navItems = [
  {
    icon: <User />,
    label: "About",
    href: "#about",
    ids: ["about"],
    color: "#2563eb",
  },
  {
    icon: <Code />,
    label: "Skills",
    href: "#skills",
    ids: ["skills"],
    color: "#f59e42",
  },
  {
    icon: <Folder />,
    label: "Projects",
    href: "#projects",
    ids: ["projects"],
    color: "#20c997",
  },
  {
    icon: <Trophy />,
    label: "Achievements",
    href: "#achievements",
    ids: ["achievements"],
    color: "#fde047",
  },
  {
    icon: <Mail />,
    label: "Contact",
    href: "#contact",
    ids: ["contact"],
    color: "#ec4899",
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

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // 👇 TRACK ACTIVE SECTION
  const active = useActiveSection([
    "home",
    "about",
    "skills",
    "projects",
    "achievements",
    "contact",
  ]);

  // 👇 HANDLE NAV CLICK - SCROLL TO SECTION
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/src/assets/logo.png" alt="logo" />
      </div>

      {/* NAV ITEMS */}
      <ul className="nav-links">
        {navItems.map((item, i) => {
          const isActive = item.ids.some((id) => active === id);

          return (
            <motion.li
              key={i}
              className={`nav-item ${isActive ? "active" : ""}`} // 👈 ACTIVE CLASS
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
                  variants={itemVariants}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.a>

                {/* BACK */}
                <motion.a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-face back"
                  variants={backVariants}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.a>
              </div>
            </motion.li>
          );
        })}
      </ul>

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
    </div>
  );
};

export default Navbar;