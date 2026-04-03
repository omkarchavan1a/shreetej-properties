import ScrollReveal from "@/components/ScrollReveal";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Hello, I recently connected with Shreetej Properties regarding a plot/flat, and my overall experience has been very good. The entire team is very cooperative and explained every detail clearly. The most important thing is that all the documentation is completely clear, and the entire process is handled in a very transparent manner, which builds strong trust. The location, amenities, and planning are also very impressive.",
      author: "Dr. Bharat Khemnar",
      loc: "Banglow Owner · Malpani Nagar",
      initials: "B"
    },
    {
      text: "My name is Durga Ghosale. I run a parlour here. I used to run it from my home. It was my dream to have my own shop. And Shreetej Properties helped me to realise that dream. They gave me a place here. It is very precious. They helped me a lot to get this property. And their service is also very good.",
      author: "Durga Ghosale",
      loc: "Shop Owner · Client Review",
      initials: "D"
    },
    {
      text: "My name is Babasaheb Ranganath Murtadak. I have a lift business. While doing this business, I felt the need to buy a flat. I met Shreetej Properties and Satish Raut Chairman. Through them, I got a good flat in Samarth Roop Apartment, Golden City. Their service was excellent for 5 years. Construction work is exceptional. Work space, area, porch, balconies, all areas are good.",
      author: "Babasaheb Murtadak",
      loc: "Flat Owner · Samarth Roop Apartment",
      initials: "B"
    }
  ];

  return (
    <section className="bg-navy-light py-24 px-[8%] relative overflow-hidden">
      {/* Decorative floating quotes */}
      <div className="absolute top-16 right-[10%] text-[12rem] font-serif text-gold/[0.04] leading-none pointer-events-none select-none" style={{ animation: 'gentleFloat 6s ease-in-out infinite' }}>
        &ldquo;
      </div>
      <div className="absolute bottom-16 left-[5%] text-[8rem] font-serif text-gold/[0.04] leading-none pointer-events-none select-none" style={{ animation: 'gentleFloat 5s 1s ease-in-out infinite' }}>
        &rdquo;
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal direction="up">
          <div className="flex items-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold-light font-bold mb-4">
            <span>Client Stories</span>
            <div className="h-px bg-gold-light/40 w-12" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.2] text-white mb-14">
            Thousands of Families<br />
            <em className="text-gold not-italic italic">Trust Shreetej</em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* <!-- TODO: verify real customer data (names/quotes/photos) with the client --> */}
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 150} duration={800}>
              <div 
                className="bg-white/5 border border-gold/15 rounded-2xl p-10 backdrop-blur-sm relative transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] group h-full"
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Star rating with sparkle */}
                <div 
                  className="text-gold text-sm tracking-[3px] mb-6"
                  style={{ animation: `sparkle 3s ${i * 0.5}s infinite` }}
                >
                  ★★★★★
                </div>
                
                <p className="font-serif text-[1.1rem] text-white/85 leading-[1.8] italic mb-8">
                  &quot;{t.text}&quot;
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-serif font-bold text-navy text-xl group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,148,58,0.3)] transition-all duration-300">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-[0.95rem] group-hover:text-gold-light transition-colors duration-300">
                      {t.author}
                    </div>
                    <div className="text-[11px] text-white/40 tracking-[1px] uppercase mt-0.5">
                      {t.loc}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
