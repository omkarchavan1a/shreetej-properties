import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleBackground from "@/components/ParticleBackground";
import { Map, Home, Scale, ClipboardList, Banknote, Users } from "lucide-react";

export default function Services() {
  const servicesList = [
    {
      id: "land",
      icon: <Map className="w-8 h-8 text-gold" />,
      title: "Land & Plot Development",
      desc: "Legally verified plots with clear title deeds, ready for development or long-term investment. Options from 24 Guntha onwards.",
      img: "/assets/shreetej/IMG-20240711-WA0227-1-1024x576_335b545544.jpg",
    },
    {
      id: "residential",
      icon: <Home className="w-8 h-8 text-gold" />,
      title: "Residential & Commercial",
      desc: "Quality flats, duplexes, and commercial spaces tailored for your family and business needs at genuinely affordable prices.",
      img: "/assets/shreetej/3D-_page-0005-e1763446623738-768x384_35a42be3dc.jpg",
    },
    {
      id: "legal",
      icon: <Scale className="w-8 h-8 text-gold" />,
      title: "Legal & Documentation",
      desc: "Expert guidance on L.A./N.A., town planning, and free legal verification of all documents. Your shield against real estate risk.",
      img: "/assets/shreetej/photo-1450101499163-c8848c66ca85_6f5c726a0c.jpg",
    },
    {
      id: "consultation",
      icon: <ClipboardList className="w-8 h-8 text-gold" />,
      title: "Project Consultation",
      desc: "Strategic advisory for builders and developers — covering permissions, legal guidance, and complete project road-mapping.",
      img: "/assets/shreetej/photo-1517245386807-bb43f82c33c4_6fb844aac7.jpg",
    },
    {
      id: "loans",
      icon: <Banknote className="w-8 h-8 text-gold" />,
      title: "Property Loan Assistance",
      desc: "We facilitate up to 100% loan assistance through our network of trusted financial institutions. Hassle-free financing for all.",
      img: "/assets/shreetej/photo-1554224155-6726b3ff858f_fc82dcbf6e.jpg",
    },
    {
      id: "foundation",
      icon: <Users className="w-8 h-8 text-gold" />,
      title: "Shreetej Foundation",
      desc: "Our social arm — empowering women, supporting education, and driving community development in rural Maharashtra.",
      img: "/assets/shreetej/IMG-20250525-WA0082-1-226x300_3180cb91da.jpg",
    },
  ];

  return (
    <section id="services" className="bg-navy py-24 px-6 md:px-[8%] relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      >
        <source src="/images/front page office  video.mp4" type="video/mp4" />
      </video>

      {/* Ambient particles */}
      <ParticleBackground count={12} color="gold" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <ScrollReveal direction="left">
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
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {servicesList.map((svc, index) => (
            <ScrollReveal key={svc.id} direction="up" delay={index * 100} duration={800}>
              <div
                id={svc.id}
                className="group relative bg-navy-mid border border-gold/15 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] h-full"
                style={{ animation: `glowPulse 4s ${index * 0.5}s infinite` }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-15 transition-opacity duration-700 scale-100 group-hover:scale-110"
                  style={{ backgroundImage: `url(${svc.img})`, transition: 'opacity 0.7s, transform 8s' }}
                />
                
                {/* Top Gradient Bar animation */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold to-gold-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ease-out" />
                
                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 p-6 sm:p-9">
                  <span className="text-[2.5rem] mb-6 block transition-transform duration-500 group-hover:scale-110 group-hover:animate-[iconBounce_0.6s_ease]">
                    {svc.icon}
                  </span>
                  
                  <h3 className="font-serif text-xl text-white font-bold mb-3 group-hover:text-gold-light transition-colors duration-300">
                    {svc.title}
                  </h3>
                  
                  <p className="text-[0.88rem] text-white/50 leading-[1.8] font-light mb-6 group-hover:text-white/65 transition-colors duration-500">
                    {svc.desc}
                  </p>
                  
                  <Link 
                    href={`/services/${svc.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-[1.5px] uppercase text-gold-light group-hover:gap-4 transition-all duration-300"
                  >
                    Explore Service <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
