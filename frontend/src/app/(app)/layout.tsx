import { Home, Users, Bell, Settings } from "lucide-react";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070710] flex text-[#e2e8f0]">
      {/* Sidebar */}
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
            <Link href="/feed" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white group">
              <Home className="w-6 h-6 shrink-0 group-hover:text-purple-400 transition-colors" />
              <span className="hidden md:block font-medium">Home</span>
            </Link>
            <Link href="/community" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white group">
              <Users className="w-6 h-6 shrink-0 group-hover:text-teal-400 transition-colors" />
              <span className="hidden md:block font-medium">Community</span>
            </Link>
            <Link href="/notifications" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white group relative">
              <div className="relative">
                <Bell className="w-6 h-6 shrink-0 group-hover:text-rose-400 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#0c0c1a]" />
              </div>
              <span className="hidden md:block font-medium">Notifications</span>
            </Link>
          </nav>
        </div>

        <div className="px-3">
          <Link href="/settings" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white group">
            <img src="https://i.pravatar.cc/150?u=my_user" className="w-7 h-7 rounded-full border border-slate-700 shrink-0" alt="Profile" />
            <span className="hidden md:block font-medium truncate">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 relative min-h-screen">
        {children}
      </main>
    </div>
  );
}
