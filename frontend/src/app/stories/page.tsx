"use client";

import PublicNavbar from "@/components/PublicNavbar";
import { ArrowRight, Quote } from "lucide-react";

export default function Stories() {
  const stories = [
    {
      title: "How an F&B enthusiast met a chef on IdeaHub and launched a pop-up in 30 days",
      domain: "Food & Beverage",
      author: "Marcus Chen",
      date: "Oct 12, 2023",
      excerpt: "I had a recipe for a unique fusion pasta, but no idea how to scale it or run a kitchen. Through IdeaHub, I found Elena, a sous chef looking for a side project. A month later, we sold out our first weekend pop-up.",
      image: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      title: "From a simple sketch to a top-100 beauty app on the App Store",
      domain: "Tech & Beauty",
      author: "Sarah Jenkins",
      date: "Sep 28, 2023",
      excerpt: "I knew what the beauty industry was missing, but I couldn't write a line of code. I posted my wireframes on IdeaHub and connected with David, a mobile dev. We just hit 50,000 active users.",
      image: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
      title: "Building 'Zenith', the mental health platform for teenagers",
      domain: "Health & Wellness",
      author: "Dr. Alistair Vance",
      date: "Aug 05, 2023",
      excerpt: "As a psychologist, I had the clinical framework but lacked the technical means to digitize it. IdeaHub helped me find a team of three engineers who shared my passion for youth mental health.",
      image: "bg-gradient-to-br from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070710] text-[#e2e8f0] relative overflow-hidden flex flex-col">
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-6 py-20 flex-1 w-full relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Stories</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Read how visionaries and creators are coming together on IdeaHub to turn their concepts into reality across every industry.
          </p>
        </div>

        <div className="space-y-12">
          {stories.map((story, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 items-center bg-[#121221] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl shadow-black/40 group hover:border-white/10 transition-colors cursor-pointer">
              
              <div className={`w-full md:w-64 h-48 md:h-full rounded-2xl ${story.image} shrink-0 relative overflow-hidden flex items-center justify-center`}>
                <Quote className="w-12 h-12 text-white/20 absolute top-4 left-4" />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3 text-xs font-semibold tracking-wider uppercase">
                  <span className="text-rose-400">{story.domain}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="text-slate-500">{story.date}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-rose-400 transition-colors">
                  {story.title}
                </h2>
                
                <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  "{story.excerpt}"
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white">
                      {story.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-300">{story.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
                    Read story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
