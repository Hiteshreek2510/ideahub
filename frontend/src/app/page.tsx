"use client";

import Link from "next/link";
import { Sparkles, Terminal, ArrowRight, Users } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";

export default function LandingPage() {
  const projects = [
    {
      title: "NeuroNav",
      domain: "Tech",
      domainColor: "text-purple-400",
      needed: 2,
      top: "15%",
      right: "20%"
    },
    {
      title: "Boutique Brews",
      domain: "Food & Beverage",
      domainColor: "text-pink-400",
      needed: 3,
      top: "35%",
      right: "5%"
    },
    {
      title: "Aura Skincare",
      domain: "Beauty",
      domainColor: "text-amber-400",
      needed: 1,
      top: "55%",
      right: "25%"
    },
    {
      title: "Zenith Yoga",
      domain: "Health & Wellness",
      domainColor: "text-blue-400",
      needed: 4,
      top: "75%",
      right: "10%"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070710] text-[#e2e8f0] overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <PublicNavbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 h-[calc(100vh-80px)] flex items-center relative">
        
        {/* Left Side: Hero Text */}
        <div className="w-full lg:w-1/2 relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-slate-300 mb-8">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            783 projects actively seeking contributors
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-white mb-6">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ideas</span> find<br />
            their <span className="text-teal-400">builders.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            IdeaHub connects visionaries with creators across every domain — from tech to beauty, food to entertainment. Turn a concept into reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-medium transition-all group shadow-lg shadow-purple-600/20">
              <Sparkles className="w-5 h-5" />
              I have an idea
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#121221] hover:bg-[#1a1a2e] text-white px-8 py-4 rounded-xl font-medium border border-white/10 transition-all">
              <Terminal className="w-5 h-5" />
              I want to build
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mt-12">
            {["Tech", "Beauty & Personal Care", "Food & Beverage", "Health & Wellness", "Services & Experiences", "Entertainment"].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-[#121221] border border-white/5 text-xs text-slate-400 font-mono tracking-tight hover:bg-white/5 transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Floating Project Cards */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="absolute bg-[#121221] border border-white/5 rounded-2xl p-4 shadow-2xl shadow-black/50 hover:-translate-y-1 transition-transform cursor-default backdrop-blur-sm"
              style={{ top: project.top, right: project.right, width: '280px' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-sm">{project.title}</h3>
                  <span className={`text-[10px] font-mono tracking-tight font-medium ${project.domainColor}`}>
                    {project.domain}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700" />
                <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 -ml-2" />
                <span className="text-xs text-slate-500 ml-2">{project.needed} needed</span>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
