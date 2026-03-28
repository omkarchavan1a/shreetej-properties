import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects } from "@/app/actions/projects";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProjects = await getProjects();
  const upcomingProjects = allProjects.filter((p: any) => p.status === "Upcoming");
  const ongoingProjects = allProjects.filter((p: any) => p.status === "Ongoing");

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />
      <Hero />
      <FeaturedProjects upcomingProjects={upcomingProjects} ongoingProjects={ongoingProjects} />
      <Marquee />
      <WhyChooseUs />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
