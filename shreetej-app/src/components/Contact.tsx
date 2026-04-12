"use client";

import { useTransition, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    const data = Object.fromEntries(formData);
    startTransition(async () => {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          setSuccessMsg(result.message);
          formRef.current?.reset();
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden scroll-mt-20">
      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white/80 z-10" />
        <img 
          src="/images/contact-bg.jpeg" 
          alt="" 
          className="w-full h-full object-cover opacity-50 scale-105 transition-opacity duration-1000"
        />
        {/* Decorative mask for soft edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/60 z-20" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[8%]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -z-10" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Contact Info Side */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left">
              <div className="flex items-center space-x-2 sm:space-x-3 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-gold font-bold mb-4">
                <span>Contact Details</span>
                <div className="h-px bg-gold/40 w-12" />
              </div>
              
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.2] text-text-dark mb-6">
                We&apos;re Here<br />
                <em className="text-gold not-italic italic">to Help You</em>
              </h2>
              
              <p className="text-base sm:text-[1.05rem] text-text-mid leading-relaxed font-light mb-8 sm:mb-12">
                Speak to our experts about any real estate query — properties, legal documentation, loan assistance, or builder consultation.
              </p>
            </ScrollReveal>

            <div className="space-y-6">
              {/* Phone */}
              <ScrollReveal direction="left" delay={100}>
                <a href="tel:+917588464644" className="flex gap-4 sm:gap-5 p-4 sm:p-6 bg-white/60 backdrop-blur-md border border-gold/15 rounded-2xl group hover:bg-white hover:shadow-xl hover:border-gold/30 hover:-translate-y-1 transition-all duration-400 cursor-pointer w-full text-left block">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,148,58,0.15)] transition-all duration-300">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] tracking-[1px] uppercase text-text-dark mb-1">Phone</h4>
                    <p className="text-[0.9rem] text-text-mid leading-relaxed">
                      +91 75884 64644<br />Landline: 02425-451461
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              {/* Email */}
              <ScrollReveal direction="left" delay={200}>
                <a href="mailto:info@shreetejproperties.com" className="flex gap-4 sm:gap-5 p-4 sm:p-6 bg-white/60 backdrop-blur-md border border-gold/15 rounded-2xl group hover:bg-white hover:shadow-xl hover:border-gold/30 hover:-translate-y-1 transition-all duration-400 cursor-pointer w-full text-left block">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,148,58,0.15)] transition-all duration-300">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] tracking-[1px] uppercase text-text-dark mb-1">Email</h4>
                    <p className="text-[0.9rem] text-text-mid leading-relaxed break-all">
                    shreetejproperties11@gmail.com
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              {/* Location */}
              <ScrollReveal direction="left" delay={300}>
                <a href="https://maps.google.com/?q=Ekta+Chauk,Ghulewadi,Sangamner,Ahmednagar,Maharashtra" target="_blank" rel="noopener noreferrer" className="flex gap-4 sm:gap-5 p-4 sm:p-6 bg-white/60 backdrop-blur-md border border-gold/15 rounded-2xl group hover:bg-white hover:shadow-xl hover:border-gold/30 hover:-translate-y-1 transition-all duration-400 cursor-pointer w-full text-left block">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,148,58,0.15)] transition-all duration-300">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] tracking-[1px] uppercase text-text-dark mb-1">Office Address</h4>
                    <p className="text-[0.9rem] text-text-mid leading-relaxed">
                      Near Kanchan Comfort Building, Ekta Chowk, Behind Law College, Nashik-Pune Highway, Ghulewadi, Tal. Sangamner, Dist. Ahmednagar.
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 relative z-10">
            <ScrollReveal direction="right" duration={900}>
              <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-10 lg:p-14 shadow-2xl border border-gold/10 relative overflow-hidden group hover:shadow-[0_30px_80px_rgba(13,27,42,0.12)] transition-shadow duration-700">
                {/* Subtle Gradient Border on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/10 rounded-[2rem] pointer-events-none transition-colors duration-700" />
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold/20 rounded-tl-[2rem] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold/20 rounded-br-[2rem] pointer-events-none" />
                
                {successMsg ? (
                  <div className="text-center py-10 animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner border border-green-100">
                      ✓
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-navy mb-4">Request Received!</h3>
                    <p className="text-text-mid text-lg font-light leading-relaxed mb-8 px-4">
                      {successMsg}
                    </p>
                    <button 
                      onClick={() => setSuccessMsg(null)}
                      className="text-[12px] font-bold tracking-[2px] uppercase text-gold hover:text-navy transition-colors underline underline-offset-8"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-serif text-[1.8rem] text-text-dark font-bold mb-2">
                      Send Us a Message
                    </h3>
                    <p className="text-text-mid text-[0.95rem] mb-8 sm:mb-10">Register your interest to receive our comprehensive brochure.</p>

                    <form ref={formRef} action={handleAction} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="relative group/input">
                          <label htmlFor="name" className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2 group-focus-within/input:text-gold transition-colors">
                            Full Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Your full name"
                            className="w-full px-5 py-4 bg-[#f8f6f2]/80 border-[1.5px] border-gold/20 rounded-xl text-[14px] text-text-dark outline-none focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 focus:shadow-[0_0_20px_rgba(201,148,58,0.1)] transition-all duration-300 placeholder:text-navy/30"
                          />
                        </div>
                        <div className="relative group/input">
                          <label htmlFor="phone" className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2 group-focus-within/input:text-gold transition-colors">
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-5 py-4 bg-[#f8f6f2]/80 border-[1.5px] border-gold/20 rounded-xl text-[14px] text-text-dark outline-none focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 focus:shadow-[0_0_20px_rgba(201,148,58,0.1)] transition-all duration-300 placeholder:text-navy/30"
                          />
                        </div>
                      </div>

                      <div className="relative group/input">
                        <label htmlFor="email" className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2 group-focus-within/input:text-gold transition-colors">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full px-5 py-4 bg-[#f8f6f2]/80 border-[1.5px] border-gold/20 rounded-xl text-[14px] text-text-dark outline-none focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 focus:shadow-[0_0_20px_rgba(201,148,58,0.1)] transition-all duration-300 placeholder:text-navy/30"
                        />
                      </div>

                      <div className="relative group/input">
                        <label htmlFor="service" className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2 group-focus-within/input:text-gold transition-colors">
                          Service Interested In
                        </label>
                        <select id="service" name="service" className="w-full px-5 py-4 bg-[#f8f6f2]/80 border-[1.5px] border-gold/20 rounded-xl text-[14px] text-text-dark outline-none focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 focus:shadow-[0_0_20px_rgba(201,148,58,0.1)] transition-all duration-300 appearance-none cursor-pointer">
                          <option value="">Select a service...</option>
                          <option value="residential">Residential & Commercial</option>
                          <option value="land">Land & Plot Development</option>
                          <option value="legal">Legal & Documentation</option>
                          <option value="loans">Loan Assistance</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>

                      <div className="relative group/input">
                        <label htmlFor="message" className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2 group-focus-within/input:text-gold transition-colors">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="How can we help you?"
                          rows={4}
                          className="w-full px-5 py-4 bg-[#f8f6f2]/80 border-[1.5px] border-gold/20 rounded-xl text-[14px] text-text-dark outline-none focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/10 focus:shadow-[0_0_20px_rgba(201,148,58,0.1)] transition-all duration-300 resize-y placeholder:text-navy/30"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full btn-ripple bg-gradient-to-br from-gold to-gold-light text-navy font-bold text-[13px] tracking-[1.5px] uppercase py-5 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(201,148,58,0.3)] active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                      >
                        {isPending ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Sending Request...
                          </>
                        ) : (
                          "Send Message & Get Brochure"
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
