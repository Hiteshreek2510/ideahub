"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/api";
import { Loader2, LayoutGrid, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function MyPosts() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyIdeas = async () => {
      try {
        const data = await fetchAPI("/ideas/my");
        setIdeas(data);
      } catch (err) {
        console.error("Failed to load my posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyIdeas();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <LayoutGrid className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold text-white tracking-tight">My Posts</h1>
      </div>

      {ideas.length === 0 ? (
        <div className="bg-[#121221] border border-white/5 rounded-2xl p-12 text-center shadow-xl shadow-black/40">
          <div className="w-16 h-16 bg-[#1a1a2e] rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
            <LayoutGrid className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No posts yet</h3>
          <p className="text-sm text-slate-400 mb-6">You haven't shared any ideas with the community yet.</p>
          <Link href="/create" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-block shadow-lg shadow-purple-600/20">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-[#121221] border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/40 flex flex-col group hover:border-purple-500/30 transition-colors">
              {/* Media Header */}
              <div className="h-48 bg-[#0a0a14] relative overflow-hidden shrink-0 flex items-center justify-center border-b border-white/5">
                {idea.media_url ? (
                  idea.media_type === 'video' ? (
                    <video src={idea.media_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <img src={idea.media_url} alt={idea.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  )
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/10 uppercase">{idea.title.substring(0, 2)}</span>
                  </div>
                )}
                
                {/* Stats Overlay */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-xs font-medium text-white">{idea._count?.votes || 0}</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-medium text-white">{idea._count?.comments || 0}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                  {idea.title}
                </h2>
                <p className="text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {idea.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-white/5">
                  {idea.tags && idea.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag.trim()} className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-300 font-medium uppercase tracking-wider">
                      {tag.trim()}
                    </span>
                  ))}
                  {idea.tags && idea.tags.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-400 font-medium">
                      +{idea.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
