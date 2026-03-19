import Image from "next/image";

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
        
        {/* Image Side */}
        <div className="relative rounded-3xl overflow-hidden h-[500px] lg:h-[600px] shadow-2xl">
          <Image
            src="https://shreetejproperties.com/wp-content/uploads/2025/10/shree-1.png"
            alt="Shreetej Properties Building"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-navy/90 backdrop-blur-md border border-gold/20 rounded-2xl p-6 lg:p-8">
            <div className="font-serif text-[2.5rem] lg:text-[3rem] text-gold-light font-bold leading-none">
              15+
            </div>
            <div className="text-[11px] tracking-[1.5px] uppercase text-white/60 mt-2 font-semibold">
              Years of Trust
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div>
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

          <div className="space-y-6">
            {points.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-5 p-6 border border-gold/15 rounded-2xl bg-white/60 backdrop-blur-sm hover:border-gold hover:translate-x-2 hover:shadow-[0_20px_60px_rgba(13,27,42,0.08)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl flex items-center justify-center text-xl shadow-inner">
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
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
