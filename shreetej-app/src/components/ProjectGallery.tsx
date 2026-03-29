"use client";

import { useState } from "react";

const CATEGORIES = ["All", "1 BHK", "2 BHK", "3 BHK"];

export default function ProjectGallery({ images }: { images: string[] }) {
  const [activeTab, setActiveTab] = useState("All");

  // Divide images evenly into 3 categories: 1 BHK, 2 BHK, 3 BHK
  const getCategoryForIndex = (index: number) => {
    const total = images.length;
    if (total === 0) return "1 BHK";
    
    // For 12 images: 0-3 are 1 BHK, 4-7 are 2 BHK, 8-11 are 3 BHK
    const chunkSize = Math.ceil(total / 3);
    if (index < chunkSize) return "1 BHK";
    if (index < chunkSize * 2) return "2 BHK";
    return "3 BHK";
  };

  const filteredImages = images.filter((_, index) => {
    if (activeTab === "All") return true;
    return getCategoryForIndex(index) === activeTab;
  });

  if (images.length === 0) return null;

  return (
    <section className="py-20 px-[8%] max-w-[1200px] mx-auto border-t border-gold/10">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold mb-4">Project Gallery</h2>
        <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
        <p className="text-text-mid mt-4 text-sm uppercase tracking-[2px] font-semibold">Glimpses of luxury</p>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-bold text-sm tracking-[1px] transition-all duration-300 ${
              activeTab === tab 
                ? "bg-gold text-navy shadow-md transform -translate-y-0.5" 
                : "bg-white text-navy/70 border border-gold/20 hover:border-gold/50 hover:text-navy"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredImages.map((imgUrl, idx) => (
          <div 
            key={`${activeTab}-${idx}`} 
            className="group relative rounded-3xl overflow-hidden shadow-xl aspect-square cursor-pointer border border-gold/10 animate-fade-in-up"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-white font-bold tracking-[1px]">Image {idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
