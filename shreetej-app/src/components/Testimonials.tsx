export default function Testimonials() {
  const testimonials = [
    {
      text: "Shreetej handled all our documentation and legal verification. The entire process was transparent and we had zero stress. The post-sale support they promised was real — they helped us even 6 months after purchase.",
      author: "Rajesh Kulkarni",
      loc: "Sangamner · Flat Owner",
      initials: "R"
    },
    {
      text: "We were first-time buyers and terrified of legal complications. Satish sir personally verified every document. The free legal vetting service alone saved us from a fraudulent deal we almost walked into.",
      author: "Priya & Amit Deshmukh",
      loc: "Nashik Road · Plot Buyers",
      initials: "P"
    },
    {
      text: "As a builder, I needed a consultant who understood both legal permissions and market realities. Shreetej's consultation for our commercial project saved us months of delays and lakhs in avoidable costs.",
      author: "Manoj Patil",
      loc: "Ahmednagar · Builder",
      initials: "M"
    }
  ];

  return (
    <section className="bg-navy-light py-24 px-[8%]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold-light font-bold mb-4">
          <span>Client Stories</span>
          <div className="h-px bg-gold-light/40 w-12" />
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.2] text-white mb-14">
          Thousands of Families<br />
          <em className="text-gold not-italic italic">Trust Shreetej</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              className="bg-white/5 border border-gold/15 rounded-2xl p-10 backdrop-blur-sm relative transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="text-gold text-sm tracking-[3px] mb-6">★★★★★</div>
              <p className="font-serif text-[1.1rem] text-white/85 leading-[1.8] italic mb-8">
                &quot;{t.text}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-serif font-bold text-navy text-xl">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-[0.95rem]">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-white/40 tracking-[1px] uppercase mt-0.5">
                    {t.loc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
