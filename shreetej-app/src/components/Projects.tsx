"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Building2, Home, Layout, ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  type: string;
  status: string;
  location: string;
  description: string | null;
  imageUrl: string | null;
}

export default function Projects({ initialProjects }: { initialProjects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "All Projects", icon: Layout },
    { id: "residential", label: "Residential", icon: Home },
    { id: "commercial", label: "Commercial", icon: Building2 },
    { id: "plots", label: "Plots", icon: MapPin },
  ];

  const filteredProjects = initialProjects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.type.toLowerCase() === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-24 px-[8%] max-w-[1400px] mx-auto min-h-screen">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[1.5px] transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-navy text-gold shadow-[0_10px_30px_rgba(13,27,42,0.2)] scale-105"
                    : "bg-white text-navy/60 hover:bg-gold/10 hover:text-navy border border-navy/5"
                }`}
              >
                <Icon size={14} className={activeFilter === filter.id ? "text-gold" : "text-navy/40"} />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30 group-focus-within:text-gold transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-navy/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-navy/10 shadow-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full mb-6 text-gold">
            <Search size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-navy mb-2">No projects found</h3>
          <p className="text-text-mid">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <Link
              href={`/${project.type === "commercial" ? "commercial" : "residential"}/${project.id}`}
              key={project.id}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-transparent hover:border-gold/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="h-72 relative overflow-hidden bg-navy/5">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-serif text-gold/30 text-3xl">
                    Shreetej
                  </div>
                )}
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-white/95 backdrop-blur-md text-navy text-[10px] font-bold tracking-[2px] uppercase px-4 py-2 rounded-full shadow-lg">
                    {project.status}
                  </span>
                </div>

                {/* Type Badge */}
                <div className="absolute top-6 right-6">
                  <span className="bg-gold/90 backdrop-blur-md text-navy text-[10px] font-bold tracking-[2px] uppercase px-4 py-2 rounded-full shadow-lg">
                    {project.type}
                  </span>
                </div>

                {/* Preview Link (Visible on hover) */}
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[2px]">
                    Explore Project <ArrowRight size={14} className="text-gold" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-[2px] mb-3">
                  <div className="w-8 h-px bg-gold/40" />
                  <span>{project.location}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-text-mid text-sm leading-relaxed line-clamp-2 mb-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  {project.description || "A premium development by Shreetej Properties Builders & Developers, offering unmatched luxury and quality."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
