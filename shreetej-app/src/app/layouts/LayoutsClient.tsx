"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, CheckCircle2, Info, Layout as LayoutIcon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LayoutsClient({ layouts }: { layouts: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const h1 = heroRef.current?.querySelector("h1");
      const p = heroRef.current?.querySelector("p");

      if (h1) {
        gsap.from(h1, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.5
        });
      }

      if (p) {
        gsap.from(p, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.7
        });
      }

      // Cards Animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-navy"
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/shreetej_images/images/layout.jpg.jpeg" 
            alt="Layouts Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-navy" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6 backdrop-blur-sm">
            <LayoutIcon className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-bold tracking-widest uppercase">Premium Layouts</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
            Our Exclusive <span className="text-gradient-gold">Layouts</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/70 text-lg md:text-xl leading-relaxed">
            Discover thoughtfully planned land developments and plots designed for your future home. 
            Quality infrastructure in prime locations.
          </p>
        </div>
      </section>

      {/* Layout Grid */}
      <section className="py-20 md:py-32 container mx-auto px-6">
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {layouts.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-text-mid text-lg font-serif">No layouts found at the moment. Please check back later.</p>
            </div>
          ) : (
            layouts.map((layout, index) => (
              <div 
                key={layout.id} 
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/10"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-navy/5">
                  {layout.imageUrl && (
                    <Image 
                      src={layout.imageUrl} 
                      alt={layout.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg backdrop-blur-md ${
                      layout.status === 'Completed' 
                        ? 'bg-emerald-500/90 text-white' 
                        : 'bg-gold/90 text-navy'
                    }`}>
                      {layout.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                    {layout.title}
                  </h3>
                  
                  <div className="flex items-start space-x-2 mb-6">
                    <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                    <span className="text-text-mid text-sm leading-relaxed">{layout.location}</span>
                  </div>

                  {layout.amenities && (
                    <div className="mb-8">
                      <h4 className="text-[11px] font-bold text-gold tracking-widest uppercase mb-4 py-2 border-y border-gold/5">
                        Premium Amenities
                      </h4>
                      <ul className="space-y-3">
                        {layout.amenities.split(",").map((item: string, i: number) => (
                          <li key={i} className="flex items-center text-text-dark text-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold/60 mr-2.5" />
                            {item.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gold/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-light uppercase tracking-widest mb-1">Project Details</span>
                      <span className="text-base font-serif text-navy">View Info</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <Info className="w-5 h-5 text-navy/40 group-hover:text-gold transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
            Looking for your <span className="text-gradient-gold">Perfect Plot?</span>
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            Our team is here to help you find the best land options that match your requirements and budget.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-gold to-gold-light text-navy font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            GET IN TOUCH
          </a>
        </div>
      </section>
    </div>
  );
}
