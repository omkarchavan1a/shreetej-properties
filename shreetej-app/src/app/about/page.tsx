import type { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | Shreetej Properties",
  description: "Learn about Shreetej Properties Builders & Developers. Transforming the real estate landscape of Maharashtra with 100% legally clear titles and premium construction since 2011.",
  keywords: ["About Shreetej Properties", "Builders in Maharashtra", "Satish B. Raut Real Estate", "trusted builders Sangamner"],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-navy pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-[8%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Our Foundation</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white font-bold leading-[1.1] mb-6">
            Building Trust,<br />
            <em className="text-gold italic not-italic">One Family at a Time</em>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-[1.1rem] font-light leading-relaxed">
            Founded in 2011, Shreetej Properties Builders & Developers has transformed the real estate landscape of Maharashtra with 100% legally clear titles and premium construction quality.
          </p>
        </div>
      </div>

      {/* Chairman Profile — two-column: bio left, photo right */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-[8%]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">

            {/* LEFT — text content */}
            <div>
              <h2 className="text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">Leadership</h2>
              <h3 className="font-serif text-4xl text-navy font-bold mb-2">Shri Satish B. Raut</h3>
              <p className="text-gold font-bold uppercase tracking-[1px] text-sm mb-6">Chairman &amp; Managing Director</p>
              <div className="space-y-4 text-text-mid leading-relaxed mb-8">
                <p>
                  A visionary leader with a strong foundation in real estate, Shri. Satish B. Raut embarked on his journey in 2011 with a clear purpose - to redefine property development through trust, transparency, and excellence.
                </p>
                <p>
                  Driven by strategic vision, entrepreneurial spirit, and an unwavering commitment to quality, he has guided Shreetej Properties through years of growth and transformation. Under his leadership, the company has earned the confidence of 1,500+ satisfied customers and established a trusted presence in the real estate sector.
                </p>
                <p>
                  His philosophy goes beyond developing properties; it is about creating enduring value, building meaningful relationships, and turning aspirations into lasting realities.
                </p>
                <p className="font-medium text-navy/90">
                  His vision. Our foundation. Your trust.
                </p>
              </div>
              <div className="font-serif italic text-3xl text-navy/80 tracking-wider">Satish B. Raut</div>
            </div>

            {/* RIGHT — chairman photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm lg:max-w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-gold/10">
                <img
                  src="/assets/shreetej/about/satish-raut.jpg"
                  alt="Shri Satish B. Raut — Chairman & Managing Director"
                  className="w-full h-full object-cover object-top"
                />
                {/* subtle gold overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy/60 to-transparent flex items-end px-6 pb-5">
                  <span className="text-white font-serif italic text-sm tracking-wide">Shri Satish B. Raut</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tie-Ups / Partnerships */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-[8%] bg-navy relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Our Partnerships</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h2 className="font-serif text-4xl text-white font-bold mb-16">Strategic Tie-Ups</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: 'Reliance', url: '/assets/shreetej/logos/reliance_logo.jpeg' },
              { name: 'Confidence Petroleum', url: '/assets/shreetej/logos/confidence_petroleum_logo.jpeg' },
              { name: 'Nobel Group', url: '/assets/shreetej/logos/nobel_group_logo.jpeg' },
              { name: 'Arbitro Realtors & Sons', url: '/assets/shreetej/logos/arbitro_realtors_logo.jpeg' },
              { name: 'AHA Aakar Educational Trust', url: '/assets/shreetej/logos/aakar_educational_trust_logo.jpg' },
              { name: 'Revolt EV Motors', url: '/assets/shreetej/logos/revolt_ev_motors_logo.avif' },
              { name: 'Royal Associates', url: '/assets/shreetej/logos/royal_associates_logo.jpg' }
            ].map((partner, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden relative shadow-inner">
                  <img src={partner.url} alt={partner.name} className="w-14 h-14 sm:w-20 sm:h-20 object-contain" />
                </div>
                <span className="text-white text-xs sm:text-sm font-bold tracking-wide text-center">{partner.name}</span>
              </div>
            ))}
          </div>
          <p className="text-white/60 mt-12 text-sm max-w-2xl mx-auto">
            We hold strategic partnerships with top-tier organizations to ensure the highest standards of quality and efficiency in our delivery.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-[8%] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-12 lg:gap-20 items-start">
            
            {/* Logo Column */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/5 rounded-[2rem] blur-2xl transition-colors duration-500" />
                <img 
                  src="/assets/shreetej/new-logo.png" 
                  alt="Shreetej Properties Logo" 
                  className="relative w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Text Column */}
            <div>
              <div className="inline-flex items-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-6">
                <div className="h-px bg-gold/40 w-12" />
                <span>Company Profile</span>
                <div className="h-px bg-gold/40 w-12" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-navy font-bold mb-10 leading-tight">About Shreetej Properties</h2>
              
              <div className="space-y-8 text-text-mid text-lg leading-relaxed">
                <p>
                  Shreetej Properties is a trusted name in the real estate industry, committed to delivering quality developments and building long-term relationships with its clients. With over <span className="text-navy font-bold border-b-2 border-gold/20 pb-0.5">1500+ successful transactions</span>, the company has consistently earned the confidence of homebuyers and investors through transparency, reliability, and customer-focused service.
                </p>
                <p>
                  Over the years, Shreetej Properties has successfully developed and completed <span className="text-navy font-bold">55+ residential and commercial projects</span>, along with <span className="text-navy font-bold">12+ well-planned layouts</span> designed to meet modern lifestyle needs. With a total construction footprint exceeding <span className="text-navy font-bold font-serif text-xl tracking-tight">5,50,000 sq. ft.</span>, the company reflects strong execution capability and attention to detail in every project.
                </p>
                <p>
                  Driven by a vision to create a distinct identity similar to a well-planned mini-city, Shreetej Properties focuses on delivering thoughtfully designed spaces that combine comfort, convenience, and future growth potential. Every project is a step towards building not just properties, but a secure and fulfilling future for its customers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pune Expansion Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-[8%] bg-white">
        <div className="max-w-[1100px] mx-auto bg-navy rounded-[2rem] p-6 sm:p-10 lg:p-14 shadow-2xl border border-gold/10">
          <span className="inline-block bg-gold/15 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-6">
            A New Milestone
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold leading-tight mb-2">
            BEYOND BOUNDARIES.
          </h2>
          <p className="font-serif text-2xl sm:text-4xl text-gold font-semibold mb-2">
            TOWARDS BIGGER DREAMS.
          </p>
          <p className="text-white/60 text-[11px] sm:text-xs uppercase tracking-[2px] font-semibold mb-8">
            Shreetej Properties — Now in Pune!
          </p>

          <div className="rounded-2xl overflow-hidden shadow-xl mb-10 border border-white/10">
            <img
              src="/assets/shreetej/about/pune-expansion.jpeg"
              alt="The Commerce Street, Pristine Commerce Street — Moshi, Pune"
              className="w-full h-auto object-cover"
            />
          </div>

          <h4 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
            Our Next Chapter Begins Here.
          </h4>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light mb-8">
            Shreetej Properties proudly marks a new milestone in its growth journey with its expansion into Pune. With our new office at Pristine Commerce Street, Moshi, Pune, we take our first step towards exploring greater opportunities and expanding our presence in the real estate sector. From our strong roots in Sangamner to new beginnings in Pune, our journey continues with the same vision, commitment and trust. This is not just an expansion; it&apos;s the beginning of a bigger vision and a brighter future. From Sangamner to Pune – Growing Beyond Boundaries!
          </p>
          <p className="text-gold text-xs sm:text-sm uppercase tracking-[2px] font-semibold mb-8">
            Pristine Commerce Street | Moshi, Pune
          </p>
          <div className="h-px bg-gold/20 w-full mb-8" />
          <h4 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-wide mb-2">
            SANGAMNER <span className="text-gold">→</span> PUNE
          </h4>
          <p className="text-white/60 text-[11px] sm:text-xs uppercase tracking-[2px] font-semibold">
            Our Journey of Growth Continues.
          </p>
        </div>
      </section>

      {/* Dubai Gallery Section */}
      <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-[8%] bg-white">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
            <div className="h-px bg-gold/40 w-12" />
            <span>GLOBAL FOOTPRINT</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h2 className="font-serif text-4xl text-navy font-bold">
            Shreetej Properties in <span className="text-gold italic not-italic">Dubai</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-[1400px] mx-auto">
          {[
            { src: "/assets/shreetej/dubai/dubai-1.jpg", title: "Corporate Engagements", location: "HMB Homes, Dubai" },
            { src: "/assets/shreetej/dubai/dubai-2.jpg", title: "Strategic Delegation", location: "Global Real Estate Meet" },
            { src: "/assets/shreetej/dubai/dubai-3.jpg", title: "Global Partnerships", location: "Classic Group, Dubai" },
            { src: "/assets/shreetej/dubai/dubai-4.jpg", title: "International Vision", location: "Downtown Dubai" },
            { src: "/assets/shreetej/dubai/dubai-5.jpg", title: "Business Alliances", location: "Strategic Collaboration" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-cream shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 aspect-[3/4]"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                <span className="text-gold font-bold tracking-[2px] uppercase text-[10px] mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  Dubai Visit
                </span>
                <span className="text-white font-serif font-bold text-base translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title}
                </span>
                <span className="text-white/80 text-xs mt-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {item.location}
                </span>
                <div className="mt-3 h-0.5 bg-gold/60 w-8 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Gallery — real company photos */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-[8%] bg-white">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
           <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
            <div className="h-px bg-gold/40 w-12" />
            <span>Our Journey</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h2 className="font-serif text-4xl text-navy font-bold">Moments at Shreetej Properties Builders & Developers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {[
            "/assets/shreetej/about/IMG-20260329-WA0009.jpg",
            "/assets/shreetej/about/IMG-20260329-WA0010.jpg",
            "/assets/shreetej/about/IMG-20260329-WA0011.jpg",
            "/assets/shreetej/about/IMG-20260329-WA0013.jpg",
            "/assets/shreetej/about/IMG-20260329-WA0012.jpg",  // Swami Samarth Paduka — keep as big image
            "/assets/shreetej/about/IMG-20260329-WA0014.jpg",
            "/assets/shreetej/about/IMG-20260329-WA0015.jpg",
            "/assets/shreetej/about/IMG_0253.JPG",
            "/assets/shreetej/about/satish-raut.jpg",
            "/assets/shreetej/about/IMG_1525.JPG",
            "/assets/shreetej/about/IMG_1537.JPG",
            "/assets/shreetej/about/moment-journey-1.jpg",
            "/assets/shreetej/about/moment-journey-2.jpg",
            "/assets/shreetej/about/moment-journey-3.jpg",
            "/assets/shreetej/about/moment-journey-4.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-700 group relative bg-cream ${
                i === 4 ? 'md:col-span-2 md:row-span-2' : 'aspect-square sm:aspect-[4/5] lg:aspect-square'
              }`}
            >
              <img
                src={src}
                alt={`Shreetej Moments ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4">
                <span className="text-gold font-bold tracking-[2px] uppercase text-[10px] mb-2 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Shreetej</span>
                <span className="text-white font-serif italic text-lg text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {i === 4 ? 'Devotional Moments' : 'Our Team & Culture'}
                </span>
                <div className="mt-4 h-px bg-gold/50 w-8 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <Footer />
    </div>
  );
}
