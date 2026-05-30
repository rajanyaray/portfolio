import React, { useMemo, useEffect, useState } from "react";

export const Meteors = ({ number = 20, className = "" }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.body.getAttribute("data-theme") !== "light");
    };
    updateDarkMode();
    const observer = new MutationObserver(() => updateDarkMode());
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const meteorArray = useMemo(() => new Array(number).fill(true), [number]);

  // Generate random positioning and timing once to prevent continuous re-rendering layout changes
  const meteorsData = useMemo(() => {
    return meteorArray.map(() => ({
      left: Math.random() * 130 - 15 + "%",
      top: Math.random() * 50 - 20 + "%",
      delay: Math.random() * 8 + "s",
      duration: Math.random() * 5 + 3 + "s",
    }));
  }, [meteorArray]);

  // Twinkling stars for space depth effect
  const starsData = useMemo(() => {
    return Array.from({ length: 45 }).map(() => ({
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      size: Math.random() * 1.5 + 0.8 + "px",
      delay: Math.random() * 5 + "s",
      duration: Math.random() * 4 + 2.5 + "s",
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <style>{`
        @keyframes meteor-animation {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-1000px);
            opacity: 0;
          }
        }

        @keyframes star-twinkle {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15);
          }
        }

        .meteor-dot {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          animation: meteor-animation linear infinite;
        }

        .meteor-dot::before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 1px;
          width: 70px;
          background: linear-gradient(90deg, var(--meteor-tail-color, #a78bfa), transparent);
        }

        .journey-star {
          position: absolute;
          border-radius: 50%;
          animation: star-twinkle ease-in-out infinite;
        }
      `}</style>
      
      {/* 🌌 Twinkling Stars */}
      {starsData.map((data, idx) => {
        const starColor = isDarkMode ? "rgba(255, 255, 255, 0.85)" : "var(--av1)";
        const starGlow = isDarkMode ? "rgba(56, 189, 248, 0.5)" : "rgba(109, 40, 217, 0.35)";
        
        return (
          <span
            key={"star-" + idx}
            className="journey-star"
            style={{
              backgroundColor: starColor,
              boxShadow: `0 0 5px ${starGlow}`,
              width: data.size,
              height: data.size,
              top: data.top,
              left: data.left,
              animationDelay: data.delay,
              animationDuration: data.duration,
            }}
          />
        );
      })}

      {/* ☄️ Meteors */}
      {meteorsData.map((data, idx) => {
        const headColor = isDarkMode ? "rgba(255, 255, 255, 0.95)" : "var(--av1)";
        const glowColor = isDarkMode ? "var(--av2)" : "var(--av1)";
        const tailColor = isDarkMode ? "rgba(167, 139, 250, 0.5)" : "rgba(109, 40, 217, 0.35)";
        
        return (
          <span
            key={"meteor-" + idx}
            className="meteor-dot"
            style={{
              "--meteor-tail-color": tailColor,
              backgroundColor: headColor,
              boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 8px 1px ${glowColor}`,
              top: data.top,
              left: data.left,
              animationDelay: data.delay,
              animationDuration: data.duration,
            }}
          />
        );
      })}
    </div>
  );
};
