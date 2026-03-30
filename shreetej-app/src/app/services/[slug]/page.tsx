import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

// Service specific data definition
const servicesData: Record<string, any> = {
  "land": {
    title: "Land & Plot Development",
    subtitle: "Strategic Investments & Ready-to-Build Plots",
    description: "Discover unmatched potential with our legally verified plots featuring clear title deeds. Whether you are seeking a site for immediate development or looking for a profitable long-term investment, we provide premium land options starting from 24 Guntha onwards. We ensure every plot has excellent connectivity, clear demarcations, and immense pre-assessed value appreciation potential.",
    features: [
      "100% Clear Title & Verified Documentation",
      "Prime Locations with High Appreciation Rate",
      "Immediate Development Readiness",
      "Flexible Plot Sizes from 24 Guntha",
      "End-to-end Assistance for Land Conversion (N.A.)"
    ],
    heroImage: "/assets/shreetej/layout.jpg",
    gallery: [
      "/assets/shreetej/bhagyoday-park.jpg",
      "/assets/shreetej/nijarneshwar-park.jpg",
      "/assets/shreetej/kanifnath-park.jpg"
    ]
  },
  "residential": {
    title: "Residential & Commercial Properties",
    subtitle: "Built for Your Family, Designed for Your Business",
    description: "From cozy 1BHK apartments to luxurious duplexes, and prime commercial retail spaces, we offer high-quality constructions tailored to perfectly fit your lifestyle and business requirements. Shreetej Properties Builders & Developers stands as a hallmark of premium build quality offering genuinely affordable prices without compromising on structural integrity or modern amenities.",
    features: [
      "Premium Construction Quality",
      "Vastu-Compliant Layouts",
      "Modern Lifestyle Amenities",
      "Strategic Commercial Spaces",
      "Transparent Pricing Models"
    ],
    heroImage: "/assets/shreetej/3D-_page-0005-e1763446623738-768x384_35a42be3dc.jpg",
    gallery: [
      "/assets/shreetej/3D-_page-0005-e1763446623738-768x384_35a42be3dc.jpg",
      "/assets/shreetej/3D-_page-0006-e1763446571686-768x485_5efb9b5c60.jpg",
      "/assets/shreetej/3D-_page-0013-e1763446391451-768x606_5ec5c532fe.jpg",
      "/assets/shreetej/3D-_page-0016-e1763446294574-768x600_d32fec8509.jpg"
    ]
  },
  "legal": {
    title: "Legal & Documentation",
    subtitle: "Your Shield Against Real Estate Risk",
    description: "Navigating real estate laws can be daunting. We offer expert guidance on complicated legal aspects such as L.A./N.A. conversions, town planning approvals, and title searching. Our team conducts meticulous legal verification of all documents for entirely free, ensuing absolute peace of mind for buyers and investors alike.",
    features: [
      "Free Legal Verification of Documents",
      "L.A. & N.A. Conversion Support",
      "Title Search & Clearances",
      "Town Planning & Layout Approvals",
      "Registration & Stamp Duty Services"
    ],
    heroImage: "/assets/shreetej/photo-1450101499163-c8848c66ca85_6f5c726a0c.jpg",
    gallery: [
      "/assets/shreetej/photo-1450101499163-c8848c66ca85_6f5c726a0c.jpg",
      "/assets/shreetej/photo-1589829545856-d10d557cf95f_00645570aa.jpg",
      "/assets/shreetej/photo-1554224155-6726b3ff858f_fc82dcbf6e.jpg"
    ]
  },
  "consultation": {
    title: "Project Consultation",
    subtitle: "Strategic Advisory for Builders and Developers",
    description: "Take the guesswork out of real estate projects. Our seasoned consultants empower builders and developers with holistic roadmapping, covering critical phases from acquiring regulatory permissions and feasibility analysis to legal foresight and marketing strategy. We ensure your project launches successfully and complies fully with industry standards.",
    features: [
      "Comprehensive Project Roadmapping",
      "Regulatory Permissions & Liasioning",
      "Market & Feasibility Analysis",
      "Marketing Strategy Development",
      "Cost Estimation & ROI Planning"
    ],
    heroImage: "/assets/shreetej/photo-1517245386807-bb43f82c33c4_6fb844aac7.jpg",
    gallery: [
      "/assets/shreetej/photo-1517245386807-bb43f82c33c4_6fb844aac7.jpg",
      "/assets/shreetej/photo-1497366216548-37526070297c_e0b0879c2f.jpg",
      "/assets/shreetej/photo-1564013799919-ab600027ffc6_2e21df726e.jpg"
    ]
  },
  "loans": {
    title: "Property Loan Assistance",
    subtitle: "Hassle-free Financing for Your Dream Property",
    description: "Don't let finances delay your dreams. We facilitate seamless loan processing through our expansive network of trusted nationalized and private financial institutions. Our dedicated financial advisors guide you through competitive interest rates, document preparation, and can secure up to 100% loan assistance to fast-track your property purchase.",
    features: [
      "Up to 100% Home Loan Assistance",
      "Tie-ups with Top Banks & NBFCs",
      "Fast-track Loan Processing",
      "Lowest Possible Interest Rates",
      "Minimal Documentation Hassles"
    ],
    heroImage: "/assets/shreetej/photo-1554224155-6726b3ff858f_fc82dcbf6e.jpg",
    gallery: [
      "/assets/shreetej/photo-1554224155-6726b3ff858f_fc82dcbf6e.jpg",
      "/assets/shreetej/photo-1565514020179-026b92b84bb6_41ef437e01.jpg",
      "/assets/shreetej/photo-1592303637753-ce1e6b8a0ffb_cc9f1ca4b7.jpg"
    ]
  },
  "foundation": {
    title: "Shreetej Foundation",
    subtitle: "Putting Community at the Heart of Everything",
    description: "At Shreetej Properties Builders & Developers, we believe in giving back. Shreetej Foundation is our dedicated social arm aimed at fostering sustainable community growth across rural Maharashtra. From empowering vulnerable women to supporting fundamental child education and organizing local health camps, we are deeply committed to elevating the society we thrive in.",
    features: [
      "Women Empowerment Initiatives",
      "Child Education Sponsorships",
      "Rural Development Programs",
      "Community Health & Welfare Drives",
      "Environmental Sustainability Projects"
    ],
    heroImage: "/assets/shreetej/foundation-logo.png",
    gallery: [
      "/assets/shreetej/foundation-logo.png",
      "/assets/shreetej/IMG-20240823-WA0147-1-300x225_75762e8553.jpg",
      "/assets/shreetej/IMG-20250717-WA0197-1-300x225_134b84e388.jpg"
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug];
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} | Shreetej Properties Builders & Developers`,
    description: service.description.substring(0, 160),
  };
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-[8%] bg-navy text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent z-10" />
           <Image
             src={service.heroImage}
             alt={service.title}
             fill
             className="object-cover"
             priority
           />
        </div>
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-gold/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-20">
          <ScrollReveal direction="up">
            <Link href="/services" className="inline-flex items-center text-sm text-gold-light hover:text-white transition-colors mb-6 font-bold tracking-wider uppercase">
              <span className="mr-2">&larr;</span> Back to Services
            </Link>
            
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] mb-6">
              {service.title.split(' ').map((word: string, i: number, arr: string[]) => 
                i === arr.length - 1 ? <em key={i} className="text-gold italic not-italic"> {word}</em> : <span key={i}>{word} </span>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl leading-relaxed">
              {service.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-[8%] relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gold/10 group">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 flex items-center gap-4">
                    <span className="w-12 h-px bg-gold inline-block"></span>
                    Service Overview
                  </h2>
                  <p className="text-lg text-text-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-navy/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-navy text-xl mb-6">Key Offerings</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex flex-start gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-gold"></span>
                        </span>
                        <span className="text-text-dark font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-[8%] bg-white border-t border-navy/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal direction="up">
             <div className="text-center mb-16">
               <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold text-navy mb-4">
                 Our <em className="text-gold not-italic italic">Work</em> Gallery
               </h2>
               <p className="text-text-light max-w-2xl mx-auto">
                 Explore some of the glimpses and moments related to this service.
               </p>
             </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.gallery.map((img: string, idx: number) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 150}>
                <div className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                  <Image
                    src={img}
                    alt={`${service.title} gallery image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <span className="text-white bg-gold w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
                       +
                     </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-[8%] bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-white font-bold leading-tight mb-6">
              Ready to <em className="text-gold italic not-italic">Get Started?</em>
            </h2>
            <p className="text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
              Contact our experts to discuss how our {service.title} services can benefit you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                href="/contact" 
                className="bg-gold text-navy px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
              >
                Contact Us Now
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
