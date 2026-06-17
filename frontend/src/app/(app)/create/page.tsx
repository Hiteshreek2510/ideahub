"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";

export default function CreateIdea() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const router = useRouter();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreviewUrl(URL.createObjectURL(selected));
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            let media_url = undefined;
            let media_type = undefined;

            if (file) {
                // Upload file first
                const formData = new FormData();
                formData.append('file', file);
                
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
                const uploadRes = await fetch(`${apiUrl}/ideas/upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });

                if (!uploadRes.ok) {
                    const errText = await uploadRes.text();
                    throw new Error(JSON.parse(errText).message || 'Failed to upload media');
                }
                const uploadData = await uploadRes.json();
                media_url = uploadData.url;
                media_type = file.type.startsWith('video/') ? 'video' : 'image';
            }

            const data = await fetchAPI('/ideas', {
                method: 'POST',
                body: JSON.stringify({ 
                    title, 
                    description, 
                    tags, 
                    media_url, 
                    media_type 
                }),
            });

            // Redirect to feed on success
            router.push('/feed');
        } catch (err: any) {
            setError(err.message || "Failed to create idea.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-24 max-w-2xl mx-auto px-4 sm:px-6 pt-12 flex flex-col gap-6">
            <Link href="/feed" className="flex items-center gap-2 text-slate-400 hover:text-white transition w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Feed
            </Link>

            <div className="bg-[#121221] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Post a New Idea</h1>
                    <p className="text-slate-400 text-sm">Share your vision with the community and find people to build it with.</p>
                </div>

                <form onSubmit={handleCreate} className="space-y-5 mt-6">
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 p-3 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. AI-Powered Visual Navigation Tool"
                            className="w-full bg-[#1a1a2e] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe what you want to build and what kind of help you need..."
                            rows={5}
                            className="w-full bg-[#1a1a2e] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Tags (Comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            placeholder="e.g. ai, accessibility, mobile"
                            className="w-full bg-[#1a1a2e] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-medium text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Media (Optional)</label>
                        
                        {!previewUrl ? (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl hover:bg-white/5 hover:border-purple-500/50 transition-all cursor-pointer">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-400"><span className="font-semibold text-purple-400">Click to upload</span> an image or video</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
                            </label>
                        ) : (
                            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/50">
                                {file?.type.startsWith('video/') ? (
                                    <video src={previewUrl} controls className="w-full max-h-64 object-contain" />
                                ) : (
                                    <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-contain" />
                                )}
                                <button
                                    type="button"
                                    onClick={() => { setFile(null); setPreviewUrl(null); }}
                                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-rose-500/80 rounded-full text-white backdrop-blur-sm transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-purple-600/20 group flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
                    >
                        {loading ? 'Posting...' : 'Post Idea'}
                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            </div>
        </div>
    );
}
