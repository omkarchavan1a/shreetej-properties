"use client";

export default function ProjectGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 px-[8%] max-w-[1200px] mx-auto border-t border-gold/10">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold mb-4">Project Gallery</h2>
        <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
        <p className="text-text-mid mt-4 text-sm uppercase tracking-[2px] font-semibold">Glimpses of luxury</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((imgUrl, idx) => (
          <div 
            key={idx} 
            className="group relative rounded-3xl overflow-hidden shadow-xl aspect-square cursor-pointer border border-gold/10 animate-fade-in-up"
            style={{ animationDelay: `${idx * 50}ms` }}
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
