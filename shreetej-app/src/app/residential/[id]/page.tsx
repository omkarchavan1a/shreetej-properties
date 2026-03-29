import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";

export const dynamic = "force-dynamic";

export default async function ResidentialDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projectId = parseInt(resolvedParams.id);
  if (isNaN(projectId)) return notFound();

  const projectDetails = await db.select().from(projects).where(eq(projects.id, projectId)).limit(1);
  if (projectDetails.length === 0) return notFound();

  const project = projectDetails[0];
  const amenities = project.amenities ? project.amenities.split(",") : [];

  let galleryImages: string[] = [];
  if (project.galleryUrls) {
    try {
      galleryImages = JSON.parse(project.galleryUrls);
    } catch {
      galleryImages = project.galleryUrls.split(",").map((url: string) => url.trim()).filter(Boolean);
    }
  }


  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />
      
      {/* Page Header with High Quality Video Background or Image */}
      <div className="bg-navy pt-32 pb-20 px-[8%] relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        {project.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        
        <div className="max-w-[1400px] w-full mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>{project.title.toLowerCase().includes("saiban") ? "Residential Plotting" : "Premium Living"}</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white font-bold leading-[1.1] mb-6">
            {project.title}
          </h1>
          <p className="text-white/80 flex items-center justify-center gap-2 tracking-[1px] uppercase text-sm font-semibold">
            <span className="text-gold">📍</span> {project.location}
          </p>
        </div>
      </div>

      <section className="py-20 px-[8%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-serif text-3xl text-navy font-bold mb-6">Overview</h2>
              <p className="text-text-mid leading-relaxed text-lg font-light">
                {project.description || "Experience the pinnacle of residential living with unmatched comfort and luxury."}
              </p>
            </div>

            {amenities.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl text-navy font-bold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gold/10">
                      <span className="text-gold">✦</span>
                      <span className="text-navy font-semibold text-sm tracking-wide">{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {project.mapUrl && (
              <div>
                 <h2 className="font-serif text-3xl text-navy font-bold mb-6">Location Map</h2>
                 <div className="rounded-3xl overflow-hidden shadow-xl border border-gold/10 h-96 relative bg-gray-100 flex items-center justify-center">
                    <iframe 
                      src={
                        project.mapUrl.includes('google.com/maps/embed') || project.mapUrl.includes('output=embed')
                          ? project.mapUrl
                          : `https://maps.google.com/maps?q=${encodeURIComponent(project.location + ', Ahmednagar, Maharashtra')}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                      } 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                 </div>
                 <a 
                   href={
                     project.mapUrl.includes('http') && !project.mapUrl.includes('google.com/maps/embed') && !project.mapUrl.includes('<iframe')
                      ? project.mapUrl
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location + ', Ahmednagar, Maharashtra')}`
                   }
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 mt-4 text-gold hover:text-gold/80 font-semibold text-sm transition-colors"
                 >
                   <span>📍</span> Open in Google Maps
                 </a>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gold/10 sticky top-32">
              <h3 className="font-serif text-2xl text-navy font-bold mb-6 border-b border-gold/20 pb-4">Project Highlights</h3>
              <ul className="space-y-4 text-text-mid text-sm font-medium">
                <li className="flex justify-between">
                  <span className="text-navy/70 uppercase tracking-[1px] text-[10px]">Status</span>
                  <span className="text-navy">{project.status}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-navy/70 uppercase tracking-[1px] text-[10px]">Type</span>
                  <span className="text-navy capitalize">{project.type}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-navy/70 uppercase tracking-[1px] text-[10px]">Location</span>
                  <span className="text-navy text-right max-w-[150px] truncate">{project.location}</span>
                </li>
              </ul>
              
              <div className="mt-10 space-y-4">
                {project.brochureUrl && (
                  <a href={project.brochureUrl} target="_blank" rel="noopener noreferrer" className="block w-full bg-navy text-gold text-center font-bold tracking-[1.5px] uppercase py-4 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all">
                    Download Brochure
                  </a>
                )}
                <a href="/contact" className="block w-full bg-gold-light text-navy text-center font-bold tracking-[1.5px] uppercase py-4 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all">
                  Express Interest
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Gallery Section */}
      <ProjectGallery images={galleryImages} />

      <Footer />
    </div>
  );
}
