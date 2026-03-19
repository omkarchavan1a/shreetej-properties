import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const revalidate = 60;

export default async function CommercialPage() {
  const commercialProjects = await db.select().from(projects).where(eq(projects.type, 'commercial')).orderBy(desc(projects.createdAt));

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-navy pt-32 pb-20 px-[8%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Business Spaces</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white font-bold leading-[1.1] mb-6">
            Commercial<br />
            <em className="text-gold italic not-italic">Developments</em>
          </h1>
        </div>
      </div>

      <section className="py-24 px-[8%] max-w-[1400px] mx-auto min-h-[50vh]">
        {commercialProjects.length === 0 ? (
          <div className="text-center py-32 text-text-mid font-serif text-2xl border border-gold/20 rounded-3xl bg-white shadow-sm">
             Commercial projects coming soon...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {commercialProjects.map(project => (
              <Link href={`/commercial/${project.id}`} key={project.id} className="group block bg-white rounded-3xl overflow-hidden shadow-lg border border-transparent hover:border-gold/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-64 relative overflow-hidden bg-navy/5">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif text-gold text-2xl opacity-50">Shreetej</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy text-[10px] font-bold tracking-[2px] uppercase px-4 py-2 rounded-full">
                    {project.status}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
                  <p className="text-text-mid text-sm mb-6 flex items-center gap-2">
                    <span className="text-gold">📍</span> {project.location}
                  </p>
                  <span className="text-xs font-bold text-navy uppercase tracking-[1.5px] flex items-center gap-2 group-hover:gap-4 transition-all">
                    View Details <span className="text-gold">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
