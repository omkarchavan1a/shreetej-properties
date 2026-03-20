"use client";

import { useEffect, useState, useRef } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/app/actions/projects";
import { uploadImage } from "@/app/actions/upload";

type Project = {
  id: number;
  title: string;
  type: string;
  status: string;
  location: string;
  imageUrl: string;
  description: string | null;
  videoUrl: string | null;
  amenities: string | null;
  galleryUrls: string | null;
  mapUrl: string | null;
  brochureUrl: string | null;
  createdAt: Date | string;
};

export default function ProjectsCMS() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data as Project[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
    // Use setTimeout to ensure the form is rendered before setting values
    setTimeout(() => {
      if (formRef.current) {
        const data = project as any;
        Object.keys(data).forEach(key => {
          const input = formRef.current?.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          if (input) input.value = data[key] || "";
        });
      }
    }, 10);
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

      // Remove the file object from data before DB insert
      delete data.file;

      // Convert empty strings to null for optional db fields
      Object.keys(data).forEach(key => {
        if (data[key] === "") data[key] = null;
      });

      let result;
      if (selectedProject) {
        result = await updateProject(selectedProject.id, data);
      } else {
        result = await createProject(data);
      }

      if (result.success) {
        fetchProjects();
        formRef.current.reset();
        setShowForm(false);
        setSelectedProject(null);
      } else {
        alert(result.error || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const result = await deleteProject(id);
      if (result.success) {
        fetchProjects();
      } else {
        alert(result.error || "Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Projects</h1>
          <p className="text-text-mid text-sm">Manage your properties and land developments.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gold text-navy font-bold tracking-[1px] uppercase px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all shadow-md"
        >
          {showForm ? "Close Form" : "+ Add Project"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-navy/5 mb-10 animate-fade-in-up">
          <h2 className="font-serif text-xl font-bold text-navy mb-6">
            {selectedProject ? `Edit: ${selectedProject.title}` : "Create New Project"}
          </h2>
          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Title *</label>
                <input name="title" required className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Type *</label>
                <select name="type" required className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10 appearance-none">
                  <option value="">Select Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="plots">Plots / Land</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Status *</label>
                <select name="status" required className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10 appearance-none">
                  <option value="">Select Status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Location *</label>
                <input name="location" required className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Cover Image URL *</label>
                <input name="imageUrl" required className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">HD Video URL</label>
                <input name="videoUrl" placeholder="Optional .mp4 URL" className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Map Embed URL</label>
                <input name="mapUrl" placeholder="Google Maps Embed Src" className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Brochure URL</label>
                <input name="brochureUrl" placeholder="PDF Web Link" className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Amenities</label>
                <input name="amenities" placeholder="Comma separated (e.g. Pool, Gym, Club)" className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>
              
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Gallery URLs</label>
                <input name="galleryUrls" placeholder="Comma separated image URLs" className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10" />
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2">Description</label>
                <textarea name="description" rows={3} className="w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10 resize-none" />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-6 py-3 font-bold text-[12px] tracking-[1.5px] uppercase text-text-mid hover:text-navy transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-navy text-gold-light font-bold text-[12px] tracking-[1.5px] uppercase px-8 py-3 rounded-xl hover:bg-gold hover:text-navy transition-all hover:shadow-lg"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-navy/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-mid animate-pulse">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="font-serif text-xl font-bold text-navy mb-2">No Projects Found</h3>
            <p className="text-text-mid text-sm">You haven&apos;t added any properties yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f6f2] text-xs uppercase tracking-[2px] text-navy font-bold border-b border-navy/10">
                  <th className="px-6 py-5 min-w-[100px]">Image</th>
                  <th className="px-6 py-5 min-w-[200px]">Title</th>
                  <th className="px-6 py-5 min-w-[150px]">Type</th>
                  <th className="px-6 py-5 min-w-[120px]">Status</th>
                  <th className="px-6 py-5 min-w-[200px]">Location</th>
                  <th className="px-6 py-5 text-right min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-navy/5 hover:bg-[#f8f6f2]/50 transition-colors">
                    <td className="px-6 py-4">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="w-16 h-12 rounded-lg object-cover shadow-sm" />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-navy/5 flex items-center justify-center text-navy/20 text-xs">No img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-navy">{p.title}</td>
                    <td className="px-6 py-4 text-sm text-text-mid capitalize">{p.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-[10px] font-bold tracking-[1px] uppercase rounded-full ${
                        p.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        p.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-mid truncate max-w-[200px]">{p.location}</td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button onClick={() => handleEdit(p)} className="text-xs font-bold text-navy hover:text-gold uppercase tracking-[1px] transition-colors">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-[1px] transition-colors">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
