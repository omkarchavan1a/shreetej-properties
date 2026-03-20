"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center bg-navy">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        poster="/assets/luxury_residential_exterior.png"
      >
        <source src="https://website-asset-videos.sfo3.cdn.digitaloceanspaces.com/hoh/new-cut-home-video-comp.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-navy/95" 
           style={{ backgroundImage: 'url("/assets/luxury_residential_exterior.png")', backgroundSize: 'cover', backgroundBlendMode: 'overlay', opacity: 0.1 }} />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 to-navy/60" />
      
      {/* Subtle Noise/Grain Effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[8%] pt-32 pb-24">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center space-x-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-slow" />
          <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-gold-light">
            Trusted since 2011 · Sangamner, Maharashtra
          </span>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in-up [animation-delay:150ms] font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-white font-black mb-7">
          Your <em className="text-gold-light not-italic italic">Dream Property.</em><br />
          Legally Secured.
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in-up [animation-delay:300ms] text-[clamp(1rem,1.5vw,1.2rem)] text-white/70 max-w-2xl leading-relaxed mb-12 font-light tracking-wide">
          From land acquisition and development to 100% loan assistance — 
          Shreetej Properties is your Total Real Estate Solution with 15+ years of trusted expertise.
        </p>

        {/* Actions */}
        <div className="animate-fade-in-up [animation-delay:450ms] flex flex-wrap gap-4">
          <Link 
            href="#contact" 
            className="bg-gradient-to-br from-gold to-gold-light text-navy font-bold text-[13px] tracking-[1.5px] uppercase px-9 py-4 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,148,58,0.4)] transition-all duration-300"
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

        {/* Stats (Desktop Bottom Right) */}
        <div className="animate-fade-in-up [animation-delay:600ms] mt-16 lg:mt-0 lg:absolute lg:bottom-16 lg:right-[8%] flex flex-wrap gap-6 lg:gap-10">
          <StatCard num="1500+" label="Transactions" />
          <StatCard num="55+" label="Projects" />
          <StatCard num="15+" label="Years" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center px-6 py-5 lg:px-8 lg:py-6 bg-white/5 backdrop-blur-md border border-gold/20 rounded-2xl">
      <div className="font-serif text-[2rem] lg:text-[2.5rem] font-bold text-gold-light leading-none">
        {num}
      </div>
      <div className="text-[10px] lg:text-[11px] tracking-[2px] uppercase text-white/50 mt-1.5 font-semibold">
        {label}
      </div>
    </div>
  );
}
