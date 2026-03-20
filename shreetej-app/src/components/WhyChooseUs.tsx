"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import CounterAnimation from "@/components/CounterAnimation";

export default function WhyChooseUs() {
  const points = [
    {
      icon: "🛡️",
      title: "100% Legal Confidence",
      desc: "Every property comes with a verified title deed. We offer free legal document verification on any real estate deal to prevent fraud.",
    },
    {
      icon: "🏗️",
      title: "Quality You Can Afford",
      desc: "Excellent construction quality at affordable rates, delivering maximum value to the common man without breaking the bank.",
    },
    {
      icon: "🤝",
      title: "Post-Sale Commitment",
      desc: "We resolve any property issues or legal challenges even after the sale. Unlike others, your peace of mind is our permanent priority.",
    },
  ];

  return (
    <section id="about" className="py-24 px-[8%] max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Image Side with clip-path reveal */}
        <ScrollReveal direction="left" duration={1000}>
          <div className="relative rounded-3xl overflow-hidden h-[500px] lg:h-[600px] shadow-2xl group">
            <Image
              src="/assets/shreetej/shree-1_fd66a6ec83.png"
              alt="Shreetej Properties Building"
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute bottom-8 left-8 bg-navy/90 backdrop-blur-md border border-gold/20 rounded-2xl p-6 lg:p-8 group-hover:border-gold/40 transition-all duration-500">
              <div className="font-serif text-[2.5rem] lg:text-[3rem] text-gold-light font-bold leading-none">
                <CounterAnimation target={15} suffix="+" />
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
        </div>

      </div>
    </section>
  );
}
