"use client";

import { useEffect, useState } from "react";

type Agent = {
  id: number;
  name: string;
  email: string;
  active: string;
  leadCount: number;
};

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  assignedAgentId: number | null;
  status: string;
  createdAt: string;
};

export default function LoadBalancerDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [agentsRes, leadsRes] = await Promise.all([
        fetch("/api/agents"),
        fetch("/api/leads")
      ]);
      if (agentsRes.ok) setAgents(await agentsRes.json());
      if (leadsRes.ok) setLeads(await leadsRes.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalLeads = leads.length;
  const activeBalancer = agents.some(a => a.active === "true");

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Lead Load Balancer</h1>
          <p className="text-text-mid text-sm">Real-time distribution and agent workload management.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-navy/5">
          <div className={`w-3 h-3 rounded-full animate-pulse ${activeBalancer ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-[10px] font-bold uppercase tracking-[1px] text-navy">
            Balancer Status: {activeBalancer ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-navy/5">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-mid mb-2">Total Inquiries</p>
          <p className="text-4xl font-serif font-bold text-navy">{totalLeads}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-navy/5">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-text-mid mb-2">Active Agents</p>
          <p className="text-4xl font-serif font-bold text-navy">{agents.filter(a => a.active === "true").length}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gold/20">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-gold mb-2">Load Algorithm</p>
          <p className="text-2xl font-serif font-bold text-navy uppercase">Round Robin</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-navy/5 overflow-hidden">
        <div className="p-8 border-b border-navy/5 flex justify-between items-center">
          <h2 className="font-serif text-xl font-bold text-navy">Agent Workload</h2>
          <button onClick={fetchData} className="text-xs font-bold text-gold uppercase tracking-[1px]">Refresh Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8f6f2] text-[10px] uppercase tracking-[2px] text-navy font-bold">
                <th className="px-8 py-4">Agent Name</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Workload (Leads)</th>
                <th className="px-8 py-4">Distribution %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5 text-sm">
              {agents.map(agent => (
                <tr key={agent.id}>
                  <td className="px-8 py-5">
                    <p className="font-bold text-navy">{agent.name}</p>
                    <p className="text-xs text-text-mid">{agent.email}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-[1px] ${
                      agent.active === 'true' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {agent.active === 'true' ? 'Active' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-navy">{agent.leadCount}</td>
                  <td className="px-8 py-5">
                    <div className="w-full bg-navy/5 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-gold h-full transition-all duration-1000"
                        style={{ width: `${totalLeads > 0 ? (agent.leadCount / totalLeads) * 100 : 0}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
