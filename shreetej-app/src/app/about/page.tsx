import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-navy pt-32 pb-20 px-[8%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Our Foundation</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white font-bold leading-[1.1] mb-6">
            Building Trust,<br />
            <em className="text-gold italic not-italic">One Family at a Time</em>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-[1.1rem] font-light leading-relaxed">
            Founded in 2011, Shreetej Properties has transformed the real estate landscape of Maharashtra with 100% legally clear titles and premium construction quality.
          </p>
        </div>
      </div>

      {/* Chairman Profile */}
      <section className="py-24 px-[8%] max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-2/5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/assets/shreetej/IMG-20241005-WA0137-1-254x300_60ebd5da62.jpg" 
                alt="Shri Satish B. Raut - Chairman" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 border-2 border-gold/20 rounded-3xl -z-10 translate-x-4 translate-y-4" />
          </div>
          <div className="w-full md:w-3/5">
            <h2 className="text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">Leadership</h2>
            <h3 className="font-serif text-4xl text-navy font-bold mb-2">Shri Satish B. Raut</h3>
            <p className="text-gold font-bold uppercase tracking-[1px] text-sm mb-6">Chairman & Managing Director</p>
            <p className="text-text-mid leading-relaxed mb-6">
              With a vision to provide total real estate solutions, Shri Satish B. Raut founded Shreetej Properties in 2011. Under his dynamic leadership, the company has scaled unparalleled heights in delivering legally secure, premium residential and commercial spaces across Maharashtra.
            </p>
            <p className="text-text-mid leading-relaxed mb-8">
              "Our core philosophy revolves around trust, transparency, and timely delivery. We don't just build homes; we build communities where families thrive for generations."
            </p>
            <div className="font-serif italic text-4xl text-navy/80 mt-6 tracking-wider">Satish B. Raut</div>
          </div>
        </div>
      </section>

      {/* Office Details & Video */}
      <section className="bg-white py-24 px-[8%]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-navy font-bold mb-4">Our Operations Hub</h2>
            <p className="text-text-mid">Experience excellence from our state-of-the-art corporate office in Sangamner.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-video relative group">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                {/* Placeholder HD Office Video */}
                <source src="https://cdn.pixabay.com/video/2021/08/21/85848-592186846_large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-video bg-navy/5">
              <img src="/assets/shreetej/generated/corporate_office_interior_1774017146187.png" alt="Shreetej Corporate Office" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-cream rounded-3xl p-10 border border-gold/10 flex flex-col items-center text-center">
            <span className="text-gold text-3xl mb-4">🏢</span>
            <h3 className="font-serif text-2xl text-navy font-bold mb-4">Corporate Office</h3>
            <p className="text-text-mid leading-relaxed max-w-lg mb-6">
              Ekta Chauk, Ghulewadi, Tal-Sangamner, Dist-Ahmednagar, Maharashtra.<br/>
              Equipped with modern infrastructure and a dedicated team of legal advisors, architects, and real estate consultants.
            </p>
            <a href="https://maps.google.com/?q=Ekta+Chauk,Ghulewadi,Sangamner" target="_blank" rel="noopener noreferrer" className="bg-navy text-gold font-bold tracking-[1.5px] uppercase px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all">
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Tie-Ups / Partnerships */}
      <section className="py-24 px-[8%] bg-navy relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Our Partnerships</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h2 className="font-serif text-4xl text-white font-bold mb-16">Strategic Tie-Ups</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['HDFC Bank', 'SBI Home Loans', 'ICICI Bank', 'Axis Bank'].map((partner, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-4">🏦</div>
                <span className="text-white font-bold tracking-wide">{partner}</span>
              </div>
            ))}
          </div>
          <p className="text-white/60 mt-12 text-sm max-w-2xl mx-auto">
            We hold strategic partnerships with India's leading financial institutions to provide seamless, 100% home loan assistance to all our clients.
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 px-[8%] bg-white">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
           <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
            <div className="h-px bg-gold/40 w-12" />
            <span>Our Journey</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h2 className="font-serif text-4xl text-navy font-bold">Moments at Shreetej Properties</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {[
            "/assets/shreetej/generated/luxury_apartment_exterior_1774017205362.png",
            "/assets/shreetej/generated/family_receiving_keys_1774017210470.png",
            "/assets/shreetej/generated/closing_deal_handshake_1774017230217.png",
            "/assets/shreetej/generated/modern_construction_site_1774017252244.png",
            "/assets/shreetej/generated/architect_reviewing_blueprints_1774017297292.png",
            "/assets/shreetej/generated/luxury_residential_complex_1774017323268.png",
            "/assets/shreetej/generated/modern_living_room_1774017351455.png",
            "/assets/shreetej/generated/aerial_city_view_1774017377515.png",
          ].map((src, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group relative ${i === 5 ? 'md:col-span-2 md:row-span-2' : 'aspect-[4/3]'}`}>
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
