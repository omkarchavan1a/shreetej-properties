"use client";

import { useState } from "react";
import Image from "next/image";

type ProjectType = "All" | "Residential" | "Commercial" | "Mixed" | "Layouts";

interface Project {
  id: number;
  name: string;
  type: string;
  desc: string;
  status: string;
  statusColor: string;
  img: string;
  location: string;
  year: string;
  details: string;
  amenities: string[];
  area: string;
  cityArea: string;
}

export default function Projects() {
  const [typeFilter, setTypeFilter] = useState<ProjectType>("All");
  const [areaFilter, setAreaFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const areas = ["All", "Ghulewadi", "Malpani Nagar", "Golden City", "Kokangav", "Nashik-Pune Highway", "Navin Nagar Road", "Katariya Nagar", "Ganesh Vihar"];
  const types: ProjectType[] = ["All", "Residential", "Commercial", "Mixed", "Layouts"];

  const projects: Project[] = [
    // NEW LAUNCHING
    { id: 999, name: "Shreetej Platinum-5", type: "Mixed", cityArea: "Sangamner", desc: "Residential + Commercial", status: "LAUNCHING SOON", statusColor: "bg-gold", img: "/images/shreetej platinum 3.jpeg", location: "Sangamner", year: "2026", details: "Exclusive Pre-Launch. Premium apartments & commercial spaces.", amenities: ["Parking", "Lift", "Security"], area: "—" },

    // COMPLETE PROJECTS
    { id: 1, name: "Shreetej Platinum-2", type: "Mixed", cityArea: "Ghulewadi", desc: "Residential + Commercial", status: "COMPLETED", statusColor: "bg-navy", img: "/images/shreetej platinum 1.jpeg", location: "Saishradha Chowk, Ghulewadi", year: "—", details: "Units: —", amenities: ["Parking", "Lift", "Open Terrace", "RCC Watertank (top & bottom)", "Balconies", "Wall Compound", "Separate Commercial Parking"], area: "—" },
    { id: 2, name: "Shreetej Platinum-1", type: "Commercial", cityArea: "Nashik-Pune Highway", desc: "Commercial", status: "COMPLETED", statusColor: "bg-navy", img: "/images/shreetej platinum 1.jpeg", location: "Pune-Nashik Highway, Gunjalwadi", year: "—", details: "A commercial project at a prime location.", amenities: ["Parking", "Borewell", "RCC Watertank"], area: "19 units (17 shops, 2 halls)" },
    { id: 3, name: "Samarth Heights", type: "Mixed", cityArea: "Ghulewadi", desc: "Residential + Commercial", status: "COMPLETED", statusColor: "bg-navy", img: "/images/samarth heights.jpeg", location: "Maldad Road, Ghulewadi", year: "—", details: "Mixed use property with excellent amenities.", amenities: ["Huge Parking", "Lift", "Open Terrace", "RCC Watertank", "Separate Electricity Transformer"], area: "28 flats (1BHK & RK), 7 shops" },
    { id: 4, name: "Row House", type: "Residential", cityArea: "Malpani Nagar", desc: "Residential", status: "COMPLETED", statusColor: "bg-navy", img: "/images/layout.jpg.jpeg", location: "Malpani Nagar", year: "—", details: "Independent row houses for a premium lifestyle.", amenities: ["Underground Drainage", "Underground Watertank", "Individual Parking"], area: "5 units" },
    { id: 5, name: "Bungalow (Suresh Sawale)", type: "Residential", cityArea: "Malpani Nagar", desc: "Residential", status: "COMPLETED", statusColor: "bg-navy", img: "/images/suresh sable basnglow.jpeg", location: "Malpani Nagar", year: "—", details: "Custom built bungalow.", amenities: [], area: "1 unit" },
    { id: 6, name: "Arbitro Heights", type: "Commercial", cityArea: "Other", desc: "Commercial", status: "COMPLETED", statusColor: "bg-navy", img: "/images/arbitro heights.jpeg", location: "Ekta Chowk", year: "—", details: "A major commercial hub offering numerous shops.", amenities: ["Parking", "Lift", "RCC Watertank"], area: "32 shops" },
    { id: 7, name: "Shreetej Platinum-3", type: "Mixed", cityArea: "Navin Nagar Road", desc: "Mixed", status: "COMPLETED", statusColor: "bg-navy", img: "/images/shreetej platinum 3.jpeg", location: "Navin Nagar Road", year: "—", details: "Mixed-use building with halls and shops.", amenities: [], area: "7 units (2 shops, 5 halls)" },
    { id: 8, name: "Samarth Villa", type: "Mixed", cityArea: "Golden City", desc: "Residential + Commercial", status: "COMPLETED", statusColor: "bg-navy", img: "/images/samarth villa.jpeg", location: "Golden City", year: "—", details: "A beautiful villa complex.", amenities: ["Lift", "Parking", "RCC Watertank"], area: "12 flats, 1 commercial" },
    { id: 9, name: "Commercial Building", type: "Mixed", cityArea: "Malpani Nagar", desc: "Mixed", status: "COMPLETED", statusColor: "bg-navy", img: "/images/arbitro alfa.jpeg", location: "Malpani Nagar", year: "—", details: "Mixed use commercial and residential complex.", amenities: [], area: "4 flats, 4 shops" },
    { id: 10, name: "Samarth Roop", type: "Mixed", cityArea: "Golden City", desc: "Residential + Commercial", status: "COMPLETED", statusColor: "bg-navy", img: "/images/samarth roop.jpeg", location: "Golden City", year: "—", details: "Highly sought after mixed-use project.", amenities: [], area: "12 flats, 4 shops" },
    { id: 11, name: "Bungalow", type: "Residential", cityArea: "Nashik-Pune Highway", desc: "Residential", status: "COMPLETED", statusColor: "bg-navy", img: "/images/11 nashik nagar bypass.jpeg", location: "Nagar-Nashik Bypass, Ghulewadi", year: "—", details: "Premium bungalow near Nashik bypass.", amenities: [], area: "1 unit" },
    { id: 12, name: "Bungalow", type: "Residential", cityArea: "Malpani Nagar", desc: "Residential", status: "COMPLETED", statusColor: "bg-navy", img: "/images/malpani nagar banglow 12.jpeg", location: "Malpani Nagar", year: "—", details: "Spacious bungalow in Malpani Nagar.", amenities: [], area: "1 unit" },
    { id: 13, name: "Apartment", type: "Residential", cityArea: "Katariya Nagar", desc: "Residential", status: "COMPLETED", statusColor: "bg-navy", img: "/images/katariya nagar 13.jpeg", location: "Katariya Nagar", year: "—", details: "Apartment complex with modern facilities.", amenities: [], area: "7 units" },
    { id: 14, name: "Bungalow", type: "Residential", cityArea: "Ganesh Vihar", desc: "Residential", status: "COMPLETED", statusColor: "bg-navy", img: "/images/ganesh vihar.jpeg", location: "Ganesh Vihar", year: "—", details: "Luxurious single unit bungalow.", amenities: [], area: "1 unit" },
    { id: 15, name: "Sai Samarth Plaza", type: "Mixed", cityArea: "Other", desc: "Mixed", status: "COMPLETED", statusColor: "bg-navy", img: "/images/sai samarth plaza.jpeg", location: "Maldad Road", year: "—", details: "Business and shopping plaza.", amenities: [], area: "16 units" },
    { id: 16, name: "Bungalow (Bharat Khemnar)", type: "Residential", cityArea: "Malpani Nagar", desc: "Residential", status: "COMPLETED", statusColor: "bg-navy", img: "/images/bharat khemnar banglow.jpeg", location: "Malpani Nagar", year: "—", details: "Custom premium bungalow design.", amenities: [], area: "1 unit" },

    // LAYOUTS
    { id: 17, name: "Saiban Phase-9", type: "Layouts", cityArea: "Ghulewadi", desc: "NA Layout", status: "ONGOING", statusColor: "bg-blue-500", img: "/images/layout.jpg.jpeg", location: "Ghulewadi", year: "—", details: "Premium layout project with clear titles.", amenities: ["Collector NA Plots", "Wall Compound", "6m Internal Roads", "Street Light", "Underground Drainage"], area: "24 plots" },
    { id: 18, name: "Bhagyoday Park", type: "Layouts", cityArea: "Other", desc: "NA Layout", status: "COMPLETED", statusColor: "bg-navy", img: "/images/untitled-bhagyoday park.jpg.jpeg", location: "Maldad Road", year: "—", details: "Fully developed NA plots.", amenities: ["NA Plots", "Internal Roads", "Street Light"], area: "16 plots" },
    { id: 19, name: "Nizarneshwar Park", type: "Layouts", cityArea: "Kokangav", desc: "NA Layout", status: "COMPLETED", statusColor: "bg-navy", img: "/images/nijarneshwar park 1.jpg.jpeg", location: "Kokangav", year: "—", details: "Clear title NA plots.", amenities: ["NA Plots", "Internal Roads", "Street Light"], area: "21 plots" },
    { id: 20, name: "Kanifnath Park", type: "Layouts", cityArea: "Ghulewadi", desc: "NA Layout", status: "AVAILABLE", statusColor: "bg-green-600", img: "/images/kanifnath park.jpg.jpeg", location: "Ghulewadi (near Kanifnath Temple)", year: "—", details: "NA approved plots behind Kanifnath temple.", amenities: ["NA Plots", "Compound Wall", "Internal Roads", "Street Light"], area: "10 plots" },
    { id: 21, name: "Madhuban Park", type: "Layouts", cityArea: "Nashik-Pune Highway", desc: "NA Layout", status: "AVAILABLE", statusColor: "bg-green-600", img: "/images/madhuban park.jpg.jpeg", location: "Nasik-Pune Highway", year: "—", details: "Prime located plots on Nashik Highway.", amenities: [], area: "11 plots" }
  ];

  const filteredProjects = projects.filter(p => {
    const passType = typeFilter === "All" || p.type === typeFilter;
    const passArea = areaFilter === "All" || p.cityArea === areaFilter;
    return passType && passArea;
  });

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
          Over 16 years, we&apos;ve delivered diverse residential, commercial, and layout projects mapping thousands of happy customers.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-12 flex flex-col items-center gap-6">
        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-6 py-2.5 rounded-full border-2 text-xs font-bold tracking-[1px] uppercase transition-all duration-300 ${
                typeFilter === type
                  ? "bg-gold border-gold text-navy shadow-lg"
                  : "bg-transparent border-gold/30 text-text-mid hover:border-gold hover:text-gold"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Area Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setAreaFilter(area)}
              className={`px-4 py-1.5 rounded-full border border-navy/20 text-[10px] font-bold tracking-wider uppercase transition-all duration-300 ${
                areaFilter === area
                  ? "bg-navy border-navy text-white shadow-md"
                  : "bg-white/50 text-navy hover:bg-navy/10 hover:border-navy/40"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-20 text-text-mid text-lg font-medium">
            No projects found matching the selected filters.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[320px] lg:h-[380px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Image
                src={project.img}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status Tag */}
              <div className={`absolute top-5 left-5 ${project.statusColor} text-white/90 text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 rounded-full shadow-lg`}>
                {project.status}
              </div>

              {/* Click Hint */}
              <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold tracking-[1px] uppercase px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click for Details
              </div>

              {/* Content box */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h4 className="font-serif text-[1.2rem] text-white font-bold mb-1.5">
                  {project.name}
                </h4>
                <p className="text-[10px] text-gold-light tracking-[1.5px] uppercase font-semibold">
                  {project.type} · {project.location}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy/90 backdrop-blur-md animate-fade-in" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-navy/80 text-white flex items-center justify-center hover:bg-navy transition-colors text-xl font-light"
            >
              ✕
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Image Side */}
              <div className="relative w-full lg:w-1/2 h-[300px] lg:h-auto lg:min-h-[600px]">
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/10" />
                <div className={`absolute top-6 left-6 ${selectedProject.statusColor} text-white text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-2 rounded-full shadow-lg`}>
                  {selectedProject.status}
                </div>
              </div>

              {/* Details Side */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center space-x-3 text-[10px] tracking-[2px] uppercase text-gold font-bold mb-3">
                  <span>{selectedProject.type}</span>
                  <div className="h-px bg-gold/40 w-8" />
                  <span>{selectedProject.location}</span>
                </div>

                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-navy font-bold mb-2">
                  {selectedProject.name}
                </h2>

                <p className="text-text-mid flex items-center gap-2 mb-6 text-sm">
                  <span className="text-gold">📍</span> {selectedProject.location}
                </p>

                <p className="text-text-mid leading-relaxed mb-8 text-[0.95rem]">
                  {selectedProject.details}
                </p>

                {/* Area */}
                {(selectedProject.area && selectedProject.area !== "—") && (
                  <div className="bg-cream rounded-2xl p-5 mb-6 border border-gold/10">
                    <div className="flex items-center justify-between">
                      <span className="text-navy/60 text-[10px] font-bold tracking-[1.5px] uppercase">Property Scale</span>
                      <span className="text-navy font-serif font-bold text-lg">{selectedProject.area}</span>
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {selectedProject.amenities && selectedProject.amenities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-serif text-navy font-bold text-lg mb-4">Features & Layout Details</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="bg-cream text-navy text-xs font-semibold px-4 py-2 rounded-full border border-gold/15"
                        >
                          ✦ {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-block bg-gradient-to-br from-gold to-gold-light text-navy font-bold text-[12px] tracking-[1.5px] uppercase px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,148,58,0.4)] transition-all duration-300"
                >
                  Express Interest →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Animations CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-scale-up { animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </section>
  );
}
