"use client";

import { useEffect, useState, useRef } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/app/actions/projects";
import { uploadImage, uploadVideo } from "@/app/actions/upload";
import { useUploadThing } from "@/lib/uploadthing";

type Project = {
  id: number;
  title: string;
  type: string;
  status: string;
  location: string;
  imageUrl: string | null;
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
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryFilePreviews, setGalleryFilePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoName, setVideoName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload: startGalleryUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadProgress: (p: number) => {
      setUploadProgress(p);
    },
    onUploadError: (e: Error) => {
      setIsUploading(false);
      alert(`Upload failed: ${e.message}`);
    },
  });

  const { startUpload: startCoverUpload } = useUploadThing("coverImage", {
    onClientUploadComplete: () => {
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadProgress: (p: number) => {
      setUploadProgress(p);
    },
    onUploadError: (e: Error) => {
      setIsUploading(false);
      alert(`Cover image upload failed: ${e.message}`);
    },
  });

  const { startUpload: startVideoUpload } = useUploadThing("projectVideo", {
    onClientUploadComplete: () => {
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadProgress: (p: number) => {
      setUploadProgress(p);
    },
    onUploadError: (e: Error) => {
      setIsUploading(false);
      alert(`Video upload failed: ${e.message}`);
    },
  });

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
    setImagePreview(project.imageUrl || null);
    setVideoName(project.videoUrl ? project.videoUrl.split("/").pop() || null : null);
    if (project.galleryUrls) {
      try {
        const urls = JSON.parse(project.galleryUrls);
        setGalleryPreviews(Array.isArray(urls) ? urls : project.galleryUrls.split(",").map((u: string) => u.trim()));
      } catch {
        setGalleryPreviews(project.galleryUrls.split(",").map((u: string) => u.trim()).filter(Boolean));
      }
    } else {
      setGalleryPreviews([]);
    }
    setGalleryFiles([]);
    setGalleryFilePreviews([]);
    setTimeout(() => {
      if (formRef.current) {
        const data = project as any;
        ["title", "type", "status", "location", "mapUrl", "brochureUrl", "amenities", "description"].forEach(key => {
          const input = formRef.current?.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          if (input) input.value = data[key] || "";
        });
      }
    }, 10);
  };

  const openNewForm = () => {
    setSelectedProject(null);
    setImagePreview(null);
    setGalleryPreviews([]);
    setGalleryFiles([]);
    setGalleryFilePreviews([]);
    setVideoName(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: any = Object.fromEntries(formData);

    try {
      setSaving(true);

      // Handle Cover Image Upload (via UploadThing)
      const imgInput = formRef.current.querySelector('input[name="coverFile"]') as HTMLInputElement;
      if (imgInput?.files?.length) {
        setIsUploading(true);
        const uploadResult = await startCoverUpload(Array.from(imgInput.files));
        if (uploadResult && uploadResult[0]) {
          data.imageUrl = uploadResult[0].url;
        } else {
          setSaving(false);
          return;
        }
      } else if (selectedProject) {
        data.imageUrl = selectedProject.imageUrl;
      }

      // Handle Video Upload (via UploadThing)
      const vidInput = formRef.current.querySelector('input[name="videoFile"]') as HTMLInputElement;
      if (vidInput?.files?.length) {
        setIsUploading(true);
        const uploadResult = await startVideoUpload(Array.from(vidInput.files));
        if (uploadResult && uploadResult[0]) {
          data.videoUrl = uploadResult[0].url;
        } else {
          setSaving(false);
          return;
        }
      } else if (selectedProject) {
        data.videoUrl = selectedProject.videoUrl;
      }

      // Handle Gallery Upload (via UploadThing)
      let finalGalleryUrls = [...galleryPreviews];
      if (galleryFiles.length > 0) {
        setIsUploading(true);
        const uploadResult = await startGalleryUpload(galleryFiles);
        if (uploadResult && uploadResult.length > 0) {
          const newUrls = uploadResult.map((res: any) => res.url);
          finalGalleryUrls = [...finalGalleryUrls, ...newUrls];
        } else {
          setSaving(false);
          return;
        }
      }
      data.galleryUrls = JSON.stringify(finalGalleryUrls);

      // Clean up form-only fields
      delete data.coverFile;
      delete data.videoFile;
      delete data.galleryFiles;

      // Convert empty strings to null
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
        setImagePreview(null);
        setGalleryPreviews([]);
        setGalleryFiles([]);
        setGalleryFilePreviews([]);
        setVideoName(null);
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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const result = await deleteProject(id);
      if (result.success) fetchProjects();
      else alert(result.error || "Failed to delete project");
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewGalleryImage = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryFilePreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      return newPreviews.filter((_, i) => i !== index);
    });
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setGalleryFiles(prev => [...prev, ...files]);
    const newPreviews = files.map(f => URL.createObjectURL(f));
    setGalleryFilePreviews(prev => [...prev, ...newPreviews]);
    
    // Reset input so the same files can be selected again if needed
    e.target.value = "";
  };

  const inputClass = "w-full px-4 py-3 bg-[#f8f6f2] border border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all";
  const labelClass = "block text-[11px] font-bold tracking-[1.5px] uppercase text-text-mid mb-2";

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Projects</h1>
          <p className="text-text-mid text-sm">Manage your properties and land developments.</p>
          <p className="text-gold text-xs font-bold mt-2">
            💡 Tip: Projects with status &quot;Upcoming&quot; appear in the Front Page &quot;New Launching Projects&quot; section. &quot;Ongoing&quot; projects appear in &quot;Ongoing Developments&quot;.
          </p>
        </div>
        <button
          onClick={() => showForm ? setShowForm(false) : openNewForm()}
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
          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[2px] text-gold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-[10px]">1</span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className={labelClass}>Title *</label>
                  <input name="title" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Type *</label>
                  <select name="type" required className={inputClass + " appearance-none"}>
                    <option value="">Select Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="plots">Plots / Land</option>
                    <option value="layout">Layout</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Status *</label>
                  <select name="status" required className={inputClass + " appearance-none"}>
                    <option value="">Select Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Location *</label>
                  <input name="location" required className={inputClass} />
                </div>
              </div>
            </div>

            {/* Media Uploads */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[2px] text-gold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-[10px]">2</span>
                Media Uploads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cover Image */}
                <div>
                  <label className={labelClass}>Cover Image (PNG/JPG/WebP)</label>
                  <input
                    type="file"
                    name="coverFile"
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

                {/* Video */}
                <div>
                  <label className={labelClass}>HD Video (MP4, max 100MB)</label>
                  <input
                    type="file"
                    name="videoFile"
                    accept="video/mp4"
                    className={inputClass}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setVideoName(f.name);
                    }}
                  />
                  {videoName && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-navy bg-navy/5 px-3 py-2 rounded-lg">
                      <span>🎬</span>
                      <span className="truncate">{videoName}</span>
                      <button type="button" onClick={() => setVideoName(null)} className="text-red-500 ml-auto text-xs font-bold">Remove</button>
                    </div>
                  )}
                </div>

                {/* Gallery */}
                <div className="md:col-span-2">
                  <label className={labelClass}>Gallery Images (Multiple, PNG/JPG/WebP)</label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className={inputClass}
                    onChange={handleGalleryChange}
                  />
                  {(galleryPreviews.length > 0 || galleryFilePreviews.length > 0) && (
                    <div className="flex flex-wrap gap-3 mt-4 p-4 bg-navy/5 rounded-2xl border border-navy/5">
                      {/* Existing Images */}
                      {galleryPreviews.map((url, idx) => (
                        <div key={`old-${idx}`} className="relative group">
                          <img src={url} alt={`Gallery ${idx + 1}`} className="w-20 h-16 rounded-lg object-cover border border-gold/20 shadow-sm" />
                          <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="w-6 h-6 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center hover:bg-red-600 shadow-lg"
                            >
                              ✕
                            </button>
                          </div>
                          <span className="absolute bottom-0 left-0 right-0 bg-gold/80 text-navy text-[8px] font-bold text-center py-0.5 rounded-b-lg">Saved</span>
                        </div>
                      ))}
                      {/* Newly Selected Images */}
                      {galleryFilePreviews.map((url, idx) => (
                        <div key={`new-${idx}`} className="relative group">
                          <img src={url} alt={`New Gallery ${idx + 1}`} className="w-20 h-16 rounded-lg object-cover border border-gold/50 shadow-sm" />
                          <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeNewGalleryImage(idx)}
                              className="w-6 h-6 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center hover:bg-red-600 shadow-lg"
                            >
                              ✕
                            </button>
                          </div>
                          <span className="absolute bottom-0 left-0 right-0 bg-green-500/80 text-white text-[8px] font-bold text-center py-0.5 rounded-b-lg">New</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[2px] text-gold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-[10px]">3</span>
                Additional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Map Embed URL</label>
                  <input 
                    name="mapUrl" 
                    placeholder="Paste Google Maps Embed URL or iframe" 
                    className={inputClass} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.includes('<iframe')) {
                        const match = val.match(/src="([^"]+)"/);
                        if (match && match[1]) {
                          e.target.value = match[1];
                        }
                      }
                    }}
                  />
                  <p className="text-[10px] text-text-mid mt-1 italic">
                    Go to Google Maps → Share → Embed a map → Copy the <b>src</b> link or the whole <b>iframe</b> tag.
                  </p>
                </div>
                <div>
                  <label className={labelClass}>Brochure URL</label>
                  <input name="brochureUrl" placeholder="PDF Web Link" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Amenities</label>
                  <input name="amenities" placeholder="Comma separated (e.g. Pool, Gym, Club)" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea name="description" rows={4} className={inputClass + " resize-none"} placeholder="Describe the project..." />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-navy/5">
              <button
                type="button"
                onClick={() => { setShowForm(false); setSelectedProject(null); }}
                className="px-6 py-3 font-bold text-[12px] tracking-[1.5px] uppercase text-text-mid hover:text-navy transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || isUploading}
                className="bg-navy text-gold-light font-bold text-[12px] tracking-[1.5px] uppercase px-8 py-3 rounded-xl hover:bg-gold hover:text-navy transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {(saving || isUploading) && <span className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />}
                {isUploading ? `Uploading ${uploadProgress}%...` : saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
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
                  <th className="px-6 py-5 min-w-[80px]">Media</th>
                  <th className="px-6 py-5 text-right min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  let galleryCount = 0;
                  if (p.galleryUrls) {
                    try { galleryCount = JSON.parse(p.galleryUrls).length; } catch { galleryCount = p.galleryUrls.split(",").length; }
                  }
                  return (
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-navy/50">
                          {p.videoUrl && <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">🎬 Video</span>}
                          {galleryCount > 0 && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">📸 {galleryCount}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-4">
                        <button onClick={() => handleEdit(p)} className="text-xs font-bold text-navy hover:text-gold uppercase tracking-[1px] transition-colors">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-[1px] transition-colors">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
