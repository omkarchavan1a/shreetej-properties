"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for touch device
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover], input, select, textarea, [role='button']");
      setExpanded(!!interactive);
    };

    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    // Trailing ring animation
    let animId: number;
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      animId = requestAnimationFrame(animateRing);
    };
    animId = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.documentElement.style.cursor = "";
      document.getElementById("custom-cursor-style")?.remove();
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 z-[99999] pointer-events-none transition-opacity duration-300 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
            expanded
              ? "w-3 h-3 bg-gold/80"
              : "w-2 h-2 bg-gold"
          }`}
        />
      </div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[99998] pointer-events-none transition-opacity duration-300 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-500 ease-out ${
            expanded
              ? "w-14 h-14 border-gold/50 bg-gold/5 scale-100"
              : "w-9 h-9 border-gold/30 bg-transparent scale-100"
          }`}
          style={{ backdropFilter: expanded ? "blur(2px)" : "none" }}
        />
      </div>
    </>
  );
}
