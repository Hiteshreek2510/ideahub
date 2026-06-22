"use client";

import PublicNavbar from "@/components/PublicNavbar";
import { Sparkles, Users, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Sparkles,
      title: "1. The Spark",
      description: "Every great venture starts with an idea. Whether you want to launch a new indie tech product, open a boutique cafe, or create a new skincare line, post your concept here. Outline your vision, describe the domain, and specify the kind of partners you're looking for.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      icon: Users,
      title: "2. Assemble the Team",
      description: "Creators, engineers, and experts browse the platform looking for projects that inspire them. When someone wants to help build your idea, they'll send a collaboration request. Review profiles, accept requests, and form your dream team.",
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20"
    },
    {
      icon: Rocket,
      title: "3. Build Reality",
      description: "Once your team is assembled, transition into a dedicated workspace. Use our community features to chat, brainstorm, and assign tasks. From the first line of code or the first prototype all the way to launch day, build the future together.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070710] text-[#e2e8f0] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">IdeaHub</span> works
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We've simplified the journey from concept to reality. Follow these three steps to turn your vision into a living, breathing product.
          </p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {steps.map((step, idx) => (
            <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              {/* Icon / Marker */}
              <div className={`flex items-center justify-center w-16 h-16 rounded-full border-4 border-[#070710] ${step.bg} ${step.color} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl shadow-black/50 z-10`}>
                <step.icon className="w-6 h-6" />
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] bg-[#121221] p-8 rounded-3xl border border-white/5 shadow-2xl shadow-black/40 hover:-translate-y-1 transition-transform">
                <h3 className={`text-2xl font-bold mb-3 ${step.color}`}>{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
