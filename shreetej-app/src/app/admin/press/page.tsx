"use client";

import { useEffect, useState } from "react";

type Press = {
  id: number;
  title: string;
  source: string;
  link: string;
  publishedDate: string;
};

export default function PressCMS() {
  const [pressItems, setPressItems] = useState<Press[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from server action
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Press Updates</h1>
          <p className="text-text-mid text-sm">Manage news coverages and press releases.</p>
        </div>
        <button className="bg-gold text-navy font-bold tracking-[1px] uppercase px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all shadow-md">
          + Add Press Item
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-navy/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-mid animate-pulse">Loading press updates...</div>
        ) : pressItems.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="font-serif text-xl font-bold text-navy mb-2">No Press Items Found</h3>
            <p className="text-text-mid text-sm">Add news articles to build credibility.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f6f2] text-xs uppercase tracking-[2px] text-navy font-bold border-b border-navy/10">
                <th className="px-6 py-5">Title</th>
                <th className="px-6 py-5">Source</th>
                <th className="px-6 py-5">Link</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pressItems.map((p) => (
                <tr key={p.id} className="border-b border-navy/5 hover:bg-[#f8f6f2]/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-navy">{p.title}</td>
                  <td className="px-6 py-4 text-sm text-text-mid">{p.source}</td>
                  <td className="px-6 py-4 text-sm text-blue-500 hover:underline">
                    <a href={p.link} target="_blank" rel="noopener noreferrer">View Article</a>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-mid">{new Date(p.publishedDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-xs font-bold text-navy hover:text-gold uppercase tracking-[1px] transition-colors">Edit</button>
                    <button className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-[1px] transition-colors">Delete</button>
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
