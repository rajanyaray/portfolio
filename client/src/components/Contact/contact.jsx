import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./contact.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import BeamGridBackground from "./BeamGridBackground";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [orbs, setOrbs] = useState([]);
  const imgRef = useRef(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Generate floating orb positions once
  useEffect(() => {
    const generated = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${10 + i * 14}%`,
      top: `${20 + (i % 3) * 25}%`,
      delay: `${i * 0.8}s`,
      size: `${60 + i * 20}px`,
    }));
    setOrbs(generated);
  }, []);

  // Dotted surface Three.js effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasRef.current.offsetWidth / canvasRef.current.offsetHeight,
      1,
      10000
    );
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    canvasRef.current.appendChild(renderer.domElement);

    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(
          ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
        );
        colors.push(0.6, 0.3, 1.0);
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const posAttr = geometry.attributes.position;
      const pos = posAttr.array;
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          pos[i * 3 + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.07;
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.offsetWidth / canvasRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    sceneRef.current = { scene, camera, renderer, animationId };

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 3D tilt on photo
  const handleMouseMove = (e) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const profileLinks = [
    {
      label: "LinkedIn",
      href: "#",
      color: "#0A66C2",
      glow: "#0A66C2",
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "#",
      color: "#c9c9c9",
      glow: "#6e40c9",
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LeetCode",
      href: "#",
      color: "#FFA116",
      glow: "#FFA116",
      icon: (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z" />
        </svg>
      ),
    },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      href: "#",
      color: "#E1306C",
      glow: "#833AB4",
      gradient: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 448 512">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      color: "#1877F2",
      glow: "#1877F2",
      gradient: "linear-gradient(135deg,#1877F2,#0d5fc4)",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.411c0-3.1 1.893-4.785 4.658-4.785 1.325 0 2.462.099 2.795.143v3.24h-1.918c-1.505 0-1.796.717-1.796 1.767v2.318h3.588l-.467 3.622h-3.121V24h6.116c.73 0 1.324-.595 1.324-1.324V1.325C24 .595 23.405 0 22.675 0z" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "#",
      color: "#ffffff",
      glow: "#888",
      gradient: "linear-gradient(135deg,#1a1a1a,#444)",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.635 5.906-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="contact-section" ref={sectionRef} id="contact">
      <BeamGridBackground zIndex={0} />

      {/* Dotted surface canvas */}
      <div className="dotted-canvas" ref={canvasRef} />

      {/* Ambient orbs */}
      <div className="ambient-orbs">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="ambient-orb"
            style={{ left: orb.left, top: orb.top, animationDelay: orb.delay, width: orb.size, height: orb.size }}
          />
        ))}
      </div>



      {/* Heading */}
      <div className="contact-heading-wrap">
        <SectionHeading title="Connect With Me" tagline="Get In Touch" />
        <span className="available-badge">
          <span className="badge-dot" />
          Available for Internships &amp; Collabs
        </span>
      </div>

      {/* Main layout */}
      <div className="contact-body">
        {/* LEFT — photo + resume */}
        <div className="contact-left">
          <div
            className="photo-frame-outer"
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
          >
            <div className="photo-corner c1" />
            <div className="photo-corner c2" />
            <div className="photo-corner c3" />
            <div className="photo-corner c4" />
            <div className="photo-scan-line" />
            <div className="photo-glow-ring" />
            <img src="connect.png" alt="Profile" className="profile-photo" />
            <div className="photo-overlay-gradient" />
          </div>

          {/* Resume button — Uiverse Peary74 style */}
          <a href="#" className="resume-btn" target="_blank" rel="noreferrer">
            <div className="resume-svg-wrapper-1">
              <div className="resume-svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" className="resume-icon">
                  <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 8H13V3.5zM8 13h8v1.5H8V13zm0 3h8v1.5H8V16zm0-6h3v1.5H8V10z"/>
                </svg>
              </div>
            </div>
            <span className="resume-label">Résumé</span>
          </a>
        </div>

        {/* RIGHT — buttons + mail */}
        <div className="contact-right">
          {/* Profile row */}
          <div className="btn-row-label">— Profiles —</div>
          <div className="btn-row">
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="profile-btn"
                style={{ ["--btn-color"]: link.color, ["--btn-glow"]: link.glow }}
                target="_blank"
                rel="noreferrer"
              >
                <span className="profile-btn-bg" />
                <span className="profile-btn-icon">{link.icon}</span>
                <span className="profile-btn-label">{link.label}</span>
                <span className="profile-btn-shine" />
              </a>
            ))}
          </div>

          {/* Socials row */}
          <div className="btn-row-label">— Socials —</div>
          <div className="btn-row">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="social-btn"
                style={{ ["--social-gradient"]: link.gradient, ["--social-glow"]: link.glow, ["--social-color"]: link.color }}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-btn-bg" />
                <span className="social-btn-icon">{link.icon}</span>
                <span className="social-btn-label">{link.label}</span>
                <span className="social-btn-shine" />
              </a>
            ))}
          </div>

          {/* Glass mail box */}
          <div className="mail-glass-box">
            <div className="mail-glass-inner">
              <div className="mail-top-row">
                <div className="mail-meta">
                  <span className="mail-tag">✦ DROP A LINE</span>
                  <span className="mail-address">yourname@email.com</span>
                  <span className="mail-sub">Replies within 24 hrs · Always open to collab</span>
                </div>
                <div className="mail-input-wrap">
                  <input
                    type="email"
                    className="mail-input"
                    placeholder="Your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="mail-send-btn">
                    SAY HELLO
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mail-glow-bar" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="tagline-wrap">
        <span className="tagline-lets">
          {"Let's Build Something".split("").map((char, i) => (
            <span key={i} className="tagline-char" style={{ animationDelay: `${i * 0.06}s` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
        <span className="tagline-remarkable">REMARKABLE</span>
      </div>
    </section>
  );
}