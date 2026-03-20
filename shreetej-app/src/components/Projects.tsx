"use client";

import { useState } from "react";
import Image from "next/image";

type ProjectType = "all" | "residential" | "commercial" | "plots";

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
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectType>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      name: "Shreetej Residency",
      type: "residential",
      desc: "Premium Residential · Sangamner",
      status: "Completed",
      statusColor: "bg-gold",
      img: "/assets/shreetej/3D-_page-0005-e1763446623738-768x384_35a42be3dc.jpg",
      location: "Sangamner, Dist-Ahmednagar",
      year: "2022",
      details: "A premium residential complex offering well-constructed flats with modern amenities. Every unit comes with verified title deeds and 100% legal security. Designed for families seeking quality homes at affordable rates.",
      amenities: ["24/7 Water Supply", "Covered Parking", "Garden Area", "Security", "Children's Play Area"],
      area: "1,50,000+ sq.ft."
    },
    {
      id: 2,
      name: "Tej Heights Phase I",
      type: "residential",
      desc: "Residential · Sangamner",
      status: "Completed",
      statusColor: "bg-gold",
      img: "/assets/shreetej/3D-_page-0006-e1763446571686-768x485_5efb9b5c60.jpg",
      location: "Sangamner, Dist-Ahmednagar",
      year: "2021",
      details: "Tej Heights Phase I features thoughtfully designed apartments with spacious living areas and excellent ventilation. Built with quality materials and backed by Shreetej's commitment to legal security and post-sale support.",
      amenities: ["Lift Facility", "Reserved Parking", "Rain Water Harvesting", "CCTV Security"],
      area: "85,000 sq.ft."
    },
    {
      id: 3,
      name: "Tej Commercial Hub",
      type: "commercial",
      desc: "Commercial · Nashik Highway",
      status: "Ongoing",
      statusColor: "bg-orange-500",
      img: "/assets/shreetej/photo-1486325212027-8081e485255e_36f4652808.jpg",
      location: "Nashik Highway, Sangamner",
      year: "2025",
      details: "A premier commercial development on the strategic Nashik Highway. Offering modern shops and office spaces ideal for businesses looking for high-visibility locations with excellent connectivity.",
      amenities: ["Road-Facing Shops", "Ample Parking", "Power Backup", "Wide Corridors", "Loading Area"],
      area: "45,000 sq.ft."
    },
    {
      id: 4,
      name: "Shreetej Villas",
      type: "residential",
      desc: "Residential · Ghulewadi",
      status: "Completed",
      statusColor: "bg-gold",
      img: "/assets/shreetej/3D-_page-0013-e1763446391451-768x606_5ec5c532fe.jpg",
      location: "Ghulewadi, Tal-Sangamner",
      year: "2023",
      details: "Luxurious duplex villas in the serene surroundings of Ghulewadi. Each villa features independent entrance, private garden, and premium interiors. Perfect for families seeking spacious, independent living.",
      amenities: ["Private Garden", "Double-Height Living", "Modular Kitchen", "Visitor Parking", "Compound Wall"],
      area: "2,500 sq.ft. per villa"
    },
    {
      id: 5,
      name: "Tej Greens Plots",
      type: "plots",
      desc: "Plot Development · Sangamner",
      status: "Available",
      statusColor: "bg-green-600",
      img: "/assets/shreetej/IMG-20240711-WA0227-1-1024x576_335b545544.jpg",
      location: "Sangamner, Dist-Ahmednagar",
      year: "2024",
      details: "NA-approved residential plots with clear titles and verified documentation. Options from 24 Guntha onwards. Ideal for individuals looking to build their dream home or make a secure long-term investment.",
      amenities: ["Clear Title Deed", "NA Approved", "Road Access", "Water Connection", "Electricity Connection"],
      area: "From 24 Guntha"
    },
    {
      id: 6,
      name: "Shreetej Duplex Row",
      type: "residential",
      desc: "Residential · Tal-Sangamner",
      status: "Completed",
      statusColor: "bg-gold",
      img: "/assets/shreetej/3D-_page-0015-768x511_d5f86ce8ae.jpg",
      location: "Tal-Sangamner, Dist-Ahmednagar",
      year: "2020",
      details: "A row of beautifully designed duplex homes offering spacious interiors and modern architecture. Each duplex features independent floors with a perfect blend of privacy and community living.",
      amenities: ["Independent Entrance", "Terrace Access", "Two-Story Living", "Car Parking", "Garden"],
      area: "1,800 sq.ft. per duplex"
    },
    {
      id: 7,
      name: "Shreetej Heights Phase II",
      type: "residential",
      desc: "Residential · Sangamner",
      status: "Upcoming",
      statusColor: "bg-blue-500",
      img: "/assets/shreetej/3D-_page-0016-e1763446294574-768x600_d32fec8509.jpg",
      location: "Sangamner, Dist-Ahmednagar",
      year: "2025",
      details: "The highly anticipated Phase II of our successful Tej Heights project. Featuring upgraded amenities, modern architecture, and Shreetej's promise of 100% legal confidence. Pre-launch booking now open.",
      amenities: ["Club House", "Gymnasium", "Landscaped Garden", "Smart Home Features", "EV Charging"],
      area: "1,20,000 sq.ft."
    },
    {
      id: 8,
      name: "Shreetej Commercial Plaza",
      type: "commercial",
      desc: "Commercial · Sangamner",
      status: "Completed",
      statusColor: "bg-gold",
      img: "/assets/shreetej/3D-_page-0019-768x768_769a4e27d4.jpg",
      location: "Ekta Chauk, Sangamner",
      year: "2023",
      details: "A landmark commercial plaza in the heart of Sangamner. Prime location at Ekta Chauk with excellent footfall. Features modern retail spaces and office units designed for growing businesses.",
      amenities: ["Prime Location", "Glass Facade", "Central AC Ready", "Fire Safety", "Escalator"],
      area: "35,000 sq.ft."
    },
    {
      id: 9,
      name: "Green Valley Plots",
      type: "plots",
      desc: "Plot Development · Ghulewadi",
      status: "Available",
      statusColor: "bg-green-600",
      img: "/assets/shreetej/IMG-20240711-WA0122-1-300x200_fc720e6bed.jpg",
      location: "Ghulewadi, Tal-Sangamner",
      year: "2024",
      details: "Premium residential plots surrounded by lush greenery. Each plot comes with verified clear title, NA approval, and basic amenities. Ideal for building your dream home in a peaceful environment.",
      amenities: ["Clear Title", "NA Approved", "Internal Roads", "Drainage", "Boundary Wall"],
      area: "From 20 Guntha"
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
        {filteredProjects.map((project) => (
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
                {project.desc} · {project.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy/90 backdrop-blur-md animate-fade-in" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up"
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
                  <span>{selectedProject.year}</span>
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
                <div className="bg-cream rounded-2xl p-5 mb-6 border border-gold/10">
                  <div className="flex items-center justify-between">
                    <span className="text-navy/60 text-[10px] font-bold tracking-[1.5px] uppercase">Total Area</span>
                    <span className="text-navy font-serif font-bold text-lg">{selectedProject.area}</span>
                  </div>
                </div>

                {/* Amenities */}
                {selectedProject.amenities.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-serif text-navy font-bold text-lg mb-4">Key Amenities</h3>
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
                  href="/contact"
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
