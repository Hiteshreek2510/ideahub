"use client";

import { useState } from "react";
import { Camera, Shield, Lock, Globe, Save } from "lucide-react";

export default function Settings() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?u=my_user");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-white tracking-tight mb-8">Profile Settings</h1>

      <div className="space-y-6">
        
        {/* Profile Image Section */}
        <section className="bg-[#121221] border border-white/5 rounded-2xl p-6 shadow-xl shadow-black/40">
          <h2 className="text-xl font-semibold text-white mb-6">Profile Image</h2>
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <img 
                src={avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-[#1a1a2e] group-hover:opacity-50 transition-opacity" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <div className="flex gap-3 mb-2">
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-purple-600/20">
                  Upload new
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/10">
                  Remove
                </button>
              </div>
              <p className="text-xs text-slate-500">Recommended size: 256x256px. Max size: 2MB.</p>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="bg-[#121221] border border-white/5 rounded-2xl p-6 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-semibold text-white">Privacy & Visibility</h2>
          </div>
          
          <div className="space-y-4">
            <div 
              onClick={() => setIsPrivate(false)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-4 ${!isPrivate ? 'bg-purple-500/10 border-purple-500/50' : 'bg-[#1a1a2e] border-white/5 hover:border-white/20'}`}
            >
              <div className={`mt-0.5 p-2 rounded-lg ${!isPrivate ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-1">Public Profile</h3>
                <p className="text-sm text-slate-400">Anyone on IdeaSpark can see your profile, skills, and the ideas you've posted.</p>
              </div>
              <div className="ml-auto flex items-center h-full pt-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isPrivate ? 'border-purple-500' : 'border-slate-600'}`}>
                  {!isPrivate && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                </div>
              </div>
            </div>

            <div 
              onClick={() => setIsPrivate(true)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-4 ${isPrivate ? 'bg-purple-500/10 border-purple-500/50' : 'bg-[#1a1a2e] border-white/5 hover:border-white/20'}`}
            >
              <div className={`mt-0.5 p-2 rounded-lg ${isPrivate ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-1">Private Profile</h3>
                <p className="text-sm text-slate-400">Your profile is hidden from the public. Only users you collaborate with can view your details.</p>
              </div>
              <div className="ml-auto flex items-center h-full pt-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPrivate ? 'border-purple-500' : 'border-slate-600'}`}>
                  {isPrivate && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-purple-600/20 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
