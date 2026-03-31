import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectsByType } from "@/app/actions/projects";
import LayoutsClient from "./LayoutsClient";

export default async function LayoutsPage() {
  const layouts = await getProjectsByType("layout");

  return (
    <div className="min-h-screen bg-cream selection:bg-gold/30">
      <Navbar />
      <LayoutsClient layouts={layouts} />
      <Footer />
    </div>
  );
}
