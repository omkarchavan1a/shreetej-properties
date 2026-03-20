"use client";

import { useState, useEffect } from "react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
  assignedAgentId: number | null;
}

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        // Sort by newest first
        const sortedData = data.sort((a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLeads(sortedData);
      }
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-navy/5">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-navy mb-2">Contact Messages</h1>
          <p className="text-text-mid">View and manage inquiries from the website contact form.</p>
        </div>
        <button 
          onClick={fetchLeads}
          className="bg-navy/5 hover:bg-navy/10 text-navy px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : leads.length === 0 ? (
        <div className="py-20 text-center text-text-mid bg-[#f8f6f2] rounded-xl border border-dashed border-navy/20">
          No messages received yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#f8f6f2] text-text-dark">
                <th className="p-4 font-bold border-b border-navy/5 rounded-tl-xl text-[11px] uppercase tracking-[1.5px]">Date</th>
                <th className="p-4 font-bold border-b border-navy/5 text-[11px] uppercase tracking-[1.5px]">Name</th>
                <th className="p-4 font-bold border-b border-navy/5 text-[11px] uppercase tracking-[1.5px]">Contact Info</th>
                <th className="p-4 font-bold border-b border-navy/5 text-[11px] uppercase tracking-[1.5px]">Message</th>
                <th className="p-4 font-bold border-b border-navy/5 rounded-tr-xl text-[11px] uppercase tracking-[1.5px] text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-navy/5 transition-colors group">
                  <td className="p-4 text-text-mid text-sm whitespace-nowrap align-top">
                    <span className="font-semibold text-text-dark block">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    <span className="text-xs">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </td>
                  <td className="p-4 font-semibold text-navy align-top">{lead.name}</td>
                  <td className="p-4 text-sm text-text-mid align-top">
                    <div className="mb-1"><a href={`mailto:${lead.email}`} className="text-navy hover:text-gold transition-colors">{lead.email}</a></div>
                    <div><a href={`tel:${lead.phone}`} className="text-navy hover:text-gold transition-colors">{lead.phone}</a></div>
                  </td>
                  <td className="p-4 align-top max-w-[400px]">
                    <div className="bg-[#f8f6f2] p-3 rounded-lg border border-navy/5 text-sm text-text-dark whitespace-pre-wrap leading-relaxed shadow-sm">
                      {lead.message}
                    </div>
                  </td>
                  <td className="p-4 text-center align-top whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold leading-none tracking-wide uppercase shadow-sm ${
                        lead.status.toLowerCase() === 'new' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
