import type { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { getProjects } from "@/app/actions/projects";

export const metadata: Metadata = {
  title: "Our Projects | Shreetej Properties",
  description: "Explore our curated collection of luxury residences, strategic commercial spaces, and premium investment plots in Sangamner.",
  keywords: ["Shreetej Properties projects", "buy flats Sangamner", "commercial spaces Sangamner", "ongoing real estate projects"],
};

export default async function ProjectsPage() {
  const allProjects = await getProjects();

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-navy pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-[8%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Our Portfolio</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white font-bold leading-[1.1] mb-6">
            Masterpieces in<br />
            <em className="text-gold italic not-italic">Real Estate</em>
          </h1>
          <p className="text-white/60 text-xs sm:text-sm tracking-[1px] uppercase max-w-2xl mx-auto">
            Explore our curated collection of luxury residences, strategic commercial spaces, and premium investment plots.
          </p>
        </div>
      </div>

      <Projects initialProjects={allProjects} />

      <Footer />
    </div>
  );
}
