"use client";

import { useEffect, useState, useRef } from "react";
import { getBlogs, deleteBlog, createBlog, updateBlog } from "@/app/actions/blogs";
import { uploadImage } from "@/app/actions/upload";

type Blog = {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date | string;
};

export default function BlogsCMS() {
  const [blogsList, setBlogsList] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchBlogs = async () => {
    setLoading(true);
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

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowForm(true);
    // Use timeout to ensure form is rendered before populating
    setTimeout(() => {
      if (formRef.current) {
        (formRef.current.elements.namedItem("title") as HTMLInputElement).value = blog.title;
        (formRef.current.elements.namedItem("author") as HTMLInputElement).value = blog.author;
        (formRef.current.elements.namedItem("content") as HTMLTextAreaElement).value = blog.content;
        (formRef.current.elements.namedItem("imageUrl") as HTMLInputElement).value = blog.imageUrl || "";
      }
    }, 0);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: any = Object.fromEntries(formData);
    
    try {
      setLoading(true);
      // Handle Image Upload
      const fileInput = formRef.current.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.length) {
        const uploadData = new FormData();
        uploadData.append("file", fileInput.files[0]);
        const uploadResult = await uploadImage(uploadData);
        if (uploadResult.success && uploadResult.url) {
          data.imageUrl = uploadResult.url;
        } else if (!uploadResult.success) {
          alert(uploadResult.error || "Image upload failed");
          setLoading(false);
          return;
        }
      }
      delete data.file;

      let result;
      if (selectedBlog) {
        result = await updateBlog(selectedBlog.id, data);
      } else {
        result = await createBlog(data);
      }

      if (result.success) {
        setShowForm(false);
        setSelectedBlog(null);
        fetchBlogs();
      } else {
        alert(result.error || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Blogs</h1>
          <p className="text-text-mid text-sm">Create and manage real estate articles.</p>
        </div>
        <button 
          onClick={() => { setSelectedBlog(null); setShowForm(true); }}
          className="bg-gold text-navy font-bold tracking-[1px] uppercase px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all shadow-md"
        >
          + Write New Blog
        </button>
      </div>

      {showForm && (
        <div className="mb-10 bg-white p-8 rounded-3xl shadow-xl border border-navy/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {selectedBlog ? 'Edit Blog' : 'Write New Blog'}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-text-mid hover:text-navy transition-colors">✕ Close</button>
          </div>
          <form ref={formRef} onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-[2px] text-text-mid mb-2">Blog Title</label>
              <input name="title" required className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold outline-none transition-all" placeholder="Enter article title..." />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[2px] text-text-mid mb-2">Author Name</label>
              <input name="author" required className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold outline-none transition-all" placeholder="Your name..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy/40 uppercase tracking-widest mb-2">Blog Image (PNG Only)</label>
              <input 
                type="file" 
                name="file"
                accept="image/png"
                className="w-full px-5 py-3 rounded-xl border border-navy/10 focus:border-gold outline-none text-sm font-medium" 
              />
              <input type="hidden" name="imageUrl" defaultValue={selectedBlog?.imageUrl || ""} />
              {selectedBlog?.imageUrl && <p className="text-[10px] text-navy/40 truncate mt-1">Current: {selectedBlog.imageUrl}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-[2px] text-text-mid mb-2">Content</label>
              <textarea name="content" required rows={8} className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold outline-none transition-all resize-none" placeholder="Write your article here..." />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="px-6 py-3 rounded-xl border border-navy/10 text-navy font-bold uppercase tracking-[1px] text-xs hover:bg-navy/5 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 rounded-xl bg-navy text-white font-bold uppercase tracking-[1px] text-xs hover:bg-navy/90 transition-all shadow-lg"
              >
                {selectedBlog ? 'Update Blog' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      )}

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
                <th className="px-6 py-5">Image</th>
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
                  <td className="px-6 py-4">
                    {b.imageUrl ? (
                      <img src={b.imageUrl} alt={b.title} className="w-16 h-12 rounded-lg object-cover shadow-sm" />
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-navy/5 flex items-center justify-center text-navy/20 text-[10px] uppercase font-bold">No Image</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-navy">{b.title}</td>
                  <td className="px-6 py-4 text-sm text-text-mid">{b.slug}</td>
                  <td className="px-6 py-4 text-sm text-text-mid">{b.author}</td>
                  <td className="px-6 py-4 text-sm text-text-mid">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => handleEdit(b)} className="text-xs font-bold text-navy hover:text-gold uppercase tracking-[1px] transition-colors">Edit</button>
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
