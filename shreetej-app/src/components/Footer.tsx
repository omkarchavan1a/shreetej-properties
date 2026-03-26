"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Footer() {
  const [showMap, setShowMap] = useState(false);

  return (
    <footer className="bg-navy text-white/60 pt-20 pb-8 px-6 md:px-[8%] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 border-b border-white/10 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={0}>
              <h3 className="font-serif text-[1.6rem] text-white font-bold mb-4">
                Shreetej Properties
              </h3>
              <p className="text-[0.9rem] leading-[1.8] max-w-sm mb-8 font-light">
                Your trusted Total Real Estate Solution, providing legal security, quality construction, and full customer satisfaction since 2011. Founded by Shri Satish B. Raut.
              </p>
              <div className="flex gap-3">
                <SocialIcon href="https://www.facebook.com/shreetejproperties" icon="Facebook" isSvg />
                <SocialIcon href="https://www.instagram.com/shreetej_properties" icon="Instagram" isSvg />
              </div>
            </ScrollReveal>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="up" delay={100}>
              <h4 className="text-[13px] font-bold tracking-[2px] uppercase text-white mb-6 pb-3 border-b border-gold/20 inline-block">
                Services
              </h4>
              <div className="flex flex-col space-y-3 relative">
                <FooterLink href="#residential">Residential & Commercial</FooterLink>
                <FooterLink href="#land">Land & Plot Development</FooterLink>
                <FooterLink href="#legal">Legal & Documentation</FooterLink>
                <FooterLink href="#builders">Project Consultation</FooterLink>
                <FooterLink href="#loans">Loan Assistance</FooterLink>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="up" delay={200}>
              <h4 className="text-[13px] font-bold tracking-[2px] uppercase text-white mb-6 pb-3 border-b border-gold/20 inline-block">
                Quick Links
              </h4>
              <div className="flex flex-col space-y-3 relative">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/commercial">Commercial</FooterLink>
                <FooterLink href="/residential">Residential</FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/contact">Let&apos;s Connect</FooterLink>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="up" delay={300}>
              <h4 className="text-[13px] font-bold tracking-[2px] uppercase text-white mb-6 pb-3 border-b border-gold/20 inline-block">
                Contact Us
              </h4>
              <div className="flex flex-col space-y-4">
                <button onClick={(e) => { e.preventDefault(); setShowMap(!showMap); }} className="flex gap-3 items-start group text-left w-full outline-none">
                  <span className="text-gold text-lg mt-0.5 group-hover:scale-110 transition-transform duration-300">📍</span>
                  <span className="text-[13px] leading-[1.6] group-hover:text-gold-light transition-colors duration-300">
                    Ekta Chauk, Ghulewadi, Tal-Sangamner, Dist-Ahmednagar, Maharashtra.
                  </span>
                </button>
                
                {/* Embedded Map Toggle */}
                <div className={`transition-all duration-500 overflow-hidden w-full rounded-xl ${showMap ? 'h-[250px] opacity-100 mt-2' : 'h-0 opacity-0 mt-0 pointer-events-none'}`}>
                  <iframe 
                    src="https://maps.google.com/maps?q=Ekta+Chauk,Ghulewadi,Sangamner,Ahmednagar,Maharashtra&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl border border-white/10 shadow-lg"
                  ></iframe>
                </div>
                <a href="tel:+917588464644" className="flex gap-3 items-start group">
                  <span className="text-gold text-lg mt-0.5 group-hover:scale-110 transition-transform duration-300">📞</span>
                  <span className="text-[13px] leading-[1.6] group-hover:text-gold-light transition-colors duration-300">
                    +91 75884 64644<br />02425-451461
                  </span>
                </a>
                <a href="mailto:info@shreetejproperties.com" className="flex gap-3 items-start group">
                  <span className="text-gold text-lg mt-0.5 group-hover:scale-110 transition-transform duration-300">✉️</span>
                  <span className="text-[13px] leading-[1.6] group-hover:text-gold-light transition-colors duration-300">
                    info@shreetejproperties.com
                  </span>
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Glowing separator */}
        <div 
          className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8"
          style={{ animation: 'separatorGlow 3s infinite' }}
        />

        {/* Bottom */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <span className="font-serif text-gold-light font-bold text-[14px]">
              Shreetej Properties © 2025
            </span>
            <span className="tracking-wide">
              All Rights Reserved · Crafted with ❤️ for Maharashtra&apos;s Families
            </span>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href = "#", isSvg = false }: { icon: string; href?: string; isSvg?: boolean }) {
  const renderIcon = () => {
    if (isSvg && icon === "Facebook") {
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    }
    if (isSvg && icon === "Instagram") {
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    }
    return icon;
  };

  return (
    <a
      href={href}
      target={href !== "#" ? "_blank" : undefined}
      rel={href !== "#" ? "noopener noreferrer" : undefined}
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white/70 hover:bg-gold hover:text-navy hover:border-gold hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(201,148,58,0.3)] transition-all duration-300 shadow-md"
    >
      {renderIcon()}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] text-white/50 hover:text-gold-light hover:translate-x-1 transition-all duration-300 inline-block"
    >
      {children}
    </Link>
  );
}
