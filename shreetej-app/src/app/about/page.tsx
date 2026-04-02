import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

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
              <p className="text-text-mid leading-relaxed mb-8">
                The journey to success in the real estate sector was not an easy one. Through numerous challenges, experiences, and learning phases, Shri Satish B. Raut began his journey as a land developer in 2011. In the initial years, limited resources, the challenges of a constantly changing market, and the struggle to build trust helped shape a stronger and clearer vision. With 16+ years of experience, backed by integrity and transparent dealings, the company under his leadership has today earned the trust of 1,000+ satisfied customers. Quality planning, long-term value, and securing a safe future for customers&apos; dreams remain the true driving forces behind his work.
              </p>
              <div className="font-serif italic text-3xl text-navy/80 tracking-wider">Satish B. Raut</div>
            </div>

            {/* RIGHT — chairman photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm lg:max-w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-gold/10">
                <img
                  src="/assets/shreetej/about/satish-raut.JPG"
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Reliance', url: '/assets/shreetej/logos/reliance_logo.png' },
              { name: 'Confidence Petroleum', url: '/assets/shreetej/logos/confidence_petroleum_logo.png' },
              { name: 'Nobel Group', url: '/assets/shreetej/logos/nobel_group_logo.png' },
              { name: 'Arbitro Realtors & Sons', url: '/assets/shreetej/logos/arbitro_realtors_logo.png' }
            ].map((partner, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden relative shadow-inner">
                  <img src={partner.url} alt={partner.name} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-white font-bold tracking-wide">{partner.name}</span>
              </div>
            ))}
          </div>
          <p className="text-white/60 mt-12 text-sm max-w-2xl mx-auto">
            We hold strategic partnerships with top-tier organizations to ensure the highest standards of quality and efficiency in our delivery.
          </p>
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
            "/assets/shreetej/about/IMG-20260329-WA0012.jpg",  // Shree Swami Samarth Paduka — big image
            "/assets/shreetej/about/IMG-20260329-WA0014.jpg",
            "/assets/shreetej/about/IMG-20260329-WA0015.jpg",
            "/assets/shreetej/about/satish-raut.JPG",
            "/assets/shreetej/about/IMG_1525.JPG",
            "/assets/shreetej/about/IMG_1537.JPG",
          ].map((src, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group relative ${
                i === 4 ? 'md:col-span-2 md:row-span-2' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={src}
                alt={`Shreetej Moments ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-serif italic text-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">Shreetej</span>
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
