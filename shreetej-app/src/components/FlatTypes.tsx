"use client";

import { useState } from "react";

const FLAT_CONFIGS = [
  {
    id: "1bhk",
    label: "1 BHK",
    image: "/images/flat/1bhk.jpg",
    description: "Premium 1 BHK featuring an open-concept living area, modern kitchen, and a private balcony with panoramic views."
  },
  {
    id: "2bhk",
    label: "2 BHK",
    image: "/images/flat/2bhk.jpg",
    description: "Spacious 2 BHK layout designed with luxury and privacy in mind. Features a generous master suite and versatile second bedroom."
  },
  {
    id: "3bhk",
    label: "3 BHK",
    image: "/images/flat/3bhk.jpg",
    description: "Elite 3 BHK offering the pinnacle of urban living. Expansive interiors, gourmet kitchen, and world-class finishes throughout."
  }
];

export default function FlatTypes() {
  const [activeTab, setActiveTab] = useState(FLAT_CONFIGS[0]);

  return (
    <section className="py-20 px-[8%] max-w-[1200px] mx-auto bg-white rounded-[3rem] shadow-2xl border border-gold/10 my-20">
      <div className="text-center mb-16 animate-fade-in-up">
        <div className="inline-flex items-center justify-center space-x-3 text-[11px] tracking-[3px] uppercase text-gold font-bold mb-6">
          <div className="h-px bg-gold/40 w-12" />
          <span>Configurations</span>
          <div className="h-px bg-gold/40 w-12" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-navy font-bold">Premium Flat Types</h2>
        <p className="text-text-mid mt-4 text-sm font-medium">Explore our meticulously planned living spaces</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Selection Sidebar (Tabs) */}
        <div className="lg:col-span-3 flex lg:flex-col flex-wrap justify-center gap-4">
          {FLAT_CONFIGS.map((config) => (
            <button
              key={config.id}
              onClick={() => setActiveTab(config)}
              className={`w-full text-left px-8 py-6 rounded-2xl font-bold tracking-[1.5px] uppercase transition-all duration-500 border-2 ${
                activeTab.id === config.id
                  ? "bg-navy text-gold border-navy shadow-xl -translate-y-1"
                  : "bg-cream text-navy/60 border-transparent hover:border-gold/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{config.label}</span>
                {activeTab.id === config.id && <span className="text-gold">✦</span>}
              </div>
            </button>
          ))}
        </div>

        {/* 3D Cutout View */}
        <div className="lg:col-span-9 bg-cream p-6 md:p-12 rounded-[2.5rem] relative overflow-hidden group min-h-[500px] flex flex-col items-center justify-center text-center">
          <div className="relative w-full max-w-[800px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url(${activeTab.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-navy/5 group-hover:bg-navy/0 transition-colors duration-500" />
          </div>
          
          <div className="mt-12 max-w-[600px] mx-auto animate-fade-in-up">
            <h3 className="font-serif text-2xl text-navy font-bold mb-4">{activeTab.label} Configuration</h3>
            <p className="text-text-mid leading-relaxed font-light text-lg italic italic-light">
              &quot;{activeTab.description}&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
