"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  hidden?: boolean;
}

const directionStyles: Record<Direction, { initial: string; visible: string }> = {
  up: {
    initial: "translate-y-16 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  down: {
    initial: "-translate-y-16 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  left: {
    initial: "translate-x-16 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  right: {
    initial: "-translate-x-16 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  scale: {
    initial: "scale-90 opacity-0",
    visible: "scale-100 opacity-100",
  },
  blur: {
    initial: "opacity-0 blur-sm",
    visible: "opacity-100 blur-0",
  },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  once = true,
  hidden = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!hidden);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={`transition-all ${isVisible ? styles.visible : styles.initial} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
