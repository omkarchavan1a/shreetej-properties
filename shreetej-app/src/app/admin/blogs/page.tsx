"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getBlogs, deleteBlog, createBlog, updateBlog } from "@/app/actions/blogs";
import { uploadImage } from "@/app/actions/upload";

type Blog = {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  status: string;
  imageUrl: string | null;
  createdAt: Date | string;
};

const CATEGORIES = [
  "Market Insights",
  "Investment Tips",
  "Property Guide",
  "Company News",
  "Home Decor",
  "Legal & Finance",
];

export default function BlogsCMS() {
  const [blogsList, setBlogsList] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blogStatus, setBlogStatus] = useState<string>("published");
  const [contentHtml, setContentHtml] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

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
    setImagePreview(blog.imageUrl || null);
    setBlogStatus(blog.status || "published");
    setTimeout(() => {
      if (formRef.current) {
        (formRef.current.elements.namedItem("title") as HTMLInputElement).value = blog.title;
        (formRef.current.elements.namedItem("author") as HTMLInputElement).value = blog.author;
        (formRef.current.elements.namedItem("excerpt") as HTMLTextAreaElement).value = blog.excerpt || "";
        (formRef.current.elements.namedItem("category") as HTMLSelectElement).value = blog.category || "";
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = blog.content;
        setContentHtml(blog.content);
      }
    }, 10);
  };

  const openNewForm = () => {
    setSelectedBlog(null);
    setImagePreview(null);
    setBlogStatus("published");
    setContentHtml("");
    setShowForm(true);
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = "";
    }, 10);
  };

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: any = Object.fromEntries(formData);

    // Get content from the rich text editor
    data.content = editorRef.current?.innerHTML || "";
    if (!data.content || data.content === "<br>") {
      alert("Please write some content for the blog.");
      return;
    }

    data.status = blogStatus;

    try {
      setSaving(true);

      // Handle Image Upload
      const fileInput = formRef.current.querySelector('input[name="file"]') as HTMLInputElement;
      if (fileInput?.files?.length) {
        const uploadData = new FormData();
        uploadData.append("file", fileInput.files[0]);
        const uploadResult = await uploadImage(uploadData);
        if (uploadResult.success && uploadResult.url) {
          data.imageUrl = uploadResult.url;
        } else if (!uploadResult.success) {
          alert(uploadResult.error || "Image upload failed");
          setSaving(false);
          return;
        }
      } else if (selectedBlog) {
        data.imageUrl = selectedBlog.imageUrl;
      }
      delete data.file;

      // Clean empty strings to null
      ["excerpt", "category", "imageUrl"].forEach(key => {
        if (data[key] === "") data[key] = null;
      });

      let result;
      if (selectedBlog) {
        result = await updateBlog(selectedBlog.id, data);
      } else {
        result = await createBlog(data);
      }

      if (result.success) {
        setShowForm(false);
        setSelectedBlog(null);
        setImagePreview(null);
        setContentHtml("");
        fetchBlogs();
      } else {
        alert(result.error || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold outline-none transition-all text-sm";
  const labelClass = "block text-[10px] font-bold uppercase tracking-[2px] text-text-mid mb-2";

  const toolbarBtnClass = "px-3 py-1.5 rounded-lg text-sm font-semibold text-navy/70 hover:bg-gold/10 hover:text-navy transition-all border border-transparent hover:border-gold/20";

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Blogs</h1>
          <p className="text-text-mid text-sm">Create and manage real estate articles.</p>
        </div>
        <button
          onClick={openNewForm}
          className="bg-gold text-navy font-bold tracking-[1px] uppercase px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all shadow-md"
        >
          + Write New Blog
        </button>
      </div>

      {showForm && (
        <div className="mb-10 bg-white p-8 rounded-3xl shadow-xl border border-navy/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {selectedBlog ? "Edit Blog" : "Write New Blog"}
            </h2>
            <div className="flex items-center gap-4">
              {/* Draft / Published Toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBlogStatus("draft")}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-[1px] rounded-l-xl border transition-all ${
                    blogStatus === "draft"
                      ? "bg-amber-100 text-amber-700 border-amber-300"
                      : "bg-white text-navy/40 border-navy/10 hover:text-navy/70"
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setBlogStatus("published")}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-[1px] rounded-r-xl border transition-all ${
                    blogStatus === "published"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-white text-navy/40 border-navy/10 hover:text-navy/70"
                  }`}
                >
                  Published
                </button>
              </div>
              <button onClick={() => setShowForm(false)} className="text-text-mid hover:text-navy transition-colors">✕ Close</button>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Blog Title *</label>
                <input name="title" required className={inputClass + " text-lg font-semibold"} placeholder="Enter a compelling title..." />
              </div>
              <div>
                <label className={labelClass}>Author Name *</label>
                <input name="author" required className={inputClass} placeholder="Your name..." />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select name="category" className={inputClass + " appearance-none"}>
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Excerpt / Summary</label>
                <textarea name="excerpt" rows={2} className={inputClass + " resize-none"} placeholder="Brief summary for previews (optional)..." />
              </div>
              <div>
                <label className={labelClass}>Blog Image (PNG/JPG/WebP)</label>
                <input
                  type="file"
                  name="file"
                  accept="image/png,image/jpeg,image/webp"
                  className={inputClass}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setImagePreview(URL.createObjectURL(f));
                  }}
                />
                {imagePreview && (
                  <div className="mt-3 relative inline-block">
                    <img src={imagePreview} alt="Preview" className="w-32 h-24 rounded-xl object-cover border border-gold/20 shadow-sm" />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className={labelClass}>Content *</label>
              <div className="border border-navy/10 rounded-xl overflow-hidden focus-within:border-gold transition-all">
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-[#f8f6f2] border-b border-navy/10">
                  <button type="button" onClick={() => execCommand("bold")} className={toolbarBtnClass} title="Bold">
                    <strong>B</strong>
                  </button>
                  <button type="button" onClick={() => execCommand("italic")} className={toolbarBtnClass} title="Italic">
                    <em>I</em>
                  </button>
                  <button type="button" onClick={() => execCommand("underline")} className={toolbarBtnClass} title="Underline">
                    <u>U</u>
                  </button>
                  <div className="w-px h-5 bg-navy/10 mx-1" />
                  <button type="button" onClick={() => execCommand("formatBlock", "h2")} className={toolbarBtnClass} title="Heading">
                    H2
                  </button>
                  <button type="button" onClick={() => execCommand("formatBlock", "h3")} className={toolbarBtnClass} title="Subheading">
                    H3
                  </button>
                  <button type="button" onClick={() => execCommand("formatBlock", "p")} className={toolbarBtnClass} title="Paragraph">
                    ¶
                  </button>
                  <div className="w-px h-5 bg-navy/10 mx-1" />
                  <button type="button" onClick={() => execCommand("insertUnorderedList")} className={toolbarBtnClass} title="Bullet List">
                    • List
                  </button>
                  <button type="button" onClick={() => execCommand("insertOrderedList")} className={toolbarBtnClass} title="Numbered List">
                    1. List
                  </button>
                  <div className="w-px h-5 bg-navy/10 mx-1" />
                  <button type="button" onClick={() => {
                    const url = prompt("Enter link URL:");
                    if (url) execCommand("createLink", url);
                  }} className={toolbarBtnClass} title="Insert Link">
                    🔗 Link
                  </button>
                  <button type="button" onClick={() => execCommand("removeFormat")} className={toolbarBtnClass + " text-red-400"} title="Clear Formatting">
                    ✕ Clear
                  </button>
                </div>
                {/* Editor Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[300px] px-5 py-4 text-sm leading-relaxed outline-none prose prose-sm max-w-none"
                  onInput={() => setContentHtml(editorRef.current?.innerHTML || "")}
                  style={{ minHeight: "300px" }}
                  suppressContentEditableWarning
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] text-text-mid">
                <span>Use the toolbar to format your content</span>
                <span>{(editorRef.current?.innerText || "").trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-navy/5">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 rounded-xl border border-navy/10 text-navy font-bold uppercase tracking-[1px] text-xs hover:bg-navy/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-navy text-white font-bold uppercase tracking-[1px] text-xs hover:bg-navy/90 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {saving ? "Saving..." : selectedBlog ? "Update Blog" : blogStatus === "draft" ? "Save Draft" : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List */}
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
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Author</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Date</th>
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
                  <td className="px-6 py-4">
                    <p className="font-bold text-navy">{b.title}</p>
                    <p className="text-[10px] text-text-mid mt-0.5 truncate max-w-[200px]">{b.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    {b.category ? (
                      <span className="text-xs font-semibold px-2 py-1 bg-gold/10 text-gold rounded-full">{b.category}</span>
                    ) : (
                      <span className="text-xs text-text-mid/50">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-mid">{b.author}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold tracking-[1px] uppercase rounded-full ${
                      b.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {b.status}
                    </span>
                  </td>
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
