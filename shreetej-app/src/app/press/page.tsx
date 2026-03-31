import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { press } from "@/db/schema";
import { desc } from "drizzle-orm";

export const revalidate = 60;

export default async function PressPage() {
  const allPress = await db.select().from(press).orderBy(desc(press.publishedDate));

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />

      {/* Page Header */}
      <div className="bg-navy pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-[8%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Media Coverage</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white font-bold leading-[1.1] mb-6">
            In The<br />
            <em className="text-gold italic not-italic">News</em>
          </h1>
        </div>
      </div>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-[8%] max-w-[1000px] mx-auto min-h-[50vh]">
        {allPress.length === 0 ? (
          <div className="text-center py-20 text-text-mid font-serif text-xl border border-gold/20 rounded-3xl bg-white shadow-sm">
             Press coverage coming soon...
          </div>
        ) : (
          <div className="space-y-6">
            {allPress.map(item => (
              <div key={item.id} className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-gold/10 transition-all overflow-hidden group">
                <div className="flex flex-col md:flex-row">
                  {item.imageUrl && (
                    <div className="md:w-48 h-48 md:h-auto shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 flex-1">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold tracking-[1px] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full">{item.source}</span>
                        <span className="text-xs font-semibold text-text-mid">{item.publishedDate.toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-navy group-hover:text-gold transition-colors">{item.title}</h3>
                      {item.excerpt && (
                        <p className="text-sm text-text-mid mt-2 line-clamp-2">{item.excerpt}</p>
                      )}
                    </div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-bold text-navy uppercase tracking-[1px] border border-navy/20 px-6 py-3 rounded-xl hover:bg-gold hover:text-navy hover:border-gold transition-all text-center inline-block">
                      Read Article
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
