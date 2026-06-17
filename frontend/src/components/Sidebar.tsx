"use client";

import { Home, Users, Bell, Settings, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?u=my_user");
  const pathname = usePathname();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await fetchAPI('/users/me');
        if (user.profile_image) {
          setAvatar(user.profile_image);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    
    loadProfile();
    window.addEventListener('avatar-updated', loadProfile);
    return () => window.removeEventListener('avatar-updated', loadProfile);
  }, []);

  return (
    <aside className="w-20 md:w-64 fixed h-full bg-[#0c0c1a] border-r border-white/5 flex flex-col justify-between py-6 z-50">
      <div>
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30 shrink-0 text-lg">
            I
          </div>
          <span className="hidden md:block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
            IdeaSpark
          </span>
        </div>

        <nav className="flex flex-col gap-2 px-3">
          <Link href="/feed" className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group ${pathname === '/feed' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-300 hover:text-white'}`}>
            <Home className={`w-6 h-6 shrink-0 transition-colors ${pathname === '/feed' ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
            <span className="hidden md:block font-medium">Home</span>
          </Link>
          <Link href="/my-posts" className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group ${pathname === '/my-posts' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-300 hover:text-white'}`}>
            <LayoutGrid className={`w-6 h-6 shrink-0 transition-colors ${pathname === '/my-posts' ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
            <span className="hidden md:block font-medium">My Posts</span>
          </Link>
          <Link href="/community" className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group ${pathname === '/community' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-300 hover:text-white'}`}>
            <Users className={`w-6 h-6 shrink-0 transition-colors ${pathname === '/community' ? 'text-teal-400' : 'group-hover:text-teal-400'}`} />
            <span className="hidden md:block font-medium">Community</span>
          </Link>
          <Link href="/notifications" className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group relative ${pathname === '/notifications' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-300 hover:text-white'}`}>
            <div className="relative">
              <Bell className={`w-6 h-6 shrink-0 transition-colors ${pathname === '/notifications' ? 'text-rose-400' : 'group-hover:text-rose-400'}`} />
            </div>
            <span className="hidden md:block font-medium">Notifications</span>
          </Link>
        </nav>
      </div>

      <div className="px-3">
        <Link href="/settings" className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group ${pathname === '/settings' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-300 hover:text-white'}`}>
          <img src={avatar} className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0" alt="Profile" />
          <span className="hidden md:block font-medium truncate">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
