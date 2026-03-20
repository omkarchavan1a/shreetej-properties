"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "complete" | "exit" | "hidden">("loading");

  useEffect(() => {
    // Block scroll during loading
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards end
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const t1 = setTimeout(() => setPhase("complete"), 300);
      const t2 = setTimeout(() => setPhase("exit"), 900);
      const t3 = setTimeout(() => {
        setPhase("hidden");
        document.body.style.overflow = "";
      }, 1800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [progress]);

  if (phase === "hidden") return null;

  const companyName = "SHREETEJ";
  const tagline = "PROPERTIES";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy transition-all duration-[900ms] ${
        phase === "exit" ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      {/* Shimmer lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: "-100%",
              right: "-100%",
              animation: `shimmerLine 3s ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Logo / Company Name */}
      <div className="relative z-10 text-center">
        {/* Letter-by-letter animation */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {companyName.split("").map((letter, i) => (
            <span
              key={i}
              className="font-serif text-[clamp(2rem,6vw,4rem)] font-black text-white inline-block"
              style={{
                animation: `letterReveal 0.6s ${0.1 + i * 0.08}s cubic-bezier(0.16, 1, 0.3, 1) both`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div
          className="text-[11px] tracking-[8px] uppercase text-gold-light font-bold"
          style={{
            animation: "fadeInUp 0.8s 1s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {tagline}
        </div>

        {/* Decorative line */}
        <div
          className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          style={{
            width: `${progress}%`,
            maxWidth: "200px",
            transition: "width 0.3s ease-out",
          }}
        />
      </div>

      {/* Progress indicator */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        style={{ animation: "fadeInUp 0.8s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="text-[10px] tracking-[4px] uppercase text-white/30 font-bold tabular-nums">
          {phase === "complete" ? "Welcome" : `${progress}%`}
        </span>
      </div>
    </div>
  );
}
