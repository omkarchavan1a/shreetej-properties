"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-[5%] transition-all duration-300 border-b border-gold/20 flex items-center justify-between backdrop-blur-md ${
        scrolled ? "h-16 bg-navy/95" : "h-20 bg-navy/80"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 group">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center relative bg-white/5 group-hover:bg-white/10 transition-colors">
          <Image
            src="https://shreetejproperties.com/wp-content/uploads/2025/09/Untitled-design-2.png"
            alt="Shreetej Logo"
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="leading-tight">
          <strong className="block font-serif text-white text-[15px] font-bold tracking-wide">
            Shreetej Properties
          </strong>
          <span className="text-[10px] text-gold-light tracking-[2px] uppercase font-medium">
            Total Real Estate Solution
          </span>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-1">
        <NavLink href="/" active>Home</NavLink>
        <NavLink href="/commercial">Commercial</NavLink>
        <NavLink href="/residential">Residential</NavLink>
        <NavLink href="/about">About Us</NavLink>
        <NavLink href="/login">Login</NavLink>
        
        <Link
          href="/contact"
          className="ml-2 bg-gradient-to-br from-gold to-gold-light text-navy font-bold text-[12.5px] tracking-widest uppercase px-5 py-2.5 rounded-lg hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,148,58,0.25)] transition-all"
        >
          Let&apos;s Connect
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex flex-col space-y-1.5 p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-navy-mid border-b border-gold/20 flex flex-col px-6 py-4 space-y-2 shadow-2xl md:hidden">
          <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/commercial" onClick={() => setMobileMenuOpen(false)}>Commercial</MobileNavLink>
          <MobileNavLink href="/residential" onClick={() => setMobileMenuOpen(false)}>Residential</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</MobileNavLink>
          <MobileNavLink href="/login" onClick={() => setMobileMenuOpen(false)}>Login</MobileNavLink>
          <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Let&apos;s Connect</MobileNavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-[12.5px] font-semibold tracking-widest uppercase px-3.5 py-2 rounded-md transition-all ${
        active
          ? "text-gold-light bg-gold/10"
          : "text-white/80 hover:text-gold-light hover:bg-gold/10"
      }`}
    >
      {children}
    </Link>
  );
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 text-xs text-white/80 border-b border-gold/10 hover:text-gold-light hover:bg-gold/5 transition-colors last:border-0"
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
      className="text-white/90 text-sm font-semibold tracking-wider uppercase py-3 border-b border-gold/10"
    >
      {children}
    </Link>
  );
}
