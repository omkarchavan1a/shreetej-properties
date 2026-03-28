"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function FeaturedProjects() {
  const upcomingProjects = [
    {
      id: 999,
      title: "Shreetej Platinum-5",
      type: "Mixed",
      location: "Sangamner",
      description: "An exclusive pre-launch mixed-use development offering premium residential and commercial spaces in the heart of Sangamner.",
      imageUrl: "",
      amenities: ["Clubhouse", "Swimming Pool", "Landscaped Gardens", "24/7 Security"],
      status: "Upcoming",
    },
  ];

  const ongoingProjects = [
    {
      id: 117,
      title: "Saiban Phase-9",
      type: "Residential",
      location: "Ghulewadi",
      description: "Saiban Project is a thoughtfully planned residential plotting development offering a limited collection of just 24 exclusive plots, designed for those who aspire to build their dream home in a peaceful and well-connected environment. Surrounded by natural greenery and a calm atmosphere, the project creates a perfect balance between nature and modern living.",
      imageUrl: "/images/saiban-phase-9.jpeg",
      amenities: ["Wide Roads", "Drainage System", "Street Lighting", "Clear Titles"],
      status: "Ongoing",
    },
  ];


  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    // For upcoming projects not yet in DB (id >= 900), link to contact page
    const detailHref = project.id >= 900 ? "/contact" : `/residential/${project.id}`;

    return (
      <Link
        href={detailHref}
        className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-navy/5 flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(13,27,42,0.15)] hover:border-gold/30"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image */}
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
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Type badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-md text-navy text-[10px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full shadow-lg">
              {project.type}
            </span>
          </div>

          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`backdrop-blur-md text-[10px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-full shadow-lg ${
                project.status === "Upcoming"
                  ? "bg-gold/90 text-navy"
                  : "bg-navy/90 text-gold"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Hover overlay with Explore cta */}
          <div className="absolute inset-0 bg-navy/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="text-white font-bold uppercase tracking-[2px] text-sm flex items-center gap-2">
              {project.id >= 900 ? "Enquire Now" : "View Details"}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          <h3 className="font-serif text-2xl font-bold text-navy mb-2 group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-text-mid text-sm flex items-center gap-2 mb-4">
            <span className="text-gold">📍</span> {project.location}
          </p>
          <p className="text-text-mid text-sm leading-relaxed mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Amenities */}
          {project.amenities && project.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.amenities.slice(0, 3).map((a: string, i: number) => (
                <span
                  key={i}
                  className="bg-cream text-navy text-[10px] font-semibold uppercase tracking-[1px] px-3 py-1 rounded-full border border-gold/20"
                >
                  {a}
                </span>
              ))}
              {project.amenities.length > 3 && (
                <span className="bg-cream text-navy/50 text-[10px] font-semibold uppercase tracking-[1px] px-3 py-1 rounded-full border border-navy/10">
                  +{project.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto pt-6 border-t border-navy/10 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 bg-navy text-gold text-xs font-bold uppercase tracking-[1.5px] px-5 py-2.5 rounded-full group-hover:bg-gold group-hover:text-navy transition-all duration-300">
              {project.id >= 900 ? "Enquire Now" : "Explore Project"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-navy/50 group-hover:text-gold transition-colors duration-300 tracking-[1px] uppercase">
              {project.location}
            </span>
          </div>
        </div>
      </Link>
    );
  };


  return (
    <div className="w-full bg-cream py-24">
      {/* New Launching Projects Section */}
      {upcomingProjects.length > 0 && (
        <section className="px-6 md:px-[8%] max-w-[1400px] mx-auto mb-32 relative">
          <ScrollReveal direction="up" duration={800}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
                <div className="h-px bg-gold/40 w-12" />
                <span>Exclusive Pre-Launch</span>
                <div className="h-px bg-gold/40 w-12" />
              </div>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-navy font-bold mb-8">
                New <em className="text-gold not-italic italic">Launching</em> Projects
              </h2>
            </div>
          </ScrollReveal>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 justify-items-center">
            {upcomingProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Ongoing Projects Section */}
      {ongoingProjects.length > 0 && (
        <section className="px-6 md:px-[8%] max-w-[1400px] mx-auto relative">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
          <ScrollReveal direction="up" duration={800}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
                <div className="h-px bg-gold/40 w-12" />
                <span>Currently Under Construction</span>
                <div className="h-px bg-gold/40 w-12" />
              </div>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-navy font-bold mb-8">
                Ongoing <em className="text-gold not-italic italic">Developments</em>
              </h2>
            </div>
          </ScrollReveal>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {ongoingProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
