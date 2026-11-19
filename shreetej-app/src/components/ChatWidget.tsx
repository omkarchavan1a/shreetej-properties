"use client";

import { useState, useTransition, useRef } from "react";
import { MessageSquare, X, Send, CheckCircle2, Phone, Mail, Building2, Sparkles } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    startTransition(async () => {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok && result.success) {
          setSuccessMsg(result.message || "Thank you! We have received your message.");
          formRef.current?.reset();
        } else {
          setErrorMsg(result.error || "Failed to send message. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Something went wrong. Please try again or call us directly.");
      }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Popover Window */}
      {isOpen && (
        <div 
          className="mb-4 w-[90vw] sm:w-[380px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gold/25 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          style={{ boxShadow: "0 20px 40px -10px rgba(13,27,42,0.25)" }}
        >
          {/* Header */}
          <div className="bg-navy p-4 sm:p-5 text-white flex items-center justify-between relative overflow-hidden border-b border-gold/20">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gold/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center space-x-3 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy shadow-md">
                  <Building2 className="w-5 h-5 text-navy" />
                </div>
                {/* Active status pulse */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-navy rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-sm tracking-wide text-white">Shreetej Assistant</h4>
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                </div>
                <p className="text-[11px] text-gold-light/90">Instant property assistance & connect</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="relative z-10 text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick contact banner */}
          <div className="bg-[#FAF8F5] px-4 py-2 border-b border-gold/15 flex items-center justify-between text-[11px] text-text-mid font-medium">
            <span className="text-text-dark font-semibold">Quick Call:</span>
            <div className="flex items-center gap-3">
              <a href="tel:+917588464644" className="text-gold hover:underline flex items-center gap-1 font-bold">
                <Phone className="w-3 h-3" /> +91 75884 64644
              </a>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(85vh-140px)] bg-gradient-to-b from-white to-[#FAF8F5]">
            {successMsg ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-inner">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h5 className="font-serif font-bold text-lg text-navy">Message Received!</h5>
                <p className="text-xs text-text-mid leading-relaxed px-2">
                  {successMsg}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSuccessMsg(null)}
                    className="text-xs font-bold text-gold hover:text-navy transition-colors underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 bg-navy/[0.03] p-3 rounded-xl border border-gold/15 text-xs text-text-dark leading-relaxed">
                  👋 <strong className="text-navy">Hello!</strong> Looking to buy a plot, luxury flat, or get builder consultation? Leave your details below and our expert will get in touch with you immediately.
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-text-mid mb-1">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 bg-white border border-gold/25 rounded-lg text-xs text-text-dark placeholder:text-text-mid/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-text-mid mb-1">
                        Phone *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3.5 py-2.5 bg-white border border-gold/25 rounded-lg text-xs text-text-dark placeholder:text-text-mid/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-text-mid mb-1">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="name@email.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-gold/25 rounded-lg text-xs text-text-dark placeholder:text-text-mid/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-text-mid mb-1">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      className="w-full px-3 py-2 bg-white border border-gold/25 rounded-lg text-xs text-text-dark outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                    >
                      <option value="Residential Flats">Residential & Apartments</option>
                      <option value="Layout Plots">Land & Plot Development</option>
                      <option value="Commercial Space">Commercial Spaces</option>
                      <option value="Legal & Loan Support">Legal & Loan Assistance</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-text-mid mb-1">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Tell us what you're looking for (e.g., 2 BHK flat in Sangamner)..."
                      className="w-full px-3.5 py-2 bg-white border border-gold/25 rounded-lg text-xs text-text-dark placeholder:text-text-mid/50 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 bg-gradient-to-r from-gold to-[#B37F2E] hover:from-[#B37F2E] hover:to-gold text-navy font-bold text-xs tracking-wider uppercase py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-navy" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Connect With Us</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chat with Us"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gold to-[#B37F2E] text-navy shadow-[0_10px_25px_rgba(201,148,58,0.45)] hover:shadow-[0_15px_30px_rgba(201,148,58,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/60"
      >
        {/* Glow & Ping animation rings */}
        <span className="absolute -inset-1 rounded-full bg-gold/40 animate-ping opacity-60 pointer-events-none" />
        
        {isOpen ? (
          <X className="w-6 h-6 text-navy transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-navy fill-navy/10 transition-transform duration-300 group-hover:scale-110" />
            {/* Tooltip prompt badge on hover */}
            <span className="absolute right-16 px-3 py-1.5 bg-navy text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-gold/30">
              💬 Chat with us & Connect!
            </span>
          </>
        )}
      </button>
    </div>
  );
}
