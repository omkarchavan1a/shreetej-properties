"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

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
      id: 17,
      title: "Saiban Phase-9",
      type: "Layouts",
      location: "Ghulewadi",
      description: "The latest phase of the prestigious Saiban layout development, offering premium plotted plots in a well-planned township.",
      imageUrl: "/images/layout.jpg.jpeg",
      amenities: ["Wide Roads", "Underground Utilities", "Drainage System", "Green Spaces"],
      status: "Ongoing",
    },
  ];

  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showOngoing, setShowOngoing] = useState(false);

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <div
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
          <Link
            href={`/residential/${project.id}`}
            className="inline-flex items-center gap-2 bg-navy text-gold text-xs font-bold uppercase tracking-[1.5px] px-5 py-2.5 rounded-full hover:bg-gold hover:text-navy transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            View Full Details
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
          </Link>
          <Link
            href="/contact"
            className="text-xs font-semibold text-navy/50 hover:text-gold transition-colors duration-300 tracking-[1px] uppercase"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );

  const ExploreButton = ({
    label,
    isOpen,
    onClick,
  }: {
    label: string;
    isOpen: boolean;
    onClick: () => void;
  }) => (
    <div className="flex flex-col items-center gap-4 py-4">
      <button
        onClick={onClick}
        className="group relative inline-flex items-center gap-3 bg-navy text-gold font-bold uppercase tracking-[2px] text-sm px-10 py-5 rounded-full shadow-[0_8px_40px_rgba(13,27,42,0.25)] hover:shadow-[0_12px_50px_rgba(13,27,42,0.35)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Shimmer */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <span className="relative flex items-center gap-3">
          {isOpen ? "Hide Projects" : `Explore ${label}`}
          <span
            className={`w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          >
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
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </span>
      </button>
      {!isOpen && (
        <p className="text-navy/40 text-xs tracking-[1.5px] uppercase font-medium">
          Click to reveal {label.toLowerCase()} projects
        </p>
      )}
    </div>
  );

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
              <ExploreButton
                label="New Launches"
                isOpen={showUpcoming}
                onClick={() => setShowUpcoming((v) => !v)}
              />
            </div>
          </ScrollReveal>

          {/* Expandable project cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 justify-items-center overflow-hidden transition-all duration-700 ease-in-out ${
              showUpcoming
                ? "max-h-[2000px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
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
              <ExploreButton
                label="Ongoing Projects"
                isOpen={showOngoing}
                onClick={() => setShowOngoing((v) => !v)}
              />
            </div>
          </ScrollReveal>

          {/* Expandable project cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 overflow-hidden transition-all duration-700 ease-in-out ${
              showOngoing
                ? "max-h-[2000px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            {ongoingProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
