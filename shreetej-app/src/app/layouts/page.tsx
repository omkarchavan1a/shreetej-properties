import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjects } from "@/app/actions/projects";
import LayoutsClient from "./LayoutsClient";

export const dynamic = "force-dynamic";

export default async function LayoutsPage() {
  const allProjects = await getProjects();
  const layouts = allProjects.filter((p: any) => p.type === "layout");

  return (
    <div className="min-h-screen bg-cream selection:bg-gold/30">
      <Navbar />
      <LayoutsClient layouts={layouts} />
      <Footer />
    </div>
  );
}
