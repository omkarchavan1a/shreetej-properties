import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const revalidate = 60;

export default async function BlogsPage() {
  const allBlogs = await db
    .select()
    .from(blogs)
    .where(eq(blogs.status, "published"))
    .orderBy(desc(blogs.createdAt));

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />

      {/* Page Header */}
      <div className="bg-navy pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-[8%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-gold font-bold mb-6">
            <div className="h-px bg-gold/40 w-12" />
            <span>Insights &amp; News</span>
            <div className="h-px bg-gold/40 w-12" />
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-white font-bold leading-[1.1] mb-6">
            Real Estate<br />
            <em className="text-gold italic not-italic">Knowledge Hub</em>
          </h1>
        </div>
      </div>

      {/* Blogs Layout */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-[8%] max-w-[1200px] mx-auto">
        {allBlogs.length === 0 ? (
           <div className="text-center py-20 text-text-mid font-serif text-xl border border-gold/20 rounded-3xl bg-white shadow-sm">
             More insights coming soon...
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {allBlogs.map(blog => (
              <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group block bg-white rounded-3xl overflow-hidden shadow-lg border border-gold/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-64 relative overflow-hidden bg-navy/5">
                  {blog.imageUrl ? (
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif text-gold text-4xl opacity-50">Shreetej</div>
                  )}
                  {blog.category && (
                    <span className="absolute top-4 left-4 text-[10px] tracking-[1px] uppercase font-bold bg-navy/80 text-gold px-3 py-1 rounded-full backdrop-blur-sm">
                      {blog.category}
                    </span>
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-[1px] uppercase text-gold mb-4">
                    <span>{blog.createdAt.toLocaleDateString()}</span>
                    <div className="w-1 h-1 rounded-full bg-navy/20" />
                    <span>{blog.author}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors">{blog.title}</h3>
                  <p className="text-text-mid leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 200)}
                  </p>
                  <span className="text-sm font-bold text-navy uppercase tracking-[1px] flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Article <span className="text-gold">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
