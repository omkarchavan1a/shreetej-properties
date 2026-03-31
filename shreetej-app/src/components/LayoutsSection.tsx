"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Info } from "lucide-react";

export default function LayoutsSection({ layouts }: { layouts: any[] }) {
  if (!layouts || layouts.length === 0) return null;

  return (
    <div className="w-full bg-navy py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />

      <section className="px-6 md:px-[8%] max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal direction="up" duration={800}>
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6 backdrop-blur-sm">
              <span className="text-gold text-xs font-bold tracking-widest uppercase">Premium Land Developments</span>
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-white font-bold mb-6">
              Exclusive <em className="text-gold not-italic italic">Layouts</em>
            </h2>
            <p className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed mb-8">
              Discover thoughtfully planned land developments and plots designed for your future home, with quality infrastructure in prime locations.
            </p>
            <Link 
              href="/layouts" 
              className="inline-flex items-center text-xs font-bold tracking-[2px] uppercase text-gold hover:text-white transition-colors duration-300 group"
            >
              View All Layouts 
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Layouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {layouts.slice(0, 3).map((layout, index) => (
            <ScrollReveal key={layout.id} direction="up" delay={index * 150} duration={800}>
              <Link
                href={`/layouts/${layout.id}`}
                className="group block bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold/20 shadow-xl h-full flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-navy/50">
                  {layout.imageUrl ? (
                    <Image 
                      src={layout.imageUrl} 
                      alt={layout.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-navy/80 flex items-center justify-center">
                      <span className="text-gold/50 font-serif">Premium Layout</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
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

                  {/* Title overlay on image */}
                  <div className="absolute bottom-4 left-6 pr-6 z-10">
                    <h3 className="text-2xl font-serif text-white group-hover:text-gold transition-colors duration-300">
                      {layout.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex items-start space-x-2 mb-6">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-white/80 text-sm leading-relaxed">{layout.location}</span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Explore</span>
                      <span className="text-sm font-bold text-white tracking-widest uppercase">View Details</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                      <Info className="w-5 h-5 text-navy group-hover:text-navy transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
