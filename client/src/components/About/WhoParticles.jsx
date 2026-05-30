import React, { useMemo, useEffect, useState } from "react";

const PARTICLES_DATA = {
  purple: "#241379",
  "medium-blue": "#2185bf",
  "light-blue": "#1fbce1",
  red: "#b62f56",
  orange: "#d5764c",
  yellow: "#ffd53e",
  cyan: "#78ffba",
  "light-green": "#98fd85",
  lime: "#befb46",
  magenta: "#6c046c",
  "lightish-red": "#f04c81",
  pink: "#ff4293"
};

const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min);
const randomCalc = (number) => {
  const max = 100 - number;
  const min = -number;
  return randomNum(min, max);
};

export default function WhoParticles() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.body.getAttribute("data-theme") !== "light");
    };
    updateDarkMode();
    const observer = new MutationObserver(() => updateDarkMode());
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Generate 24 unique particle identifiers with their hex codes
  const particlesList = useMemo(() => {
    const list = [];
    Object.entries(PARTICLES_DATA).forEach(([colorName, hex]) => {
      list.push({ id: `${colorName}-1`, hex });
      list.push({ id: `${colorName}-2`, hex });
    });
    return list;
  }, []);

  const cssStyles = useMemo(() => {
    let styles = `
      .who-particles-container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }

      .who-particles-container div,
      .who-particles-container div::before,
      .who-particles-container div::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        opacity: ${isDarkMode ? 0.65 : 0.38};
        transform-origin: top;
        transition: all 5s linear 0s;
        pointer-events: none;
      }
    `;

    particlesList.forEach(({ id, hex }) => {
      const r1 = randomNum(0, 100);
      const r2 = randomNum(0, 100);
      const r3 = randomNum(0, 100);
      const r4 = randomNum(0, 100);
      const r5 = randomNum(0, 100);
      const r6 = randomNum(0, 100);

      const size = randomNum(12, 48);
      const beforeSize = randomNum(12, 48);
      const afterSize = randomNum(12, 48);

      const beforeRot1 = randomNum(0, 360);
      const beforeRot2 = randomNum(0, 360);
      const beforeRot3 = randomNum(0, 360);

      const afterRot1 = randomNum(0, 360);
      const afterRot2 = randomNum(0, 360);
      const afterRot3 = randomNum(0, 360);

      const zIndex = randomNum(1, 6);

      styles += `
        .who-particles-container .${id} {
          animation: who-anim-${id} linear 35s alternate infinite;
          border: 2px solid ${hex};
          border-radius: 100%;
          width: ${size}px;
          height: ${size}px;
          transform: translate3d(${r1}vw, ${r2}vh, 0);
          z-index: ${zIndex};
        }

        .who-particles-container .${id}::before {
          animation: who-anim-${id}-before linear 18s alternate infinite;
          background: ${hex};
          border: 2px solid ${hex};
          border-radius: 100%;
          width: ${beforeSize}px;
          height: ${beforeSize}px;
          transform: translate3d(${r1 + randomCalc(r1)}vw, ${r2 + randomCalc(r2)}vh, 0) rotate(${beforeRot1}deg);
        }

        .who-particles-container .${id}::after {
          animation: who-anim-${id}-after linear 24s alternate infinite;
          border: 2px solid ${hex};
          border-radius: 100%;
          width: ${afterSize}px;
          height: ${afterSize}px;
          transform: translate3d(${r1 + randomCalc(r1)}vw, ${r2 + randomCalc(r2)}vh, 0) rotate(${afterRot1}deg);
        }

        @keyframes who-anim-${id} {
          0% {
            transform: translate3d(${r1}vw, ${r2}vh, 0);
          }
          50% {
            transform: translate3d(${r3}vw, ${r4}vh, 0);
          }
          100% {
            transform: translate3d(${r5}vw, ${r6}vh, 0);
          }
        }

        @keyframes who-anim-${id}-before {
          0% {
            transform: translate3d(${r1 + randomCalc(r1)}vw, ${r2 + randomCalc(r2)}vh, 0) rotate(${beforeRot1}deg);
          }
          33% {
            transform: translate3d(${r3 + randomCalc(r3)}vw, ${r4 + randomCalc(r4)}vh, 0) rotate(${beforeRot2}deg);
          }
          100% {
            transform: translate3d(${r5 + randomCalc(r5)}vw, ${r6 + randomCalc(r6)}vh, 0) rotate(${beforeRot3}deg);
          }
        }

        @keyframes who-anim-${id}-after {
          0% {
            transform: translate3d(${r1 + randomCalc(r1)}vw, ${r2 + randomCalc(r2)}vh, 0) rotate(${afterRot1}deg);
          }
          33% {
            transform: translate3d(${r3 + randomCalc(r3)}vw, ${r4 + randomCalc(r4)}vh, 0) rotate(${afterRot2}deg);
          }
          100% {
            transform: translate3d(${r5 + randomCalc(r5)}vw, ${r6 + randomCalc(r6)}vh, 0) rotate(${afterRot3}deg);
          }
        }
      `;
    });

    return styles;
  }, [isDarkMode, particlesList]);

  return (
    <div className="who-particles-container">
      <style>{cssStyles}</style>
      {particlesList.map(({ id }) => (
        <div key={id} className={id} />
      ))}
    </div>
  );
}
