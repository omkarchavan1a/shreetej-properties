import { redirect } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { blogs } from "@/db/schema";
import { press } from "@/db/schema";
import { leads } from "@/db/schema";
import { count } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0; // Always fresh data for admin

export default async function AdminDashboard() {
  // Fetch counts
  const [projectCount] = await db.select({ value: count() }).from(projects);
  const [blogCount] = await db.select({ value: count() }).from(blogs);
  const [pressCount] = await db.select({ value: count() }).from(press);
  const [leadCount] = await db.select({ value: count() }).from(leads);

  const stats = [
    { label: "Projects", count: projectCount.value, icon: "🏠", href: "/admin/projects", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Blog Posts", count: blogCount.value, icon: "✍️", href: "/admin/blogs", color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Press Items", count: pressCount.value, icon: "📰", href: "/admin/press", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { label: "Leads", count: leadCount.value, icon: "📩", href: "/admin/load-balancer", color: "bg-amber-50 text-amber-700 border-amber-200" },
  ];

  const quickActions = [
    { label: "Add New Project", href: "/admin/projects", icon: "➕ 🏠" },
    { label: "Write Blog Post", href: "/admin/blogs", icon: "➕ ✍️" },
    { label: "Add Press Item", href: "/admin/press", icon: "➕ 📰" },
    { label: "View Leads", href: "/admin/load-balancer", icon: "👁️" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-navy mb-2">Dashboard</h1>
        <p className="text-text-mid text-sm">Welcome back! Here&apos;s an overview of your website content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group p-6 rounded-2xl border ${stat.color} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold mb-1">{stat.count}</div>
            <div className="text-xs font-bold uppercase tracking-[1.5px] opacity-70">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl shadow-xl border border-navy/5 p-8">
        <h2 className="font-serif text-xl font-bold text-navy mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#f8f6f2] border border-gold/10 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 font-bold text-sm text-navy tracking-wide group"
            >
              <span className="text-lg">{action.icon}</span>
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
