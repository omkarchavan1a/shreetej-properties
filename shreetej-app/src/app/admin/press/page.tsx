"use client";

import { useEffect, useState, useRef } from "react";
import { getPressItems, deletePressItem, createPressItem, updatePressItem } from "@/app/actions/press";
import { uploadImage } from "@/app/actions/upload";

type Press = {
  id: number;
  title: string;
  source: string;
  link: string;
  imageUrl: string | null;
  excerpt: string | null;
  publishedDate: Date | string;
};

export default function PressCMS() {
  const [pressList, setPressList] = useState<Press[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPress, setSelectedPress] = useState<Press | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchPress = async () => {
    setLoading(true);
    const data = await getPressItems();
    setPressList(data as Press[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPress();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Delete this press item?")) {
      await deletePressItem(id);
      fetchPress();
    }
  };

  const handleEdit = (press: Press) => {
    setSelectedPress(press);
    setShowForm(true);
    setImagePreview(press.imageUrl || null);
    setTimeout(() => {
      if (formRef.current) {
        (formRef.current.elements.namedItem("title") as HTMLInputElement).value = press.title;
        (formRef.current.elements.namedItem("source") as HTMLInputElement).value = press.source;
        (formRef.current.elements.namedItem("link") as HTMLInputElement).value = press.link;
        (formRef.current.elements.namedItem("excerpt") as HTMLTextAreaElement).value = press.excerpt || "";
        const date = new Date(press.publishedDate);
        (formRef.current.elements.namedItem("publishedDate") as HTMLInputElement).value = date.toISOString().split("T")[0];
      }
    }, 0);
  };

  const openNewForm = () => {
    setSelectedPress(null);
    setImagePreview(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setSaving(true);

      // Handle Image Upload
      const fileInput = formRef.current?.querySelector('input[name="file"]') as HTMLInputElement;
      let imageUrl: string | null = selectedPress?.imageUrl || null;
      if (fileInput?.files?.length) {
        const uploadData = new FormData();
        uploadData.append("file", fileInput.files[0]);
        const uploadResult = await uploadImage(uploadData);
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url;
        } else if (!uploadResult.success) {
          alert(uploadResult.error || "Image upload failed");
          setSaving(false);
          return;
        }
      }

      const data = {
        title: formData.get("title") as string,
        source: formData.get("source") as string,
        link: formData.get("link") as string,
        excerpt: (formData.get("excerpt") as string) || null,
        imageUrl,
        publishedDate: new Date(formData.get("publishedDate") as string),
      };

      let result;
      if (selectedPress) {
        result = await updatePressItem(selectedPress.id, data);
      } else {
        result = await createPressItem(data);
      }

      if (result.success) {
        setShowForm(false);
        setSelectedPress(null);
        setImagePreview(null);
        fetchPress();
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

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Press Updates</h1>
          <p className="text-text-mid text-sm">Manage news coverages and press releases.</p>
        </div>
        <button
          onClick={openNewForm}
          className="bg-gold text-navy font-bold tracking-[1px] uppercase px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all shadow-md"
        >
          + Add Press Item
        </button>
      </div>

      {showForm && (
        <div className="mb-10 bg-white p-8 rounded-3xl shadow-xl border border-navy/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-bold text-navy">
              {selectedPress ? "Edit Press Item" : "Add Press Item"}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-text-mid hover:text-navy transition-colors">✕ Close</button>
          </div>
          <form ref={formRef} onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelClass}>Article Title *</label>
              <input name="title" required className={inputClass} placeholder="Enter headline..." />
            </div>
            <div>
              <label className={labelClass}>Source / Media House *</label>
              <input name="source" required className={inputClass} placeholder="e.g. Times of India" />
            </div>
            <div>
              <label className={labelClass}>Published Date *</label>
              <input name="publishedDate" type="date" required className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Article Link *</label>
              <input name="link" required className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>Thumbnail Image (PNG/JPG/WebP)</label>
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
                  <img src={imagePreview} alt="Preview" className="w-24 h-18 rounded-xl object-cover border border-gold/20 shadow-sm" />
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
            <div>
              <label className={labelClass}>Excerpt / Summary</label>
              <textarea name="excerpt" rows={3} className={inputClass + " resize-none"} placeholder="Short summary of the article (optional)..." />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 mt-4 pt-4 border-t border-navy/5">
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
                {saving ? "Saving..." : selectedPress ? "Update Item" : "Save Press Item"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-navy/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-mid animate-pulse">Loading press updates...</div>
        ) : pressList.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="font-serif text-xl font-bold text-navy mb-2">No Press Items Found</h3>
            <p className="text-text-mid text-sm">Add news articles to build credibility.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f6f2] text-xs uppercase tracking-[2px] text-navy font-bold border-b border-navy/10">
                <th className="px-6 py-5">Image</th>
                <th className="px-6 py-5">Title</th>
                <th className="px-6 py-5">Source</th>
                <th className="px-6 py-5">Link</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pressList.map((p) => (
                <tr key={p.id} className="border-b border-navy/5 hover:bg-[#f8f6f2]/50 transition-colors">
                  <td className="px-6 py-4">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} className="w-16 h-12 rounded-lg object-cover shadow-sm" />
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-navy/5 flex items-center justify-center text-navy/20 text-[10px] uppercase font-bold">📰</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-navy">{p.title}</p>
                    {p.excerpt && <p className="text-[11px] text-text-mid mt-0.5 line-clamp-1">{p.excerpt}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-mid">{p.source}</td>
                  <td className="px-6 py-4 text-sm text-blue-500 hover:underline">
                    <a href={p.link} target="_blank" rel="noopener noreferrer">View Article</a>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-mid">{new Date(p.publishedDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => handleEdit(p)} className="text-xs font-bold text-navy hover:text-gold uppercase tracking-[1px] transition-colors">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-[1px] transition-colors">Delete</button>
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
