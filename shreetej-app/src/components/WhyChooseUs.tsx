"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import CounterAnimation from "@/components/CounterAnimation";
import { ShieldCheck, Building2, HeartHandshake } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "100% Legal Confidence",
      desc: "Every property comes with a verified title deed. We offer free legal document verification on any real estate deal to prevent fraud.",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Quality You Can Afford",
      desc: "Excellent construction quality at affordable rates, delivering maximum value to the common man without breaking the bank.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Post-Sale Commitment",
      desc: "We resolve any property issues or legal challenges even after the sale. Unlike others, your peace of mind is our permanent priority.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-[8%] max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Image Side with clip-path reveal */}
        <ScrollReveal direction="left" duration={1000}>
          <div className="relative rounded-3xl overflow-hidden h-[350px] sm:h-[500px] lg:h-[600px] shadow-2xl group">
            <Image
              src="/assets/shreetej/trust-feature.jpg"
              alt="Shreetej Properties Builders & Developers Building"
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute bottom-8 left-8 bg-navy/90 backdrop-blur-md border border-gold/20 rounded-2xl p-6 lg:p-8 group-hover:border-gold/40 transition-all duration-500">
              <div className="font-serif text-[2.5rem] lg:text-[3rem] text-gold-light font-bold leading-none">
                <CounterAnimation target={16} suffix="+" />
              </div>
              <div className="text-[11px] tracking-[1.5px] uppercase text-white/60 mt-2 font-semibold">
                Years of Trust
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Content Side */}
        <div>
          <ScrollReveal direction="right">
            <div className="flex items-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
              <span>Why Choose Us</span>
              <div className="h-px bg-gold/40 w-12" />
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.2] text-text-dark mb-5">
              विश्वासाचं एक अतूट नातं<br />
              <em className="text-gold italic not-italic">A Unique Bond of Trust</em>
            </h2>
            <p className="text-[1.05rem] text-text-mid leading-relaxed max-w-xl font-light mb-10">
              We don&apos;t just sell property — we secure your investment with legal expertise, quality construction, and an unwavering post-sale commitment.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {points.map((point, idx) => (
              <ScrollReveal key={idx} direction="right" delay={idx * 150}>
                <div
                  className="flex items-start gap-5 p-6 border border-gold/15 rounded-2xl bg-white/60 backdrop-blur-sm hover:border-gold hover:translate-x-2 hover:shadow-[0_20px_60px_rgba(13,27,42,0.08)] transition-all duration-400 group"
                >
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,148,58,0.2)] transition-all duration-300">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-[1.1rem] font-bold text-text-dark mb-1.5 group-hover:text-navy transition-colors">
                      {point.title}
                    </h4>
                    <p className="text-[0.9rem] text-text-mid leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Legacy Stats */}
          <ScrollReveal direction="right">
            <div className="mt-10">
              <h3 className="font-serif text-[1.6rem] sm:text-[1.9rem] text-[#6b5530] font-semibold tracking-[1px] mb-6 text-center">
                THE LEGACY OF TRUST &amp; EXCELLENCE
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: 16, suffix: "+", label: "YEARS\nof Expertise", gold: false },
                  { value: 550000, suffix: "+", label: "Sq. Ft. Area\nDeveloped", gold: true, formatted: "5,50,000+" },
                  { value: 1500, suffix: "+", label: "Successful Property\nTransactions", gold: false },
                  { value: 55, suffix: "+", label: "Residential &\nCommercial Projects", gold: true },
                  { value: 15, suffix: "+", label: "Successfully\nDeveloped Layouts", gold: false },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl px-3 py-5 sm:py-6 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      stat.gold
                        ? "bg-gold border-gold text-white"
                        : "bg-white border-gold/20 text-text-dark"
                    }`}
                  >
                    <div className="font-serif text-xl sm:text-3xl font-bold leading-none">
                      {stat.formatted ? (
                        stat.formatted
                      ) : (
                        <CounterAnimation target={stat.value} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className={`text-[9px] sm:text-[11px] leading-tight mt-2 whitespace-pre-line ${stat.gold ? "text-white/90" : "text-text-mid"}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
                <div className="rounded-xl px-3 py-5 sm:py-6 text-center border bg-gold border-gold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="font-serif text-lg sm:text-2xl font-bold leading-tight">
                    A TRUSTED NAME
                  </div>
                  <div className="text-[9px] sm:text-[11px] leading-tight mt-2 text-white/90">
                    In Real Estate<br />Development
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
