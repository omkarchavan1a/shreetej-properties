"use client";

export default function ParticleBackground({ count = 20, color = "gold" }: { count?: number; color?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 10,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  const colorClass = color === "gold" ? "bg-gold" : "bg-white";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${colorClass}`}
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animation: `floatParticle ${p.duration}s ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
