"use client";

import PublicNavbar from "@/components/PublicNavbar";
import { Laptop, Sparkles, Coffee, HeartPulse, Palette, Popcorn, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Domains() {
  const domains = [
    {
      name: "Tech",
      icon: Laptop,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      desc: "Software, hardware, AI, Web3, and everything digital."
    },
    {
      name: "Beauty & Personal Care",
      icon: Sparkles,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      desc: "Skincare, cosmetics, wellness products, and grooming."
    },
    {
      name: "Food & Beverage",
      icon: Coffee,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      desc: "Restaurants, popup cafes, packaged goods, and recipes."
    },
    {
      name: "Health & Wellness",
      icon: HeartPulse,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      desc: "Fitness apps, mental health, yoga, and nutrition."
    },
    {
      name: "Services & Experiences",
      icon: Palette,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      desc: "Event planning, design agencies, and local services."
    },
    {
      name: "Entertainment",
      icon: Popcorn,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
      desc: "Films, games, music, content creation, and media."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070710] text-[#e2e8f0] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <PublicNavbar />

      <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Domains</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            IdeaHub is not just for software. Explore projects across a diverse range of industries and find the perfect team to join.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, idx) => (
            <Link href="/projects" key={idx} className="group bg-[#121221] border border-white/5 rounded-3xl p-8 hover:-translate-y-1 hover:border-white/10 transition-all shadow-xl shadow-black/40 flex flex-col items-start">
              <div className={`w-14 h-14 rounded-2xl ${domain.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <domain.icon className={`w-7 h-7 ${domain.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{domain.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">
                {domain.desc}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors mt-auto">
                Explore projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
