"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedViewer from "@/components/ProtectedViewer";
import PublicNavbar from "@/components/PublicNavbar";

export default function PublicPostPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/ideas/public/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setIdea(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIdea();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#070710] flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#070710] flex items-center justify-center text-rose-500">{error}</div>;
  if (!idea) return null;

  return (
    <div className="min-h-screen bg-[#070710] text-[#e2e8f0] flex flex-col">
      <PublicNavbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <ProtectedViewer>
          <div className="bg-[#121221] border border-white/10 p-8 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-4">{idea.title}</h1>
            
            <div className="flex items-center gap-4 mb-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  {idea.owner?.username?.charAt(0).toUpperCase()}
                </div>
                <span>@{idea.owner?.username || 'anon'}</span>
              </div>
              <span>•</span>
              <span>{new Date(idea.created_at).toLocaleDateString()}</span>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 whitespace-pre-wrap">
              {idea.description}
            </p>

            {idea.media_url && (
              <div className="mb-8 rounded-xl overflow-hidden border border-white/5 bg-black/40">
                {idea.media_type === 'video' ? (
                  <video src={idea.media_url} controls className="w-full max-h-[500px] object-contain" />
                ) : (
                  <img src={idea.media_url} alt="Attached Media" className="w-full max-h-[500px] object-cover pointer-events-none" />
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {idea.tags && (typeof idea.tags === 'string' ? idea.tags.split(',') : idea.tags).map((tag: string) => (
                <span key={tag} className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-slate-300">#{tag.trim()}</span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center">
              <p className="text-sm text-amber-500 font-medium">To view private documents or join this project, please sign in.</p>
              <button 
                onClick={() => router.push('/login')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-semibold transition-all"
              >
                Apply to Join
              </button>
            </div>
          </div>
        </ProtectedViewer>
      </main>
    </div>
  );
}
