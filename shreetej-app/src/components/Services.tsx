import Link from "next/link";

export default function Services() {
  const servicesList = [
    {
      id: "land",
      icon: "🌍",
      title: "Land & Plot Development",
      desc: "Legally verified plots with clear title deeds, ready for development or long-term investment. Options from 24 Guntha onwards.",
    },
    {
      id: "residential",
      icon: "🏠",
      title: "Residential & Commercial",
      desc: "Quality flats, duplexes, and commercial spaces tailored for your family and business needs at genuinely affordable prices.",
    },
    {
      id: "legal",
      icon: "⚖️",
      title: "Legal & Documentation",
      desc: "Expert guidance on L.A./N.A., town planning, and free legal verification of all documents. Your shield against real estate risk.",
    },
    {
      id: "consultation",
      icon: "📐",
      title: "Project Consultation",
      desc: "Strategic advisory for builders and developers — covering permissions, legal guidance, and complete project road-mapping.",
    },
    {
      id: "loans",
      icon: "🏦",
      title: "Property Loan Assistance",
      desc: "We facilitate up to 100% loan assistance through our network of trusted financial institutions. Hassle-free financing for all.",
    },
    {
      id: "foundation",
      icon: "❤️",
      title: "Shreetej Foundation",
      desc: "Our social arm — empowering women, supporting education, and driving community development in rural Maharashtra.",
    },
  ];

  return (
    <section id="services" className="bg-navy py-24 px-[8%]">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold-light font-bold mb-4">
          <span>What We Offer</span>
          <div className="h-px bg-gold-light/40 w-12" />
        </div>
        
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.2] text-white mb-4">
          Complete Real Estate <em className="text-gold not-italic italic">Services</em>
        </h2>
        
        <p className="text-[1.05rem] text-white/65 leading-relaxed max-w-2xl font-light mb-14">
          Everything you need — under one trusted roof.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((svc) => (
            <div
              key={svc.id}
              className="group bg-navy-mid border border-gold/15 rounded-2xl p-9 cursor-pointer transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              {/* Top Gradient Bar animation */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              
              <span className="text-[2.5rem] mb-6 block">{svc.icon}</span>
              
              <h3 className="font-serif text-xl text-white font-bold mb-3 group-hover:text-gold-light transition-colors">
                {svc.title}
              </h3>
              
              <p className="text-[0.88rem] text-white/50 leading-[1.8] font-light mb-6">
                {svc.desc}
              </p>
              
              <Link 
                href={`#${svc.id}`}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[1.5px] uppercase text-gold-light group-hover:gap-3 transition-all duration-300"
              >
                Explore Service <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
