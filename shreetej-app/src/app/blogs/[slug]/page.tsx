import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await db.select().from(blogs).where(eq(blogs.slug, slug));
  const blog = result[0];

  if (!blog || blog.status === "draft") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-gold/30 selection:text-navy">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-navy pt-32 pb-20 px-[8%] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gold/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-[900px] mx-auto relative z-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gold/70 text-sm font-bold uppercase tracking-[1px] hover:text-gold transition-colors mb-8"
          >
            ← Back to Articles
          </Link>
          {blog.category && (
            <span className="inline-block text-[11px] tracking-[2px] uppercase text-navy font-bold bg-gold px-4 py-1.5 rounded-full mb-6">
              {blog.category}
            </span>
          )}
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] mb-6">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-semibold text-white/60">
            <span>By {blog.author}</span>
            <div className="w-1 h-1 rounded-full bg-gold" />
            <span>{blog.createdAt.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="py-16 px-[8%] max-w-[900px] mx-auto">
        {blog.imageUrl && (
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 -mt-12">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-[400px] object-cover" />
          </div>
        )}

        {blog.excerpt && (
          <p className="text-lg text-text-mid italic border-l-4 border-gold pl-6 mb-10 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-navy prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-text-dark prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-gold prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:mb-2
            prose-strong:text-navy
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Bottom CTA */}
        <div className="mt-16 pt-10 border-t border-gold/20 text-center">
          <p className="text-text-mid mb-4">Enjoyed this article?</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-navy text-white font-bold uppercase tracking-[1px] text-sm px-8 py-4 rounded-xl hover:bg-gold hover:text-navy transition-all shadow-lg"
          >
            Read More Articles →
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
