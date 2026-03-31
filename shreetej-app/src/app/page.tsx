import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import LayoutsSection from "@/components/LayoutsSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects } from "@/app/actions/projects";

export default async function Home() {
  const allProjects = await getProjects();
  const priorityKeywords = ['apartment', 'flat', 'platinum', 'heights'];
  const sortByPriority = (a: any, b: any) => {
    const aIsPriority = priorityKeywords.some(kw => a.title.toLowerCase().includes(kw));
    const bIsPriority = priorityKeywords.some(kw => b.title.toLowerCase().includes(kw));
    if (aIsPriority && !bIsPriority) return -1;
    if (!aIsPriority && bIsPriority) return 1;
    return 0;
  };

  const upcomingProjects = allProjects
    .filter((p: any) => p.status === "Upcoming" && p.type?.toLowerCase() !== "layout")
    .sort(sortByPriority);
    
  const ongoingProjects = allProjects
    .filter((p: any) => p.status === "Ongoing" && p.type?.toLowerCase() !== "layout")
    .sort(sortByPriority);

  const layoutProjects = allProjects
    .filter((p: any) => p.type?.toLowerCase() === "layout")
    .sort(sortByPriority);

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />
      <Hero />
      <FeaturedProjects upcomingProjects={upcomingProjects} ongoingProjects={ongoingProjects} />
      <LayoutsSection layouts={layoutProjects} />
      <Marquee />
      <WhyChooseUs />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
