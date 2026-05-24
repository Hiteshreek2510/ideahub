"use client";

import { useState, useEffect } from "react";
import { 
  Heart, 
  MessageCircle, 
  Users,
  Plus,
  Loader2
} from "lucide-react";
import { fetchAPI } from "@/lib/api";

export default function Feed() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const data = await fetchAPI('/ideas');
        setIdeas(data);
      } catch (err) {
        console.error("Failed to load ideas:", err);
      } finally {
        setLoading(false);
      }
    };
    loadIdeas();
  }, []);

  return (
    <div className="pb-24">
      {/* Mobile Header (Sidebar is hidden on mobile so we need a minimal header) */}
      <header className="md:hidden sticky top-0 z-40 bg-[#0c0c1a]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30 shrink-0 text-sm">
          I
        </div>
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">IdeaSpark</span>
      </header>

      {/* Main Feed Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 flex flex-col gap-6">
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center text-slate-400 py-20 bg-[#121221] rounded-2xl border border-white/5">
            No ideas posted yet. Be the first!
          </div>
        ) : ideas.map((idea) => (
          <article 
            key={idea.id} 
            className="bg-[#121221] border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/40 p-5 transition hover:border-white/10"
          >
            {/* Author Row */}
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={idea.owner?.profile_image || `https://i.pravatar.cc/150?u=${idea.owner_id}`} 
                alt={idea.owner?.username || 'Anonymous'} 
                className="w-12 h-12 rounded-full border border-white/10 object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-white text-base leading-tight">
                  {idea.owner?.username || 'Anonymous User'}
                </span>
                <span className="text-slate-500 text-sm">
                  @{idea.owner?.username?.toLowerCase() || 'anon'} • {new Date(idea.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Post Typography */}
            <h2 className="text-xl font-bold text-slate-100 mb-2 leading-snug">
              {idea.title}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              {idea.description}
            </p>

            {/* Sub-info chip */}
            <div className="bg-[#1a1a2e] border border-white/5 rounded-lg p-3 flex flex-wrap items-center gap-2 mb-5">
              {idea.tags && idea.tags.length > 0 && idea.tags.map((tag: string) => (
                 <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300 font-medium">#{tag}</span>
              ))}
            </div>

            <div className="h-px bg-white/10 w-full mb-3" />

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleLike(idea.id)}
                  className="flex items-center gap-2 hover:text-white transition group"
                >
                  <Heart className={`w-5 h-5 ${liked[idea.id] ? 'fill-rose-500 text-rose-500' : 'group-hover:text-rose-400'}`} />
                  <span className={`font-medium ${liked[idea.id] ? 'text-rose-500' : ''}`}>
                    {liked[idea.id] ? 1 : 0}
                  </span>
                </button>

                <button className="flex items-center gap-2 hover:text-white transition">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">0</span>
                </button>
                
                <button className="flex items-center gap-1.5 hover:text-indigo-300 text-indigo-400 transition ml-2 px-3 py-1 bg-indigo-500/10 rounded-lg">
                  <span className="font-semibold text-sm">Apply</span>
                </button>
              </div>

              <button className="flex items-center gap-2 hover:text-white transition font-medium text-sm hidden sm:flex">
                <Users className="w-5 h-5" />
                View Votes
              </button>
            </div>
          </article>
        ))}

      </div>

      {/* Floating Action Button for mobile/general posting */}
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <button className="w-14 h-14 bg-purple-600 rounded-full shadow-lg shadow-purple-600/40 flex items-center justify-center text-white hover:bg-purple-500 hover:scale-105 active:scale-95 transition-all">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
