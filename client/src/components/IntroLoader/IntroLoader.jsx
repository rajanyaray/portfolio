import React, { useEffect, useRef, useState } from "react";
import "./IntroLoader.css";
import introVideo from "../../assets/intro.mp4";
import logoImg from "../../assets/logo.png";

export default function IntroLoader({ state, onVideoEnded, onShrinkDone }) {
  const videoRef = useRef(null);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    borderRadius: "0px",
  });

  useEffect(() => {
    // Auto-play video on mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked or video failed:", err);
      });
    }

    // Safety fallback in case the video gets stuck or fails to load
    const fallbackTimer = setTimeout(() => {
      if (state === "playing") {
        onVideoEnded();
      }
    }, 4500);

    return () => clearTimeout(fallbackTimer);
  }, [state, onVideoEnded]);

  useEffect(() => {
    if (state === "shrinking") {
      // Find the navbar logo element to target
      const logoEl = document.querySelector(".navbar .logo-container");
      let target = {
        top: window.innerHeight / 2 - 21,
        left: 20,
        width: 42,
        height: 42,
      };

      if (logoEl) {
        const rect = logoEl.getBoundingClientRect();
        target = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };
      }

      setCoords({
        top: `${target.top}px`,
        left: `${target.left}px`,
        width: `${target.width}px`,
        height: `${target.height}px`,
        borderRadius: "50%",
      });

      // Call onShrinkDone after the CSS transition completes (1.2 seconds)
      const shrinkTimer = setTimeout(() => {
        onShrinkDone();
      }, 1200);

      return () => clearTimeout(shrinkTimer);
    }
  }, [state, onShrinkDone]);

  // Handle when video natively ends
  const handleVideoEnded = () => {
    if (state === "playing") {
      onVideoEnded();
    }
  };

  return (
    <div
      className={`intro-loader-overlay ${state}`}
      style={{
        top: state === "playing" ? "0" : coords.top,
        left: state === "playing" ? "0" : coords.left,
        width: state === "playing" ? "100vw" : coords.width,
        height: state === "playing" ? "100vh" : coords.height,
        borderRadius: state === "playing" ? "0px" : coords.borderRadius,
      }}
    >
      <video
        ref={videoRef}
        src={introVideo}
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="intro-video"
        style={{
          opacity: state === "playing" ? 1 : 0,
        }}
      />

      <img
        src={logoImg}
        alt="Logo"
        className="intro-logo-img"
        style={{
          opacity: state === "playing" ? 0 : 1,
        }}
      />
    </div>
  );
}
