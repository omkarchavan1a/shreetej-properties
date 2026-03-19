import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60 pt-20 pb-8 px-[8%]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 border-b border-white/10 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <h3 className="font-serif text-[1.6rem] text-white font-bold mb-4">
              Shreetej Properties
            </h3>
            <p className="text-[0.9rem] leading-[1.8] max-w-sm mb-8 font-light">
              Your trusted Total Real Estate Solution, providing legal security, quality construction, and full customer satisfaction since 2011. Founded by Shri Satish B. Raut.
            </p>
            <div className="flex gap-3">
              <SocialIcon icon="f" />
              <SocialIcon icon="in" />
              <SocialIcon icon="x" />
              <SocialIcon icon="ig" />
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
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
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
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
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold tracking-[2px] uppercase text-white mb-6 pb-3 border-b border-gold/20 inline-block">
              Contact Us
            </h4>
            <div className="flex flex-col space-y-4">
              <a href="https://maps.google.com/?q=Ekta+Chauk,Ghulewadi,Sangamner,Ahmednagar,Maharashtra" target="_blank" rel="noopener noreferrer" className="flex gap-3 items-start group">
                <span className="text-gold text-lg mt-0.5 group-hover:scale-110 transition-transform">📍</span>
                <span className="text-[13px] leading-[1.6] group-hover:text-gold-light transition-colors">
                  Ekta Chauk, Ghulewadi, Tal-Sangamner, Dist-Ahmednagar, Maharashtra.
                </span>
              </a>
              <a href="tel:+917588464644" className="flex gap-3 items-start group">
                <span className="text-gold text-lg mt-0.5 group-hover:scale-110 transition-transform">📞</span>
                <span className="text-[13px] leading-[1.6] group-hover:text-gold-light transition-colors">
                  +91 75884 64644<br />02425-451461
                </span>
              </a>
              <a href="mailto:info@shreetejproperties.com" className="flex gap-3 items-start group">
                <span className="text-gold text-lg mt-0.5 group-hover:scale-110 transition-transform">✉️</span>
                <span className="text-[13px] leading-[1.6] group-hover:text-gold-light transition-colors">
                  info@shreetejproperties.com
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <span className="font-serif text-gold-light font-bold text-[14px]">
            Shreetej Properties © 2025
          </span>
          <span className="tracking-wide">
            All Rights Reserved · Crafted with ❤️ for Maharashtra&apos;s Families
          </span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white/70 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 shadow-md"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] text-white/50 hover:text-gold-light transition-colors"
    >
      {children}
    </Link>
  );
}
