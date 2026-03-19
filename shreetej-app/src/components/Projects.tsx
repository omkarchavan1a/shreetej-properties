"use client";

import { useState } from "react";
import Image from "next/image";

type ProjectType = "all" | "residential" | "commercial" | "plots";

export default function Projects() {
  const [filter, setFilter] = useState<ProjectType>("all");

  const projects = [
    {
      id: 1,
      name: "Shreetej Residency",
      type: "residential",
      desc: "Residential · Sangamner · 2022",
      status: "Completed",
      statusColor: "bg-gold",
      img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80"
    },
    {
      id: 2,
      name: "Tej Heights Phase I",
      type: "residential",
      desc: "Residential · Sangamner · 2021",
      status: "Completed",
      statusColor: "bg-gold",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"
    },
    {
      id: 3,
      name: "Tej Commercial Hub",
      type: "commercial",
      desc: "Commercial · Nashik Highway · 2025",
      status: "Ongoing",
      statusColor: "bg-orange-500",
      img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80"
    },
    {
      id: 4,
      name: "Shreetej Villas",
      type: "residential",
      desc: "Residential · Ghulewadi · 2023",
      status: "Completed",
      statusColor: "bg-gold",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80"
    },
    {
      id: 5,
      name: "Tej Greens Plots",
      type: "plots",
      desc: "Plot Development · Sangamner",
      status: "Available",
      statusColor: "bg-green-600",
      img: "https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb?w=600&q=80"
    },
    {
      id: 6,
      name: "Shreetej Duplex Row",
      type: "residential",
      desc: "Residential · Tal-Sangamner · 2020",
      status: "Completed",
      statusColor: "bg-gold",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"
    }
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.type === filter);

  return (
    <section id="projects" className="py-24 px-[8%] max-w-[1400px] mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-4">
          <div className="h-px bg-gold/40 w-8" />
          <span>Our Portfolio</span>
          <div className="h-px bg-gold/40 w-8" />
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.2] text-text-dark mb-4">
          Building Dreams,<br />
          <em className="text-gold not-italic italic">Securing Futures</em>
        </h2>
        <p className="text-[1.05rem] text-text-mid leading-relaxed font-light">
          Over 15 years, we&apos;ve completed 55+ projects totalling over 5,50,000 sq.ft. across Sangamner and Ahmednagar district.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {(["all", "residential", "commercial", "plots"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2.5 rounded-full border-2 text-xs font-bold tracking-[1px] uppercase transition-all duration-300 ${
              filter === type
                ? "bg-gold border-gold text-navy shadow-lg"
                : "bg-transparent border-gold/30 text-text-mid hover:border-gold hover:text-gold"
            }`}
          >
            {type === "plots" ? "Plot Development" : type === "all" ? "All Projects" : type}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer h-[320px] lg:h-[380px] ${
              idx === 1 || idx === 4 ? "xl:row-span-2 xl:h-full" : ""
            }`}
          >
            <Image
              src={project.img}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent flex flex-col justify-end p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Status Tag */}
            <div className={`absolute top-5 left-5 ${project.statusColor} text-white/90 text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 rounded-full shadow-lg`}>
              {project.status}
            </div>

            {/* Content box */}
            <div className="relative z-10 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="font-serif text-[1.2rem] text-white font-bold mb-1.5">
                {project.name}
              </h4>
              <p className="text-[10px] text-gold-light tracking-[1.5px] uppercase font-semibold">
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
