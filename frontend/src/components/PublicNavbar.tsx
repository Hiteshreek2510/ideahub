"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicNavbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-50 w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden">
          <img src="/logo.png" alt="IdeaHub Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight group-hover:text-purple-100 transition-colors">IdeaHub</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <Link href="/how-it-works" className={`hover:text-white transition-colors ${pathname === '/how-it-works' ? 'text-white' : ''}`}>How it works</Link>
        <Link href="/domains" className={`hover:text-white transition-colors ${pathname === '/domains' ? 'text-white' : ''}`}>Domains</Link>
        <Link href="/projects" className={`hover:text-white transition-colors ${pathname === '/projects' ? 'text-white' : ''}`}>Projects</Link>
        <Link href="/stories" className={`hover:text-white transition-colors ${pathname === '/stories' ? 'text-white' : ''}`}>Stories</Link>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        <Link href="/login" className="text-slate-300 hover:text-white transition-colors">Sign in</Link>
        <Link href="/register" className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]">
          Get started
        </Link>
      </div>
    </nav>
  );
}
