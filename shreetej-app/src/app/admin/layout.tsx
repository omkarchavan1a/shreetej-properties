"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/admin/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col p-6 shadow-2xl">
        <div className="mb-12">
          <Link href="/">
            <h2 className="font-serif text-2xl font-bold text-gold cursor-pointer">
              Shreetej<span className="text-white block text-sm tracking-[3px] uppercase mt-1">Properties</span>
            </h2>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          <Link 
            href="/admin/projects"
            className="block px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 font-semibold tracking-wide"
          >
            Manage Projects
          </Link>
          <Link 
            href="/admin/blogs"
            className="block px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 font-semibold tracking-wide"
          >
            Manage Blogs
          </Link>
          <Link 
            href="/admin/press"
            className="block px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 font-semibold tracking-wide"
          >
            Press Updates
          </Link>
          <Link 
            href="/admin/load-balancer"
            className="block px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 font-semibold tracking-wide text-gold/80"
          >
            Lead Balancer
          </Link>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-navy font-bold">
              {session.user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="text-sm font-bold">{session.user?.name || "Admin"}</p>
              <p className="text-[10px] text-white/50 truncate w-32">{session.user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-red-400 font-bold tracking-wide uppercase hover:bg-red-400/10 rounded-xl transition-all"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
