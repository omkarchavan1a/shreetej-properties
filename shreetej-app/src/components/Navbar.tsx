"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Logo entrance animation
    gsap.from(logoRef.current, {
      x: -20,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      ease: "power3.out",
    });

    // Nav links stagger entrance
    if (linksRef.current) {
      gsap.from(linksRef.current.children, {
        y: -10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.3,
        ease: "power3.out",
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate mobile menu items when opening
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.from(mobileMenuRef.current.children, {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power3.out",
      });
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 lg:px-[5%] transition-all duration-500 border-b border-gold/20 flex items-center justify-between backdrop-blur-md ${
        scrolled ? "h-16 bg-navy/95 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "h-20 bg-navy/80"
      }`}
    >
      {/* Logo */}
      <Link ref={logoRef} href="/" className="flex items-center space-x-2 sm:space-x-3 group">
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center relative transition-all duration-300 group-hover:scale-105">
          <Image
            src="/assets/shreetej/new-logo.png"
            alt="Shreetej Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="leading-tight max-w-[48vw] sm:max-w-none">
          <strong className="block font-serif text-white text-[12px] sm:text-[14px] lg:text-[15px] font-bold tracking-wide group-hover:text-gold-light transition-colors duration-300 truncate sm:whitespace-normal">
            Shreetej Properties Builders & Developers
          </strong>
          <span className="hidden sm:block text-[10px] text-gold-light tracking-[2px] uppercase font-medium">
            Total Real Estate Solution
          </span>
        </div>
      </Link>

      {/* Desktop Links */}
      <div ref={linksRef} className="hidden md:flex items-center gap-4">
        {/* Menu Bar (Glassmorphism Pill) */}
        <div className="flex items-center space-x-1 p-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <NavLink href="/" active>Home</NavLink>
          <NavLink href="/commercial">Commercial</NavLink>
          <NavLink href="/residential">Residential</NavLink>
          <NavLink href="/layouts">Layouts</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/login">Login</NavLink>
          <Link
            href="/contact"
            className="ml-2 btn-ripple bg-gradient-to-br from-gold to-gold-light text-navy font-bold text-[12.5px] tracking-widest uppercase px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,148,58,0.25)] transition-all duration-300"
          >
            Connect Us
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex flex-col space-y-1.5 p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-navy-mid/95 backdrop-blur-xl border-b border-gold/20 flex-col px-4 sm:px-6 py-4 space-y-2 shadow-2xl md:hidden transition-all duration-500 max-h-[75vh] overflow-y-auto ${
          mobileMenuOpen 
            ? 'flex opacity-100 translate-y-0' 
            : 'hidden opacity-0 -translate-y-4'
        }`}
      >
        <div ref={mobileMenuRef} className="flex flex-col space-y-2">
          <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/commercial" onClick={() => setMobileMenuOpen(false)}>Commercial</MobileNavLink>
          <MobileNavLink href="/residential" onClick={() => setMobileMenuOpen(false)}>Residential</MobileNavLink>
          <MobileNavLink href="/layouts" onClick={() => setMobileMenuOpen(false)}>Layouts</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</MobileNavLink>
          <MobileNavLink href="/login" onClick={() => setMobileMenuOpen(false)}>Login</MobileNavLink>
          <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Connect Us</MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`nav-link-underline text-[12.5px] font-semibold tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
        active
          ? "text-gold-light bg-gold/15"
          : "text-white/80 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-white/90 text-sm font-semibold tracking-wider uppercase py-3 border-b border-gold/10 hover:text-gold-light hover:pl-2 transition-all duration-300"
    >
      {children}
    </Link>
  );
}
