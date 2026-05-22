import { useEffect, useRef, useCallback } from "react";
import "./Cursor.css";

/* ─────────────────────────────────────────────
   Cursor — magnetic, constellation-ring cursor
   Modes:
     default  → glowing dot + orbiting ring
     hovering → dot dissolves, ring halos
     clicking → both compress + spark burst
     on-text  → ring becomes blinking caret
   ───────────────────────────────────────────── */

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, ' +
  '[tabindex]:not([tabindex="-1"]), .cursor-hover';

const TEXT_INPUTS = "input, textarea";

const TRAIL_INTERVAL_MS = 80;
const SPARK_COUNT = 8;
const LAG_FACTOR = 0.14; // ring lags behind dot (0 = instant, 1 = frozen)

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  // live position refs — no re-renders
  const mouse   = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafId   = useRef(null);
  const trailId = useRef(null);
  const lastTrail = useRef(0);

  /* ── Spark burst ──────────────────────────── */
  const spawnSparks = useCallback((x, y) => {
    for (let i = 0; i < SPARK_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "cursor-spark";
      const angle = (2 * Math.PI * i) / SPARK_COUNT + Math.random() * 0.4;
      const dist  = 28 + Math.random() * 22;
      el.style.left = `${x}px`;
      el.style.top  = `${y}px`;
      el.style.setProperty("--spark-dx", `${Math.cos(angle) * dist}px`);
      el.style.setProperty("--spark-dy", `${Math.sin(angle) * dist}px`);
      el.style.animationDelay = `${i * 18}ms`;
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }
  }, []);

  /* ── Trail ghost ──────────────────────────── */
  const spawnTrail = useCallback((x, y) => {
    const now = performance.now();
    if (now - lastTrail.current < TRAIL_INTERVAL_MS) return;
    lastTrail.current = now;

    const el = document.createElement("div");
    el.className = "cursor-trail";
    const size = 20 + Math.random() * 10;
    el.style.left   = `${x}px`;
    el.style.top    = `${y}px`;
    el.style.width  = `${size}px`;
    el.style.height = `${size}px`;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }, []);

  /* ── RAF loop — smooth ring lerp ─────────── */
  const tick = useCallback(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) { rafId.current = requestAnimationFrame(tick); return; }

    // Dot snaps instantly
    const { x, y } = mouse.current;
    dot.style.left = `${x}px`;
    dot.style.top  = `${y}px`;

    // Ring lerps (magnetic lag)
    ringPos.current.x += (x - ringPos.current.x) * LAG_FACTOR;
    ringPos.current.y += (y - ringPos.current.y) * LAG_FACTOR;
    ring.style.left = `${ringPos.current.x}px`;
    ring.style.top  = `${ringPos.current.y}px`;

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── Mouse move ─────────────────────────── */
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      spawnTrail(e.clientX, e.clientY);
    };

    /* ── Hover detection ────────────────────── */
    const onOver = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;

      const isText = e.target.closest(TEXT_INPUTS);
      if (isText) {
        ring.classList.add("on-text");
        ring.classList.remove("hovering");
      } else {
        ring.classList.add("hovering");
        ring.classList.remove("on-text");
        dot.classList.add("hovering");
      }
    };

    const onOut = () => {
      ring.classList.remove("hovering", "on-text");
      dot.classList.remove("hovering");
    };

    /* ── Click ──────────────────────────────── */
    const onDown = () => {
      dot.classList.add("clicking");
      ring.classList.add("clicking");
      spawnSparks(mouse.current.x, mouse.current.y);
    };

    const onUp = () => {
      dot.classList.remove("clicking");
      ring.classList.remove("clicking");
    };

    /* ── Visibility ─────────────────────────── */
    const onLeave = () => {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove",  onMove, { passive: true });
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
      clearInterval(trailId.current);
    };
  }, [tick, spawnSparks, spawnTrail]);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}