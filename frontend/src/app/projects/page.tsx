"use client";

import PublicNavbar from "@/components/PublicNavbar";
import { Heart, MessageCircle } from "lucide-react";

export default function Projects() {
  const dummyProjects = [
    {
      id: 1,
      title: "Neon Nights Cafe",
      domain: "Food & Beverage",
      description: "Looking for interior designers and a pastry chef to help launch a cyberpunk-themed late-night cafe in downtown. We have the space secured, just need the creative team to bring it to life.",
      tags: ["Cafe", "Design", "Baking"],
      votes: 124,
      comments: 18,
      initials: "NN",
      bg: "from-pink-600 to-purple-600"
    },
    {
      id: 2,
      title: "Glow & Go App",
      domain: "Beauty & Personal Care",
      description: "An app that connects freelance makeup artists with clients for on-demand beauty services. Need a full-stack developer and a UI/UX designer.",
      tags: ["Mobile App", "React Native", "Beauty"],
      votes: 89,
      comments: 12,
      initials: "GG",
      bg: "from-amber-500 to-pink-500"
    },
    {
      id: 3,
      title: "Zenith Retreats",
      domain: "Health & Wellness",
      description: "Organizing weekend wellness retreats focused on digital detox and mindfulness. Seeking yoga instructors and event coordinators to join the founding team.",
      tags: ["Events", "Yoga", "Wellness"],
      votes: 210,
      comments: 34,
      initials: "ZR",
      bg: "from-emerald-500 to-teal-500"
    },
    {
      id: 4,
      title: "Local Stage Network",
      domain: "Entertainment",
      description: "A platform for indie musicians to easily book small local venues. Currently building the MVP, need a backend engineer familiar with Node.js and Stripe.",
      tags: ["Music", "Marketplace", "Node.js"],
      votes: 156,
      comments: 22,
      initials: "LS",
      bg: "from-blue-600 to-indigo-600"
    },
    {
      id: 5,
      title: "Aura Skincare Line",
      domain: "Beauty & Personal Care",
      description: "Developing a vegan, cruelty-free skincare line for sensitive skin. Looking for a cosmetic chemist and a brand marketer.",
      tags: ["Skincare", "Chemistry", "Marketing"],
      votes: 342,
      comments: 45,
      initials: "AS",
      bg: "from-rose-400 to-orange-400"
    },
    {
      id: 6,
      title: "TechTutors Platform",
      domain: "Tech",
      description: "A peer-to-peer mentoring platform for junior developers. The frontend is built in Next.js, looking for a DevOps engineer to handle deployment and CI/CD.",
      tags: ["Education", "DevOps", "Next.js"],
      votes: 98,
      comments: 8,
      initials: "TT",
      bg: "from-slate-700 to-slate-900"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070710] text-[#e2e8f0] relative overflow-hidden flex flex-col">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Featured Projects</h1>
          <p className="text-slate-400">Discover what visionaries are building right now on IdeaHub.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProjects.map((project) => (
            <div key={project.id} className="bg-[#121221] border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/40 flex flex-col group hover:border-purple-500/30 transition-colors">
              <div className="h-40 relative overflow-hidden shrink-0 flex items-center justify-center border-b border-white/5">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} opacity-20`} />
                <span className="text-5xl font-black text-white/20 uppercase tracking-widest">{project.initials}</span>
                
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-xs font-medium text-white">{project.votes}</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-medium text-white">{project.comments}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-2">
                  {project.domain}
                </div>
                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">Want to see more projects and connect with their creators?</p>
          <a href="/register" className="inline-block bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-slate-200 transition-colors">
            Join IdeaHub for free
          </a>
        </div>
      </main>
    </div>
  );
}
