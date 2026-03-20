"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CounterAnimation from "@/components/CounterAnimation";
import ParticleBackground from "@/components/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video parallax on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Badge entrance
      gsap.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.8,
        ease: "power3.out",
      });

      // Heading split animation
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hero-line");
        gsap.from(lines, {
          y: 80,
          opacity: 0,
          rotateX: -40,
          duration: 1,
          stagger: 0.15,
          delay: 2.0,
          ease: "power4.out",
        });
      }

      // Subheading
      gsap.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 2.5,
        ease: "power3.out",
      });

      // Action buttons stagger
      if (actionsRef.current) {
        gsap.from(actionsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: 2.7,
          ease: "power3.out",
        });
      }

      // Stats stagger
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 40,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          stagger: 0.12,
          delay: 3.0,
          ease: "back.out(1.7)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="min-h-screen relative overflow-hidden flex items-center bg-navy">
      {/* Background Video with parallax */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ willChange: "transform" }}
        poster="/assets/shreetej/Shreetej-Properties_Display-Images_PDF-1_page-0001-1024x324_7249fb7a55.jpg"
      >
        <source src="https://website-asset-videos.sfo3.cdn.digitaloceanspaces.com/hoh/new-cut-home-video-comp.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-navy/95"
        style={{ backgroundImage: 'url("/assets/shreetej/Shreetej-Properties_Display-Images_PDF-1_page-0001-1024x324_7249fb7a55.jpg")', backgroundSize: 'cover', backgroundBlendMode: 'overlay', opacity: 0.1 }} />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 to-navy/60" />

      {/* Floating Particles */}
      <ParticleBackground count={15} color="gold" />

      {/* Subtle Noise/Grain Effect */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[8%] pt-32 pb-24">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center space-x-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-2 mb-8 opacity-0">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-slow" />
          <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-gold-light">
            Trusted since 2011 · Sangamner, Maharashtra
          </span>
        </div>

        {/* Heading — perspective container for 3D text reveal */}
        <div className="perspective-1000">
          <h1 ref={headingRef} className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-white font-black mb-7">
            <span className="hero-line block overflow-hidden">
              <span className="inline-block">Your <em className="text-gold-light not-italic italic">Dream Property.</em></span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="inline-block">Legally Secured.</span>
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p ref={subRef} className="text-[clamp(1rem,1.5vw,1.2rem)] text-white/70 max-w-2xl leading-relaxed mb-12 font-light tracking-wide opacity-0">
          From land acquisition and development to 100% loan assistance —
          Shreetej Properties is your Total Real Estate Solution with 15+ years of trusted expertise.
        </p>

        {/* Actions */}
        <div ref={actionsRef} className="flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="btn-ripple bg-gradient-to-br from-gold to-gold-light text-navy font-bold text-[13px] tracking-[1.5px] uppercase px-9 py-4 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,148,58,0.4)] transition-all duration-300"
          >
            Get Free Consultation
          </Link>
          <Link
            href="#projects"
            className="border-2 border-white/30 text-white font-semibold text-[13px] tracking-[1.5px] uppercase px-9 py-4 rounded-xl hover:border-gold-light hover:text-gold-light hover:-translate-y-1 transition-all duration-300"
          >
            View Our Projects
          </Link>
        </div>

        {/* Stats with counter animation */}
        <div ref={statsRef} className="mt-16 lg:mt-0 lg:absolute lg:bottom-16 lg:right-[8%] flex flex-wrap gap-6 lg:gap-10">
          <StatCard target={1500} suffix="+" label="Transactions" />
          <StatCard target={55} suffix="+" label="Projects" />
          <StatCard target={15} suffix="+" label="Years" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  return (
    <div className="text-center px-6 py-5 lg:px-8 lg:py-6 bg-white/5 backdrop-blur-md border border-gold/20 rounded-2xl hover:bg-white/10 hover:border-gold/40 transition-all duration-500 group">
      <div className="font-serif text-[2rem] lg:text-[2.5rem] font-bold text-gold-light leading-none">
        <CounterAnimation target={target} suffix={suffix} />
      </div>
      <div className="text-[10px] lg:text-[11px] tracking-[2px] uppercase text-white/50 mt-1.5 font-semibold group-hover:text-white/70 transition-colors">
        {label}
      </div>
    </div>
  );
}

