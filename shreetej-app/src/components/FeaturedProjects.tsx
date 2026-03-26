import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function FeaturedProjects() {
  const upcomingProjects = [
    {
      id: 999,
      title: "Shreetej Platinum-5",
      type: "Mixed",
      location: "Sangamner",
      imageUrl: "/images/shreetej platinum 3.jpeg",
    }
  ];

  const ongoingProjects = [
    {
      id: 17,
      title: "Saiban Phase-9",
      type: "Layouts",
      location: "Ghulewadi",
      imageUrl: "/images/layout.jpg.jpeg",
    }
  ];

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <ScrollReveal direction="up" delay={index * 150} duration={800}>
      <Link href="/projects" className="group block h-full perspective-1000">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-navy/5 h-full flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(13,27,42,0.15)] hover:border-gold/30 preserve-3d group-hover:[transform:rotateY(2deg)_rotateX(1deg)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            {project.imageUrl ? (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <img 
                src="/assets/shreetej/Shreetej-Properties_Display-Images_PDF-1_page-0004-1024x615_4b6e1e87d3.jpg" 
                alt="Project Placeholder" 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-white/90 backdrop-blur-md text-navy text-[10px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full shadow-lg">
                {project.type}
              </span>
            </div>

            {/* Hover overlay with view text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="bg-gold/90 backdrop-blur-sm text-navy text-xs font-bold uppercase tracking-[2px] px-5 py-2.5 rounded-full scale-75 group-hover:scale-100 transition-transform duration-500">
                View Project
              </span>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 flex flex-col flex-grow">
            <h3 className="font-serif text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">{project.title}</h3>
            <p className="text-text-mid text-sm flex items-center gap-2 mb-4">
              <span className="text-gold">📍</span> {project.location}
            </p>
            <div className="mt-auto pt-6 border-t border-navy/10 flex items-center justify-between">
              <span className="text-xs font-bold tracking-[1.5px] uppercase text-navy/50 group-hover:text-gold transition-colors duration-300">Explore</span>
              <span className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-gold group-hover:bg-navy group-hover:text-gold-light group-hover:scale-110 transition-all duration-300">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );

  return (
    <div className="w-full bg-cream py-24">
      
      {/* New Launching Projects Section */}
      {upcomingProjects.length > 0 && (
        <section className="px-6 md:px-[8%] max-w-[1400px] mx-auto mb-32 relative">
          <ScrollReveal direction="up" duration={800}>
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
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 justify-items-center">
            {upcomingProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>
      )}

      {/* Ongoing Projects Section */}
      {ongoingProjects.length > 0 && (
        <section className="px-6 md:px-[8%] max-w-[1400px] mx-auto relative">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
          <ScrollReveal direction="up" duration={800}>
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
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {ongoingProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>
      )}
      
    </div>
  );
}
