import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export default async function FeaturedProjects() {
  // Fetch Upcoming (New Launching) and Ongoing projects
  const upcomingProjects = await db.select().from(projects).where(eq(projects.status, 'Upcoming')).orderBy(desc(projects.createdAt)).limit(3);
  const ongoingProjects = await db.select().from(projects).where(eq(projects.status, 'Ongoing')).orderBy(desc(projects.createdAt)).limit(3);

  const ProjectCard = ({ project }: { project: any }) => (
    <Link href={`/${project.type.toLowerCase()}/${project.id}`} className="group block h-full">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-navy/5 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-gold/30">
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-navy/5 flex items-center justify-center text-navy/30 font-medium">Image Not Available</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-md text-navy text-[10px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full">
              {project.type}
            </span>
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="font-serif text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">{project.title}</h3>
          <p className="text-text-mid text-sm flex items-center gap-2 mb-4">
            <span className="text-gold">📍</span> {project.location}
          </p>
          <div className="mt-auto pt-6 border-t border-navy/10 flex items-center justify-between">
            <span className="text-xs font-bold tracking-[1.5px] uppercase text-navy/50">Explore</span>
            <span className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-gold group-hover:bg-navy group-hover:text-gold-light transition-all">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full bg-cream py-24">
      
      {/* New Launching Projects Section */}
      {upcomingProjects.length > 0 && (
        <section className="px-[8%] max-w-[1400px] mx-auto mb-32 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
              <div className="h-px bg-gold/40 w-12" />
              <span>Exclusive Pre-Launch</span>
              <div className="h-px bg-gold/40 w-12" />
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-navy font-bold">
              New <em className="text-gold not-italic italic">Launching</em> Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {upcomingProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}

      {/* Ongoing Projects Section */}
      {ongoingProjects.length > 0 && (
        <section className="px-[8%] max-w-[1400px] mx-auto relative">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
              <div className="h-px bg-gold/40 w-12" />
              <span>Currently Under Construction</span>
              <div className="h-px bg-gold/40 w-12" />
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-navy font-bold">
              Ongoing <em className="text-gold not-italic italic">Developments</em>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ongoingProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}
      
    </div>
  );
}
