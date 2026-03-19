"use client";

import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "@/app/actions/blogs";

type Blog = {
  id: number;
  title: string;
  slug: string;
  author: string;
  createdAt: Date | string;
};

export default function BlogsCMS() {
  const [blogsList, setBlogsList] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const data = await getBlogs();
    setBlogsList(data as Blog[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Delete this blog?")) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Blogs</h1>
          <p className="text-text-mid text-sm">Create and manage real estate articles.</p>
        </div>
        <button className="bg-gold text-navy font-bold tracking-[1px] uppercase px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all shadow-md">
          + Write New Blog
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-navy/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-mid animate-pulse">Loading blogs...</div>
        ) : blogsList.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="font-serif text-xl font-bold text-navy mb-2">No Blogs Found</h3>
            <p className="text-text-mid text-sm">Start writing to attract more visitors.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f6f2] text-xs uppercase tracking-[2px] text-navy font-bold border-b border-navy/10">
                <th className="px-6 py-5">Title</th>
                <th className="px-6 py-5">Slug</th>
                <th className="px-6 py-5">Author</th>
                <th className="px-6 py-5">Published Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogsList.map((b) => (
                <tr key={b.id} className="border-b border-navy/5 hover:bg-[#f8f6f2]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-navy">{b.title}</td>
                  <td className="px-6 py-4 text-sm text-text-mid">{b.slug}</td>
                  <td className="px-6 py-4 text-sm text-text-mid">{b.author}</td>
                  <td className="px-6 py-4 text-sm text-text-mid">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-xs font-bold text-navy hover:text-gold uppercase tracking-[1px] transition-colors">Edit</button>
                    <button onClick={() => handleDelete(b.id)} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-[1px] transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
